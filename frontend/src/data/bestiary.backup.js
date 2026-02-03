/**
 * Bestiary data based on TibiaPal reference
 *
 * Difficulty levels (based on time to complete):
 * - EASY: Less than 2 hours
 * - MEDIUM: 2-5 hours
 * - HARD: More than 5 hours
 *
 * Charm Points by creature class:
 * - Bosses (rare): 50 points
 * - Very Rare: 30 points
 * - Rare: 25 points
 * - Uncommon: 15 points
 * - Common: 5-10 points
 * - Very Common: 1 point
 */

export const DIFFICULTY = {
  EASY: 'EASY',
  MEDIUM: 'MEDIUM',
  HARD: 'HARD',
};

export const DIFFICULTY_HOURS = {
  [DIFFICULTY.EASY]: { min: 0, max: 2, average: 1 },
  [DIFFICULTY.MEDIUM]: { min: 2, max: 5, average: 3.5 },
  [DIFFICULTY.HARD]: { min: 5, max: 10, average: 7 },
};

export const RESPAWN_CATEGORY = {
  NORMAL: 'normal',
  RAPID: 'rapid',
  RARE: 'rare',
};

export const REGIONS = {
  MAINLAND: 'Mainland',
  VENORE: 'Venore',
  THAIS: 'Thais',
  CARLIN: 'Carlin',
  DARASHIA: 'Darashia',
  LIBERTY_BAY: 'Liberty Bay',
  PORT_HOPE: 'Port Hope',
  ANKRAHMUN: 'Ankrahmun',
  EDRON: 'Edron',
  YALAHAR: 'Yalahar',
  ZAO: 'Zao',
  ROSHAMUUL: 'Roshamuul',
  FERUMBRAS_ASCENSION: 'Ferumbras Ascension',
  OTHERWORLD: 'Otherworld',
};

export const BESTIARY_DATA = [
  {
    "id": "raging-fire",
    "name": "Raging Fire",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Raging_Fire.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "iks-ahpututu",
    "name": "Iks Ahpututu",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Iks_Ahpututu.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "goblin-leader",
    "name": "Goblin Leader",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Goblin_Leader.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "water-buffalo",
    "name": "Water Buffalo",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Water_Buffalo.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "haunted-treeling",
    "name": "Haunted Treeling",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Haunted_Treeling.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "bonebeast",
    "name": "Bonebeast",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Bonebeast.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "ancient-scarab",
    "name": "Ancient Scarab",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Ancient_Scarab.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "toad",
    "name": "Toad",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Toad.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "larva",
    "name": "Larva",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Larva.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "scarab",
    "name": "Scarab",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Scarab.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "blood-crab",
    "name": "Blood Crab",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Blood_Crab.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "deepsea-blood-crab",
    "name": "Deepsea Blood Crab",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Deepsea_Blood_Crab.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "salamander",
    "name": "Salamander",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Salamander.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "emerald-damselfly",
    "name": "Emerald Damselfly",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Emerald_Damselfly.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "stalker",
    "name": "Stalker",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Stalker.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "ghost",
    "name": "Ghost",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Ghost.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "mummy",
    "name": "Mummy",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Mummy.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "marsh-stalker",
    "name": "Marsh Stalker",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Marsh_Stalker.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "gargoyle",
    "name": "Gargoyle",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Gargoyle.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "tainted-soul",
    "name": "Tainted Soul",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Tainted_Soul.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "hunter",
    "name": "Hunter",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Hunter.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "poacher",
    "name": "Poacher",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Poacher.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "boar",
    "name": "Boar",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Boar.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "bear",
    "name": "Bear",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Bear.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "gloom-wolf",
    "name": "Gloom Wolf",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Gloom_Wolf.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "ghost-wolf",
    "name": "Ghost Wolf",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Ghost_Wolf.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "wild-warrior",
    "name": "Wild Warrior",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Wild_Warrior.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "bandit",
    "name": "Bandit",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Bandit.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "dark-monk",
    "name": "Dark Monk",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dark_Monk.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "smuggler",
    "name": "Smuggler",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Smuggler.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "assassin",
    "name": "Assassin",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Assassin.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "pirate-marauder",
    "name": "Pirate Marauder",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Pirate_Marauder.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "novice-of-the-cult",
    "name": "Novice of the Cult",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Novice_Of_The_Cult.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "swamp-troll",
    "name": "Swamp Troll",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Swamp_Troll.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "firestarter",
    "name": "Firestarter",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Firestarter.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "corym-charlatan",
    "name": "Corym Charlatan",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Corym_Charlatan.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "mammoth",
    "name": "Mammoth",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Mammoth.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "winter-wolf",
    "name": "Winter Wolf",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Winter_Wolf.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "kongra",
    "name": "Kongra",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Kongra.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "sibang",
    "name": "Sibang",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Sibang.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "ghoul",
    "name": "Ghoul",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Ghoul.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "skeleton",
    "name": "Skeleton",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Skeleton.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "slime",
    "name": "Slime",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Slime.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "gnarlhound",
    "name": "Gnarlhound",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Gnarlhound.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "lizard-templar",
    "name": "Lizard Templar",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Lizard_Templar.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "lizard-sentinel",
    "name": "Lizard Sentinel",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Lizard_Sentinel.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "crocodile",
    "name": "Crocodile",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Crocodile.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "rotworm",
    "name": "Rotworm",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Rotworm.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "tortoise",
    "name": "Tortoise",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Tortoise.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "thornback-tortoise",
    "name": "Thornback Tortoise",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Thornback_Tortoise.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "leaf-golem",
    "name": "Leaf Golem",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Leaf_Golem.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "terramite",
    "name": "Terramite",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Terramite.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "troll",
    "name": "Troll",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Troll.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "goblin",
    "name": "Goblin",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Goblin.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "island-troll",
    "name": "Island Troll",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Island_Troll.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "fish",
    "name": "Fish",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Fish.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "seagull",
    "name": "Seagull",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Seagull.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "sandcrawler",
    "name": "Sandcrawler",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Sandcrawler.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "deer",
    "name": "Deer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Deer.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "badger",
    "name": "Badger",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Badger.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "silver-rabbit",
    "name": "Silver Rabbit",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Silver_Rabbit.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "winter-wolf",
    "name": "Winter Wolf",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Winter_Wolf.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "wolf",
    "name": "Wolf",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Wolf.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "spider",
    "name": "Spider",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Spider.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "poison-spider",
    "name": "Poison Spider",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Poison_Spider.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "penguin",
    "name": "Penguin",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Penguin.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "snake",
    "name": "Snake",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Snake.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "northern-pike",
    "name": "Northern Pike",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Northern_Pike.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "butterfly-(purple/blue/red)",
    "name": "Butterfly (Purple/Blue/Red)",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Butterfly_(purple/blue/red).gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "dog",
    "name": "Dog",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dog.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "modified-gnarlhound",
    "name": "Modified Gnarlhound",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Modified_Gnarlhound.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "mushroom-sniffer",
    "name": "Mushroom Sniffer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Mushroom_Sniffer.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "cat",
    "name": "Cat",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Cat.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "husky",
    "name": "Husky",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Husky.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "pigeon",
    "name": "Pigeon",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Pigeon.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "chasm-spawn",
    "name": "Chasm Spawn",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Chasm_Spawn.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "worker-golem",
    "name": "Worker Golem",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Worker_Golem.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "war-golem",
    "name": "War Golem",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/War_Golem.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "exotic-bat",
    "name": "Exotic Bat",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Exotic_Bat.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "exotic-cave-spider",
    "name": "Exotic Cave Spider",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Exotic_Cave_Spider.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "metal-gargoyle",
    "name": "Metal Gargoyle",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Metal_Gargoyle.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "wilting-leaf-golem",
    "name": "Wilting Leaf Golem",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Wilting_Leaf_Golem.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "vampire",
    "name": "Vampire",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Vampire.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "vampire-bride",
    "name": "Vampire Bride",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Vampire_Bride.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "vampire-viscount",
    "name": "Vampire Viscount",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Vampire_Viscount.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "weakened-frazzlemaw",
    "name": "Weakened Frazzlemaw",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Weakened_Frazzlemaw.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "enfeebled-silencer",
    "name": "Enfeebled Silencer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Enfeebled_Silencer.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "lumbering-carnivor",
    "name": "Lumbering Carnivor",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Lumbering_Carnivor.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "putrid-mummy",
    "name": "Putrid Mummy",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Putrid_Mummy.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "ice-golem",
    "name": "Ice Golem",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Ice_Golem.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "bog-raider",
    "name": "Bog Raider",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Bog_Raider.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "stonerefiner",
    "name": "Stonerefiner",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Stonerefiner.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "sea-serpent",
    "name": "Sea Serpent",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Sea_Serpent.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "young-sea-serpent",
    "name": "Young Sea Serpent",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Young_Sea_Serpent.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "stampor",
    "name": "Stampor",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Stampor.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "giant-spider",
    "name": "Giant Spider",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Giant_Spider.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "lizard-zaogun",
    "name": "Lizard Zaogun",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Lizard_Zaogun.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "lizard-chosen",
    "name": "Lizard Chosen",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Lizard_Chosen.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "lizard-high-guard",
    "name": "Lizard High Guard",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Lizard_High_Guard.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "lizard-legionnaire",
    "name": "Lizard Legionnaire",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Lizard_Legionnaire.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "lizard-dragon-priest",
    "name": "Lizard Dragon Priest",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Lizard_Dragon_Priest.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "eternal-guardian",
    "name": "Eternal Guardian",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Eternal_Guardian.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "dragon",
    "name": "Dragon",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dragon.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "pirate-cutthroat",
    "name": "Pirate Cutthroat",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Pirate_Cutthroat.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "acolyte-of-the-cult",
    "name": "Acolyte of the Cult",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Acolyte_Of_The_Cult.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "adept-of-the-cult",
    "name": "Adept of the Cult",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Adept_Of_The_Cult.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "enlightened-of-the-cult",
    "name": "Enlightened of the Cult",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Enlightened_Of_The_Cult.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "dragon-lord",
    "name": "Dragon Lord",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dragon_Lord.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "frost-dragon",
    "name": "Frost Dragon",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Frost_Dragon.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "frost-dragon-hatchling",
    "name": "Frost Dragon Hatchling",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Frost_Dragon_Hatchling.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "quara-predator",
    "name": "Quara Predator",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Quara_Predator.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "quara-pincher",
    "name": "Quara Pincher",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Quara_Pincher.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "quara-hydromancer",
    "name": "Quara Hydromancer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Quara_Hydromancer.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "iron-servant-replica",
    "name": "Iron Servant Replica",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Iron_Servant_Replica.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "golden-servant-replica",
    "name": "Golden Servant Replica",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Golden_Servant_Replica.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "diamond-servant-replica",
    "name": "Diamond Servant Replica",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Diamond_Servant_Replica.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "orc-cultist",
    "name": "Orc Cultist",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Orc_Cultist.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "orc-cult-priest",
    "name": "Orc Cult Priest",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Orc_Cult_Priest.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "orc-cult-inquisitor",
    "name": "Orc Cult Inquisitor",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Orc_Cult_Inquisitor.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "orc-cult-fanatic",
    "name": "Orc Cult Fanatic",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Orc_Cult_Fanatic.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "orc-cult-minion",
    "name": "Orc Cult Minion",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Orc_Cult_Minion.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "barkless-devotee",
    "name": "Barkless Devotee",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Barkless_Devotee.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "barkless-fanatic",
    "name": "Barkless Fanatic",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Barkless_Fanatic.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "minotaur-cult-follower",
    "name": "Minotaur Cult Follower",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Minotaur_Cult_Follower.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "minotaur-cult-propher",
    "name": "Minotaur Cult Propher",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Minotaur_Cult_Propher.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "minotaur-cult-zealot",
    "name": "Minotaur Cult Zealot",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Minotaur_Cult_Zealot.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "mutated-bat",
    "name": "Mutated Bat",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Mutated_Bat.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "souleater",
    "name": "Souleater",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Souleater.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "death-blob",
    "name": "Death Blob",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Death_Blob.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "glooth-blob",
    "name": "Glooth Blob",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Glooth_Blob.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "blood-beast",
    "name": "Blood Beast",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Blood_Beast.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "rot-elemental",
    "name": "Rot Elemental",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Rot_Elemental.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "devourer",
    "name": "Devourer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Devourer.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "glooth-anemone",
    "name": "Glooth Anemone",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Glooth_Anemone.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "pirat-cutthroat",
    "name": "Pirat Cutthroat",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Pirat_Cutthroat.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "pirat-bombardier",
    "name": "Pirat Bombardier",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Pirat_Bombardier.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "pirat-scoundrel",
    "name": "Pirat Scoundrel",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Pirat_Scoundrel.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "pirat-mate",
    "name": "Pirat Mate",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Pirat_Mate.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "faun",
    "name": "Faun",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Faun.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "pooka",
    "name": "Pooka",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Pooka.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "swan-maiden",
    "name": "Swan Maiden",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Swan_Maiden.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "pixie",
    "name": "Pixie",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Pixie.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "nymph",
    "name": "Nymph",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Nymph.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "boogy",
    "name": "Boogy",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Boogy.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "twisted-pooka",
    "name": "Twisted Pooka",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Twisted_Pooka.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "drillworm",
    "name": "Drillworm",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Drillworm.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "mutated-human",
    "name": "Mutated Human",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Mutated_Human.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "undead-gladiator",
    "name": "Undead Gladiator",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Undead_Gladiator.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "clomp",
    "name": "Clomp",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Clomp.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "ogre-brute",
    "name": "Ogre Brute",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Ogre_Brute.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "ogre-savage",
    "name": "Ogre Savage",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Ogre_Savage.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "ogre-shaman",
    "name": "Ogre Shaman",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Ogre_Shaman.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "orclops-ravager",
    "name": "Orclops Ravager",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Orclops_Ravager.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "orclops-doomhauler",
    "name": "Orclops Doomhauler",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Orclops_Doomhauler.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "crawler",
    "name": "Crawler",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Crawler.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "spidris",
    "name": "Spidris",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Spidris.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "kollos",
    "name": "Kollos",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Kollos.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "spitter",
    "name": "Spitter",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Spitter.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "waspoid",
    "name": "Waspoid",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Waspoid.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "warlock",
    "name": "Warlock",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Warlock.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "misguided-thief",
    "name": "Misguided Thief",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Misguided_Thief.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "misguided-bully",
    "name": "Misguided Bully",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Misguided_Bully.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "terror-bird",
    "name": "Terror Bird",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Terror_Bird.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "crypt-shambler",
    "name": "Crypt Shambler",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Crypt_Shambler.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "frost-giant",
    "name": "Frost Giant",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Frost_Giant.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "carrion-worm",
    "name": "Carrion Worm",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Carrion_Worm.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "merlkin",
    "name": "Merlkin",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Merlkin.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "frost-giantess",
    "name": "Frost Giantess",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Frost_Giantess.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "panda",
    "name": "Panda",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Panda.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "starving-wolf",
    "name": "Starving Wolf",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Starving_Wolf.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "wisp",
    "name": "Wisp",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Wisp.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "white-deer",
    "name": "White Deer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/White_Deer.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "spiky-carnivor",
    "name": "Spiky Carnivor",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Spiky_Carnivor.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "menancing-carnivor",
    "name": "Menancing Carnivor",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Menancing_Carnivor.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "fury",
    "name": "Fury",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Fury.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "diremaw",
    "name": "Diremaw",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Diremaw.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "deepworm",
    "name": "Deepworm",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Deepworm.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "stone-devourer",
    "name": "Stone Devourer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Stone_Devourer.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "weeper",
    "name": "Weeper",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Weeper.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "orewalker",
    "name": "Orewalker",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Orewalker.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "lava-golem",
    "name": "Lava Golem",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Lava_Golem.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "magma-crawler",
    "name": "Magma Crawler",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Magma_Crawler.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "infected-weeper",
    "name": "Infected Weeper",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Infected_Weeper.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "seacrest-serpent",
    "name": "Seacrest Serpent",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Seacrest_Serpent.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "infernalist",
    "name": "Infernalist",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Infernalist.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "lizard-noble",
    "name": "Lizard Noble",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Lizard_Noble.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "dragonling",
    "name": "Dragonling",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dragonling.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "high-voltage-elemental",
    "name": "High Voltage Elemental",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/High_Voltage_Elemental.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "walker",
    "name": "Walker",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Walker.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "redeemed-soul",
    "name": "Redeemed Soul",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Redeemed_Soul.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "filth-toad",
    "name": "Filth Toad",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Filth_Toad.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "nomad-(blue)",
    "name": "Nomad (Blue)",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Nomad_(blue).gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "nomad-(female)",
    "name": "Nomad (Female)",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Nomad_(female).gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "deepling-scout",
    "name": "Deepling Scout",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Deepling_Scout.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "deepling-spellsinger",
    "name": "Deepling Spellsinger",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Deepling_Spellsinger.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "crystalcrusher",
    "name": "Crystalcrusher",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Crystalcrusher.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "carniphila",
    "name": "Carniphila",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Carniphila.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "mutated-rat",
    "name": "Mutated Rat",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Mutated_Rat.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "shaburak-demon",
    "name": "Shaburak Demon",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Shaburak_Demon.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "askarak-demon",
    "name": "Askarak Demon",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Askarak_Demon.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "fire-elemental",
    "name": "Fire Elemental",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Fire_Elemental.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "zombie",
    "name": "Zombie",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Zombie.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "furious-fire-elemental",
    "name": "Furious Fire Elemental",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Furious_Fire_Elemental.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "clay-guardian",
    "name": "Clay Guardian",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Clay_Guardian.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "omnivora",
    "name": "Omnivora",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Omnivora.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "killer-caiman",
    "name": "Killer Caiman",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Killer_Caiman.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "demon-skeleton",
    "name": "Demon Skeleton",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Demon_Skeleton.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "brimstone-bugs",
    "name": "Brimstone Bugs",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Brimstone_Bugs.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "enraged-crystal-golem",
    "name": "Enraged Crystal Golem",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Enraged_Crystal_Golem.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "deepling-worker",
    "name": "Deepling Worker",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Deepling_Worker.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "azure-frog",
    "name": "Azure Frog",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Azure_Frog.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "coral-frog",
    "name": "Coral Frog",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Coral_Frog.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "crimson-frog",
    "name": "Crimson Frog",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Crimson_Frog.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "orchid-frog",
    "name": "Orchid Frog",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Orchid_Frog.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "fire-devil",
    "name": "Fire Devil",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Fire_Devil.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "swampling",
    "name": "Swampling",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Swampling.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "spit-nettle",
    "name": "Spit Nettle",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Spit_Nettle.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "grave-robber",
    "name": "Grave Robber",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Grave_Robber.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "insect-swarm",
    "name": "Insect Swarm",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Insect_Swarm.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "crypt-defiler",
    "name": "Crypt Defiler",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Crypt_Defiler.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "squidgy-slime",
    "name": "Squidgy Slime",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Squidgy_Slime.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "gozzler",
    "name": "Gozzler",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Gozzler.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "cyclops",
    "name": "Cyclops",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Cyclops.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "valkyrie",
    "name": "Valkyrie",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Valkyrie.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "nomad",
    "name": "Nomad",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Nomad.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "barbarian-skullhunter",
    "name": "Barbarian Skullhunter",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Barbarian_Skullhunter.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "barbarian-headhunter",
    "name": "Barbarian Headhunter",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Barbarian_Headhunter.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "barbarian-brutetamer",
    "name": "Barbarian Brutetamer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Barbarian_Brutetamer.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "gladiator",
    "name": "Gladiator",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Gladiator.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "gang-member",
    "name": "Gang Member",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Gang_Member.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "crazed-beggar",
    "name": "Crazed Beggar",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Crazed_Beggar.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "monk",
    "name": "Monk",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Monk.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "witch",
    "name": "Witch",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Witch.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "amazon",
    "name": "Amazon",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Amazon.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "stone-golem",
    "name": "Stone Golem",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Stone_Golem.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "damaged-worker-golem",
    "name": "Damaged Worker Golem",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Damaged_Worker_Golem.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "elf",
    "name": "Elf",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Elf.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "elf-scout",
    "name": "Elf Scout",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Elf_Scout.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "elf-arcanist",
    "name": "Elf Arcanist",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Elf_Arcanist.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "minotaur-mage",
    "name": "Minotaur Mage",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Minotaur_Mage.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "scorpion",
    "name": "Scorpion",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Scorpion.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "dworc-voodoomaster",
    "name": "Dworc Voodoomaster",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dworc_Voodoomaster.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "dworc-fleshhunter",
    "name": "Dworc Fleshhunter",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dworc_Fleshhunter.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "dworc-venomsniper",
    "name": "Dworc Venomsniper",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dworc_Venomsniper.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "chakoya-tribewarden",
    "name": "Chakoya Tribewarden",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Chakoya_Tribewarden.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "chakoya-toolshaper",
    "name": "Chakoya Toolshaper",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Chakoya_Toolshaper.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "chakoya-windcaller",
    "name": "Chakoya Windcaller",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Chakoya_Windcaller.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "skeleton-warrior",
    "name": "Skeleton Warrior",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Skeleton_Warrior.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "pirate-skeleton",
    "name": "Pirate Skeleton",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Pirate_Skeleton.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "goblin-assassin",
    "name": "Goblin Assassin",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Goblin_Assassin.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "goblin-scavenger",
    "name": "Goblin Scavenger",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Goblin_Scavenger.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "furious-troll",
    "name": "Furious Troll",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Furious_Troll.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "troll-legionnaire",
    "name": "Troll Legionnaire",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Troll_Legionnaire.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "dwarf",
    "name": "Dwarf",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dwarf.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "dwarf-guard",
    "name": "Dwarf Guard",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dwarf_Guard.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "dwarf-soldier",
    "name": "Dwarf Soldier",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dwarf_Soldier.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "minotaur-guard",
    "name": "Minotaur Guard",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Minotaur_Guard.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "minotaur-archer",
    "name": "Minotaur Archer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Minotaur_Archer.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "minotaur",
    "name": "Minotaur",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Minotaur.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "bat",
    "name": "Bat",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Bat.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "orc",
    "name": "Orc",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Orc.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "orc-shaman",
    "name": "Orc Shaman",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Orc_Shaman.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "war-wolf",
    "name": "War Wolf",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/War_Wolf.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "lion",
    "name": "Lion",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Lion.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "orc-spearman",
    "name": "Orc Spearman",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Orc_Spearman.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "orc-warrior",
    "name": "Orc Warrior",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Orc_Warrior.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "bonelord",
    "name": "Bonelord",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Bonelord.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "slug",
    "name": "Slug",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Slug.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "gazer",
    "name": "Gazer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Gazer.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "rorc",
    "name": "Rorc",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Rorc.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "calamary",
    "name": "Calamary",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Calamary.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "hyaena",
    "name": "Hyaena",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Hyaena.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "mercury-blob",
    "name": "Mercury Blob",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Mercury_Blob.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "cobra",
    "name": "Cobra",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Cobra.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "troll-champion",
    "name": "Troll Champion",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Troll_Champion.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "skunk",
    "name": "Skunk",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Skunk.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "cave-parrot",
    "name": "Cave Parrot",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Cave_Parrot.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "chicken",
    "name": "Chicken",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Chicken.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "wasp",
    "name": "Wasp",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Wasp.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "bug",
    "name": "Bug",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Bug.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "dromedary",
    "name": "Dromedary",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dromedary.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "pig",
    "name": "Pig",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Pig.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "rabbit",
    "name": "Rabbit",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Rabbit.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "fox",
    "name": "Fox",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Fox.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "rat",
    "name": "Rat",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Rat.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "cave-rat",
    "name": "Cave Rat",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Cave_Rat.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "frost-troll",
    "name": "Frost Troll",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Frost_Troll.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "squirrel",
    "name": "Squirrel",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Squirrel.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "green-frog",
    "name": "Green Frog",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Green_Frog.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "crustacea-gigantica",
    "name": "Crustacea Gigantica",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Crustacea_Gigantica.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "wyvern",
    "name": "Wyvern",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Wyvern.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "wiggler",
    "name": "Wiggler",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Wiggler.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "banshee",
    "name": "Banshee",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Banshee.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "lich",
    "name": "Lich",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Lich.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "water-elemental",
    "name": "Water Elemental",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Water_Elemental.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "arctic-faun",
    "name": "Arctic Faun",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Arctic_Faun.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "corym-skirmisher",
    "name": "Corym Skirmisher",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Corym_Skirmisher.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "corym-vanguard",
    "name": "Corym Vanguard",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Corym_Vanguard.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "wailing-widow",
    "name": "Wailing Widow",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Wailing_Widow.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "lancer-beetle",
    "name": "Lancer Beetle",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Lancer_Beetle.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "green-djinn",
    "name": "Green Djinn",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Green_Djinn.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "blue-djinn",
    "name": "Blue Djinn",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Blue_Djinn.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "elder-bonelord",
    "name": "Elder Bonelord",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Elder_Bonelord.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "braindeath",
    "name": "Braindeath",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Braindeath.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "crystal-spider",
    "name": "Crystal Spider",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Crystal_Spider.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "dwarf-henchman",
    "name": "Dwarf Henchman",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dwarf_Henchman.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "dwarf-geomancer",
    "name": "Dwarf Geomancer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dwarf_Geomancer.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "barbarian-bloodwalker",
    "name": "Barbarian Bloodwalker",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Barbarian_Bloodwalker.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "ice-witch",
    "name": "Ice Witch",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Ice_Witch.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "orc-marauder",
    "name": "Orc Marauder",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Orc_Marauder.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "ghoulish-hyaena",
    "name": "Ghoulish Hyaena",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Ghoulish_Hyaena.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "elder-mummy",
    "name": "Elder Mummy",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Elder_Mummy.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "death-priest",
    "name": "Death Priest",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Death_Priest.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "sacred-spider",
    "name": "Sacred Spider",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Sacred_Spider.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "tomb-servant",
    "name": "Tomb Servant",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Tomb_Servant.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "grave-guard",
    "name": "Grave Guard",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Grave_Guard.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "cyclops-drone",
    "name": "Cyclops Drone",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Cyclops_Drone.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "cyclops-smith",
    "name": "Cyclops Smith",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Cyclops_Smith.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "necromancer",
    "name": "Necromancer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Necromancer.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "shadow-pupil",
    "name": "Shadow Pupil",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Shadow_Pupil.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "blood-priest",
    "name": "Blood Priest",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Blood_Priest.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "blood-hand",
    "name": "Blood Hand",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Blood_Hand.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "forest-fury",
    "name": "Forest Fury",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Forest_Fury.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "elder-forest-fury",
    "name": "Elder Forest Fury",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Elder_Forest_Fury.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "pirate-bucaneer",
    "name": "Pirate Bucaneer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Pirate_Bucaneer.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "deepling-warrior",
    "name": "Deepling Warrior",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Deepling_Warrior.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "pirate-corsair",
    "name": "Pirate Corsair",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Pirate_Corsair.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "massive-water-elemental",
    "name": "Massive Water Elemental",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Massive_Water_Elemental.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "massive-fire-elemental",
    "name": "Massive Fire Elemental",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Massive_Fire_Elemental.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "massive-earth-elemental",
    "name": "Massive Earth Elemental",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Massive_Earth_Elemental.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "earth-elemental",
    "name": "Earth Elemental",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Earth_Elemental.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "massive-energy-elemental",
    "name": "Massive Energy Elemental",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Massive_Energy_Elemental.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "energy-elemental",
    "name": "Energy Elemental",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Energy_Elemental.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "lizard-snakecharmer",
    "name": "Lizard Snakecharmer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Lizard_Snakecharmer.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "roaring-lion",
    "name": "Roaring Lion",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Roaring_Lion.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "noble-lion",
    "name": "Noble Lion",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Noble_Lion.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "mooh'tah-warrior",
    "name": "Mooh'tah Warrior",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Mooh'tah_Warrior.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "execowtioner",
    "name": "Execowtioner",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Execowtioner.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "minotaur-hunter",
    "name": "Minotaur Hunter",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Minotaur_Hunter.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "worm-priestess",
    "name": "Worm Priestess",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Worm_Priestess.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "moohtant",
    "name": "Moohtant",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Moohtant.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "dragon-lord-hatching",
    "name": "Dragon Lord Hatching",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dragon_Lord_Hatching.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "dragon-hatching",
    "name": "Dragon Hatching",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dragon_Hatching.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "deepling-guard",
    "name": "Deepling Guard",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Deepling_Guard.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "shark",
    "name": "Shark",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Shark.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "infernal-frog",
    "name": "Infernal Frog",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Infernal_Frog.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "berserker-chicken",
    "name": "Berserker Chicken",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Berserker_Chicken.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "demon-parrot",
    "name": "Demon Parrot",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Demon_Parrot.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "evil-sheep",
    "name": "Evil Sheep",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Evil_Sheep.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "hot-dog",
    "name": "Hot Dog",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Hot_Dog.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "doom-deer",
    "name": "Doom Deer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Doom_Deer.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "killer-rabbit",
    "name": "Killer Rabbit",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Killer_Rabbit.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "evil-sheep-lord",
    "name": "Evil Sheep Lord",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Evil_Sheep_Lord.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "acid-blob",
    "name": "Acid Blob",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Acid_Blob.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "quara-mantassin",
    "name": "Quara Mantassin",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Quara_Mantassin.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "quara-constrictor",
    "name": "Quara Constrictor",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Quara_Constrictor.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "quara-constrictor-scout",
    "name": "Quara Constrictor Scout",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Quara_Constrictor_Scout.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "quara-predator-scout",
    "name": "Quara Predator Scout",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Quara_Predator_Scout.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "quara-hydromancer-scout",
    "name": "Quara Hydromancer Scout",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Quara_Hydromancer_Scout.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "quara-pincher-scout",
    "name": "Quara Pincher Scout",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Quara_Pincher_Scout.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "sandstone-scorpion",
    "name": "Sandstone Scorpion",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Sandstone_Scorpion.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "goldhanded-cultist",
    "name": "Goldhanded Cultist",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Goldhanded_Cultist.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "goldhanded-cultist-bride",
    "name": "Goldhanded Cultist Bride",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Goldhanded_Cultist_Bride.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "orc-berserker",
    "name": "Orc Berserker",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Orc_Berserker.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "orc-warlord",
    "name": "Orc Warlord",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Orc_Warlord.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "orc-leader",
    "name": "Orc Leader",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Orc_Leader.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "stone-rhino",
    "name": "Stone Rhino",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Stone_Rhino.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "broken-shaper",
    "name": "Broken Shaper",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Broken_Shaper.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "twisted-shaper",
    "name": "Twisted Shaper",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Twisted_Shaper.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "shaper-matriarch",
    "name": "Shaper Matriarch",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Shaper_Matriarch.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "lizard-magistratus",
    "name": "Lizard Magistratus",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Lizard_Magistratus.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "pirat-mate",
    "name": "Pirat Mate",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Pirat_Mate.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "nightstalker",
    "name": "Nightstalker",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Nightstalker.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "mutated-tiger",
    "name": "Mutated Tiger",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Mutated_Tiger.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "efreet/marid",
    "name": "Efreet/Marid",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Efreet/marid.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "insectoid-worker",
    "name": "Insectoid Worker",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Insectoid_Worker.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "swarmer",
    "name": "Swarmer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Swarmer.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "tarnished-spirit",
    "name": "Tarnished Spirit",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Tarnished_Spirit.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "ladybug",
    "name": "Ladybug",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Ladybug.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "centipede",
    "name": "Centipede",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Centipede.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "orc-rider",
    "name": "Orc Rider",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Orc_Rider.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "polar-bear",
    "name": "Polar Bear",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Polar_Bear.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "little-corym-charlatan",
    "name": "Little Corym Charlatan",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Little_Corym_Charlatan.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "damaged-crystal-golem",
    "name": "Damaged Crystal Golem",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Damaged_Crystal_Golem.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "mole",
    "name": "Mole",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Mole.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "quara-mantassin-scout",
    "name": "Quara Mantassin Scout",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Quara_Mantassin_Scout.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "dark-magician",
    "name": "Dark Magician",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dark_Magician.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "dark-apprentice",
    "name": "Dark Apprentice",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dark_Apprentice.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "mad-scientist",
    "name": "Mad Scientist",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Mad_Scientist.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "elephant",
    "name": "Elephant",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Elephant.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "tiger",
    "name": "Tiger",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Tiger.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "jellyfish",
    "name": "Jellyfish",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Jellyfish.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "crab",
    "name": "Crab",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Crab.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "adventurer",
    "name": "Adventurer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Adventurer.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "abyssal-calamary",
    "name": "Abyssal Calamary",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Abyssal_Calamary.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "white-shade",
    "name": "White Shade",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/White_Shade.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "pirate-ghost",
    "name": "Pirate Ghost",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Pirate_Ghost.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "undead-mine-worker",
    "name": "Undead Mine Worker",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Undead_Mine_Worker.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "undead-prospector",
    "name": "Undead Prospector",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Undead_Prospector.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "honour-guard",
    "name": "Honour Guard",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Honour_Guard.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "bog-frog",
    "name": "Bog Frog",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Bog_Frog.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "agrestic-chicken",
    "name": "Agrestic Chicken",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Agrestic_Chicken.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "horse-(gray/brown/taupe)",
    "name": "Horse (Gray/Brown/Taupe)",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Horse_(gray/brown/taupe).gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "flamingo",
    "name": "Flamingo",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Flamingo.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "black-sheep",
    "name": "Black Sheep",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Black_Sheep.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "sheep",
    "name": "Sheep",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Sheep.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "parrot",
    "name": "Parrot",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Parrot.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "deepling-tyrant",
    "name": "Deepling Tyrant",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Deepling_Tyrant.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "vulcongra",
    "name": "Vulcongra",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Vulcongra.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "ghastly-dragon",
    "name": "Ghastly Dragon",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Ghastly_Dragon.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "minotaur-amazon",
    "name": "Minotaur Amazon",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Minotaur_Amazon.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "hive-overseer",
    "name": "Hive Overseer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Hive_Overseer.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "spidris-elite",
    "name": "Spidris Elite",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Spidris_Elite.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "manta-ray",
    "name": "Manta Ray",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Manta_Ray.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "priestess",
    "name": "Priestess",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Priestess.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "gravedigger",
    "name": "Gravedigger",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Gravedigger.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "diabolic-imp",
    "name": "Diabolic Imp",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Diabolic_Imp.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "deepling-brawler",
    "name": "Deepling Brawler",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Deepling_Brawler.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "deepling-master-librarian",
    "name": "Deepling Master Librarian",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Deepling_Master_Librarian.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "askarak-lord",
    "name": "Askarak Lord",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Askarak_Lord.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "askarak-prince",
    "name": "Askarak Prince",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Askarak_Prince.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "shaburak-lord",
    "name": "Shaburak Lord",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Shaburak_Lord.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "shaburak-prince",
    "name": "Shaburak Prince",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Shaburak_Prince.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "deepling-elite",
    "name": "Deepling Elite",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Deepling_Elite.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "nightfiend",
    "name": "Nightfiend",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Nightfiend.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "vicious-manbat",
    "name": "Vicious Manbat",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Vicious_Manbat.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "bane-of-light",
    "name": "Bane of Light",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Bane_Of_Light.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "midnight-warrior",
    "name": "Midnight Warrior",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Midnight_Warrior.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "midnight-spawn",
    "name": "Midnight Spawn",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Midnight_Spawn.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "bride-of-night",
    "name": "Bride of Night",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Bride_Of_Night.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "shadow-hound",
    "name": "Shadow Hound",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Shadow_Hound.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "herald-of-gloom",
    "name": "Herald of Gloom",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Herald_Of_Gloom.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "nightslayer",
    "name": "Nightslayer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Nightslayer.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "duskbringer",
    "name": "Duskbringer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Duskbringer.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "acolyte-of-darkness",
    "name": "Acolyte of Darkness",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Acolyte_Of_Darkness.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "doomsday-cultist",
    "name": "Doomsday Cultist",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Doomsday_Cultist.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "dryad",
    "name": "Dryad",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dryad.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "diamond-servant",
    "name": "Diamond Servant",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Diamond_Servant.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "golden-servant",
    "name": "Golden Servant",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Golden_Servant.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "iron-servant",
    "name": "Iron Servant",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Iron_Servant.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "cake-golem",
    "name": "Cake Golem",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Cake_Golem.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "grynch-clan-goblin",
    "name": "Grynch Clan Goblin",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Grynch_Clan_Goblin.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "undead-jester",
    "name": "Undead Jester",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Undead_Jester.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "wild-horse",
    "name": "Wild Horse",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Wild_Horse.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "berrypest",
    "name": "Berrypest",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Berrypest.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "draptor",
    "name": "Draptor",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Draptor.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "undead-cavebear",
    "name": "Undead Cavebear",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Undead_Cavebear.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "albino-dragon",
    "name": "Albino Dragon",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Albino_Dragon.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "thornfire-wolf",
    "name": "Thornfire Wolf",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Thornfire_Wolf.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "crystal-wolf",
    "name": "Crystal Wolf",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Crystal_Wolf.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "dire-penguin",
    "name": "Dire Penguin",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dire_Penguin.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "troll-guard",
    "name": "Troll Guard",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Troll_Guard.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "percht",
    "name": "Percht",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Percht.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "schiach",
    "name": "Schiach",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Schiach.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "orger",
    "name": "Orger",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Orger.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "loricate-orger",
    "name": "Loricate Orger",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Loricate_Orger.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "bellicose-orger",
    "name": "Bellicose Orger",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Bellicose_Orger.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "roast-pork",
    "name": "Roast Pork",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Roast_Pork.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "cow",
    "name": "Cow",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Cow.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "feverish-citizen",
    "name": "Feverish Citizen",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Feverish_Citizen.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "terrified-elephant",
    "name": "Terrified Elephant",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Terrified_Elephant.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "elf-overseer",
    "name": "Elf Overseer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Elf_Overseer.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "midnight-panther",
    "name": "Midnight Panther",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Midnight_Panther.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "yeti",
    "name": "Yeti",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Yeti.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "haunted-dragon",
    "name": "Haunted Dragon",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Haunted_Dragon.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "ice-dragon",
    "name": "Ice Dragon",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Ice_Dragon.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "baleful-bunny",
    "name": "Baleful Bunny",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Baleful_Bunny.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "renegade-quara-constrictor",
    "name": "Renegade Quara Constrictor",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Renegade_Quara_Constrictor.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "renegade-quara-predator",
    "name": "Renegade Quara Predator",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Renegade_Quara_Predator.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "renegade-quara-pincher",
    "name": "Renegade Quara Pincher",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Renegade_Quara_Pincher.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "renegade-quara-hydromancer",
    "name": "Renegade Quara Hydromancer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Renegade_Quara_Hydromancer.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "renegade-quara-mantassin",
    "name": "Renegade Quara Mantassin",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Renegade_Quara_Mantassin.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "animated-snowman",
    "name": "Animated Snowman",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Animated_Snowman.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  },
  {
    "id": "insectoid-scout",
    "name": "Insectoid Scout",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Insectoid_Scout.gif",
    "charmPoints": 0,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "To be defined"
    ],
    "region": "Mainland",
    "recommendedLevel": 100
  }
];
