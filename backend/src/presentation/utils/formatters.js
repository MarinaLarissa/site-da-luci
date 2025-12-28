/**
 * Utility functions for formatting API responses
 */

/**
 * Format gold amount using TIBIA "kk" notation
 * @param {number} amount - Gold amount to format
 * @returns {string} Formatted string (e.g., "11.89kk", "3.96k", "500")
 *
 * @example
 * formatGold(11886314) // "11.89kk"
 * formatGold(3962)     // "3.96k"
 * formatGold(500)      // "500"
 */
export function formatGold(amount) {
  if (amount >= 1000000) {
    return (amount / 1000000).toFixed(2) + 'kk';
  } else if (amount >= 1000) {
    return (amount / 1000).toFixed(2) + 'k';
  }
  return amount.toString();
}

/**
 * Calculate profit per hour based on total profit and duration
 * @param {number} totalProfit - Total profit amount
 * @param {number} durationMinutes - Session duration in minutes
 * @returns {number} Profit per hour (rounded)
 */
export function calculateProfitPerHour(totalProfit, durationMinutes) {
  if (durationMinutes === 0) return 0;
  return Math.round((totalProfit / durationMinutes) * 60);
}

/**
 * Parse duration string to minutes
 * @param {string} durationStr - Duration in format "HH:MMh" (e.g., "03:08h")
 * @returns {number} Total minutes
 *
 * @example
 * parseDuration("03:08h") // 188
 * parseDuration("01:30h") // 90
 */
export function parseDuration(durationStr) {
  const [hours, minutes] = durationStr.replace('h', '').split(':').map(Number);
  return (hours * 60) + minutes;
}

/**
 * Generate copyable text for TIBIA transfer commands
 * Grouped by sender (creditor) for easy copy-paste
 *
 * @param {Array<Transfer>} transfers - Array of transfer objects
 * @returns {string} Formatted transfer commands
 *
 * @example
 * generateCopyableText([
 *   { from: "Lofi Shades", to: "Luciana Burks", amount: 4066247 },
 *   { from: "Lofi Shades", to: "Young Vex", amount: 3912667 }
 * ])
 * // Returns:
 * // "transfer 4066247 to Luciana Burks\ntransfer 3912667 to Young Vex"
 */
export function generateCopyableText(transfers) {
  if (!transfers || transfers.length === 0) {
    return '';
  }

  // Group transfers by sender (creditor)
  const groupedBySender = transfers.reduce((acc, transfer) => {
    if (!acc[transfer.from]) {
      acc[transfer.from] = [];
    }
    acc[transfer.from].push(transfer);
    return acc;
  }, {});

  // Generate transfer commands for each sender
  const commands = [];
  Object.entries(groupedBySender).forEach(([sender, senderTransfers]) => {
    senderTransfers.forEach((transfer) => {
      commands.push(`transfer ${transfer.amount} to ${transfer.to}`);
    });
  });

  return commands.join('\n');
}

/**
 * Format complete API response with summary, players, transfers, and copyableText
 *
 * @param {LootSession} lootSession - Parsed loot session entity
 * @param {Array<Transfer>} transfers - Calculated transfers
 * @returns {Object} Formatted response object matching API design
 */
export function formatResponse(lootSession, transfers) {
  const durationMinutes = parseDuration(lootSession.duration);
  const activePlayers = lootSession.players.filter((p) => p.isActive);
  const fairShare = activePlayers.length > 0
    ? Math.round(lootSession.totalBalance / activePlayers.length)
    : 0;
  const profitPerHour = calculateProfitPerHour(fairShare, durationMinutes);

  // Format summary
  const summary = {
    totalBalance: lootSession.totalBalance,
    totalBalanceFormatted: formatGold(lootSession.totalBalance),
    fairShare: fairShare,
    fairShareFormatted: formatGold(fairShare),
    profitPerHour: profitPerHour,
    profitPerHourFormatted: formatGold(profitPerHour),
    duration: lootSession.duration,
    durationMinutes: durationMinutes,
    activePlayers: activePlayers.length,
  };

  // Format players with role (creditor/debtor)
  const formattedPlayers = lootSession.players.map((player) => {
    const difference = player.netBalance - fairShare;
    const role = difference > 0 ? 'creditor' : difference < 0 ? 'debtor' : 'neutral';

    return {
      name: player.name,
      isLeader: player.isLeader,
      balance: player.balance,
      netBalance: player.netBalance,
      difference: Math.round(difference),
      isActive: player.isActive,
      role: role,
    };
  });

  // Generate copyable text
  const copyableText = generateCopyableText(transfers);

  return {
    summary,
    players: formattedPlayers,
    transfers,
    copyableText,
  };
}