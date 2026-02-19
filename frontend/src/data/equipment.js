/**
 * Tibia Equipment Database
 * Curated list of popular equipment items organized by slot
 */

/**
 * Equipment slot definitions
 */
export const EQUIPMENT_SLOTS = {
  head: { id: 'head', label: 'Head', icon: '🧢' },
  body: { id: 'body', label: 'Body', icon: '👕' },
  legs: { id: 'legs', label: 'Legs', icon: '👖' },
  feet: { id: 'feet', label: 'Feet', icon: '👟' },
  weapon: { id: 'weapon', label: 'Weapon', icon: '⚔' },
  offhand: { id: 'offhand', label: 'Off-hand', icon: '🛡' },
  ring: { id: 'ring', label: 'Ring', icon: '◯' },
  amulet: { id: 'amulet', label: 'Amulet', icon: '◇' },
};

export const SLOT_ORDER = ['head', 'body', 'legs', 'feet', 'weapon', 'offhand', 'ring', 'amulet'];

/**
 * Stats that equipment can provide
 */
export const STAT_KEYS = [
  'armor', 'attack', 'defense', 'speed',
  'hp', 'mana', 'mlevel', 'distance',
  'sword', 'axe', 'club', 'shielding',
  'fire_res', 'ice_res', 'earth_res', 'energy_res',
  'holy_res', 'death_res', 'physical_res',
];

export const STAT_LABELS = {
  armor: 'Armor', attack: 'Attack', defense: 'Defense', speed: 'Speed',
  hp: 'HP Bonus', mana: 'Mana Bonus', mlevel: 'Magic Level', distance: 'Distance',
  sword: 'Sword', axe: 'Axe', club: 'Club', shielding: 'Shielding',
  fire_res: 'Fire Res.', ice_res: 'Ice Res.', earth_res: 'Earth Res.',
  energy_res: 'Energy Res.', holy_res: 'Holy Res.', death_res: 'Death Res.',
  physical_res: 'Physical Res.',
};

/**
 * Vocation filters
 */
export const VOCATIONS = ['all', 'knight', 'paladin', 'sorcerer', 'druid'];

/**
 * Equipment items database
 * Fields: id, name, slot, stats, vocations ([] = all vocations)
 */
export const EQUIPMENT_ITEMS = [
  // ============================================================
  // HEAD
  // ============================================================
  {
    id: 'helmet_of_the_deep',
    name: 'Helmet of the Deep',
    slot: 'head',
    stats: { armor: 9 },
    vocations: [],
  },
  {
    id: 'crystalline_helmet',
    name: 'Crystalline Helmet',
    slot: 'head',
    stats: { armor: 10 },
    vocations: ['knight'],
  },
  {
    id: 'gnome_helmet',
    name: 'Gnome Helmet',
    slot: 'head',
    stats: { armor: 11, mlevel: 1 },
    vocations: [],
  },
  {
    id: 'crown_of_the_saint',
    name: 'Crown of the Saint',
    slot: 'head',
    stats: { armor: 7, mlevel: 2 },
    vocations: ['sorcerer', 'druid'],
  },
  {
    id: 'prismatic_helmet',
    name: 'Prismatic Helmet',
    slot: 'head',
    stats: { armor: 12, hp: 50 },
    vocations: ['knight', 'paladin'],
  },
  {
    id: 'falcon_coif',
    name: 'Falcon Coif',
    slot: 'head',
    stats: { armor: 13, hp: 75, speed: 5 },
    vocations: ['knight'],
  },
  {
    id: 'falcon_circlet',
    name: 'Falcon Circlet',
    slot: 'head',
    stats: { armor: 8, mlevel: 3, mana: 150 },
    vocations: ['sorcerer', 'druid'],
  },
  {
    id: 'falcon_rangers_headguard',
    name: "Falcon Ranger's Headguard",
    slot: 'head',
    stats: { armor: 10, distance: 2, hp: 50 },
    vocations: ['paladin'],
  },
  {
    id: 'sea_serpent_helmet',
    name: 'Sea Serpent Helmet',
    slot: 'head',
    stats: { armor: 9, energy_res: 5 },
    vocations: [],
  },
  {
    id: 'ornate_chivalric_helmet',
    name: 'Ornate Chivalric Helmet',
    slot: 'head',
    stats: { armor: 11, sword: 1, axe: 1, club: 1 },
    vocations: ['knight'],
  },

  // ============================================================
  // BODY
  // ============================================================
  {
    id: 'dragon_scale_mail',
    name: 'Dragon Scale Mail',
    slot: 'body',
    stats: { armor: 16 },
    vocations: [],
  },
  {
    id: 'gnome_armor',
    name: 'Gnome Armor',
    slot: 'body',
    stats: { armor: 17, hp: 100 },
    vocations: ['knight', 'paladin'],
  },
  {
    id: 'prismatic_armor',
    name: 'Prismatic Armor',
    slot: 'body',
    stats: { armor: 18, hp: 150 },
    vocations: ['knight'],
  },
  {
    id: 'falcon_plate',
    name: 'Falcon Plate',
    slot: 'body',
    stats: { armor: 20, hp: 200, speed: 5 },
    vocations: ['knight'],
  },
  {
    id: 'falcon_cuirass',
    name: 'Falcon Cuirass',
    slot: 'body',
    stats: { armor: 14, mlevel: 4, mana: 250 },
    vocations: ['sorcerer', 'druid'],
  },
  {
    id: 'falcon_rangers_armor',
    name: "Falcon Ranger's Armor",
    slot: 'body',
    stats: { armor: 16, distance: 3, hp: 100 },
    vocations: ['paladin'],
  },
  {
    id: 'bear_skin',
    name: 'Bear Skin',
    slot: 'body',
    stats: { armor: 13, physical_res: 3 },
    vocations: [],
  },
  {
    id: 'robe_of_the_ice_queen',
    name: 'Robe of the Ice Queen',
    slot: 'body',
    stats: { armor: 12, mlevel: 3, ice_res: 8 },
    vocations: ['sorcerer', 'druid'],
  },
  {
    id: 'ornate_chivalric_breastplate',
    name: 'Ornate Chivalric Breastplate',
    slot: 'body',
    stats: { armor: 19, hp: 100, sword: 1 },
    vocations: ['knight'],
  },

  // ============================================================
  // LEGS
  // ============================================================
  {
    id: 'dragon_scale_legs',
    name: 'Dragon Scale Legs',
    slot: 'legs',
    stats: { armor: 10 },
    vocations: [],
  },
  {
    id: 'gnome_legs',
    name: 'Gnome Legs',
    slot: 'legs',
    stats: { armor: 12, hp: 75 },
    vocations: ['knight', 'paladin'],
  },
  {
    id: 'prismatic_legs',
    name: 'Prismatic Legs',
    slot: 'legs',
    stats: { armor: 13, hp: 100 },
    vocations: ['knight'],
  },
  {
    id: 'falcon_greaves',
    name: 'Falcon Greaves',
    slot: 'legs',
    stats: { armor: 15, hp: 150, speed: 5 },
    vocations: ['knight'],
  },
  {
    id: 'falcon_skirt',
    name: 'Falcon Skirt',
    slot: 'legs',
    stats: { armor: 10, mlevel: 3, mana: 200 },
    vocations: ['sorcerer', 'druid'],
  },
  {
    id: 'falcon_rangers_legguards',
    name: "Falcon Ranger's Legguards",
    slot: 'legs',
    stats: { armor: 11, distance: 2, hp: 75 },
    vocations: ['paladin'],
  },
  {
    id: 'ornate_chivalric_legs',
    name: 'Ornate Chivalric Legs',
    slot: 'legs',
    stats: { armor: 13, sword: 1, axe: 1, club: 1 },
    vocations: ['knight'],
  },

  // ============================================================
  // FEET
  // ============================================================
  {
    id: 'boots_of_haste',
    name: 'Boots of Haste',
    slot: 'feet',
    stats: { armor: 1, speed: 20 },
    vocations: [],
  },
  {
    id: 'soft_boots',
    name: 'Soft Boots',
    slot: 'feet',
    stats: { armor: 1, speed: 20 },
    vocations: [],
  },
  {
    id: 'gnome_boots',
    name: 'Gnome Boots',
    slot: 'feet',
    stats: { armor: 5, speed: 10, hp: 50 },
    vocations: [],
  },
  {
    id: 'prismatic_boots',
    name: 'Prismatic Boots',
    slot: 'feet',
    stats: { armor: 6, speed: 10, hp: 75 },
    vocations: ['knight', 'paladin'],
  },
  {
    id: 'falcon_boots',
    name: 'Falcon Boots',
    slot: 'feet',
    stats: { armor: 7, speed: 15, hp: 100 },
    vocations: ['knight'],
  },
  {
    id: 'dream_shroud',
    name: 'Dream Shroud',
    slot: 'feet',
    stats: { armor: 3, speed: 20, mlevel: 2 },
    vocations: ['sorcerer', 'druid'],
  },

  // ============================================================
  // WEAPON
  // ============================================================
  // Knight weapons
  {
    id: 'gnome_sword',
    name: 'Gnome Sword',
    slot: 'weapon',
    stats: { attack: 52, defense: 32 },
    vocations: ['knight'],
  },
  {
    id: 'dreaded_cleaver',
    name: 'Dreaded Cleaver',
    slot: 'weapon',
    stats: { attack: 54, defense: 28 },
    vocations: ['knight'],
  },
  {
    id: 'falcon_longsword',
    name: 'Falcon Longsword',
    slot: 'weapon',
    stats: { attack: 56, defense: 35, sword: 2 },
    vocations: ['knight'],
  },
  {
    id: 'falcon_battleaxe',
    name: 'Falcon Battleaxe',
    slot: 'weapon',
    stats: { attack: 58, defense: 30, axe: 2 },
    vocations: ['knight'],
  },
  {
    id: 'falcon_mace',
    name: 'Falcon Mace',
    slot: 'weapon',
    stats: { attack: 57, defense: 33, club: 2 },
    vocations: ['knight'],
  },
  // Paladin weapons
  {
    id: 'gnome_bow',
    name: 'Gnome Bow',
    slot: 'weapon',
    stats: { attack: 50, distance: 3 },
    vocations: ['paladin'],
  },
  {
    id: 'rift_crossbow',
    name: 'Rift Crossbow',
    slot: 'weapon',
    stats: { attack: 52, distance: 2 },
    vocations: ['paladin'],
  },
  {
    id: 'falcon_bow',
    name: 'Falcon Bow',
    slot: 'weapon',
    stats: { attack: 55, distance: 4, hp: 75 },
    vocations: ['paladin'],
  },
  // Sorcerer weapons
  {
    id: 'gnome_wand',
    name: 'Gnome Wand',
    slot: 'weapon',
    stats: { attack: 30, mlevel: 3 },
    vocations: ['sorcerer'],
  },
  {
    id: 'wand_of_darkness',
    name: 'Wand of Darkness',
    slot: 'weapon',
    stats: { attack: 33, mlevel: 2, death_res: 3 },
    vocations: ['sorcerer'],
  },
  {
    id: 'falcon_wand',
    name: 'Falcon Wand',
    slot: 'weapon',
    stats: { attack: 36, mlevel: 4, mana: 100 },
    vocations: ['sorcerer'],
  },
  // Druid weapons
  {
    id: 'gnome_rod',
    name: 'Gnome Rod',
    slot: 'weapon',
    stats: { attack: 30, mlevel: 3 },
    vocations: ['druid'],
  },
  {
    id: 'springsprout_rod',
    name: 'Springsprout Rod',
    slot: 'weapon',
    stats: { attack: 33, mlevel: 2, earth_res: 3 },
    vocations: ['druid'],
  },
  {
    id: 'falcon_rod',
    name: 'Falcon Rod',
    slot: 'weapon',
    stats: { attack: 36, mlevel: 4, mana: 100 },
    vocations: ['druid'],
  },

  // ============================================================
  // OFF-HAND (Shield / Spellbook / Quiver)
  // ============================================================
  {
    id: 'gnome_shield',
    name: 'Gnome Shield',
    slot: 'offhand',
    stats: { defense: 40, shielding: 2 },
    vocations: ['knight'],
  },
  {
    id: 'dragon_scale_shield',
    name: 'Dragon Scale Shield',
    slot: 'offhand',
    stats: { defense: 36 },
    vocations: ['knight'],
  },
  {
    id: 'falcon_shield',
    name: 'Falcon Shield',
    slot: 'offhand',
    stats: { defense: 42, shielding: 3, hp: 75 },
    vocations: ['knight'],
  },
  {
    id: 'spellbook_of_warding',
    name: 'Spellbook of Warding',
    slot: 'offhand',
    stats: { defense: 22, mlevel: 4 },
    vocations: ['sorcerer', 'druid'],
  },
  {
    id: 'spellbook_of_mind_control',
    name: 'Spellbook of Mind Control',
    slot: 'offhand',
    stats: { defense: 24, mlevel: 5 },
    vocations: ['sorcerer', 'druid'],
  },
  {
    id: 'falcon_spellbook',
    name: 'Falcon Spellbook',
    slot: 'offhand',
    stats: { defense: 26, mlevel: 6, mana: 150 },
    vocations: ['sorcerer', 'druid'],
  },
  {
    id: 'blessed_quiver',
    name: 'Blessed Quiver',
    slot: 'offhand',
    stats: { distance: 4 },
    vocations: ['paladin'],
  },
  {
    id: 'gnome_quiver',
    name: 'Gnome Quiver',
    slot: 'offhand',
    stats: { distance: 5, hp: 50 },
    vocations: ['paladin'],
  },

  // ============================================================
  // RING
  // ============================================================
  {
    id: 'ring_of_healing',
    name: 'Ring of Healing',
    slot: 'ring',
    stats: {},
    vocations: [],
  },
  {
    id: 'axe_ring',
    name: 'Axe Ring',
    slot: 'ring',
    stats: { axe: 3 },
    vocations: ['knight'],
  },
  {
    id: 'sword_ring',
    name: 'Sword Ring',
    slot: 'ring',
    stats: { sword: 3 },
    vocations: ['knight'],
  },
  {
    id: 'club_ring',
    name: 'Club Ring',
    slot: 'ring',
    stats: { club: 3 },
    vocations: ['knight'],
  },
  {
    id: 'dwarven_ring',
    name: 'Dwarven Ring',
    slot: 'ring',
    stats: { shielding: 3 },
    vocations: ['knight'],
  },
  {
    id: 'stealth_ring',
    name: 'Stealth Ring',
    slot: 'ring',
    stats: {},
    vocations: [],
  },
  {
    id: 'might_ring',
    name: 'Might Ring',
    slot: 'ring',
    stats: { physical_res: 3 },
    vocations: [],
  },
  {
    id: 'precision_ring',
    name: 'Precision Ring',
    slot: 'ring',
    stats: { distance: 2 },
    vocations: ['paladin'],
  },
  {
    id: 'ring_of_the_sky',
    name: 'Ring of the Sky',
    slot: 'ring',
    stats: { mlevel: 1, mana: 100 },
    vocations: ['sorcerer', 'druid'],
  },
  {
    id: 'gnome_ring',
    name: 'Gnome Ring',
    slot: 'ring',
    stats: { mlevel: 2, mana: 200 },
    vocations: ['sorcerer', 'druid'],
  },

  // ============================================================
  // AMULET
  // ============================================================
  {
    id: 'necklace_of_the_deep',
    name: 'Necklace of the Deep',
    slot: 'amulet',
    stats: { armor: 3 },
    vocations: [],
  },
  {
    id: 'stone_skin_amulet',
    name: 'Stone Skin Amulet',
    slot: 'amulet',
    stats: { physical_res: 5 },
    vocations: [],
  },
  {
    id: 'eagle_shield',
    name: 'Amulet of Loss',
    slot: 'amulet',
    stats: {},
    vocations: [],
  },
  {
    id: 'falcon_amulet',
    name: 'Falcon Amulet',
    slot: 'amulet',
    stats: { armor: 4, hp: 100, mana: 100 },
    vocations: [],
  },
  {
    id: 'gnome_amulet',
    name: 'Gnome Amulet',
    slot: 'amulet',
    stats: { mlevel: 2, mana: 150 },
    vocations: ['sorcerer', 'druid'],
  },
  {
    id: 'imbued_crystal_pendant',
    name: 'Imbued Crystal Pendant',
    slot: 'amulet',
    stats: { mlevel: 3, mana: 200 },
    vocations: ['sorcerer', 'druid'],
  },
  {
    id: 'platinum_amulet',
    name: 'Platinum Amulet',
    slot: 'amulet',
    stats: { hp: 150 },
    vocations: [],
  },

];

/**
 * Get items for a specific slot
 * @param {string} slot
 * @param {string} vocation - filter by vocation (optional, '' or 'all' = no filter)
 */
export const getItemsBySlot = (slot, vocation = '') => {
  return EQUIPMENT_ITEMS.filter((item) => {
    if (item.slot !== slot) return false;
    if (!vocation || vocation === 'all') return true;
    return item.vocations.length === 0 || item.vocations.includes(vocation);
  });
};

/**
 * Get item by id
 * @param {string} id
 */
export const getItemById = (id) => {
  return EQUIPMENT_ITEMS.find((item) => item.id === id) || null;
};

/**
 * Calculate total stats for a set of equipped items
 * @param {Object} equipment - { slot: itemId }
 * @returns {Object} summed stats
 */
export const calculateSetStats = (equipment) => {
  const totals = {};

  STAT_KEYS.forEach((key) => {
    totals[key] = 0;
  });

  Object.entries(equipment).forEach(([slot, itemId]) => {
    if (!itemId) return;
    if (!EQUIPMENT_SLOTS[slot]) return; // ignore removed/unknown slots
    const item = getItemById(itemId);
    if (!item) return;

    STAT_KEYS.forEach((key) => {
      totals[key] = (totals[key] || 0) + (item.stats[key] || 0);
    });
  });

  return totals;
};
