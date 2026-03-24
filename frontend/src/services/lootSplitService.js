/**
 * Loot Split Service (frontend)
 * Ports backend parsing and calculation logic to run entirely in the browser.
 * No network requests — all computation is synchronous.
 */

// ---------------------------------------------------------------------------
// Domain helpers
// ---------------------------------------------------------------------------

function parseNumber(str) {
  return parseInt(String(str).replace(/,/g, ''), 10);
}

function parseDurationToMinutes(durationStr) {
  // Colon-based format: "03:08h"
  const colonMatch = durationStr.match(/(\d+):(\d+)(?::(\d+))?h?/);
  if (colonMatch) {
    const hours = parseInt(colonMatch[1], 10);
    const minutes = parseInt(colonMatch[2], 10);
    const seconds = colonMatch[3] ? parseInt(colonMatch[3], 10) : 0;
    return hours * 60 + minutes + Math.round(seconds / 60);
  }
  // Space-separated format: "2h 30m" or "1h 45m 30s"
  const hoursMatch = durationStr.match(/(\d+)h/);
  const minutesMatch = durationStr.match(/(\d+)m/);
  let total = 0;
  if (hoursMatch) total += parseInt(hoursMatch[1], 10) * 60;
  if (minutesMatch) total += parseInt(minutesMatch[1], 10);
  return total;
}

function formatGold(amount) {
  if (amount >= 1000000) return (amount / 1000000).toFixed(2) + 'kk';
  if (amount >= 1000) return (amount / 1000).toFixed(2) + 'k';
  return String(amount);
}

// ---------------------------------------------------------------------------
// Parser (TibiaLootParser)
// ---------------------------------------------------------------------------

function parseLootSession(rawText) {
  if (!rawText || rawText.trim().length === 0) {
    throw new Error('Invalid loot data format: empty input');
  }

  const lines = rawText.split('\n').map((l) => l.trim());

  // --- session header ---
  const sessionDataLine = lines.find((l) => l.startsWith('Session data:'));
  if (!sessionDataLine) {
    throw new Error('Invalid loot data format: missing session data header');
  }

  const tsMatch = sessionDataLine.match(
    /From (\d{4}-\d{2}-\d{2}), (\d{2}:\d{2}:\d{2}) to (\d{4}-\d{2}-\d{2}), (\d{2}:\d{2}:\d{2})/
  );
  if (!tsMatch) {
    throw new Error('Invalid loot data format: invalid timestamp format');
  }

  const extractValue = (label) => {
    const line = lines.find((l) => l.startsWith(label));
    if (!line) throw new Error(`Invalid loot data format: missing ${label}`);
    return line.replace(label, '').trim();
  };

  const duration = extractValue('Session:');
  const lootType = extractValue('Loot Type:');
  const totalLoot = parseNumber(extractValue('Loot:'));
  const totalSupplies = parseNumber(extractValue('Supplies:'));
  const totalBalance = parseNumber(extractValue('Balance:'));

  // --- players ---
  const rawLines = rawText.split('\n');
  const players = [];
  let currentPlayer = null;
  let currentData = {};

  for (let i = 0; i < rawLines.length; i++) {
    const rawLine = rawLines[i];
    const line = rawLine.trim();

    if (line.length === 0) continue;

    const startsWithWhitespace = /^\s/.test(rawLine);
    const isHeaderField =
      line.startsWith('Session') ||
      line.startsWith('Loot Type') ||
      line.startsWith('Loot:') ||
      line.startsWith('Supplies:') ||
      line.startsWith('Balance:');

    if (!startsWithWhitespace && !isHeaderField) {
      if (currentPlayer) {
        players.push(_buildPlayer(currentPlayer, currentData));
      }
      const isLeader = line.includes('(Leader)');
      currentPlayer = line.replace('(Leader)', '').trim();
      currentData = { isLeader };
    }

    if (startsWithWhitespace) {
      if (line.startsWith('Loot:')) currentData.loot = parseNumber(line.replace('Loot:', '').trim());
      else if (line.startsWith('Supplies:')) currentData.supplies = parseNumber(line.replace('Supplies:', '').trim());
      else if (line.startsWith('Balance:')) currentData.balance = parseNumber(line.replace('Balance:', '').trim());
      else if (line.startsWith('Damage:')) currentData.damage = parseNumber(line.replace('Damage:', '').trim());
      else if (line.startsWith('Healing:')) currentData.healing = parseNumber(line.replace('Healing:', '').trim());
      else if (line.startsWith('Profit:')) currentData.profit = parseNumber(line.replace('Profit:', '').trim());
      else if (line.startsWith('Waste:')) currentData.waste = parseNumber(line.replace('Waste:', '').trim());
    }
  }

  if (currentPlayer) {
    players.push(_buildPlayer(currentPlayer, currentData));
  }

  if (players.length === 0) {
    throw new Error('Invalid loot data format: no players found');
  }

  return { duration, lootType, totalLoot, totalSupplies, totalBalance, players };
}

function _buildPlayer(name, data) {
  const player = {
    name,
    isLeader: data.isLeader || false,
    loot: data.loot || 0,
    supplies: data.supplies || 0,
    balance: data.balance || 0,
    damage: data.damage || 0,
    healing: data.healing || 0,
    profit: data.profit || 0,
    waste: data.waste || 0,
  };
  player.netBalance = player.balance + player.profit - player.waste;
  player.isActive = player.damage > 0 || player.healing > 0;
  return player;
}

// ---------------------------------------------------------------------------
// Calculator (CalculateLootSplitUseCase — greedy two-pointer)
// ---------------------------------------------------------------------------

function calculateTransfers(players) {
  const activePlayers = players.filter((p) => p.isActive);

  if (activePlayers.length <= 1) return [];

  const totalNetBalance = activePlayers.reduce((sum, p) => sum + p.netBalance, 0);
  const fairShare = totalNetBalance / activePlayers.length;

  const withDiff = activePlayers.map((p) => ({
    name: p.name,
    difference: p.netBalance - fairShare,
  }));

  const creditors = withDiff
    .filter((p) => p.difference > 0.01)
    .sort((a, b) => b.difference - a.difference)
    .map((p) => ({ ...p }));

  const debtors = withDiff
    .filter((p) => p.difference < -0.01)
    .map((p) => ({ ...p, difference: Math.abs(p.difference) }))
    .sort((a, b) => b.difference - a.difference)
    .map((p) => ({ ...p }));

  if (creditors.length === 0 || debtors.length === 0) return [];

  const transfers = [];
  let ci = 0;
  let di = 0;

  while (ci < creditors.length && di < debtors.length) {
    const creditor = creditors[ci];
    const debtor = debtors[di];
    const amount = Math.min(creditor.difference, debtor.difference);

    transfers.push({ from: creditor.name, to: debtor.name, amount: Math.round(amount) });

    creditor.difference -= amount;
    debtor.difference -= amount;

    if (creditor.difference < 0.01) ci++;
    if (debtor.difference < 0.01) di++;
  }

  return transfers.sort((a, b) => b.amount - a.amount);
}

// ---------------------------------------------------------------------------
// Response formatter
// ---------------------------------------------------------------------------

function formatLootSplitResponse(session, transfers) {
  const durationMinutes = parseDurationToMinutes(session.duration);
  const activePlayers = session.players.filter((p) => p.isActive);
  // Use totalNetBalance (sum of per-player netBalance) to match what calculateTransfers uses,
  // so the displayed fairShare reconciles with the actual transfer amounts.
  const totalNetBalance = activePlayers.reduce((sum, p) => sum + p.netBalance, 0);
  const fairShare =
    activePlayers.length > 0 ? Math.round(totalNetBalance / activePlayers.length) : 0;
  const profitPerHour =
    durationMinutes > 0 ? Math.round((fairShare / durationMinutes) * 60) : 0;

  const summary = {
    totalBalance: session.totalBalance,
    totalBalanceFormatted: formatGold(session.totalBalance),
    fairShare,
    fairShareFormatted: formatGold(fairShare),
    profitPerHour,
    profitPerHourFormatted: formatGold(profitPerHour),
    duration: session.duration,
    durationMinutes,
    activePlayers: activePlayers.length,
  };

  const players = session.players.map((player) => {
    const difference = player.netBalance - fairShare;
    const role = difference > 0 ? 'creditor' : difference < 0 ? 'debtor' : 'neutral';
    return {
      name: player.name,
      isLeader: player.isLeader,
      balance: player.balance,
      netBalance: player.netBalance,
      difference: Math.round(difference),
      isActive: player.isActive,
      role,
      damage: player.damage || 0,
      healing: player.healing || 0,
    };
  });

  const copyableText =
    transfers.length === 0
      ? ''
      : transfers.map((t) => `transfer ${t.amount} to ${t.to}`).join('\n');

  return { summary, players, transfers, copyableText };
}

// ---------------------------------------------------------------------------
// Public API — mirrors the old api.js calculateLootSplit signature
// ---------------------------------------------------------------------------

/**
 * Calculate loot split from raw TIBIA text.
 * Returns { success: true, data: { summary, players, transfers, copyableText } }
 * or throws an Error with a user-friendly message.
 */
export function calculateLootSplit(rawText) {
  if (!rawText || rawText.trim().length < 10) {
    throw new Error('Invalid loot data format: input too short');
  }

  const session = parseLootSession(rawText);
  const transfers = calculateTransfers(session.players);
  const data = formatLootSplitResponse(session, transfers);

  return { success: true, data };
}
