/**
 * Bestiary Stage Utilities
 * Shared logic for calculating and managing bestiary stages
 */

/**
 * Calculate bestiary stage from kill count
 * @param {number} kills - Current number of kills
 * @param {number} totalKills - Total kills needed for completion
 * @returns {number} - Stage (0-3)
 *   0: Not started (0 kills)
 *   1: Stage 1/3 (0-32% complete, at least 0 kills)
 *   2: Stage 2/3 (33-66% complete, at least 1/3 of total)
 *   3: Stage 3/3 (67-100% complete, at least 2/3 of total)
 */
export const calculateStageFromKills = (kills, totalKills) => {
  if (!totalKills || kills < 0) return 0;
  if (kills >= totalKills) return 3; // Complete (100%)
  if (kills >= (totalKills * 2) / 3) return 2; // 2/3 complete (67%+)
  if (kills >= totalKills / 3) return 1; // 1/3 complete (33%+)
  return 0; // Not started (0-32%)
};

/**
 * Calculate minimum kills needed for a given stage
 * Used for OCR stage detection to estimate kills
 * @param {number} stage - Bestiary stage (1, 2, or 3)
 * @param {number} totalKills - Total kills needed for completion
 * @returns {number|null} - Minimum kills achieved, or null if invalid
 */
export const calculateMinimumKills = (stage, totalKills) => {
  if (!stage || !totalKills) return null;

  switch (stage) {
    case 1:
      return 0; // At least 0 kills (0-32%)
    case 2:
      return Math.ceil(totalKills / 3); // At least 1/3 (33%+)
    case 3:
      return Math.ceil((totalKills * 2) / 3); // At least 2/3 (67%+)
    default:
      return null;
  }
};

/**
 * Check if bestiary is complete
 * @param {number} kills - Current number of kills
 * @param {number} totalKills - Total kills needed for completion
 * @returns {boolean} - True if complete
 */
export const isBestiaryComplete = (kills, totalKills) => {
  return kills >= totalKills;
};

/**
 * Get stage display text key for i18n
 * @param {number} stage - Stage number (0-3)
 * @param {boolean} isComplete - Whether bestiary is complete
 * @returns {string} - i18n key
 */
export const getStageDisplayKey = (stage, isComplete) => {
  if (isComplete) return 'bestiaryPlanner.killCountModal.complete';
  return 'bestiaryPlanner.killCountModal.stage';
};

/**
 * Calculate percentage complete
 * @param {number} kills - Current number of kills
 * @param {number} totalKills - Total kills needed for completion
 * @returns {number} - Percentage (0-100)
 */
export const calculatePercentage = (kills, totalKills) => {
  if (!totalKills) return 0;
  return Math.min(100, Math.round((kills / totalKills) * 100));
};

export default {
  calculateStageFromKills,
  calculateMinimumKills,
  isBestiaryComplete,
  getStageDisplayKey,
  calculatePercentage,
};
