/**
 * Bestiary Status Display Utilities
 * Calculate display status for creatures based on kills/completion
 */

import { calculateStageFromKills } from './bestiaryStages';

/**
 * Status types for creature cards
 * @enum {string}
 */
export const BestiaryStatus = {
  UNKNOWN: 'unknown',       // No data, show "?"
  IN_PROGRESS: 'in_progress', // Has kills but not complete, show "X/3"
  COMPLETE: 'complete',     // Completed, show "✓"
};

/**
 * Calculate display status for a creature
 * @param {Object} params
 * @param {boolean} params.isCompleted - Whether creature is marked as complete
 * @param {number|null} params.currentKills - Current kill count
 * @param {number} params.totalKills - Total kills needed for completion (occurrence)
 * @returns {{
 *   status: BestiaryStatus,
 *   stage: number|null,
 *   displayText: string,
 *   icon: string
 * }}
 */
export const calculateDisplayStatus = ({
  isCompleted = false,
  currentKills = null,
  totalKills = 0,
}) => {
  // If completed, always show complete status
  if (isCompleted) {
    return {
      status: BestiaryStatus.COMPLETE,
      stage: 3,
      displayText: 'complete',
      icon: '✓',
    };
  }

  // If no kill data, status is unknown
  if (currentKills == null || currentKills === 0) {
    return {
      status: BestiaryStatus.UNKNOWN,
      stage: null,
      displayText: 'unknown',
      icon: '?',
    };
  }

  // Calculate stage from kills
  const stage = calculateStageFromKills(currentKills, totalKills);

  // If stage is 0, still unknown
  if (stage === 0) {
    return {
      status: BestiaryStatus.UNKNOWN,
      stage: null,
      displayText: 'unknown',
      icon: '?',
    };
  }

  // In progress
  return {
    status: BestiaryStatus.IN_PROGRESS,
    stage,
    displayText: `${stage}/3`,
    icon: null,
  };
};

/**
 * Get badge color based on status
 * @param {BestiaryStatus} status - The bestiary status
 * @returns {string} - Color hex code
 */
export const getStatusColor = (status) => {
  switch (status) {
    case BestiaryStatus.COMPLETE:
      return '#10b981'; // Green
    case BestiaryStatus.IN_PROGRESS:
      return '#f59e0b'; // Orange
    case BestiaryStatus.UNKNOWN:
      return '#6b7280'; // Gray
    default:
      return '#6b7280';
  }
};

/**
 * Get i18n key for status
 * @param {BestiaryStatus} status - The bestiary status
 * @returns {string} - i18n key
 */
export const getStatusI18nKey = (status) => {
  switch (status) {
    case BestiaryStatus.COMPLETE:
      return 'bestiaryPlanner.status.complete';
    case BestiaryStatus.IN_PROGRESS:
      return 'bestiaryPlanner.status.inProgress';
    case BestiaryStatus.UNKNOWN:
      return 'bestiaryPlanner.status.unknown';
    default:
      return 'bestiaryPlanner.status.unknown';
  }
};

export default {
  BestiaryStatus,
  calculateDisplayStatus,
  getStatusColor,
  getStatusI18nKey,
};
