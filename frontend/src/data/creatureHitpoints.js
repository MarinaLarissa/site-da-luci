/**
 * Creature Hitpoints Data
 * Source: TibiaWiki (https://tibia.fandom.com/wiki/)
 *
 * This file contains HP data for popular creatures to enable accurate time estimates.
 * HP values are used by timeEstimator.js to calculate kills/min using the formula:
 * killsPerMin = 15 / sqrt(HP / 100)
 *
 * TODO: Expand this list or integrate with TibiaWiki API for automatic updates
 */

export const CREATURE_HP_DATA = {
  // Dragons
  'dragon': 1000,
  'dragon-lord': 1900,
  'dragon-hatchling': 380,
  'frost-dragon': 1800,
  'wyrm': 1550,
  'elder-wyrm': 2500,

  // Demons
  'demon': 8200,
  'destroyer': 4000,
  'hellhound': 6800,
  'diabolic-imp': 3900,
  'juggernaut': 20000,

  // Vampires
  'vampire': 475,
  'vampire-bride': 1050,
  'vampire-viscount': 800,

  // Giants
  'giant-spider': 1300,
  'cyclops': 260,
  'behemoth': 4000,

  // Undead
  'lich': 880,
  'ancient-scarab': 720,
  'bonebeast': 515,
  'ghost': 150,
  'skeleton': 50,
  'necromancer': 580,

  // Dwarves & Orcs
  'dwarf-guard': 165,
  'dwarf-soldier': 135,
  'orc-warrior': 125,
  'orc-berserker': 210,
  'orc-leader': 450,
  'orc-rider': 180,

  // Lizards
  'lizard-sentinel': 265,
  'lizard-snakecharmer': 210,
  'lizard-templar': 410,
  'lizard-chosen': 2600,
  'lizard-dragon-priest': 1450,
  'lizard-high-guard': 1800,

  // Hydras & Serpents
  'hydra': 2350,
  'sea-serpent': 1700,
  'serpent-spawn': 3000,

  // Misc Popular
  'hero': 1400,
  'warlock': 3500,
  'crystal-spider': 1250,
  'worker-golem': 550,
  'war-golem': 4300,
  'stone-golem': 270,
  'minotaur': 100,
  'minotaur-guard': 185,
  'minotaur-archer': 100,
  'minotaur-mage': 155,

  // Weak creatures (for testing low HP formula)
  'rat': 20,
  'cave-rat': 30,
  'spider': 20,
  'bug': 29,
  'poison-spider': 26,
  'centipede': 70,

  // Bosses (optional - usually not in bestiary)
  'ferumbras': 35000,
  'orshabaal': 30000,
  'morgaroth': 55000,

  // Add more as needed...
};

/**
 * Get HP for a creature by ID
 * @param {string} creatureId - Creature ID (kebab-case)
 * @returns {number|null} - HP or null if not found
 */
export const getCreatureHP = (creatureId) => {
  return CREATURE_HP_DATA[creatureId] || null;
};

/**
 * Check if creature has HP data
 * @param {string} creatureId - Creature ID
 * @returns {boolean}
 */
export const hasHPData = (creatureId) => {
  return creatureId in CREATURE_HP_DATA;
};

export default CREATURE_HP_DATA;
