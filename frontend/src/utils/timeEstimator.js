/**
 * Time Estimation Utilities for Bestiary
 * Based on TibiaRoute formula: ~15/sqrt(HP/100) kills/min
 *
 * This provides more accurate time estimates than generic calculations
 * by factoring in creature HP (harder creatures = slower kills)
 */

/**
 * Calculate kills per minute based on creature HP
 * @param {number} hitpoints - Creature HP
 * @returns {number} - Estimated kills per minute
 */
export const calculateKillsPerMinute = (hitpoints) => {
  if (!hitpoints || hitpoints <= 0) {
    // Fallback for creatures without HP data: assume medium difficulty (~10 kills/min)
    return 10;
  }

  // TibiaRoute formula: ~15/sqrt(HP/100)
  const killsPerMin = 15 / Math.sqrt(hitpoints / 100);

  // Clamp to reasonable range (min 2, max 50 kills/min)
  return Math.max(2, Math.min(50, killsPerMin));
};

/**
 * Calculate time to complete bestiary entry
 * @param {Object} creature - Creature object
 * @param {number} creature.hitpoints - Creature HP
 * @param {number} creature.killsToComplete - Total kills needed
 * @param {number} currentKills - Current kill count (default 0)
 * @returns {Object} - Time estimates
 */
export const estimateTimeToComplete = (creature, currentKills = 0) => {
  if (!creature || !creature.killsToComplete) {
    return {
      minutes: 0,
      hours: 0,
      formatted: '0m',
      killsPerMin: 0,
      killsRemaining: 0,
    };
  }

  const killsRemaining = Math.max(0, creature.killsToComplete - currentKills);

  if (killsRemaining === 0) {
    return {
      minutes: 0,
      hours: 0,
      formatted: 'Complete',
      killsPerMin: 0,
      killsRemaining: 0,
    };
  }

  const killsPerMin = calculateKillsPerMinute(creature.hitpoints);
  const minutesRemaining = killsRemaining / killsPerMin;
  const hoursRemaining = minutesRemaining / 60;

  return {
    minutes: Math.round(minutesRemaining),
    hours: parseFloat(hoursRemaining.toFixed(1)),
    formatted: formatDuration(minutesRemaining),
    killsPerMin: parseFloat(killsPerMin.toFixed(1)),
    killsRemaining,
  };
};

/**
 * Format duration in human-readable format
 * @param {number} minutes - Duration in minutes
 * @returns {string} - Formatted string (e.g., "2h 30m", "45m", "1.5h")
 */
export const formatDuration = (minutes) => {
  if (minutes < 1) return '< 1m';
  if (minutes < 60) return `${Math.round(minutes)}m`;

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.round(minutes % 60);

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  if (hours >= 10) {
    // For long durations, show decimal hours (e.g., "12.5h")
    return `${(minutes / 60).toFixed(1)}h`;
  }

  // For short durations, show hours + minutes (e.g., "2h 30m")
  return `${hours}h ${remainingMinutes}m`;
};

/**
 * Calculate total time for multiple creatures (e.g., session plan)
 * @param {Array} creatures - Array of creature objects
 * @param {Object} progressData - Map of creature IDs to current kills
 * @returns {Object} - Aggregated time estimates
 */
export const calculateTotalTime = (creatures, progressData = {}) => {
  let totalMinutes = 0;
  let totalKills = 0;

  creatures.forEach((creature) => {
    const currentKills = progressData[creature.id]?.kills || 0;
    const estimate = estimateTimeToComplete(creature, currentKills);
    totalMinutes += estimate.minutes;
    totalKills += estimate.killsRemaining;
  });

  return {
    minutes: Math.round(totalMinutes),
    hours: parseFloat((totalMinutes / 60).toFixed(1)),
    formatted: formatDuration(totalMinutes),
    totalKills,
    avgKillsPerMin: totalKills > 0 ? parseFloat((totalKills / totalMinutes).toFixed(1)) : 0,
  };
};

/**
 * Calculate efficiency score based on time estimates
 * Replaces generic estimatedHours with HP-based calculation
 * @param {number} charmPoints - CP reward
 * @param {number} estimatedHours - Estimated hours to complete
 * @param {Object} modifiers - Optional efficiency modifiers
 * @param {boolean} modifiers.rapidRespawn - +30% efficiency
 * @param {boolean} modifiers.preferredRegion - +20% efficiency
 * @param {boolean} modifiers.overleveled - +10% efficiency
 * @returns {number} - Efficiency score (higher = better)
 */
export const calculateEfficiencyScore = (charmPoints, estimatedHours, modifiers = {}) => {
  if (!estimatedHours || estimatedHours <= 0) return 0;

  let baseScore = charmPoints / estimatedHours;

  // Apply modifiers
  if (modifiers.rapidRespawn) baseScore *= 1.3;
  if (modifiers.preferredRegion) baseScore *= 1.2;
  if (modifiers.overleveled) baseScore *= 1.1;

  return parseFloat(baseScore.toFixed(2));
};

export default {
  calculateKillsPerMinute,
  estimateTimeToComplete,
  formatDuration,
  calculateTotalTime,
  calculateEfficiencyScore,
};
