/**
 * List of creatures that are NOT part of the official Tibia Bestiary
 *
 * Source: https://tibia.fandom.com/wiki/List_of_Creatures_Excluded_from_Bestiary
 *
 * These creatures should be filtered out from the Bestiary Planner
 * to ensure accurate tracking and calculations.
 *
 * Categories excluded:
 * - Quest-only creatures
 * - Summons
 * - Event-exclusive creatures (some)
 * - Arena creatures (some)
 * - NPC-like creatures
 * - Low-value creatures (5 CP with 500 kills) - excluded by user request
 */

export const EXCLUDED_CREATURE_IDS = [
  // Low-value creatures: 5 Charm Points, 500 kills (190 total)
  'acid-blob', // 5 CP, 500 kills
  'albino-dragon', // 5 CP, 500 kills
  'alchemistical-container', // 5 CP, 500 kills
  'an-eye', // 5 CP, 500 kills
  'angry-plant-thing', // 5 CP, 500 kills
  'animated-snowman', // 5 CP, 500 kills
  'antenna', // 5 CP, 500 kills
  'arbaziloth', // 5 CP, 500 kills
  'arctic-faun', // 5 CP, 500 kills
  'askarak-demon', // 5 CP, 500 kills
  'askarak-lord', // 5 CP, 500 kills
  'askarak-prince', // 5 CP, 500 kills
  'atab', // 5 CP, 500 kills
  'bakragore', // 5 CP, 500 kills
  'baleful-bunny', // 5 CP, 500 kills
  'bane-bringer', // 5 CP, 500 kills
  'bane-of-light', // 5 CP, 500 kills
  'banshee', // 5 CP, 500 kills
  'barbarian-bloodwalker', // 5 CP, 500 kills
  'behemoth', // 5 CP, 500 kills
  'bellicose-orger', // 5 CP, 500 kills
  'berserker-chicken', // 5 CP, 500 kills
  'betrayed-wraith', // 5 CP, 500 kills
  'billdodger', // 5 CP, 500 kills
  'blight-spitter', // 5 CP, 500 kills
  'blightling', // 5 CP, 500 kills
  'blocking-stalagmite', // 5 CP, 500 kills
  'blood-guardian', // 5 CP, 500 kills
  'blood-hand', // 5 CP, 500 kills
  'blood-pool', // 5 CP, 500 kills
  'blood-priest', // 5 CP, 500 kills
  'blooming-tower-light-blue', // 5 CP, 500 kills
  'blooming-tower-red', // 5 CP, 500 kills
  'blooming-tower-violet', // 5 CP, 500 kills
  'blooming-tower-yellow', // 5 CP, 500 kills
  'blue-djinn', // 5 CP, 500 kills
  'bone-barrier', // 5 CP, 500 kills
  'bone-bear', // 5 CP, 500 kills
  'bone-overlord', // 5 CP, 500 kills
  'bonelord-totem', // 5 CP, 500 kills
  'bonelords-phylactery', // 5 CP, 500 kills
  'bound-ape', // 5 CP, 500 kills
  'bound-cave-spider', // 5 CP, 500 kills
  'bound-iks-aucar', // 5 CP, 500 kills
  'braindeath', // 5 CP, 500 kills
  'bride-of-night', // 5 CP, 500 kills
  'bright-crystal', // 5 CP, 500 kills
  'brimstone-bug', // 5 CP, 500 kills
  'broken-shaper', // 5 CP, 500 kills
  'carniphila', // 5 CP, 500 kills
  'carnivorous-butterfly', // 5 CP, 500 kills
  'cellar-rat', // 5 CP, 500 kills
  'charged-imp', // 5 CP, 500 kills
  'cheeky-sugar-cube', // 5 CP, 500 kills
  'clavius', // 5 CP, 500 kills
  'clay-guardian', // 5 CP, 500 kills
  'corym-skirmisher', // 5 CP, 500 kills
  'corym-vanguard', // 5 CP, 500 kills
  'court-warlock', // 5 CP, 500 kills
  'cow', // 5 CP, 500 kills
  'crustacea-gigantica', // 5 CP, 500 kills
  'crystal-spider', // 5 CP, 500 kills
  'crystal-wolf', // 5 CP, 500 kills
  'crystalcrusher', // 5 CP, 500 kills
  'cult-believer', // 5 CP, 500 kills
  'cult-enforcer', // 5 CP, 500 kills
  'cult-scholar', // 5 CP, 500 kills
  'cursed-ape', // 5 CP, 500 kills
  'cyclops-drone', // 5 CP, 500 kills
  'cyclops-smith', // 5 CP, 500 kills
  'dangerous-apparatus', // 5 CP, 500 kills
  'dark-faun', // 5 CP, 500 kills
  'dark-merudri', // 5 CP, 500 kills
  'death-priest', // 5 CP, 500 kills
  'decaying-totem', // 5 CP, 500 kills
  'deepling-brawler', // 5 CP, 500 kills
  'deepling-elite', // 5 CP, 500 kills
  'deepling-guard', // 5 CP, 500 kills
  'deepling-master-librarian', // 5 CP, 500 kills
  'deepling-scout', // 5 CP, 500 kills
  'deepling-spellsinger', // 5 CP, 500 kills
  'deepling-warrior', // 5 CP, 500 kills
  'demon-parrot', // 5 CP, 500 kills
  'demon-skeleton', // 5 CP, 500 kills
  'destroyer', // 5 CP, 500 kills
  'diabolic-imp', // 5 CP, 500 kills
  'diamond-servant', // 5 CP, 500 kills
  'digestive-ooze', // 5 CP, 500 kills
  'doom-deer', // 5 CP, 500 kills
  'draptor', // 5 CP, 500 kills
  'dryad', // 5 CP, 500 kills
  'duskbringer', // 5 CP, 500 kills
  'dwarf-geomancer', // 5 CP, 500 kills
  'dwarf-henchman', // 5 CP, 500 kills
  'earth-elemental', // 5 CP, 500 kills
  'elder-bonelord', // 5 CP, 500 kills
  'elder-forest-fury', // 5 CP, 500 kills
  'elder-mummy', // 5 CP, 500 kills
  'elf-overseer', // 5 CP, 500 kills
  'energy-elemental', // 5 CP, 500 kills
  'enraged-crystal-golem', // 5 CP, 500 kills
  'evil-sheep', // 5 CP, 500 kills
  'evil-sheep-lord', // 5 CP, 500 kills
  'execowtioner', // 5 CP, 500 kills
  'forest-fury', // 5 CP, 500 kills
  'furious-fire-elemental', // 5 CP, 500 kills
  'ghoulish-hyaena', // 5 CP, 500 kills
  'golden-servant', // 5 CP, 500 kills
  'goldhanded-cultist', // 5 CP, 500 kills
  'goldhanded-cultist-bride', // 5 CP, 500 kills
  'grave-guard', // 5 CP, 500 kills
  'gravedigger', // 5 CP, 500 kills
  'green-djinn', // 5 CP, 500 kills
  'herald-of-gloom', // 5 CP, 500 kills
  'hot-dog', // 5 CP, 500 kills
  'ice-dragon', // 5 CP, 500 kills
  'ice-witch', // 5 CP, 500 kills
  'infernal-frog', // 5 CP, 500 kills
  'insectoid-worker', // 5 CP, 500 kills
  'killer-caiman', // 5 CP, 500 kills
  'lancer-beetle', // 5 CP, 500 kills
  'lich', // 5 CP, 500 kills
  'lizard-magistratus', // 5 CP, 500 kills
  'lizard-snakecharmer', // 5 CP, 500 kills
  'loricate-orger', // 5 CP, 500 kills
  'manta-ray', // 5 CP, 500 kills
  'massive-earth-elemental', // 5 CP, 500 kills
  'massive-energy-elemental', // 5 CP, 500 kills
  'massive-fire-elemental', // 5 CP, 500 kills
  'massive-water-elemental', // 5 CP, 500 kills
  'midnight-panther', // 5 CP, 500 kills
  'midnight-spawn', // 5 CP, 500 kills
  'midnight-warrior', // 5 CP, 500 kills
  'minotaur-hunter', // 5 CP, 500 kills
  'moohtant', // 5 CP, 500 kills
  'mutated-rat', // 5 CP, 500 kills
  'mutated-tiger', // 5 CP, 500 kills
  'necromancer', // 5 CP, 500 kills
  'nightfiend', // 5 CP, 500 kills
  'nightslayer', // 5 CP, 500 kills
  'nightstalker', // 5 CP, 500 kills
  'noble-lion', // 5 CP, 500 kills
  'omnivora', // 5 CP, 500 kills
  'orc-berserker', // 5 CP, 500 kills
  'orc-leader', // 5 CP, 500 kills
  'orc-marauder', // 5 CP, 500 kills
  'orc-warlord', // 5 CP, 500 kills
  'orger', // 5 CP, 500 kills
  'percht', // 5 CP, 500 kills
  'pirate-corsair', // 5 CP, 500 kills
  'priestess', // 5 CP, 500 kills
  'quara-constrictor', // 5 CP, 500 kills
  'quara-constrictor-scout', // 5 CP, 500 kills
  'quara-hydromancer-scout', // 5 CP, 500 kills
  'quara-mantassin', // 5 CP, 500 kills
  'quara-pincher-scout', // 5 CP, 500 kills
  'quara-predator-scout', // 5 CP, 500 kills
  'renegade-quara-constrictor', // 5 CP, 500 kills
  'renegade-quara-hydromancer', // 5 CP, 500 kills
  'renegade-quara-mantassin', // 5 CP, 500 kills
  'renegade-quara-pincher', // 5 CP, 500 kills
  'renegade-quara-predator', // 5 CP, 500 kills
  'roaring-lion', // 5 CP, 500 kills
  'roast-pork', // 5 CP, 500 kills
  'sacred-spider', // 5 CP, 500 kills
  'sandstone-scorpion', // 5 CP, 500 kills
  'schiach', // 5 CP, 500 kills
  'shaburak-demon', // 5 CP, 500 kills
  'shaburak-lord', // 5 CP, 500 kills
  'shaburak-prince', // 5 CP, 500 kills
  'shadow-hound', // 5 CP, 500 kills
  'shadow-pupil', // 5 CP, 500 kills
  'shaper-matriarch', // 5 CP, 500 kills
  'shark', // 5 CP, 500 kills
  'spidris-elite', // 5 CP, 500 kills
  'stone-rhino', // 5 CP, 500 kills
  'swarmer', // 5 CP, 500 kills
  'thornfire-wolf', // 5 CP, 500 kills
  'tomb-servant', // 5 CP, 500 kills
  'troll-legionnaire', // 5 CP, 500 kills
  'twisted-shaper', // 5 CP, 500 kills
  'undead-cavebear', // 5 CP, 500 kills
  'vicious-manbat', // 5 CP, 500 kills
  'wailing-widow', // 5 CP, 500 kills
  'water-elemental', // 5 CP, 500 kills
  'wiggler', // 5 CP, 500 kills
  'worm-priestess', // 5 CP, 500 kills
  'wyvern', // 5 CP, 500 kills
  'yeti', // 5 CP, 500 kills
  'zombie', // 5 CP, 500 kills
];

/**
 * Check if a creature is excluded from the bestiary
 * @param {string} creatureId - The creature ID to check
 * @returns {boolean} - True if the creature is excluded
 */
export const isExcludedFromBestiary = (creatureId) => {
  return EXCLUDED_CREATURE_IDS.includes(creatureId);
};

/**
 * Filter out creatures that are not part of the bestiary
 * @param {Array} creatures - Array of creature objects
 * @returns {Array} - Filtered array without excluded creatures
 */
export const filterValidBestiaryCreatures = (creatures) => {
  return creatures.filter(creature => !isExcludedFromBestiary(creature.id));
};
