import { calculateSoloHunt } from './soloHuntService';

// ---------------------------------------------------------------------------
// Test data helpers
// ---------------------------------------------------------------------------

const makeParsedSession = (overrides = {}) => ({
  sessionInfo: 'From 2025-12-25, 17:48:04 to 2025-12-25, 19:48:04',
  duration: '02:00h',
  player: {
    name: 'Test Player',
    loot: 10000000,
    supplies: 500000,
    balance: 9500000,
    damage: 5000000,
    healing: 0,
    ...overrides.player,
  },
  ...overrides,
});

const NO_ITEMS = [];
const NO_PRICES = { goldTokenPrice: 0, silverTokenPrice: 0, tibiaCoinPrice: 0, tibiaCoinSellPrice: 0 };

// ---------------------------------------------------------------------------
// Happy path — no custom items
// ---------------------------------------------------------------------------

describe('calculateSoloHunt — no custom items', () => {
  test('returns success: true', () => {
    const result = calculateSoloHunt(makeParsedSession(), NO_ITEMS, NO_PRICES);
    expect(result.success).toBe(true);
  });

  test('adjustedBalance equals session balance when no items', () => {
    const session = makeParsedSession();
    const { data } = calculateSoloHunt(session, NO_ITEMS, NO_PRICES);
    expect(data.adjustedBalance).toBe(session.player.balance);
  });

  test('totalSupplies equals session supplies when no items', () => {
    const session = makeParsedSession();
    const { data } = calculateSoloHunt(session, NO_ITEMS, NO_PRICES);
    expect(data.totalSupplies).toBe(session.player.supplies);
  });

  test('profitPerHour is adjustedBalance / durationHours', () => {
    const session = makeParsedSession(); // duration = "02:00h" → 2h
    const { data } = calculateSoloHunt(session, NO_ITEMS, NO_PRICES);
    expect(data.profitPerHour).toBeCloseTo(session.player.balance / 2, 0);
  });

  test('tcTotal is 0 when tibiaCoinPrice is 0', () => {
    const { data } = calculateSoloHunt(makeParsedSession(), NO_ITEMS, NO_PRICES);
    expect(data.tcTotal).toBe(0);
  });

  test('moneyEarned is 0 when tibiaCoinSellPrice is 0', () => {
    const { data } = calculateSoloHunt(makeParsedSession(), NO_ITEMS, NO_PRICES);
    expect(data.moneyEarned).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// GP item without duration (flat cost)
// ---------------------------------------------------------------------------

describe('calculateSoloHunt — GP item without duration', () => {
  const gpItem = { name: 'Potion', unitPrice: 100, quantity: 50, priceType: 'GP' };

  test('adjustedBalance is reduced by item total cost', () => {
    const session = makeParsedSession();
    const { data } = calculateSoloHunt(session, [gpItem], NO_PRICES);
    const expectedCost = 100 * 50; // 5000
    expect(data.adjustedBalance).toBe(session.player.balance - expectedCost);
  });

  test('totalSupplies includes item cost', () => {
    const session = makeParsedSession();
    const { data } = calculateSoloHunt(session, [gpItem], NO_PRICES);
    expect(data.totalSupplies).toBe(session.player.supplies + 100 * 50);
  });
});

// ---------------------------------------------------------------------------
// GP item WITH duration (proportional cost)
// ---------------------------------------------------------------------------

describe('calculateSoloHunt — GP item with itemDuration (proportional)', () => {
  // Item: 10,000 GP for 20h duration → 500 GP/h
  // Hunt duration: 2h → proportional cost = 1,000 GP
  const proportionalItem = {
    name: 'Imbuement',
    unitPrice: 10000,
    quantity: 1,
    priceType: 'GP',
    itemDuration: 20,
  };

  test('proportional cost is (unitPrice / itemDuration) * huntDurationHours', () => {
    const session = makeParsedSession(); // duration "02:00h" → 2h
    const { data } = calculateSoloHunt(session, [proportionalItem], NO_PRICES);
    const expectedCost = (10000 / 20) * 2; // 1000
    expect(data.adjustedBalance).toBeCloseTo(session.player.balance - expectedCost, 1);
  });

  test('costs.gpPerHour reflects item cost per hour', () => {
    const session = makeParsedSession();
    const { data } = calculateSoloHunt(session, [proportionalItem], NO_PRICES);
    expect(data.costs.gpPerHour).toBeCloseTo(10000 / 20, 1); // 500 GP/h
  });
});

// ---------------------------------------------------------------------------
// GT item — requires goldTokenPrice
// ---------------------------------------------------------------------------

describe('calculateSoloHunt — GT item', () => {
  const gtItem = { name: 'GT Item', unitPrice: 1, quantity: 2, priceType: 'GT' };
  const goldPrice = 100000;

  test('throws when goldTokenPrice is 0 and GT item has no duration', () => {
    expect(() =>
      calculateSoloHunt(makeParsedSession(), [gtItem], { ...NO_PRICES, goldTokenPrice: 0 })
    ).toThrow('Gold Token price is required');
  });

  test('cost converts GT to GP using goldTokenPrice', () => {
    const session = makeParsedSession();
    const { data } = calculateSoloHunt(session, [gtItem], { ...NO_PRICES, goldTokenPrice: goldPrice });
    const expectedCost = 1 * 2 * goldPrice; // 200,000 GP
    expect(data.adjustedBalance).toBe(session.player.balance - expectedCost);
    expect(data.costs.totalGT).toBeCloseTo(2, 1);
  });
});

// ---------------------------------------------------------------------------
// ST item — requires silverTokenPrice
// ---------------------------------------------------------------------------

describe('calculateSoloHunt — ST item', () => {
  const stItem = { name: 'ST Item', unitPrice: 3, quantity: 1, priceType: 'ST' };
  const silverPrice = 50000;

  test('throws when silverTokenPrice is 0 and ST item has no duration', () => {
    expect(() =>
      calculateSoloHunt(makeParsedSession(), [stItem], { ...NO_PRICES, silverTokenPrice: 0 })
    ).toThrow('Silver Token price is required');
  });

  test('cost converts ST to GP using silverTokenPrice', () => {
    const session = makeParsedSession();
    const { data } = calculateSoloHunt(session, [stItem], { ...NO_PRICES, silverTokenPrice: silverPrice });
    const expectedCost = 3 * 1 * silverPrice; // 150,000 GP
    expect(data.adjustedBalance).toBe(session.player.balance - expectedCost);
    expect(data.costs.totalST).toBeCloseTo(3, 1);
  });
});

// ---------------------------------------------------------------------------
// TC metrics
// ---------------------------------------------------------------------------

describe('calculateSoloHunt — TC metrics', () => {
  const prices = { goldTokenPrice: 0, silverTokenPrice: 0, tibiaCoinPrice: 500, tibiaCoinSellPrice: 250 };

  test('tcTotal = adjustedBalance / tibiaCoinPrice', () => {
    const session = makeParsedSession(); // balance = 9,500,000
    const { data } = calculateSoloHunt(session, NO_ITEMS, prices);
    expect(data.tcTotal).toBeCloseTo(9500000 / 500, 1); // 19,000
  });

  test('tcPerHour = tcTotal / huntDurationHours', () => {
    const session = makeParsedSession(); // "02:00h" → 2h
    const { data } = calculateSoloHunt(session, NO_ITEMS, prices);
    const expectedTcPerHour = (9500000 / 500) / 2;
    expect(data.tcPerHour).toBeCloseTo(expectedTcPerHour, 1);
  });

  test('moneyEarned = (tibiaCoinSellPrice / 250) * tcTotal', () => {
    const session = makeParsedSession();
    const { data } = calculateSoloHunt(session, NO_ITEMS, prices);
    const tcTotal = 9500000 / 500;
    const expected = (250 / 250) * tcTotal; // 19,000
    expect(data.moneyEarned).toBeCloseTo(expected, 1);
  });

  test('huntData.tcTotal is floored integer', () => {
    const session = makeParsedSession();
    const { data } = calculateSoloHunt(session, NO_ITEMS, prices);
    expect(Number.isInteger(data.huntData.tcTotal)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// huntData shape
// ---------------------------------------------------------------------------

describe('calculateSoloHunt — huntData', () => {
  test('huntData.playerName matches session player name', () => {
    const session = makeParsedSession();
    const { data } = calculateSoloHunt(session, NO_ITEMS, NO_PRICES);
    expect(data.huntData.playerName).toBe('Test Player');
  });

  test('huntData.duration matches session duration', () => {
    const session = makeParsedSession();
    const { data } = calculateSoloHunt(session, NO_ITEMS, NO_PRICES);
    expect(data.huntData.duration).toBe('02:00h');
  });

  test('huntData.tcTotal is null when tibiaCoinPrice is 0', () => {
    const session = makeParsedSession();
    const { data } = calculateSoloHunt(session, NO_ITEMS, NO_PRICES);
    expect(data.huntData.tcTotal).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Error cases
// ---------------------------------------------------------------------------

describe('calculateSoloHunt — error cases', () => {
  test('throws when parsedSession is null', () => {
    expect(() => calculateSoloHunt(null, NO_ITEMS, NO_PRICES)).toThrow('Missing session data');
  });

  test('throws when customItems is not an array', () => {
    expect(() => calculateSoloHunt(makeParsedSession(), null, NO_PRICES)).toThrow(
      'customItems must be an array'
    );
  });

  test('throws when customItems is a string', () => {
    expect(() => calculateSoloHunt(makeParsedSession(), 'not-array', NO_PRICES)).toThrow(
      'customItems must be an array'
    );
  });
});

// ---------------------------------------------------------------------------
// Duration parsing
// ---------------------------------------------------------------------------

describe('calculateSoloHunt — duration formats', () => {
  const makeSession = (duration) => makeParsedSession({ duration });

  test('"02:00h" → 2h duration → profitPerHour = balance / 2', () => {
    const session = makeSession('02:00h');
    const { data } = calculateSoloHunt(session, NO_ITEMS, NO_PRICES);
    expect(data.profitPerHour).toBeCloseTo(session.player.balance / 2, 0);
  });

  test('"1h" → 1h duration', () => {
    const session = makeSession('1h');
    const { data } = calculateSoloHunt(session, NO_ITEMS, NO_PRICES);
    expect(data.profitPerHour).toBeCloseTo(session.player.balance, 0);
  });

  test('"00:30h" → 0.5h duration → profitPerHour = balance * 2', () => {
    const session = makeSession('00:30h');
    const { data } = calculateSoloHunt(session, NO_ITEMS, NO_PRICES);
    expect(data.profitPerHour).toBeCloseTo(session.player.balance * 2, 0);
  });
});
