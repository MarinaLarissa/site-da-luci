/**
 * Calculate Solo Hunt Use Case
 * Handles complex calculation logic for solo hunt analysis
 * Moved from frontend to reduce client-side computation
 */

/**
 * Parse duration string to hours
 * Examples: "2h 30m" -> 2.5, "1h 45m 30s" -> 1.758
 */
function parseDurationToHours(durationStr) {
  const hoursMatch = durationStr.match(/(\d+)h/);
  const minutesMatch = durationStr.match(/(\d+)m/);
  const secondsMatch = durationStr.match(/(\d+)s/);

  let totalHours = 0;

  if (hoursMatch) totalHours += parseInt(hoursMatch[1], 10);
  if (minutesMatch) totalHours += parseInt(minutesMatch[1], 10) / 60;
  if (secondsMatch) totalHours += parseInt(secondsMatch[1], 10) / 3600;

  return totalHours;
}

class CalculateSoloHuntUseCase {
  /**
   * Execute calculation
   * @param {Object} input
   * @param {Object} input.parsedSession - Parsed session data
   * @param {Array} input.customItems - Array of custom items with costs
   * @param {Number} input.goldTokenPrice - GP per Gold Token
   * @param {Number} input.silverTokenPrice - GP per Silver Token
   * @param {Number} input.tibiaCoinPrice - GP per Tibia Coin
   * @returns {Object} Calculation results
   */
  execute(input) {
    const {
      parsedSession,
      customItems,
      goldTokenPrice,
      silverTokenPrice,
      tibiaCoinPrice,
    } = input;

    // Validate inputs
    if (!parsedSession) {
      throw new Error('Missing session data');
    }

    if (!Array.isArray(customItems)) {
      throw new Error('customItems must be an array');
    }

    // Parse hunt duration
    const huntDurationHours = parseDurationToHours(parsedSession.duration);

    // Initialize cost accumulators
    let totalCostGP = 0; // Total proportional cost for this hunt
    let totalGpPerHour = 0; // GP per hour (for items with itemDuration only)
    let totalCostGP_nonProportional = 0; // For items without itemDuration
    let proportionalCostOnly = 0; // Only items with duration (for history)
    let partialGP = 0; // Direct GP costs (not from token conversion)
    let totalGT = 0; // Total GT used
    let totalST = 0; // Total ST used

    // Group items by duration for proper calculation
    // This ensures (items from market + imbuements fee) are summed first, then divided by duration
    const itemsByDuration = new Map();
    const itemsWithoutDuration = [];

    customItems.forEach(item => {
      if (item.itemDuration && huntDurationHours > 0) {
        const key = item.itemDuration;
        if (!itemsByDuration.has(key)) {
          itemsByDuration.set(key, { GP: 0, GT: 0, ST: 0, gpPerHour: 0 });
        }
        itemsByDuration.get(key)[item.priceType] += item.unitPrice * item.quantity;
      } else {
        itemsWithoutDuration.push(item);
      }
    });

    // Process items grouped by duration
    itemsByDuration.forEach((costs, duration) => {
      // Calculate proportional costs for this duration group
      if (costs.GP > 0) {
        const proportionalGP = (costs.GP / duration) * huntDurationHours;
        partialGP += proportionalGP;
        totalGpPerHour += costs.GP / duration;
        totalCostGP += proportionalGP;
        proportionalCostOnly += proportionalGP;
      }

      if (costs.GT > 0) {
        if (goldTokenPrice === 0) {
          throw new Error('Gold Token price is required for GT items');
        }
        const proportionalGT = (costs.GT * goldTokenPrice / duration) * huntDurationHours;
        totalGT += (costs.GT / duration) * huntDurationHours;
        totalGpPerHour += (costs.GT * goldTokenPrice) / duration;
        totalCostGP += proportionalGT;
        proportionalCostOnly += proportionalGT;
      }

      if (costs.ST > 0) {
        if (silverTokenPrice === 0) {
          throw new Error('Silver Token price is required for ST items');
        }
        const proportionalST = (costs.ST * silverTokenPrice / duration) * huntDurationHours;
        totalST += (costs.ST / duration) * huntDurationHours;
        totalGpPerHour += (costs.ST * silverTokenPrice) / duration;
        totalCostGP += proportionalST;
        proportionalCostOnly += proportionalST;
      }
    });

    // Process items without duration
    itemsWithoutDuration.forEach(item => {
      const baseCost = item.unitPrice * item.quantity;
      if (item.priceType === 'GP') {
        totalCostGP_nonProportional += baseCost;
        partialGP += baseCost;
      } else if (item.priceType === 'GT') {
        if (goldTokenPrice === 0) {
          throw new Error('Gold Token price is required for GT items');
        }
        totalCostGP_nonProportional += baseCost * goldTokenPrice;
        totalGT += baseCost;
      } else if (item.priceType === 'ST') {
        if (silverTokenPrice === 0) {
          throw new Error('Silver Token price is required for ST items');
        }
        totalCostGP_nonProportional += baseCost * silverTokenPrice;
        totalST += baseCost;
      }
    });

    // Add non-proportional costs to total
    totalCostGP += totalCostGP_nonProportional;

    // Calculate additional metrics
    const totalSupplies = parsedSession.player.supplies + totalCostGP;
    const adjustedBalance = parsedSession.player.balance - totalCostGP;
    const profitPerHour = huntDurationHours > 0 ? adjustedBalance / huntDurationHours : 0;
    const suppliesPerHour = huntDurationHours > 0 ? totalSupplies / huntDurationHours : 0;

    // Calculate TC metrics (only if tibiaCoinPrice is set)
    const tcTotal = tibiaCoinPrice > 0 ? adjustedBalance / tibiaCoinPrice : 0;
    const tcPerHour =
      huntDurationHours > 0 && tibiaCoinPrice > 0 ? tcTotal / huntDurationHours : 0;

    // Return results
    return {
      session: parsedSession,
      costs: {
        partialGP, // Direct GP costs (without token conversion)
        totalGT, // Total GT used (in GT, not converted)
        totalST, // Total ST used (in ST, not converted)
        goldTokenPrice,
        silverTokenPrice,
        tibiaCoinPrice,
        items: customItems,
        gpPerHour: totalGpPerHour, // GP per hour (only for items with itemDuration)
        additionalCost: totalCostGP, // Total proportional cost for this hunt
      },
      totalSupplies,
      adjustedBalance,
      profitPerHour,
      suppliesPerHour,
      tcTotal,
      tcPerHour,
      // Additional data for hunt history
      huntData: {
        playerName: parsedSession.player.name,
        duration: parsedSession.duration,
        loot: parsedSession.player.loot,
        supplies: parsedSession.player.supplies,
        balance: parsedSession.player.balance,
        totalCost: proportionalCostOnly, // Only proportional costs (items with duration)
        adjustedBalance,
        profitPerHour: huntDurationHours > 0 ? Math.round(adjustedBalance / huntDurationHours) : 0,
        tcTotal: tibiaCoinPrice > 0 ? Math.floor(tcTotal) : null,
        tcPerHour: tibiaCoinPrice > 0 ? Math.floor(tcPerHour) : null,
        tibiaCoinPrice: tibiaCoinPrice > 0 ? tibiaCoinPrice : null,
      },
    };
  }
}

export default CalculateSoloHuntUseCase;
