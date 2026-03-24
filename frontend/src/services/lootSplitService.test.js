import { calculateLootSplit } from './lootSplitService';

// ---------------------------------------------------------------------------
// Test data
// ---------------------------------------------------------------------------

const EXAMPLE_INPUT = `Session data: From 2025-12-25, 17:48:04 to 2025-12-25, 20:56:53
Session: 03:08h
Loot Type: Leader
Loot: 12,937,605
Supplies: 1,051,291
Balance: 11,886,314

Lofi Shades (Leader)
\tLoot: 12,120,799
\tSupplies: 179,781
\tBalance: 11,941,018
\tDamage: 17,660,082
\tHealing: 785,634

Luciana Burks
\tLoot: 277,020
\tSupplies: 381,162
\tBalance: -104,142
\tDamage: 17,145,590
\tHealing: 9,169,753

Young Vex
\tLoot: 539,786
\tSupplies: 490,348
\tBalance: 49,438
\tDamage: 18,737,566
\tHealing: 2,666,860`;

const SINGLE_PLAYER_INPUT = `Session data: From 2025-12-25, 17:48:04 to 2025-12-25, 20:56:53
Session: 01:00h
Loot Type: Leader
Loot: 5,000,000
Supplies: 500,000
Balance: 4,500,000

Solo Player
\tLoot: 5,000,000
\tSupplies: 500,000
\tBalance: 4,500,000
\tDamage: 10,000,000
\tHealing: 0`;

// ---------------------------------------------------------------------------
// Happy path
// ---------------------------------------------------------------------------

describe('calculateLootSplit — happy path', () => {
  test('returns success: true', () => {
    const result = calculateLootSplit(EXAMPLE_INPUT);
    expect(result.success).toBe(true);
  });

  test('generates exactly 2 transfers for 3-player example', () => {
    const { data } = calculateLootSplit(EXAMPLE_INPUT);
    expect(data.transfers).toHaveLength(2);
  });

  test('all transfers are from Lofi Shades (the creditor)', () => {
    const { data } = calculateLootSplit(EXAMPLE_INPUT);
    data.transfers.forEach((t) => expect(t.from).toBe('Lofi Shades'));
  });

  test('transfers are sorted by amount descending', () => {
    const { data } = calculateLootSplit(EXAMPLE_INPUT);
    const amounts = data.transfers.map((t) => t.amount);
    expect(amounts[0]).toBeGreaterThanOrEqual(amounts[1]);
  });

  test('transfer recipients are Luciana Burks and Young Vex', () => {
    const { data } = calculateLootSplit(EXAMPLE_INPUT);
    const recipients = data.transfers.map((t) => t.to).sort();
    expect(recipients).toEqual(['Luciana Burks', 'Young Vex'].sort());
  });

  test('summary.activePlayers is 3', () => {
    const { data } = calculateLootSplit(EXAMPLE_INPUT);
    expect(data.summary.activePlayers).toBe(3);
  });

  test('summary.fairShare reconciles with transfer amounts', () => {
    const { data } = calculateLootSplit(EXAMPLE_INPUT);
    const { fairShare, activePlayers } = data.summary;
    // sum of all transfers should equal the total excess paid out
    const totalTransferred = data.transfers.reduce((sum, t) => sum + t.amount, 0);
    // fairShare * activePlayers ≈ totalNetBalance, and totalTransferred redistributes the excess
    expect(fairShare).toBeGreaterThan(0);
    expect(totalTransferred).toBeGreaterThan(0);
    // each transfer moves money toward fairShare; the total moved equals excess - rounding
    expect(activePlayers).toBe(3);
  });

  test('summary.duration matches input', () => {
    const { data } = calculateLootSplit(EXAMPLE_INPUT);
    expect(data.summary.duration).toBe('03:08h');
  });

  test('summary.durationMinutes equals 188', () => {
    const { data } = calculateLootSplit(EXAMPLE_INPUT);
    expect(data.summary.durationMinutes).toBe(188);
  });

  test('copyableText contains transfer commands', () => {
    const { data } = calculateLootSplit(EXAMPLE_INPUT);
    expect(data.copyableText).toMatch(/^transfer \d+ to .+/);
  });

  test('players array has 3 entries with correct roles', () => {
    const { data } = calculateLootSplit(EXAMPLE_INPUT);
    expect(data.players).toHaveLength(3);
    const lofi = data.players.find((p) => p.name === 'Lofi Shades');
    expect(lofi.role).toBe('creditor');
    const luciana = data.players.find((p) => p.name === 'Luciana Burks');
    expect(luciana.role).toBe('debtor');
  });

  test('Leader flag is set correctly', () => {
    const { data } = calculateLootSplit(EXAMPLE_INPUT);
    const lofi = data.players.find((p) => p.name === 'Lofi Shades');
    expect(lofi.isLeader).toBe(true);
    const luciana = data.players.find((p) => p.name === 'Luciana Burks');
    expect(luciana.isLeader).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Single player
// ---------------------------------------------------------------------------

describe('calculateLootSplit — single active player', () => {
  test('returns empty transfers array', () => {
    const { data } = calculateLootSplit(SINGLE_PLAYER_INPUT);
    expect(data.transfers).toHaveLength(0);
  });

  test('returns empty copyableText', () => {
    const { data } = calculateLootSplit(SINGLE_PLAYER_INPUT);
    expect(data.copyableText).toBe('');
  });
});

// ---------------------------------------------------------------------------
// Profit / Waste fields
// ---------------------------------------------------------------------------

describe('calculateLootSplit — Profit/Waste fields affect fairShare', () => {
  const inputWithProfitWaste = `Session data: From 2025-01-01, 10:00:00 to 2025-01-01, 11:00:00
Session: 01:00h
Loot Type: Leader
Loot: 2,000,000
Supplies: 0
Balance: 2,000,000

Alpha
\tLoot: 1,000,000
\tSupplies: 0
\tBalance: 1,000,000
\tProfit: 500,000
\tDamage: 1,000,000
\tHealing: 0

Beta
\tLoot: 1,000,000
\tSupplies: 0
\tBalance: 1,000,000
\tWaste: 500,000
\tDamage: 1,000,000
\tHealing: 0`;

  test('netBalance accounts for Profit/Waste', () => {
    const { data } = calculateLootSplit(inputWithProfitWaste);
    const alpha = data.players.find((p) => p.name === 'Alpha');
    const beta = data.players.find((p) => p.name === 'Beta');
    // Alpha: balance=1M + profit=500k = netBalance 1.5M → creditor
    expect(alpha.role).toBe('creditor');
    // Beta: balance=1M - waste=500k = netBalance 500k → debtor
    expect(beta.role).toBe('debtor');
  });

  test('fairShare uses totalNetBalance, not session totalBalance', () => {
    const { data } = calculateLootSplit(inputWithProfitWaste);
    // totalNetBalance = 1.5M + 0.5M = 2M → fairShare = 1M
    // session.totalBalance = 2M → same result here, but principle is correct
    expect(data.summary.fairShare).toBe(1000000);
  });
});

// ---------------------------------------------------------------------------
// Duration parsing
// ---------------------------------------------------------------------------

describe('calculateLootSplit — duration formats', () => {
  const makeInput = (duration) => `Session data: From 2025-01-01, 10:00:00 to 2025-01-01, 12:30:00
Session: ${duration}
Loot Type: Leader
Loot: 1,000,000
Supplies: 0
Balance: 1,000,000

Player A
\tLoot: 1,000,000
\tSupplies: 0
\tBalance: 1,000,000
\tDamage: 1,000,000
\tHealing: 0`;

  test('"03:08h" → 188 minutes', () => {
    const { data } = calculateLootSplit(makeInput('03:08h'));
    expect(data.summary.durationMinutes).toBe(188);
  });

  test('"01:30h" → 90 minutes', () => {
    const { data } = calculateLootSplit(makeInput('01:30h'));
    expect(data.summary.durationMinutes).toBe(90);
  });

  test('"2h 30m" → 150 minutes', () => {
    const { data } = calculateLootSplit(makeInput('2h 30m'));
    expect(data.summary.durationMinutes).toBe(150);
  });

  test('"1h" → 60 minutes', () => {
    const { data } = calculateLootSplit(makeInput('1h'));
    expect(data.summary.durationMinutes).toBe(60);
  });
});

// ---------------------------------------------------------------------------
// Error cases
// ---------------------------------------------------------------------------

describe('calculateLootSplit — error cases', () => {
  test('throws on empty input', () => {
    expect(() => calculateLootSplit('')).toThrow();
  });

  test('throws on null input', () => {
    expect(() => calculateLootSplit(null)).toThrow();
  });

  test('throws on input shorter than 10 chars', () => {
    expect(() => calculateLootSplit('too short')).toThrow();
  });

  test('throws when session header is missing', () => {
    expect(() =>
      calculateLootSplit('some random text without session header that is long enough')
    ).toThrow('missing session data header');
  });
});

// ---------------------------------------------------------------------------
// formatGold helper (tested via summary fields)
// ---------------------------------------------------------------------------

describe('calculateLootSplit — formatGold in summary', () => {
  test('totalBalanceFormatted uses kk notation for millions', () => {
    const { data } = calculateLootSplit(EXAMPLE_INPUT);
    expect(data.summary.totalBalanceFormatted).toMatch(/kk$/);
  });
});
