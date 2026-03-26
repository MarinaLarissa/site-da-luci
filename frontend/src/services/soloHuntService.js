/**
 * Solo Hunt Service (frontend)
 * Ports CalculateSoloHuntUseCase to run entirely in the browser.
 * No network requests — all computation is synchronous.
 */

// ---------------------------------------------------------------------------
// Duration parser
// ---------------------------------------------------------------------------

/**
 * Parse duration string to hours.
 * Supports: "2h 30m", "1h 45m 30s", "03:00h", "02:45:30h"
 */
function parseDurationToHours(durationStr) {
  const colonMatch = durationStr.match(/(\d+):(\d+)(?::(\d+))?h/);
  if (colonMatch) {
    const hours = parseInt(colonMatch[1], 10);
    const minutes = parseInt(colonMatch[2], 10);
    const seconds = colonMatch[3] ? parseInt(colonMatch[3], 10) : 0;
    return hours + minutes / 60 + seconds / 3600;
  }

  const hoursMatch = durationStr.match(/(\d+)h/);
  const minutesMatch = durationStr.match(/(\d+)m/);
  const secondsMatch = durationStr.match(/(\d+)s/);

  let total = 0;
  if (hoursMatch) total += parseInt(hoursMatch[1], 10);
  if (minutesMatch) total += parseInt(minutesMatch[1], 10) / 60;
  if (secondsMatch) total += parseInt(secondsMatch[1], 10) / 3600;
  return total;
}

// ---------------------------------------------------------------------------
// Public API — mirrors the old api.js calculateSoloHunt signature
// ---------------------------------------------------------------------------

/**
 * Calculate solo hunt metrics with custom item costs.
 * Returns { success: true, data: { session, costs, totalSupplies, adjustedBalance, ... } }
 * or throws an Error with a user-friendly message.
 *
 * @param {Object} parsedSession - Parsed session data (from SoloHuntAnalyzer)
 * @param {Array}  customItems   - Array of { name, unitPrice, quantity, priceType, itemDuration? }
 * @param {Object} prices        - { goldTokenPrice, silverTokenPrice, tibiaCoinPrice, tibiaCoinSellPrice }
 */
export function calculateSoloHunt(parsedSession, customItems, prices) {
  if (!parsedSession) {
    throw new Error('Missing session data');
  }
  if (!Array.isArray(customItems)) {
    throw new Error('customItems must be an array');
  }

  const {
    goldTokenPrice = 0,
    silverTokenPrice = 0,
    tibiaCoinPrice = 0,
    tibiaCoinSellPrice = 0,
  } = prices ?? {};

  const huntDurationHours = parseDurationToHours(parsedSession.duration);

  let totalCostGP = 0;
  let totalGpPerHour = 0;
  let totalCostGP_nonProportional = 0;
  let proportionalCostOnly = 0;
  let partialGP = 0;
  let totalGT = 0;
  let totalST = 0;

  // Group items by duration to sum costs before dividing
  const itemsByDuration = new Map();
  const itemsWithoutDuration = [];

  customItems.forEach((item) => {
    if (item.itemDuration && huntDurationHours > 0) {
      const key = item.itemDuration;
      if (!itemsByDuration.has(key)) {
        itemsByDuration.set(key, { GP: 0, GT: 0, ST: 0 });
      }
      itemsByDuration.get(key)[item.priceType] += item.unitPrice * item.quantity;
    } else {
      itemsWithoutDuration.push(item);
    }
  });

  // Proportional items (with duration)
  itemsByDuration.forEach((costs, duration) => {
    if (costs.GP > 0) {
      const proportionalGP = (costs.GP / duration) * huntDurationHours;
      partialGP += proportionalGP;
      totalGpPerHour += costs.GP / duration;
      totalCostGP += proportionalGP;
      proportionalCostOnly += proportionalGP;
    }
    if (costs.GT > 0) {
      if (goldTokenPrice === 0) throw new Error('Gold Token price is required for GT items');
      const proportionalGT = (costs.GT * goldTokenPrice / duration) * huntDurationHours;
      totalGT += (costs.GT / duration) * huntDurationHours;
      totalGpPerHour += (costs.GT * goldTokenPrice) / duration;
      totalCostGP += proportionalGT;
      proportionalCostOnly += proportionalGT;
    }
    if (costs.ST > 0) {
      if (silverTokenPrice === 0) throw new Error('Silver Token price is required for ST items');
      const proportionalST = (costs.ST * silverTokenPrice / duration) * huntDurationHours;
      totalST += (costs.ST / duration) * huntDurationHours;
      totalGpPerHour += (costs.ST * silverTokenPrice) / duration;
      totalCostGP += proportionalST;
      proportionalCostOnly += proportionalST;
    }
  });

  // Non-proportional items (no duration)
  itemsWithoutDuration.forEach((item) => {
    const baseCost = item.unitPrice * item.quantity;
    if (item.priceType === 'GP') {
      totalCostGP_nonProportional += baseCost;
      partialGP += baseCost;
    } else if (item.priceType === 'GT') {
      if (goldTokenPrice === 0) throw new Error('Gold Token price is required for GT items');
      totalCostGP_nonProportional += baseCost * goldTokenPrice;
      totalGT += baseCost;
    } else if (item.priceType === 'ST') {
      if (silverTokenPrice === 0) throw new Error('Silver Token price is required for ST items');
      totalCostGP_nonProportional += baseCost * silverTokenPrice;
      totalST += baseCost;
    }
  });

  totalCostGP += totalCostGP_nonProportional;

  const totalSupplies = parsedSession.player.supplies + totalCostGP;
  const adjustedBalance = parsedSession.player.balance - totalCostGP;
  const profitPerHour = huntDurationHours > 0 ? adjustedBalance / huntDurationHours : 0;
  const suppliesPerHour = huntDurationHours > 0 ? totalSupplies / huntDurationHours : 0;

  const tcTotal = tibiaCoinPrice > 0 ? adjustedBalance / tibiaCoinPrice : 0;
  const tcPerHour =
    huntDurationHours > 0 && tibiaCoinPrice > 0 ? tcTotal / huntDurationHours : 0;

  const moneyEarned =
    tibiaCoinSellPrice > 0 && tibiaCoinPrice > 0
      ? (tibiaCoinSellPrice / 250) * tcTotal
      : 0;

  const data = {
    session: parsedSession,
    costs: {
      partialGP,
      totalGT,
      totalST,
      goldTokenPrice,
      silverTokenPrice,
      tibiaCoinPrice,
      tibiaCoinSellPrice,
      items: customItems,
      gpPerHour: totalGpPerHour,
      additionalCost: totalCostGP,
    },
    totalSupplies,
    adjustedBalance,
    profitPerHour,
    suppliesPerHour,
    tcTotal,
    tcPerHour,
    moneyEarned,
    huntData: {
      playerName: parsedSession.player.name,
      duration: parsedSession.duration,
      loot: parsedSession.player.loot,
      supplies: parsedSession.player.supplies,
      balance: parsedSession.player.balance,
      totalCost: proportionalCostOnly,
      adjustedBalance,
      profitPerHour: huntDurationHours > 0 ? Math.round(adjustedBalance / huntDurationHours) : 0,
      tcTotal: tibiaCoinPrice > 0 ? Math.floor(tcTotal) : null,
      tcPerHour: tibiaCoinPrice > 0 ? Math.floor(tcPerHour) : null,
      tibiaCoinPrice: tibiaCoinPrice > 0 ? tibiaCoinPrice : null,
      moneyEarned:
        tibiaCoinSellPrice > 0 && tibiaCoinPrice > 0
          ? parseFloat(moneyEarned.toFixed(2))
          : null,
      tibiaCoinSellPrice: tibiaCoinSellPrice > 0 ? tibiaCoinSellPrice : null,
    },
  };

  return { success: true, data };
}
