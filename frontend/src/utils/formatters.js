/**
 * Utility functions for formatting data
 */

/**
 * Format gold amount using TIBIA "kk" notation
 * @param {number} amount - Gold amount to format
 * @returns {string} Formatted string (e.g., "11.89kk", "3.96k", "500")
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
 * Format duration string for display
 * @param {string} duration - Duration in format "HH:MMh"
 * @returns {string} Formatted duration
 */
export function formatDuration(duration) {
  return duration;
}

/**
 * Get color for player role
 * @param {string} role - Player role (creditor, debtor, neutral)
 * @returns {string} CSS color value
 */
export function getRoleColor(role) {
  switch (role) {
    case 'creditor':
      return '#4CAF50'; // Green
    case 'debtor':
      return '#f44336'; // Red
    default:
      return '#9E9E9E'; // Gray
  }
}

/**
 * Get role label for display
 * @param {string} role - Player role
 * @param {function} t - Translation function from react-i18next
 * @returns {string} Display label
 */
export function getRoleLabel(role, t) {
  // If translation function not provided, return default English labels
  if (!t) {
    switch (role) {
      case 'creditor':
        return 'Creditor (has excess)';
      case 'debtor':
        return 'Debtor (needs money)';
      default:
        return 'Neutral';
    }
  }

  // Use translation function
  const roleKey = `roles.${role}`;
  return t(roleKey);
}
