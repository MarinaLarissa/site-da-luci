/**
 * Utility functions for formatting data
 */

/**
 * Format gold amount using standardized notation
 * @param {number} amount - Gold amount to format
 * @returns {string} Formatted string (e.g., "4.69kk" for >= 1M, "100.000" for < 1M)
 */
export function formatGold(amount) {
  if (!amount && amount !== 0) {
    return '0';
  }

  const numValue = typeof amount === 'string' ? parseFloat(amount) : amount;
  const intValue = Math.floor(numValue);

  // Values >= 1,000,000: use "kk" notation with 2 decimal places
  if (intValue >= 1000000) {
    return (numValue / 1000000).toFixed(2) + 'kk';
  }

  // Values < 1,000,000: show with thousand separators, no decimals
  return intValue.toLocaleString('pt-BR');
}

/**
 * Format GP/GP per hour values with standardized notation
 * @param {number} value - GP value to format
 * @returns {object} Object with { formatted, full } properties
 * - formatted: Display value (e.g., "100.000" or "4.69kk")
 * - full: Complete value for tooltip (e.g., "4.697.903")
 */
export function formatGPValue(value) {
  if (!value && value !== 0) {
    return { formatted: '0', full: '0' };
  }

  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  const intValue = Math.floor(numValue);

  // Values up to 999,999: show with thousand separators, no decimals
  if (intValue < 1000000) {
    const formatted = intValue.toLocaleString('pt-BR');
    return { formatted, full: formatted };
  }

  // Values >= 1,000,000: use "kk" notation with 2 decimal places
  const kkValue = (numValue / 1000000).toFixed(2);
  const full = intValue.toLocaleString('pt-BR');
  return { formatted: `${kkValue}kk`, full };
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
