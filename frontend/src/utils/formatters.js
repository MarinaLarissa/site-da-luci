/**
 * Utility functions for formatting data
 */

/**
 * Format gold amount with full value and thousand separators
 * @param {number} amount - Gold amount to format
 * @returns {string} Formatted string (e.g., "4.690.000" or "100.000")
 */
export function formatGold(amount) {
  if (!amount && amount !== 0) {
    return '0';
  }

  const numValue = typeof amount === 'string' ? parseFloat(amount) : amount;
  const intValue = Math.floor(numValue);

  // All values: show with thousand separators (pt-BR format), no decimals
  return intValue.toLocaleString('pt-BR');
}

/**
 * Format GP/GP per hour values with full value and thousand separators
 * @param {number} value - GP value to format
 * @returns {object} Object with { formatted, full } properties (both contain the same formatted value)
 * - formatted: Display value (e.g., "4.690.000" or "100.000")
 * - full: Complete value (same as formatted, kept for backwards compatibility)
 *
 * NOTE: This function now delegates to formatGold() for DRY principle.
 * The object return type is maintained for backwards compatibility.
 */
export function formatGPValue(value) {
  const formatted = formatGold(value);
  return { formatted, full: formatted };
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
