/**
 * Session Planner Storage Service
 * Manages hunt session plans in localStorage
 *
 * Storage structure:
 * {
 *   [characterId]: {
 *     creatureIds: ['dragon', 'demon', ...],
 *     customHours: { 'dragon': 2.5, 'demon': 1.5 }, // Optional custom hours per creature
 *     createdAt: 'ISO-date',
 *     updatedAt: 'ISO-date'
 *   }
 * }
 */

const STORAGE_KEY = 'luci_session_plans';

/**
 * Load all session plans from localStorage
 * @returns {Object} - Session plans by character ID
 */
const loadSessionPlans = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error loading session plans:', error);
    return {};
  }
};

/**
 * Save session plans to localStorage
 * @param {Object} plans - Session plans by character ID
 */
const saveSessionPlans = (plans) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
  } catch (error) {
    console.error('Error saving session plans:', error);
  }
};

/**
 * Get session plan for a character
 * @param {string} characterId - Character ID
 * @returns {string[]} - Array of creature IDs in the plan
 */
export const getSessionPlan = (characterId) => {
  if (!characterId) return [];

  const plans = loadSessionPlans();
  const plan = plans[characterId];

  return plan?.creatureIds || [];
};

/**
 * Add a creature to the session plan
 * @param {string} characterId - Character ID
 * @param {string} creatureId - Creature ID to add
 */
export const addToSessionPlan = (characterId, creatureId) => {
  if (!characterId || !creatureId) return;

  const plans = loadSessionPlans();
  const currentPlan = plans[characterId] || { creatureIds: [] };

  // Avoid duplicates
  if (!currentPlan.creatureIds.includes(creatureId)) {
    currentPlan.creatureIds.push(creatureId);
    currentPlan.updatedAt = new Date().toISOString();

    if (!currentPlan.createdAt) {
      currentPlan.createdAt = new Date().toISOString();
    }

    plans[characterId] = currentPlan;
    saveSessionPlans(plans);
  }
};

/**
 * Remove a creature from the session plan
 * @param {string} characterId - Character ID
 * @param {string} creatureId - Creature ID to remove
 */
export const removeFromSessionPlan = (characterId, creatureId) => {
  if (!characterId || !creatureId) return;

  const plans = loadSessionPlans();
  const currentPlan = plans[characterId];

  if (currentPlan) {
    currentPlan.creatureIds = currentPlan.creatureIds.filter((id) => id !== creatureId);
    currentPlan.updatedAt = new Date().toISOString();

    plans[characterId] = currentPlan;
    saveSessionPlans(plans);
  }
};

/**
 * Toggle a creature in the session plan
 * @param {string} characterId - Character ID
 * @param {string} creatureId - Creature ID to toggle
 * @returns {boolean} - True if added, false if removed
 */
export const toggleCreatureInPlan = (characterId, creatureId) => {
  const plan = getSessionPlan(characterId);
  const isInPlan = plan.includes(creatureId);

  if (isInPlan) {
    removeFromSessionPlan(characterId, creatureId);
    return false;
  } else {
    addToSessionPlan(characterId, creatureId);
    return true;
  }
};

/**
 * Clear the entire session plan for a character
 * @param {string} characterId - Character ID
 */
export const clearSessionPlan = (characterId) => {
  if (!characterId) return;

  const plans = loadSessionPlans();
  delete plans[characterId];
  saveSessionPlans(plans);
};

/**
 * Check if a creature is in the session plan
 * @param {string} characterId - Character ID
 * @param {string} creatureId - Creature ID
 * @returns {boolean} - True if in plan
 */
export const isInSessionPlan = (characterId, creatureId) => {
  const plan = getSessionPlan(characterId);
  return plan.includes(creatureId);
};

/**
 * Get session plan with full creature data
 * @param {string} characterId - Character ID
 * @param {Array} allCreatures - All creatures from BESTIARY_DATA
 * @returns {Array} - Creatures with full data (with custom hours if set)
 */
export const getSessionPlanWithData = (characterId, allCreatures) => {
  const creatureIds = getSessionPlan(characterId);
  const plans = loadSessionPlans();
  const customHours = plans[characterId]?.customHours || {};

  return creatureIds
    .map((id) => {
      const creature = allCreatures.find((c) => c.id === id);
      if (!creature) return null;

      // Override estimatedHours with custom value if exists
      return {
        ...creature,
        estimatedHours: customHours[id] !== undefined ? customHours[id] : creature.estimatedHours,
      };
    })
    .filter(Boolean); // Remove undefined if creature not found
};

/**
 * Get session plan statistics
 * @param {string} characterId - Character ID
 * @param {Array} allCreatures - All creatures from BESTIARY_DATA
 * @returns {{totalCreatures: number, totalCharmPoints: number, totalHours: number}}
 */
export const getSessionPlanStats = (characterId, allCreatures) => {
  const creatures = getSessionPlanWithData(characterId, allCreatures);

  return {
    totalCreatures: creatures.length,
    totalCharmPoints: creatures.reduce((sum, c) => sum + (c.charmPoints || 0), 0),
    totalHours: creatures.reduce((sum, c) => sum + (c.estimatedHours || 0), 0),
  };
};

/**
 * Update custom hours for a creature in the session plan
 * @param {string} characterId - Character ID
 * @param {string} creatureId - Creature ID
 * @param {number} hours - Custom hours (can be decimal like 1.5)
 */
export const updateCreatureHours = (characterId, creatureId, hours) => {
  if (!characterId || !creatureId) return;

  const plans = loadSessionPlans();
  const currentPlan = plans[characterId];

  if (!currentPlan) return; // No plan exists

  // Initialize customHours object if not exists
  if (!currentPlan.customHours) {
    currentPlan.customHours = {};
  }

  // Set custom hours
  currentPlan.customHours[creatureId] = Number(hours);
  currentPlan.updatedAt = new Date().toISOString();

  plans[characterId] = currentPlan;
  saveSessionPlans(plans);
};
