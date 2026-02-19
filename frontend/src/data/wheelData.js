/**
 * Wheel of Destiny Data Structure
 *
 * Based on Tibia's Wheel of Destiny system:
 * - 4 domains: Combat, Healing, Support, Fortune
 * - Each domain has 9 slices (36 total)
 * - 3 types of perks: Dedication, Conviction, Revelation
 * - Points system: 1 point per level after lvl 50, plus extras from quests/scrolls
 */

export const WHEEL_DOMAINS = {
  COMBAT: 'combat',
  HEALING: 'healing',
  SUPPORT: 'support',
  FORTUNE: 'fortune',
};

export const PERK_TYPES = {
  DEDICATION: 'dedication',
  CONVICTION: 'conviction',
  REVELATION: 'revelation',
};

export const VOCATIONS = {
  KNIGHT: 'knight',
  PALADIN: 'paladin',
  SORCERER: 'sorcerer',
  DRUID: 'druid',
  MONK: 'monk',
};

/**
 * Domain configuration
 * Each domain has a color, icon, and description
 */
export const DOMAIN_CONFIG = {
  [WHEEL_DOMAINS.COMBAT]: {
    name: 'Combat',
    color: '#e74c3c', // Red
    icon: '⚔️',
    description: 'Increase your offensive capabilities',
  },
  [WHEEL_DOMAINS.HEALING]: {
    name: 'Healing',
    color: '#2ecc71', // Green
    icon: '💚',
    description: 'Enhance your healing and recovery',
  },
  [WHEEL_DOMAINS.SUPPORT]: {
    name: 'Support',
    color: '#3498db', // Blue
    icon: '🛡️',
    description: 'Improve your defensive and utility skills',
  },
  [WHEEL_DOMAINS.FORTUNE]: {
    name: 'Fortune',
    color: '#f39c12', // Orange
    icon: '🍀',
    description: 'Boost your luck and resource generation',
  },
};

/**
 * Perks database
 * Each perk has: id, name, type, cost, effects, vocation requirements
 */
export const PERKS_DATABASE = {
  // DEDICATION PERKS (small gradual increases)
  dedication_hp_1: {
    id: 'dedication_hp_1',
    name: 'Battle Fortitude',
    type: PERK_TYPES.DEDICATION,
    domain: WHEEL_DOMAINS.COMBAT,
    cost: 1,
    description: '+50 HP',
    effects: { hp: 50 },
    vocations: [VOCATIONS.KNIGHT, VOCATIONS.PALADIN, VOCATIONS.SORCERER, VOCATIONS.DRUID],
  },
  dedication_hp_2: {
    id: 'dedication_hp_2',
    name: 'Battle Mastery',
    type: PERK_TYPES.DEDICATION,
    domain: WHEEL_DOMAINS.COMBAT,
    cost: 2,
    description: '+100 HP',
    effects: { hp: 100 },
    vocations: [VOCATIONS.KNIGHT, VOCATIONS.PALADIN, VOCATIONS.SORCERER, VOCATIONS.DRUID],
  },
  dedication_mana_1: {
    id: 'dedication_mana_1',
    name: 'Arcane Focus',
    type: PERK_TYPES.DEDICATION,
    domain: WHEEL_DOMAINS.HEALING,
    cost: 1,
    description: '+50 Mana',
    effects: { mana: 50 },
    vocations: [VOCATIONS.SORCERER, VOCATIONS.DRUID, VOCATIONS.PALADIN],
  },
  dedication_mana_2: {
    id: 'dedication_mana_2',
    name: 'Arcane Mastery',
    type: PERK_TYPES.DEDICATION,
    domain: WHEEL_DOMAINS.HEALING,
    cost: 2,
    description: '+100 Mana',
    effects: { mana: 100 },
    vocations: [VOCATIONS.SORCERER, VOCATIONS.DRUID, VOCATIONS.PALADIN],
  },

  // CONVICTION PERKS (medium to large effects)
  conviction_fire_res: {
    id: 'conviction_fire_res',
    name: 'Fire Resistance',
    type: PERK_TYPES.CONVICTION,
    domain: WHEEL_DOMAINS.SUPPORT,
    cost: 3,
    description: '+3% Fire Resistance',
    effects: { resistances: { fire: 3 } },
    vocations: [VOCATIONS.KNIGHT, VOCATIONS.PALADIN, VOCATIONS.SORCERER, VOCATIONS.DRUID],
  },
  conviction_ice_res: {
    id: 'conviction_ice_res',
    name: 'Ice Resistance',
    type: PERK_TYPES.CONVICTION,
    domain: WHEEL_DOMAINS.SUPPORT,
    cost: 3,
    description: '+3% Ice Resistance',
    effects: { resistances: { ice: 3 } },
    vocations: [VOCATIONS.KNIGHT, VOCATIONS.PALADIN, VOCATIONS.SORCERER, VOCATIONS.DRUID],
  },
  conviction_energy_res: {
    id: 'conviction_energy_res',
    name: 'Energy Resistance',
    type: PERK_TYPES.CONVICTION,
    domain: WHEEL_DOMAINS.SUPPORT,
    cost: 3,
    description: '+3% Energy Resistance',
    effects: { resistances: { energy: 3 } },
    vocations: [VOCATIONS.KNIGHT, VOCATIONS.PALADIN, VOCATIONS.SORCERER, VOCATIONS.DRUID],
  },
  conviction_earth_res: {
    id: 'conviction_earth_res',
    name: 'Earth Resistance',
    type: PERK_TYPES.CONVICTION,
    domain: WHEEL_DOMAINS.SUPPORT,
    cost: 3,
    description: '+3% Earth Resistance',
    effects: { resistances: { earth: 3 } },
    vocations: [VOCATIONS.KNIGHT, VOCATIONS.PALADIN, VOCATIONS.SORCERER, VOCATIONS.DRUID],
  },
  conviction_holy_res: {
    id: 'conviction_holy_res',
    name: 'Holy Resistance',
    type: PERK_TYPES.CONVICTION,
    domain: WHEEL_DOMAINS.SUPPORT,
    cost: 3,
    description: '+3% Holy Resistance',
    effects: { resistances: { holy: 3 } },
    vocations: [VOCATIONS.KNIGHT, VOCATIONS.PALADIN, VOCATIONS.SORCERER, VOCATIONS.DRUID],
  },
  conviction_death_res: {
    id: 'conviction_death_res',
    name: 'Death Resistance',
    type: PERK_TYPES.CONVICTION,
    domain: WHEEL_DOMAINS.SUPPORT,
    cost: 3,
    description: '+3% Death Resistance',
    effects: { resistances: { death: 3 } },
    vocations: [VOCATIONS.KNIGHT, VOCATIONS.PALADIN, VOCATIONS.SORCERER, VOCATIONS.DRUID],
  },
  conviction_physical_res: {
    id: 'conviction_physical_res',
    name: 'Physical Resistance',
    type: PERK_TYPES.CONVICTION,
    domain: WHEEL_DOMAINS.COMBAT,
    cost: 3,
    description: '+2% Physical Resistance',
    effects: { resistances: { physical: 2 } },
    vocations: [VOCATIONS.KNIGHT, VOCATIONS.PALADIN],
  },
  conviction_damage: {
    id: 'conviction_damage',
    name: 'Battle Instinct',
    type: PERK_TYPES.CONVICTION,
    domain: WHEEL_DOMAINS.COMBAT,
    cost: 4,
    description: '+5% Damage',
    effects: { damage: { percent: 5 } },
    vocations: [VOCATIONS.KNIGHT, VOCATIONS.PALADIN, VOCATIONS.SORCERER, VOCATIONS.DRUID],
  },
  conviction_healing: {
    id: 'conviction_healing',
    name: 'Divine Empowerment',
    type: PERK_TYPES.CONVICTION,
    domain: WHEEL_DOMAINS.HEALING,
    cost: 4,
    description: '+5% Healing',
    effects: { healing: { percent: 5 } },
    vocations: [VOCATIONS.DRUID, VOCATIONS.SORCERER],
  },

  // REVELATION PERKS (powerful, new abilities)
  revelation_avatar_combat: {
    id: 'revelation_avatar_combat',
    name: 'Avatar of Steel',
    type: PERK_TYPES.REVELATION,
    domain: WHEEL_DOMAINS.COMBAT,
    cost: 8,
    description: 'Unlock powerful combat spell. +200 HP, +5% Physical Resistance',
    effects: {
      hp: 200,
      resistances: { physical: 5 },
      spell: 'Avatar of Steel',
    },
    vocations: [VOCATIONS.KNIGHT],
  },
  revelation_avatar_healing: {
    id: 'revelation_avatar_healing',
    name: 'Avatar of Nature',
    type: PERK_TYPES.REVELATION,
    domain: WHEEL_DOMAINS.HEALING,
    cost: 8,
    description: 'Unlock powerful healing spell. +150 Mana, +10% Healing',
    effects: {
      mana: 150,
      healing: { percent: 10 },
      spell: 'Avatar of Nature',
    },
    vocations: [VOCATIONS.DRUID],
  },
  revelation_avatar_support: {
    id: 'revelation_avatar_support',
    name: 'Avatar of Light',
    type: PERK_TYPES.REVELATION,
    domain: WHEEL_DOMAINS.SUPPORT,
    cost: 8,
    description: 'Unlock powerful support spell. +100 HP, +100 Mana, +3% All Resistances',
    effects: {
      hp: 100,
      mana: 100,
      resistances: { fire: 3, ice: 3, energy: 3, earth: 3, holy: 3, death: 3, physical: 2 },
      spell: 'Avatar of Light',
    },
    vocations: [VOCATIONS.SORCERER, VOCATIONS.DRUID],
  },
  revelation_avatar_fortune: {
    id: 'revelation_avatar_fortune',
    name: 'Avatar of Fortune',
    type: PERK_TYPES.REVELATION,
    domain: WHEEL_DOMAINS.FORTUNE,
    cost: 8,
    description: 'Unlock powerful fortune spell. Increased loot and critical chance',
    effects: {
      loot: { percent: 10 },
      critical: { percent: 5 },
      spell: 'Avatar of Fortune',
    },
    vocations: [VOCATIONS.PALADIN],
  },
};

/**
 * Get perks available for a specific vocation
 */
export const getPerksByVocation = (vocation) => {
  return Object.values(PERKS_DATABASE).filter((perk) =>
    perk.vocations.includes(vocation)
  );
};

/**
 * Get perks by domain
 */
export const getPerksByDomain = (domain, vocation = null) => {
  let perks = Object.values(PERKS_DATABASE).filter((perk) => perk.domain === domain);

  if (vocation) {
    perks = perks.filter((perk) => perk.vocations.includes(vocation));
  }

  return perks;
};

/**
 * Calculate total stats from selected perks
 */
export const calculateStats = (selectedPerks) => {
  const stats = {
    hp: 0,
    mana: 0,
    resistances: {
      physical: 0,
      fire: 0,
      ice: 0,
      energy: 0,
      earth: 0,
      holy: 0,
      death: 0,
    },
    damage: { percent: 0 },
    healing: { percent: 0 },
    loot: { percent: 0 },
    critical: { percent: 0 },
    spells: [],
  };

  selectedPerks.forEach((perkId) => {
    const perk = PERKS_DATABASE[perkId];
    if (!perk) return;

    const { effects } = perk;

    // HP
    if (effects.hp) {
      stats.hp += effects.hp;
    }

    // Mana
    if (effects.mana) {
      stats.mana += effects.mana;
    }

    // Resistances
    if (effects.resistances) {
      Object.keys(effects.resistances).forEach((element) => {
        stats.resistances[element] += effects.resistances[element];
      });
    }

    // Damage
    if (effects.damage) {
      stats.damage.percent += effects.damage.percent;
    }

    // Healing
    if (effects.healing) {
      stats.healing.percent += effects.healing.percent;
    }

    // Loot
    if (effects.loot) {
      stats.loot.percent += effects.loot.percent;
    }

    // Critical
    if (effects.critical) {
      stats.critical.percent += effects.critical.percent;
    }

    // Spells
    if (effects.spell) {
      stats.spells.push(effects.spell);
    }
  });

  return stats;
};

/**
 * Calculate total points cost from selected perks
 */
export const calculatePointsCost = (selectedPerks) => {
  return selectedPerks.reduce((total, perkId) => {
    const perk = PERKS_DATABASE[perkId];
    return total + (perk ? perk.cost : 0);
  }, 0);
};

/**
 * Validate if a build is valid (has enough points, valid perks, etc)
 */
export const validateBuild = (build, maxPoints = 1000) => {
  const errors = [];

  // Check if build has required fields
  if (!build.name || build.name.trim().length === 0) {
    errors.push('Build name is required');
  }

  if (!build.vocation || !Object.values(VOCATIONS).includes(build.vocation)) {
    errors.push('Invalid vocation');
  }

  // Skip deep perk validation — node IDs now come from wheelNodes.js
  // and are validated in the UI layer before being added to the build.

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Get default build structure
 */
export const getDefaultBuild = (vocation = VOCATIONS.KNIGHT, name = 'New Build') => {
  return {
    id: null, // Will be set on save
    name,
    vocation,
    createdAt: new Date().toISOString(),
    points: {
      total: 0,        // Available points
      used: 0,         // Points spent
      promotion: 0,    // Promotion points
    },
    // slicePoints: { [sliceId]: pointsAllocated }
    slicePoints: {},
    stats: {
      hp: 0, mana: 0, capacity: 0,
      hpRegen: 0, manaRegen: 0, mitigation: 0,
    },
  };
};
