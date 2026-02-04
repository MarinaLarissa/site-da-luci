/**
 * Bestiary data structure
 *
 * Expected fields per creature:
 * - id: string (kebab-case identifier)
 * - name: string (official creature name)
 * - imageUrl: string (path to creature image)
 * - charmPoints: number (CP reward)
 * - difficulty: string (EASY, MEDIUM, HARD - legacy field)
 * - officialDifficulty: string (HARMLESS, TRIVIAL, EASY, MEDIUM, HARD, CHALLENGING - from TibiaWiki)
 * - respawnCategory: string (normal, rapid, rare)
 * - locations: array<string> (spawn locations)
 * - region: string (geographical region)
 * - elementalResistances: object {
 *     physical: number (100 = neutral, <100 = resistant, >100 = weak),
 *     fire: number,
 *     ice: number,
 *     energy: number,
 *     earth: number,
 *     holy: number,
 *     death: number
 *   }
 * - killsToComplete: number (kills needed to complete bestiary)
 * - currentKills: number (optional - user progress, filled manually or via screenshot)
 *
 * Deprecated fields (kept for backwards compatibility, will be removed in future):
 * - estimatedHours: number (imprecise, should not be displayed)
 * - recommendedLevel: number (imprecise, should not be displayed)
 */

export const DIFFICULTY = {
  HARMLESS: 'HARMLESS',
  TRIVIAL: 'TRIVIAL',
  EASY: 'EASY',
  MEDIUM: 'MEDIUM',
  HARD: 'HARD',
  CHALLENGING: 'CHALLENGING',
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
    "id": "abyssal-calamary",
    "name": "Abyssal Calamary",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Abyssal_Calamary.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 105,
      "fire": 0,
      "ice": 100,
      "energy": 105,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "acid-blob",
    "name": "Acid Blob",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Acid_Blob.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 80,
      "energy": 110,
      "earth": 0,
      "holy": 100,
      "death": 0
    },
    "killsToComplete": 500
  },
  {
    "id": "acolyte-of-darkness",
    "name": "Acolyte of Darkness",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Acolyte_Of_Darkness.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 100,
      "energy": 100,
      "earth": 0,
      "holy": 125,
      "death": 0
    },
    "killsToComplete": 2500
  },
  {
    "id": "acolyte-of-the-cult",
    "name": "Acolyte of the Cult",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Acolyte_Of_The_Cult.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Yalahar Cults, Goroma Volcano"
    ],
    "region": "Yalahar",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 110,
      "fire": 100,
      "ice": 80,
      "energy": 110,
      "earth": 80,
      "holy": 80,
      "death": 105
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "adept-of-the-cult",
    "name": "Adept of the Cult",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Adept_Of_The_Cult.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Yalahar Cults, Goroma Volcano"
    ],
    "region": "Yalahar",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 80,
      "energy": 105,
      "earth": 60,
      "holy": 70,
      "death": 105
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "adult-goanna",
    "name": "Adult Goanna",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Adult_Goanna.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 110,
      "earth": 75,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "adventurer",
    "name": "Adventurer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Adventurer.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "afflicted-strider",
    "name": "Afflicted Strider",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Afflicted_Strider.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 95,
      "fire": 110,
      "ice": 100,
      "energy": 100,
      "earth": 90,
      "holy": 100,
      "death": 85
    },
    "killsToComplete": 500
  },
  {
    "id": "agrestic-chicken",
    "name": "Agrestic Chicken",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Agrestic_Chicken.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "officialDifficulty": "TRIVIAL",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "albino-dragon",
    "name": "Albino Dragon",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Albino_Dragon.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 110,
      "energy": 80,
      "earth": 20,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "alchemistical-container",
    "name": "Alchemistical Container",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Alchemistical_Container.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "amazon",
    "name": "Amazon",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Amazon.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 105,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 105
    },
    "killsToComplete": 500
  },
  {
    "id": "an-eye",
    "name": "An Eye",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/An_Eye.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "ancient-scarab",
    "name": "Ancient Scarab",
    "imageUrl": "/images/creatures/Ancient_Scarab.gif",
    "charmPoints": 25,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Mother of Scarabs Lair -4/-5"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 90,
      "fire": 120,
      "ice": 105,
      "energy": 80,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "angry-plant-thing",
    "name": "Angry Plant Thing",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Angry_Plant_Thing.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 55,
      "fire": 55,
      "ice": 55,
      "energy": 55,
      "earth": 55,
      "holy": 55,
      "death": 55
    },
    "killsToComplete": 500
  },
  {
    "id": "angry-sugar-fairy",
    "name": "Angry Sugar Fairy",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Angry_Sugar_Fairy.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 90,
      "energy": 60,
      "earth": 110,
      "holy": 90,
      "death": 60
    },
    "killsToComplete": 500
  },
  {
    "id": "animated-feather",
    "name": "Animated Feather",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Animated_Feather.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 118,
      "ice": 0,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "animated-snowman",
    "name": "Animated Snowman",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Animated_Snowman.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 120,
      "ice": 80,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "antenna",
    "name": "Antenna",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Antenna.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "arachnophobica",
    "name": "Arachnophobica",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Arachnophobica.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 50,
      "earth": 100,
      "holy": 140,
      "death": 50
    },
    "killsToComplete": 500
  },
  {
    "id": "arbaziloth",
    "name": "Arbaziloth",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Arbaziloth.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 70,
      "fire": 85,
      "ice": 80,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 80
    },
    "killsToComplete": 500
  },
  {
    "id": "arctic-faun",
    "name": "Arctic Faun",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Arctic_Faun.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 90,
      "fire": 115,
      "ice": 20,
      "energy": 110,
      "earth": 30,
      "holy": 70,
      "death": 80
    },
    "killsToComplete": 1000
  },
  {
    "id": "armadile",
    "name": "Armadile",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Armadile.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 95,
      "fire": 100,
      "ice": 85,
      "energy": 85,
      "earth": 0,
      "holy": 85,
      "death": 55
    },
    "killsToComplete": 1000
  },
  {
    "id": "askarak-demon",
    "name": "Askarak Demon",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Askarak_Demon.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 125,
      "ice": 40,
      "energy": 40,
      "earth": 0,
      "holy": 100,
      "death": 105
    },
    "killsToComplete": 500
  },
  {
    "id": "askarak-lord",
    "name": "Askarak Lord",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Askarak_Lord.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 120,
      "ice": 35,
      "energy": 35,
      "earth": 0,
      "holy": 100,
      "death": 105
    },
    "killsToComplete": 1000
  },
  {
    "id": "askarak-prince",
    "name": "Askarak Prince",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Askarak_Prince.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 115,
      "ice": 30,
      "energy": 30,
      "earth": 0,
      "holy": 100,
      "death": 105
    },
    "killsToComplete": 1000
  },
  {
    "id": "assassin",
    "name": "Assassin",
    "imageUrl": "/images/creatures/Assassin.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Dark Cathedral"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 110,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 105
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "atab",
    "name": "Atab",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Atab.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 115,
      "earth": 100,
      "holy": 50,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "azure-frog",
    "name": "Azure Frog",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Azure_Frog.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 90,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "badger",
    "name": "Badger",
    "imageUrl": "/images/creatures/Badger.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Svargrond Mammoth Mountain (South west from depot)"
    ],
    "region": "Mainland",
    "recommendedLevel": 50,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "TRIVIAL",
    "killsToComplete": 500
  },
  {
    "id": "bakragore",
    "name": "Bakragore",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Bakragore.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 105,
      "holy": 100,
      "death": 65
    },
    "killsToComplete": 500
  },
  {
    "id": "baleful-bunny",
    "name": "Baleful Bunny",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Baleful_Bunny.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 95,
      "earth": 95,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "bandit",
    "name": "Bandit",
    "imageUrl": "/images/creatures/Bandit.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Dark Cathedral"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 110,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 105
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "bane-bringer",
    "name": "Bane Bringer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Bane_Bringer.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 110,
      "fire": 10,
      "ice": 10,
      "energy": 10,
      "earth": 10,
      "holy": 10,
      "death": 10
    },
    "killsToComplete": 2500
  },
  {
    "id": "bane-of-light",
    "name": "Bane of Light",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Bane_Of_Light.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 0,
      "energy": 120,
      "earth": 80,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "banshee",
    "name": "Banshee",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Banshee.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 100,
      "energy": 100,
      "earth": 0,
      "holy": 125,
      "death": 0
    },
    "killsToComplete": 500
  },
  {
    "id": "barbarian-bloodwalker",
    "name": "Barbarian Bloodwalker",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Barbarian_Bloodwalker.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 90,
      "fire": 100,
      "ice": 50,
      "energy": 90,
      "earth": 105,
      "holy": 80,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "barbarian-brutetamer",
    "name": "Barbarian Brutetamer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Barbarian_Brutetamer.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 110,
      "fire": 100,
      "ice": 50,
      "energy": 80,
      "earth": 100,
      "holy": 90,
      "death": 105
    },
    "killsToComplete": 500
  },
  {
    "id": "barbarian-headsplitter",
    "name": "Barbarian Headsplitter",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Barbarian_Headsplitter.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 50,
      "energy": 80,
      "earth": 110,
      "holy": 80,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "barbarian-skullhunter",
    "name": "Barbarian Skullhunter",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Barbarian_Skullhunter.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 90,
      "fire": 100,
      "ice": 50,
      "energy": 80,
      "earth": 110,
      "holy": 90,
      "death": 105
    },
    "killsToComplete": 500
  },
  {
    "id": "barkless-devotee",
    "name": "Barkless Devotee",
    "imageUrl": "/images/creatures/Barkless_Devotee.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Ab'Dendriel Cults"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 90,
      "ice": 85,
      "energy": 83,
      "earth": 100,
      "holy": 100,
      "death": 85
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "barkless-fanatic",
    "name": "Barkless Fanatic",
    "imageUrl": "/images/creatures/Barkless_Fanatic.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Ab'Dendriel Cults"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 90,
      "ice": 85,
      "energy": 83,
      "earth": 100,
      "holy": 100,
      "death": 85
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "bashmu",
    "name": "Bashmu",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Bashmu.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 95,
      "fire": 100,
      "ice": 105,
      "energy": 95,
      "earth": 80,
      "holy": 110,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "bat",
    "name": "Bat",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Bat.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "officialDifficulty": "TRIVIAL",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 110,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "bear",
    "name": "Bear",
    "imageUrl": "/images/creatures/Bear.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Poacher's Cave (Wildlife stage)"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 110,
      "energy": 100,
      "earth": 100,
      "holy": 90,
      "death": 105
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "behemoth",
    "name": "Behemoth",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Behemoth.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 90,
      "fire": 70,
      "ice": 110,
      "energy": 90,
      "earth": 20,
      "holy": 70,
      "death": 105
    },
    "killsToComplete": 500
  },
  {
    "id": "bellicose-orger",
    "name": "Bellicose Orger",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Bellicose_Orger.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 80,
      "earth": 110,
      "holy": 90,
      "death": 110
    },
    "killsToComplete": 1000
  },
  {
    "id": "berrypest",
    "name": "Berrypest",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Berrypest.gif",
    "charmPoints": 5,
    "difficulty": "HARMLESS",
    "officialDifficulty": "HARMLESS",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "berserker-chicken",
    "name": "Berserker Chicken",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Berserker_Chicken.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 110,
      "fire": 90,
      "ice": 90,
      "energy": 90,
      "earth": 90,
      "holy": 90,
      "death": 90
    },
    "killsToComplete": 1000
  },
  {
    "id": "betrayed-wraith",
    "name": "Betrayed Wraith",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Betrayed_Wraith.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 50,
      "energy": 90,
      "earth": 0,
      "holy": 120,
      "death": 0
    },
    "killsToComplete": 500
  },
  {
    "id": "billdodger",
    "name": "Billdodger",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Billdodger.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "biting-book",
    "name": "Biting Book",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Biting_Book.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 50,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "black-sheep",
    "name": "Black Sheep",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Black_Sheep.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "officialDifficulty": "TRIVIAL",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "black-sphinx-acolyte",
    "name": "Black Sphinx Acolyte",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Black_Sphinx_Acolyte.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 90,
      "holy": 130,
      "death": 0
    },
    "killsToComplete": 500
  },
  {
    "id": "blemished-spawn",
    "name": "Blemished Spawn",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Blemished_Spawn.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 115,
      "ice": 100,
      "energy": 100,
      "earth": 90,
      "holy": 100,
      "death": 90
    },
    "killsToComplete": 500
  },
  {
    "id": "blight-spitter",
    "name": "Blight Spitter",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Blight_Spitter.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "blightling",
    "name": "Blightling",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Blightling.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "blightwalker",
    "name": "Blightwalker",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Blightwalker.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 110,
      "fire": 50,
      "ice": 85,
      "energy": 80,
      "earth": 0,
      "holy": 130,
      "death": 0
    },
    "killsToComplete": 500
  },
  {
    "id": "bloated-man-maggot",
    "name": "Bloated Man-Maggot",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Bloated_Man-maggot.gif",
    "charmPoints": 5,
    "difficulty": "CHALLENGING",
    "officialDifficulty": "CHALLENGING",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 55,
      "fire": 85,
      "ice": 115,
      "energy": 115,
      "earth": 60,
      "holy": 105,
      "death": 95
    },
    "killsToComplete": 500
  },
  {
    "id": "blocking-stalagmite",
    "name": "Blocking Stalagmite",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Blocking_Stalagmite.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 0,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 0
    },
    "killsToComplete": 500
  },
  {
    "id": "blood-beast",
    "name": "Blood Beast",
    "imageUrl": "/images/creatures/Blood_Beast.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Oramond West"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 100,
      "energy": 90,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "blood-crab",
    "name": "Blood Crab",
    "imageUrl": "/images/creatures/Blood_Crab.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Laguna Blood Crab Caves"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 95,
      "fire": 110,
      "ice": 0,
      "energy": 105,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "blood-guardian",
    "name": "Blood Guardian",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Blood_Guardian.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "blood-hand",
    "name": "Blood Hand",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Blood_Hand.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 90,
      "energy": 80,
      "earth": 0,
      "holy": 110,
      "death": 50
    },
    "killsToComplete": 500
  },
  {
    "id": "blood-pool",
    "name": "Blood Pool",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Blood_Pool.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "blood-priest",
    "name": "Blood Priest",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Blood_Priest.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 108,
      "fire": 108,
      "ice": 85,
      "energy": 85,
      "earth": 0,
      "holy": 108,
      "death": 50
    },
    "killsToComplete": 500
  },
  {
    "id": "blooming-tower-light-blue",
    "name": "Blooming Tower (Light Blue)",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Blooming_Tower_(light_Blue).gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "blooming-tower-red",
    "name": "Blooming Tower (Red)",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Blooming_Tower_(red).gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "blooming-tower-violet",
    "name": "Blooming Tower (Violet)",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Blooming_Tower_(violet).gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "blooming-tower-yellow",
    "name": "Blooming Tower (Yellow)",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Blooming_Tower_(yellow).gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "blue-djinn",
    "name": "Blue Djinn",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Blue_Djinn.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 20,
      "ice": 110,
      "energy": 50,
      "earth": 100,
      "holy": 80,
      "death": 113
    },
    "killsToComplete": 500
  },
  {
    "id": "bluebeak",
    "name": "Bluebeak",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Bluebeak.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 100,
      "energy": 105,
      "earth": 100,
      "holy": 90,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "boar",
    "name": "Boar",
    "imageUrl": "/images/creatures/Boar.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Poacher's Cave (Wildlife stage)"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "boar-man",
    "name": "Boar Man",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Boar_Man.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 85,
      "fire": 85,
      "ice": 95,
      "energy": 85,
      "earth": 95,
      "holy": 110,
      "death": 95
    },
    "killsToComplete": 500
  },
  {
    "id": "bog-frog",
    "name": "Bog Frog",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Bog_Frog.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "officialDifficulty": "TRIVIAL",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "bog-raider",
    "name": "Bog Raider",
    "imageUrl": "/images/creatures/Bog_Raider.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Oramond Hydra Cave"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 105,
      "fire": 15,
      "ice": 105,
      "energy": 110,
      "earth": 70,
      "holy": 105,
      "death": 95
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "bone-barrier",
    "name": "Bone Barrier",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Bone_Barrier.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "bone-bear",
    "name": "Bone Bear",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Bone_Bear.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "bone-overlord",
    "name": "Bone Overlord",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Bone_Overlord.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "bonebeast",
    "name": "Bonebeast",
    "imageUrl": "/images/creatures/Bonebeast.gif",
    "charmPoints": 25,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Mother of Scarabs Lair -4/-5, Edron Old Fortress -1"
    ],
    "region": "Edron",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 100,
      "energy": 100,
      "earth": 0,
      "holy": 125,
      "death": 0
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "bonelord",
    "name": "Bonelord",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Bonelord.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 80,
      "energy": 100,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "bonelord-totem",
    "name": "Bonelord Totem",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Bonelord_Totem.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "bonelords-phylactery",
    "name": "Bonelord's Phylactery",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Bonelord's_Phylactery.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "bony-sea-devil",
    "name": "Bony Sea Devil",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Bony_Sea_Devil.gif",
    "charmPoints": 5,
    "difficulty": "CHALLENGING",
    "officialDifficulty": "CHALLENGING",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 40,
      "energy": 100,
      "earth": 60,
      "holy": 110,
      "death": 95
    },
    "killsToComplete": 500
  },
  {
    "id": "boogy",
    "name": "Boogy",
    "imageUrl": "/images/creatures/Boogy.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Dark Faun Cave"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 90,
      "fire": 100,
      "ice": 90,
      "energy": 100,
      "earth": 30,
      "holy": 60,
      "death": 80
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "bound-ape",
    "name": "Bound Ape",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Bound_Ape.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "bound-cave-spider",
    "name": "Bound Cave Spider",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Bound_Cave_Spider.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "bound-iks-aucar",
    "name": "Bound Iks Aucar",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Bound_Iks_Aucar.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "brachiodemon",
    "name": "Brachiodemon",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Brachiodemon.gif",
    "charmPoints": 5,
    "difficulty": "CHALLENGING",
    "officialDifficulty": "CHALLENGING",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 70,
      "ice": 125,
      "energy": 100,
      "earth": 100,
      "holy": 135,
      "death": 50
    },
    "killsToComplete": 500
  },
  {
    "id": "brain-squid",
    "name": "Brain Squid",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Brain_Squid.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 0,
      "earth": 100,
      "holy": 0,
      "death": 115
    },
    "killsToComplete": 500
  },
  {
    "id": "braindeath",
    "name": "Braindeath",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Braindeath.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 85,
      "fire": 115,
      "ice": 80,
      "energy": 90,
      "earth": 0,
      "holy": 120,
      "death": 0
    },
    "killsToComplete": 500
  },
  {
    "id": "bramble-wyrmling",
    "name": "Bramble Wyrmling",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Bramble_Wyrmling.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 95,
      "fire": 105,
      "ice": 100,
      "energy": 100,
      "earth": 80,
      "holy": 95,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "branchy-crawler",
    "name": "Branchy Crawler",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Branchy_Crawler.gif",
    "charmPoints": 5,
    "difficulty": "CHALLENGING",
    "officialDifficulty": "CHALLENGING",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 109,
      "ice": 100,
      "energy": 105,
      "earth": 50,
      "holy": 60,
      "death": 115
    },
    "killsToComplete": 500
  },
  {
    "id": "breach-brood",
    "name": "Breach Brood",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Breach_Brood.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 105,
      "fire": 90,
      "ice": 75,
      "energy": 20,
      "earth": 105,
      "holy": 105,
      "death": 105
    },
    "killsToComplete": 500
  },
  {
    "id": "bride-of-night",
    "name": "Bride of Night",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Bride_Of_Night.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 85,
      "earth": 110,
      "holy": 90,
      "death": 110
    },
    "killsToComplete": 2500
  },
  {
    "id": "bright-crystal",
    "name": "Bright Crystal",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Bright_Crystal.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "brimstone-bug",
    "name": "Brimstone Bug",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Brimstone_Bug.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 110,
      "fire": 110,
      "ice": 110,
      "energy": 110,
      "earth": 0,
      "holy": 110,
      "death": 0
    },
    "killsToComplete": 500
  },
  {
    "id": "brinebrute-inferniarch",
    "name": "Brinebrute Inferniarch",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Brinebrute_Inferniarch.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 80,
      "fire": 100,
      "ice": 90,
      "energy": 85,
      "earth": 110,
      "holy": 100,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "broken-shaper",
    "name": "Broken Shaper",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Broken_Shaper.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 90,
      "fire": 115,
      "ice": 80,
      "energy": 115,
      "earth": 70,
      "holy": 80,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "broodrider-inferniarch",
    "name": "Broodrider Inferniarch",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Broodrider_Inferniarch.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 115,
      "energy": 105,
      "earth": 90,
      "holy": 110,
      "death": 85
    },
    "killsToComplete": 500
  },
  {
    "id": "bug",
    "name": "Bug",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Bug.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "officialDifficulty": "TRIVIAL",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "bulltaur-alchemist",
    "name": "Bulltaur Alchemist",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Bulltaur_Alchemist.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 70,
      "fire": 100,
      "ice": 85,
      "energy": 100,
      "earth": 120,
      "holy": 105,
      "death": 105
    },
    "killsToComplete": 500
  },
  {
    "id": "bulltaur-brute",
    "name": "Bulltaur Brute",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Bulltaur_Brute.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 70,
      "fire": 90,
      "ice": 90,
      "energy": 105,
      "earth": 120,
      "holy": 110,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "bulltaur-forgepriest",
    "name": "Bulltaur Forgepriest",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Bulltaur_Forgepriest.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 80,
      "fire": 85,
      "ice": 110,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "burning-book",
    "name": "Burning Book",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Burning_Book.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 110,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "burning-gladiator",
    "name": "Burning Gladiator",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Burning_Gladiator.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 80,
      "fire": 70,
      "ice": 120,
      "energy": 80,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "burster-spectre",
    "name": "Burster Spectre",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Burster_Spectre.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 0,
      "fire": 120,
      "ice": 30,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "butterfly-blue",
    "name": "Butterfly (Blue)",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Butterfly_(blue).gif",
    "charmPoints": 5,
    "difficulty": "HARMLESS",
    "officialDifficulty": "HARMLESS",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "butterfly-purple",
    "name": "Butterfly (Purple)",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Butterfly_(purple).gif",
    "charmPoints": 5,
    "difficulty": "HARMLESS",
    "officialDifficulty": "HARMLESS",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "butterfly-purplebluered",
    "name": "Butterfly (Purple/Blue/Red)",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Butterfly_(purple/blue/red).gif",
    "charmPoints": 1,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "All over Tiquanda"
    ],
    "region": "Mainland",
    "recommendedLevel": 20
  },
  {
    "id": "butterfly-red",
    "name": "Butterfly (Red)",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Butterfly_(red).gif",
    "charmPoints": 5,
    "difficulty": "HARMLESS",
    "officialDifficulty": "HARMLESS",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "cake-golem",
    "name": "Cake Golem",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Cake_Golem.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 80,
      "fire": 15,
      "ice": 5,
      "energy": 10,
      "earth": 5,
      "holy": 5,
      "death": 15
    },
    "killsToComplete": 2500
  },
  {
    "id": "calamary",
    "name": "Calamary",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Calamary.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 105,
      "fire": 0,
      "ice": 100,
      "energy": 105,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "candy-floss-elemental",
    "name": "Candy Floss Elemental",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Candy_Floss_Elemental.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 60,
      "fire": 115,
      "ice": 85,
      "energy": 85,
      "earth": 110,
      "holy": 100,
      "death": 80
    },
    "killsToComplete": 500
  },
  {
    "id": "candy-horror",
    "name": "Candy Horror",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Candy_Horror.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 95,
      "fire": 95,
      "ice": 100,
      "energy": 110,
      "earth": 90,
      "holy": 115,
      "death": 50
    },
    "killsToComplete": 500
  },
  {
    "id": "capricious-phantom",
    "name": "Capricious Phantom",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Capricious_Phantom.gif",
    "charmPoints": 5,
    "difficulty": "CHALLENGING",
    "officialDifficulty": "CHALLENGING",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 110,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 50,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "carniphila",
    "name": "Carniphila",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Carniphila.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 120,
      "ice": 80,
      "energy": 90,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "carnivorous-butterfly",
    "name": "Carnivorous Butterfly",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Carnivorous_Butterfly.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "carnivostrich",
    "name": "Carnivostrich",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Carnivostrich.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 110,
      "fire": 110,
      "ice": 110,
      "energy": 85,
      "earth": 100,
      "holy": 120,
      "death": 95
    },
    "killsToComplete": 500
  },
  {
    "id": "carrion-worm",
    "name": "Carrion Worm",
    "imageUrl": "/images/creatures/Carrion_Worm.gif",
    "charmPoints": 15,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Liberty Bay Rotworms"
    ],
    "region": "Liberty Bay",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 105,
      "energy": 90,
      "earth": 80,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "cat",
    "name": "Cat",
    "imageUrl": "/images/creatures/Cat.gif",
    "charmPoints": 1,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Yalahar"
    ],
    "region": "Yalahar",
    "recommendedLevel": 20,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "HARMLESS",
    "killsToComplete": 500
  },
  {
    "id": "cave-chimera",
    "name": "Cave Chimera",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Cave_Chimera.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 90,
      "energy": 80,
      "earth": 110,
      "holy": 100,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "cave-devourer",
    "name": "Cave Devourer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Cave_Devourer.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 120,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "cave-parrot",
    "name": "Cave Parrot",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Cave_Parrot.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "officialDifficulty": "TRIVIAL",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "cave-rat",
    "name": "Cave Rat",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Cave_Rat.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "officialDifficulty": "TRIVIAL",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "cellar-rat",
    "name": "Cellar Rat",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Cellar_Rat.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "centipede",
    "name": "Centipede",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Centipede.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 115,
      "ice": 80,
      "energy": 90,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "chakoya-toolshaper",
    "name": "Chakoya Toolshaper",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Chakoya_Toolshaper.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 60,
      "ice": 0,
      "energy": 115,
      "earth": 100,
      "holy": 90,
      "death": 105
    },
    "killsToComplete": 500
  },
  {
    "id": "chakoya-tribewarden",
    "name": "Chakoya Tribewarden",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Chakoya_Tribewarden.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 75,
      "ice": 0,
      "energy": 115,
      "earth": 100,
      "holy": 90,
      "death": 105
    },
    "killsToComplete": 500
  },
  {
    "id": "chakoya-windcaller",
    "name": "Chakoya Windcaller",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Chakoya_Windcaller.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 50,
      "ice": 0,
      "energy": 115,
      "earth": 100,
      "holy": 80,
      "death": 108
    },
    "killsToComplete": 500
  },
  {
    "id": "charged-imp",
    "name": "Charged Imp",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Charged_Imp.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 0,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "chasm-spawn",
    "name": "Chasm Spawn",
    "imageUrl": "/images/creatures/Chasm_Spawn.gif",
    "charmPoints": 50,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Warzone 4 (650/h~)"
    ],
    "region": "Mainland",
    "recommendedLevel": 200,
    "elementalResistances": {
      "physical": 100,
      "fire": 130,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "HARD",
    "killsToComplete": 500
  },
  {
    "id": "cheeky-sugar-cube",
    "name": "Cheeky Sugar Cube",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Cheeky_Sugar_Cube.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 95,
      "energy": 110,
      "earth": 80,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "chicken",
    "name": "Chicken",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Chicken.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "officialDifficulty": "TRIVIAL",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "chocolate-blob",
    "name": "Chocolate Blob",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Chocolate_Blob.gif",
    "charmPoints": 5,
    "difficulty": "HARMLESS",
    "officialDifficulty": "HARMLESS",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 70,
      "fire": 60,
      "ice": 105,
      "energy": 100,
      "earth": 65,
      "holy": 90,
      "death": 75
    },
    "killsToComplete": 500
  },
  {
    "id": "choking-fear",
    "name": "Choking Fear",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Choking_Fear.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 90,
      "fire": 0,
      "ice": 90,
      "energy": 98,
      "earth": 0,
      "holy": 100,
      "death": 45
    },
    "killsToComplete": 500
  },
  {
    "id": "cinder-wyrmling",
    "name": "Cinder Wyrmling",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Cinder_Wyrmling.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 95,
      "fire": 80,
      "ice": 110,
      "energy": 100,
      "earth": 105,
      "holy": 95,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "clavius",
    "name": "Clavius",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Clavius.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 125,
      "fire": 106,
      "ice": 75,
      "energy": 85,
      "earth": 112,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "clay-guardian",
    "name": "Clay Guardian",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Clay_Guardian.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 75,
      "fire": 100,
      "ice": 80,
      "energy": 70,
      "earth": 0,
      "holy": 100,
      "death": 60
    },
    "killsToComplete": 500
  },
  {
    "id": "cliff-strider",
    "name": "Cliff Strider",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Cliff_Strider.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 90,
      "fire": 80,
      "ice": 80,
      "energy": 95,
      "earth": 0,
      "holy": 100,
      "death": 65
    },
    "killsToComplete": 1000
  },
  {
    "id": "cloak-of-terror",
    "name": "Cloak of Terror",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Cloak_Of_Terror.gif",
    "charmPoints": 5,
    "difficulty": "CHALLENGING",
    "officialDifficulty": "CHALLENGING",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 40,
      "earth": 105,
      "holy": 60,
      "death": 120
    },
    "killsToComplete": 500
  },
  {
    "id": "clomp",
    "name": "Clomp",
    "imageUrl": "/images/creatures/Clomp.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Krailos Surface"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "cobra",
    "name": "Cobra",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Cobra.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 100,
      "energy": 100,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "cobra-assassin",
    "name": "Cobra Assassin",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Cobra_Assassin.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 80,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "cobra-scout",
    "name": "Cobra Scout",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Cobra_Scout.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "cobra-vizier",
    "name": "Cobra Vizier",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Cobra_Vizier.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 90,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 0,
      "holy": 110,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "converter",
    "name": "Converter",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Converter.gif",
    "charmPoints": 5,
    "difficulty": "CHALLENGING",
    "officialDifficulty": "CHALLENGING",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 120,
      "fire": 75,
      "ice": 100,
      "energy": 110,
      "earth": 90,
      "holy": 65,
      "death": 115
    },
    "killsToComplete": 500
  },
  {
    "id": "coral-frog",
    "name": "Coral Frog",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Coral_Frog.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 90,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "corrupted-ghost",
    "name": "Corrupted Ghost",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Corrupted_Ghost.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "officialDifficulty": "TRIVIAL",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 95,
      "fire": 110,
      "ice": 105,
      "energy": 100,
      "earth": 95,
      "holy": 100,
      "death": 90
    },
    "killsToComplete": 1000
  },
  {
    "id": "corrupted-skeleton",
    "name": "Corrupted Skeleton",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Corrupted_Skeleton.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "officialDifficulty": "TRIVIAL",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 110,
      "energy": 100,
      "earth": 100,
      "holy": 125,
      "death": 90
    },
    "killsToComplete": 1000
  },
  {
    "id": "corym-charlatan",
    "name": "Corym Charlatan",
    "imageUrl": "/images/creatures/Corym_Charlatan.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Coryms PH, Coryms Venore"
    ],
    "region": "Venore",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 75,
      "earth": 75,
      "holy": 105,
      "death": 85
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "corym-skirmisher",
    "name": "Corym Skirmisher",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Corym_Skirmisher.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 85,
      "earth": 75,
      "holy": 105,
      "death": 80
    },
    "killsToComplete": 500
  },
  {
    "id": "corym-vanguard",
    "name": "Corym Vanguard",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Corym_Vanguard.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 90,
      "energy": 80,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "courage-leech",
    "name": "Courage Leech",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Courage_Leech.gif",
    "charmPoints": 5,
    "difficulty": "CHALLENGING",
    "officialDifficulty": "CHALLENGING",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 80,
      "fire": 100,
      "ice": 100,
      "energy": 50,
      "earth": 120,
      "holy": 70,
      "death": 125
    },
    "killsToComplete": 500
  },
  {
    "id": "court-warlock",
    "name": "Court Warlock",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Court_Warlock.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "cow",
    "name": "Cow",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Cow.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 110,
      "holy": 90,
      "death": 110
    },
    "killsToComplete": 1000
  },
  {
    "id": "crab",
    "name": "Crab",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Crab.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 80,
      "energy": 110,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "crape-man",
    "name": "Crape Man",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Crape_Man.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 75,
      "fire": 100,
      "ice": 105,
      "energy": 90,
      "earth": 95,
      "holy": 100,
      "death": 115
    },
    "killsToComplete": 500
  },
  {
    "id": "crawler",
    "name": "Crawler",
    "imageUrl": "/images/creatures/Crawler.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Inner Hive"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 108,
      "ice": 107,
      "energy": 100,
      "earth": 0,
      "holy": 105,
      "death": 95
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "crazed-beggar",
    "name": "Crazed Beggar",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Crazed_Beggar.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 95,
      "fire": 100,
      "ice": 100,
      "energy": 80,
      "earth": 110,
      "holy": 90,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "crazed-summer-rearguard",
    "name": "Crazed Summer Rearguard",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Crazed_Summer_Rearguard.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 110,
      "fire": 60,
      "ice": 125,
      "energy": 100,
      "earth": 100,
      "holy": 80,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "crazed-summer-vanguard",
    "name": "Crazed Summer Vanguard",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Crazed_Summer_Vanguard.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 50,
      "ice": 130,
      "energy": 100,
      "earth": 100,
      "holy": 80,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "crazed-winter-rearguard",
    "name": "Crazed Winter Rearguard",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Crazed_Winter_Rearguard.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 120,
      "ice": 60,
      "energy": 115,
      "earth": 120,
      "holy": 100,
      "death": 80
    },
    "killsToComplete": 500
  },
  {
    "id": "crazed-winter-vanguard",
    "name": "Crazed Winter Vanguard",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Crazed_Winter_Vanguard.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 130,
      "ice": 50,
      "energy": 120,
      "earth": 115,
      "holy": 100,
      "death": 85
    },
    "killsToComplete": 500
  },
  {
    "id": "cream-blob",
    "name": "Cream Blob",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Cream_Blob.gif",
    "charmPoints": 5,
    "difficulty": "HARMLESS",
    "officialDifficulty": "HARMLESS",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 115,
      "ice": 85,
      "energy": 100,
      "earth": 75,
      "holy": 90,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "creepy-crawler",
    "name": "Creepy Crawler",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Creepy_Crawler.gif",
    "charmPoints": 5,
    "difficulty": "CHALLENGING",
    "officialDifficulty": "CHALLENGING",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 94,
      "fire": 112,
      "ice": 94,
      "energy": 88,
      "earth": 112,
      "holy": 106,
      "death": 97
    },
    "killsToComplete": 500
  },
  {
    "id": "crimson-frog",
    "name": "Crimson Frog",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Crimson_Frog.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 90,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "crocodile",
    "name": "Crocodile",
    "imageUrl": "/images/creatures/Crocodile.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Port Hope Crocodile Cave"
    ],
    "region": "Port Hope",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 110,
      "fire": 110,
      "ice": 90,
      "energy": 105,
      "earth": 80,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "crusader",
    "name": "Crusader",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Crusader.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 90,
      "fire": 95,
      "ice": 110,
      "energy": 90,
      "earth": 105,
      "holy": 90,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "crustacea-gigantica",
    "name": "Crustacea Gigantica",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Crustacea_Gigantica.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 80,
      "fire": 100,
      "ice": 0,
      "energy": 105,
      "earth": 100,
      "holy": 100,
      "death": 90
    },
    "killsToComplete": 2500
  },
  {
    "id": "crypt-construct",
    "name": "Crypt Construct",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Crypt_Construct.gif",
    "charmPoints": 5,
    "difficulty": "CHALLENGING",
    "officialDifficulty": "CHALLENGING",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 106,
      "fire": 106,
      "ice": 88,
      "energy": 82,
      "earth": 109,
      "holy": 92,
      "death": 92
    },
    "killsToComplete": 500
  },
  {
    "id": "crypt-defiler",
    "name": "Crypt Defiler",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Crypt_Defiler.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 110,
      "fire": 80,
      "ice": 110,
      "energy": 100,
      "earth": 100,
      "holy": 80,
      "death": 110
    },
    "killsToComplete": 1000
  },
  {
    "id": "crypt-fiend",
    "name": "Crypt Fiend",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Crypt_Fiend.gif",
    "charmPoints": 5,
    "difficulty": "CHALLENGING",
    "officialDifficulty": "CHALLENGING",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 106,
      "fire": 109,
      "ice": 91,
      "energy": 85,
      "earth": 112,
      "holy": 103,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "crypt-mage",
    "name": "Crypt Mage",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Crypt_Mage.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 109
    },
    "killsToComplete": 500
  },
  {
    "id": "crypt-shambler",
    "name": "Crypt Shambler",
    "imageUrl": "/images/creatures/Crypt_Shambler.gif",
    "charmPoints": 15,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Yalahar Cemetery, Mount Sternum, Ramoa -1/-2"
    ],
    "region": "Yalahar",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 0,
      "holy": 125,
      "death": 0
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "crypt-warden",
    "name": "Crypt Warden",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Crypt_Warden.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 80,
      "holy": 75,
      "death": 135
    },
    "killsToComplete": 500
  },
  {
    "id": "crypt-warrior",
    "name": "Crypt Warrior",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Crypt_Warrior.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 100,
      "energy": 105,
      "earth": 95,
      "holy": 125,
      "death": 0
    },
    "killsToComplete": 500
  },
  {
    "id": "crystal-spider",
    "name": "Crystal Spider",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Crystal_Spider.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 0,
      "energy": 120,
      "earth": 80,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "crystal-wolf",
    "name": "Crystal Wolf",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Crystal_Wolf.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 105,
      "fire": 90,
      "ice": 50,
      "energy": 105,
      "earth": 95,
      "holy": 90,
      "death": 90
    },
    "killsToComplete": 2500
  },
  {
    "id": "crystalcrusher",
    "name": "Crystalcrusher",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Crystalcrusher.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 85,
      "ice": 103,
      "energy": 105,
      "earth": 0,
      "holy": 110,
      "death": 90
    },
    "killsToComplete": 500
  },
  {
    "id": "cult-believer",
    "name": "Cult Believer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Cult_Believer.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 90,
      "ice": 90,
      "energy": 90,
      "earth": 90,
      "holy": 90,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "cult-enforcer",
    "name": "Cult Enforcer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Cult_Enforcer.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 90,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "cult-scholar",
    "name": "Cult Scholar",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Cult_Scholar.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 80,
      "fire": 70,
      "ice": 70,
      "energy": 70,
      "earth": 70,
      "holy": 70,
      "death": 70
    },
    "killsToComplete": 1000
  },
  {
    "id": "cunning-werepanther",
    "name": "Cunning Werepanther",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Cunning_Werepanther.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 115,
      "ice": 80,
      "energy": 80,
      "earth": 125,
      "holy": 90,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "cursed-ape",
    "name": "Cursed Ape",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Cursed_Ape.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 105,
      "energy": 95,
      "earth": 90,
      "holy": 125,
      "death": 60
    },
    "killsToComplete": 500
  },
  {
    "id": "cursed-book",
    "name": "Cursed Book",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Cursed_Book.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 110,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "cursed-prospector",
    "name": "Cursed Prospector",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Cursed_Prospector.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 40,
      "fire": 105,
      "ice": 105,
      "energy": 100,
      "earth": 100,
      "holy": 50,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "cyclops",
    "name": "Cyclops",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Cyclops.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 75,
      "earth": 110,
      "holy": 80,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "cyclops-drone",
    "name": "Cyclops Drone",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Cyclops_Drone.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 80,
      "energy": 90,
      "earth": 110,
      "holy": 80,
      "death": 105
    },
    "killsToComplete": 500
  },
  {
    "id": "cyclops-smith",
    "name": "Cyclops Smith",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Cyclops_Smith.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 90,
      "ice": 100,
      "energy": 80,
      "earth": 110,
      "holy": 80,
      "death": 105
    },
    "killsToComplete": 500
  },
  {
    "id": "cyclursus",
    "name": "Cyclursus",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Cyclursus.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 103,
      "ice": 103,
      "energy": 103,
      "earth": 103,
      "holy": 103,
      "death": 112
    },
    "killsToComplete": 500
  },
  {
    "id": "damaged-crystal-golem",
    "name": "Damaged Crystal Golem",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Damaged_Crystal_Golem.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 80,
      "fire": 0,
      "ice": 0,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "damaged-worker-golem",
    "name": "Damaged Worker Golem",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Damaged_Worker_Golem.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 90,
      "fire": 100,
      "ice": 90,
      "energy": 105,
      "earth": 50,
      "holy": 50,
      "death": 90
    },
    "killsToComplete": 500
  },
  {
    "id": "dangerous-apparatus",
    "name": "Dangerous Apparatus",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dangerous_Apparatus.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 0,
      "fire": 0,
      "ice": 0,
      "energy": 0,
      "earth": 0,
      "holy": 0,
      "death": 0
    },
    "killsToComplete": 500
  },
  {
    "id": "dark-apprentice",
    "name": "Dark Apprentice",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dark_Apprentice.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 105
    },
    "killsToComplete": 500
  },
  {
    "id": "dark-carnisylvan",
    "name": "Dark Carnisylvan",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dark_Carnisylvan.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 120,
      "ice": 110,
      "energy": 100,
      "earth": 90,
      "holy": 100,
      "death": 80
    },
    "killsToComplete": 500
  },
  {
    "id": "dark-faun",
    "name": "Dark Faun",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dark_Faun.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 90,
      "fire": 105,
      "ice": 100,
      "energy": 110,
      "earth": 30,
      "holy": 110,
      "death": 60
    },
    "killsToComplete": 500
  },
  {
    "id": "dark-magician",
    "name": "Dark Magician",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dark_Magician.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 90,
      "ice": 90,
      "energy": 80,
      "earth": 80,
      "holy": 80,
      "death": 105
    },
    "killsToComplete": 500
  },
  {
    "id": "dark-merudri",
    "name": "Dark Merudri",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dark_Merudri.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "dark-monk",
    "name": "Dark Monk",
    "imageUrl": "/images/creatures/Dark_Monk.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Dark Cathedral"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 110,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 110,
      "death": 60
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "dark-torturer",
    "name": "Dark Torturer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dark_Torturer.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 110,
      "energy": 70,
      "earth": 10,
      "holy": 110,
      "death": 90
    },
    "killsToComplete": 500
  },
  {
    "id": "darklight-construct",
    "name": "Darklight Construct",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Darklight_Construct.gif",
    "charmPoints": 5,
    "difficulty": "CHALLENGING",
    "officialDifficulty": "CHALLENGING",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 115,
      "fire": 45,
      "ice": 105,
      "energy": 105,
      "earth": 90,
      "holy": 60,
      "death": 120
    },
    "killsToComplete": 500
  },
  {
    "id": "darklight-emitter",
    "name": "Darklight Emitter",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Darklight_Emitter.gif",
    "charmPoints": 5,
    "difficulty": "CHALLENGING",
    "officialDifficulty": "CHALLENGING",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 115,
      "fire": 60,
      "ice": 100,
      "energy": 110,
      "earth": 95,
      "holy": 75,
      "death": 120
    },
    "killsToComplete": 500
  },
  {
    "id": "darklight-matter",
    "name": "Darklight Matter",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Darklight_Matter.gif",
    "charmPoints": 5,
    "difficulty": "CHALLENGING",
    "officialDifficulty": "CHALLENGING",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 110,
      "fire": 125,
      "ice": 80,
      "energy": 60,
      "earth": 110,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "darklight-source",
    "name": "Darklight Source",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Darklight_Source.gif",
    "charmPoints": 5,
    "difficulty": "CHALLENGING",
    "officialDifficulty": "CHALLENGING",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 110,
      "fire": 115,
      "ice": 60,
      "energy": 45,
      "earth": 110,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "darklight-striker",
    "name": "Darklight Striker",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Darklight_Striker.gif",
    "charmPoints": 5,
    "difficulty": "CHALLENGING",
    "officialDifficulty": "CHALLENGING",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 90,
      "fire": 125,
      "ice": 70,
      "energy": 65,
      "earth": 115,
      "holy": 90,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "dawnfire-asura",
    "name": "Dawnfire Asura",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dawnfire_Asura.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 110,
      "fire": 0,
      "ice": 110,
      "energy": 105,
      "earth": 100,
      "holy": 110,
      "death": 80
    },
    "killsToComplete": 500
  },
  {
    "id": "death-blob",
    "name": "Death Blob",
    "imageUrl": "/images/creatures/Death_Blob.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Souleater Mountains"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 80,
      "fire": 110,
      "ice": 90,
      "energy": 110,
      "earth": 0,
      "holy": 110,
      "death": 0
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "death-priest",
    "name": "Death Priest",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Death_Priest.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 20,
      "earth": 0,
      "holy": 120,
      "death": 0
    },
    "killsToComplete": 1000
  },
  {
    "id": "deathling-scout",
    "name": "Deathling Scout",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Deathling_Scout.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 0,
      "energy": 110,
      "earth": 110,
      "holy": 100,
      "death": 90
    },
    "killsToComplete": 500
  },
  {
    "id": "deathling-spellsinger",
    "name": "Deathling Spellsinger",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Deathling_Spellsinger.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 0,
      "energy": 110,
      "earth": 110,
      "holy": 100,
      "death": 90
    },
    "killsToComplete": 500
  },
  {
    "id": "decaying-totem",
    "name": "Decaying Totem",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Decaying_Totem.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "deepling-brawler",
    "name": "Deepling Brawler",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Deepling_Brawler.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 0,
      "energy": 110,
      "earth": 110,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "deepling-elite",
    "name": "Deepling Elite",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Deepling_Elite.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 0,
      "energy": 110,
      "earth": 110,
      "holy": 100,
      "death": 90
    },
    "killsToComplete": 1000
  },
  {
    "id": "deepling-guard",
    "name": "Deepling Guard",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Deepling_Guard.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 0,
      "energy": 110,
      "earth": 110,
      "holy": 100,
      "death": 90
    },
    "killsToComplete": 500
  },
  {
    "id": "deepling-master-librarian",
    "name": "Deepling Master Librarian",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Deepling_Master_Librarian.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 0,
      "energy": 110,
      "earth": 110,
      "holy": 100,
      "death": 50
    },
    "killsToComplete": 1000
  },
  {
    "id": "deepling-scout",
    "name": "Deepling Scout",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Deepling_Scout.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 0,
      "energy": 110,
      "earth": 110,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "deepling-spellsinger",
    "name": "Deepling Spellsinger",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Deepling_Spellsinger.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 0,
      "energy": 110,
      "earth": 110,
      "holy": 100,
      "death": 50
    },
    "killsToComplete": 500
  },
  {
    "id": "deepling-tyrant",
    "name": "Deepling Tyrant",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Deepling_Tyrant.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 0,
      "energy": 110,
      "earth": 110,
      "holy": 100,
      "death": 90
    },
    "killsToComplete": 1000
  },
  {
    "id": "deepling-warrior",
    "name": "Deepling Warrior",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Deepling_Warrior.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 0,
      "energy": 110,
      "earth": 110,
      "holy": 100,
      "death": 90
    },
    "killsToComplete": 500
  },
  {
    "id": "deepling-worker",
    "name": "Deepling Worker",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Deepling_Worker.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 0,
      "energy": 110,
      "earth": 110,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "deepsea-blood-crab",
    "name": "Deepsea Blood Crab",
    "imageUrl": "/images/creatures/Deepsea_Blood_Crab.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Sea Serpent Area Svargrond"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 95,
      "fire": 110,
      "ice": 0,
      "energy": 105,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "deepworm",
    "name": "Deepworm",
    "imageUrl": "/images/creatures/Deepworm.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "estimatedHours": 7,
    "respawnCategory": "normal",
    "locations": [
      "Warzone 6"
    ],
    "region": "Mainland",
    "recommendedLevel": 200,
    "elementalResistances": {
      "physical": 100,
      "fire": 120,
      "ice": 100,
      "energy": 100,
      "earth": 80,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "HARD",
    "killsToComplete": 500
  },
  {
    "id": "deer",
    "name": "Deer",
    "imageUrl": "/images/creatures/Deer.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Svargrond Mammoth Mountain (South west from depot)"
    ],
    "region": "Mainland",
    "recommendedLevel": 50,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "TRIVIAL",
    "killsToComplete": 500
  },
  {
    "id": "defiler",
    "name": "Defiler",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Defiler.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 125,
      "ice": 80,
      "energy": 90,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "demon",
    "name": "Demon",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Demon.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 75,
      "fire": 0,
      "ice": 112,
      "energy": 50,
      "earth": 60,
      "holy": 112,
      "death": 80
    },
    "killsToComplete": 500
  },
  {
    "id": "demon-outcast",
    "name": "Demon Outcast",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Demon_Outcast.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 85,
      "fire": 0,
      "ice": 95,
      "energy": 108,
      "earth": 60,
      "holy": 106,
      "death": 70
    },
    "killsToComplete": 500
  },
  {
    "id": "demon-parrot",
    "name": "Demon Parrot",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Demon_Parrot.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "demon-skeleton",
    "name": "Demon Skeleton",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Demon_Skeleton.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 100,
      "energy": 100,
      "earth": 0,
      "holy": 125,
      "death": 0
    },
    "killsToComplete": 500
  },
  {
    "id": "destroyer",
    "name": "Destroyer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Destroyer.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 80,
      "fire": 70,
      "ice": 115,
      "energy": 0,
      "earth": 80,
      "holy": 103,
      "death": 80
    },
    "killsToComplete": 500
  },
  {
    "id": "devourer",
    "name": "Devourer",
    "imageUrl": "/images/creatures/Devourer.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Oramond West"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 85,
      "energy": 105,
      "earth": 0,
      "holy": 100,
      "death": 90
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "diabolic-imp",
    "name": "Diabolic Imp",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Diabolic_Imp.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 110,
      "energy": 100,
      "earth": 50,
      "holy": 105,
      "death": 90
    },
    "killsToComplete": 500
  },
  {
    "id": "diamond-servant",
    "name": "Diamond Servant",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Diamond_Servant.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 90,
      "ice": 100,
      "energy": 0,
      "earth": 25,
      "holy": 115,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "diamond-servant-replica",
    "name": "Diamond Servant Replica",
    "imageUrl": "/images/creatures/Diamond_Servant_Replica.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Replica Dungeon (Lloyd)"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 90,
      "ice": 100,
      "energy": 0,
      "earth": 25,
      "holy": 115,
      "death": 100
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 1000
  },
  {
    "id": "digestive-ooze",
    "name": "Digestive Ooze",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Digestive_Ooze.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "dire-penguin",
    "name": "Dire Penguin",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dire_Penguin.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 50,
      "ice": 70,
      "energy": 105,
      "earth": 50,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "diremaw",
    "name": "Diremaw",
    "imageUrl": "/images/creatures/Diremaw.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "estimatedHours": 7,
    "respawnCategory": "normal",
    "locations": [
      "Warzone 6"
    ],
    "region": "Mainland",
    "recommendedLevel": 200,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 120,
      "energy": 100,
      "earth": 80,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "HARD",
    "killsToComplete": 500
  },
  {
    "id": "distorted-phantom",
    "name": "Distorted Phantom",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Distorted_Phantom.gif",
    "charmPoints": 5,
    "difficulty": "CHALLENGING",
    "officialDifficulty": "CHALLENGING",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 110,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 50,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "dog",
    "name": "Dog",
    "imageUrl": "/images/creatures/Dog.gif",
    "charmPoints": 1,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Thais"
    ],
    "region": "Thais",
    "recommendedLevel": 20,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "HARMLESS",
    "killsToComplete": 500
  },
  {
    "id": "doom-deer",
    "name": "Doom Deer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Doom_Deer.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 0,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "doomsday-cultist",
    "name": "Doomsday Cultist",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Doomsday_Cultist.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 90,
      "energy": 70,
      "earth": 80,
      "holy": 125,
      "death": 0
    },
    "killsToComplete": 2500
  },
  {
    "id": "dragolisk",
    "name": "Dragolisk",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dragolisk.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 85,
      "fire": 60,
      "ice": 105,
      "energy": 100,
      "earth": 110,
      "holy": 115,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "dragon",
    "name": "Dragon",
    "imageUrl": "/images/creatures/Dragon.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Yalahar Dragons, Edron Dragons"
    ],
    "region": "Yalahar",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 110,
      "energy": 80,
      "earth": 20,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "dragon-lord",
    "name": "Dragon Lord",
    "imageUrl": "/images/creatures/Dragon_Lord.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Fenrock DLs, POI DLs"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 110,
      "energy": 80,
      "earth": 20,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "dragonling",
    "name": "Dragonling",
    "imageUrl": "/images/creatures/Dragonling.gif",
    "charmPoints": 25,
    "difficulty": "HARD",
    "estimatedHours": 7,
    "respawnCategory": "normal",
    "locations": [
      "Fury Dungeon"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 105,
      "fire": 0,
      "ice": 95,
      "energy": 95,
      "earth": 110,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 1000
  },
  {
    "id": "draptor",
    "name": "Draptor",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Draptor.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 120,
      "fire": 50,
      "ice": 100,
      "energy": 0,
      "earth": 120,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "drillworm",
    "name": "Drillworm",
    "imageUrl": "/images/creatures/Drillworm.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Warzone 4"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 84,
      "energy": 85,
      "earth": 0,
      "holy": 85,
      "death": 85
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "dromedary",
    "name": "Dromedary",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dromedary.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "officialDifficulty": "TRIVIAL",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "dryad",
    "name": "Dryad",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dryad.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 120,
      "ice": 80,
      "energy": 70,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "duskbringer",
    "name": "Duskbringer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Duskbringer.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 90,
      "fire": 60,
      "ice": 110,
      "energy": 90,
      "earth": 20,
      "holy": 70,
      "death": 105
    },
    "killsToComplete": 2500
  },
  {
    "id": "dwarf",
    "name": "Dwarf",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dwarf.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 100,
      "energy": 100,
      "earth": 90,
      "holy": 100,
      "death": 105
    },
    "killsToComplete": 500
  },
  {
    "id": "dwarf-geomancer",
    "name": "Dwarf Geomancer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dwarf_Geomancer.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 40,
      "ice": 105,
      "energy": 90,
      "earth": 80,
      "holy": 90,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "dwarf-guard",
    "name": "Dwarf Guard",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dwarf_Guard.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 80,
      "fire": 105,
      "ice": 100,
      "energy": 100,
      "earth": 80,
      "holy": 100,
      "death": 105
    },
    "killsToComplete": 500
  },
  {
    "id": "dwarf-henchman",
    "name": "Dwarf Henchman",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dwarf_Henchman.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "dwarf-soldier",
    "name": "Dwarf Soldier",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dwarf_Soldier.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 100,
      "energy": 100,
      "earth": 90,
      "holy": 100,
      "death": 105
    },
    "killsToComplete": 500
  },
  {
    "id": "dworc-fleshhunter",
    "name": "Dworc Fleshhunter",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dworc_Fleshhunter.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 108,
      "ice": 110,
      "energy": 100,
      "earth": 0,
      "holy": 100,
      "death": 113
    },
    "killsToComplete": 500
  },
  {
    "id": "dworc-venomsniper",
    "name": "Dworc Venomsniper",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dworc_Venomsniper.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 113,
      "ice": 113,
      "energy": 100,
      "earth": 0,
      "holy": 85,
      "death": 108
    },
    "killsToComplete": 500
  },
  {
    "id": "dworc-voodoomaster",
    "name": "Dworc Voodoomaster",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Dworc_Voodoomaster.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 115,
      "ice": 110,
      "energy": 100,
      "earth": 0,
      "holy": 65,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "earth-elemental",
    "name": "Earth Elemental",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Earth_Elemental.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 65,
      "fire": 125,
      "ice": 95,
      "energy": 0,
      "earth": 0,
      "holy": 50,
      "death": 60
    },
    "killsToComplete": 500
  },
  {
    "id": "elder-bonelord",
    "name": "Elder Bonelord",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Elder_Bonelord.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 70,
      "energy": 80,
      "earth": 0,
      "holy": 100,
      "death": 70
    },
    "killsToComplete": 500
  },
  {
    "id": "elder-forest-fury",
    "name": "Elder Forest Fury",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Elder_Forest_Fury.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 90,
      "death": 60
    },
    "killsToComplete": 1000
  },
  {
    "id": "elder-mummy",
    "name": "Elder Mummy",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Elder_Mummy.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 80,
      "energy": 100,
      "earth": 0,
      "holy": 125,
      "death": 0
    },
    "killsToComplete": 1000
  },
  {
    "id": "elephant",
    "name": "Elephant",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Elephant.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 75,
      "fire": 100,
      "ice": 80,
      "energy": 110,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "elf",
    "name": "Elf",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Elf.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 80,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "elf-arcanist",
    "name": "Elf Arcanist",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Elf_Arcanist.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 50,
      "ice": 100,
      "energy": 80,
      "earth": 100,
      "holy": 110,
      "death": 80
    },
    "killsToComplete": 500
  },
  {
    "id": "elf-overseer",
    "name": "Elf Overseer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Elf_Overseer.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 90,
      "energy": 80,
      "earth": 100,
      "holy": 105,
      "death": 90
    },
    "killsToComplete": 2500
  },
  {
    "id": "elf-scout",
    "name": "Elf Scout",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Elf_Scout.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 80,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "emerald-damselfly",
    "name": "Emerald Damselfly",
    "imageUrl": "/images/creatures/Emerald_Damselfly.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Venore Salamander Cave"
    ],
    "region": "Venore",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "energy-elemental",
    "name": "Energy Elemental",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Energy_Elemental.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 65,
      "fire": 0,
      "ice": 0,
      "energy": 0,
      "earth": 115,
      "holy": 95,
      "death": 95
    },
    "killsToComplete": 500
  },
  {
    "id": "enfeebled-silencer",
    "name": "Enfeebled Silencer",
    "imageUrl": "/images/creatures/Enfeebled_Silencer.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Feyrist Mini Rosha"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 95,
      "fire": 70,
      "ice": 85,
      "energy": 85,
      "earth": 40,
      "holy": 125,
      "death": 35
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "enlightened-of-the-cult",
    "name": "Enlightened of the Cult",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Enlightened_Of_The_Cult.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Yalahar Cults"
    ],
    "region": "Yalahar",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 105,
      "fire": 100,
      "ice": 80,
      "energy": 105,
      "earth": 100,
      "holy": 80,
      "death": 105
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "enraged-crystal-golem",
    "name": "Enraged Crystal Golem",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Enraged_Crystal_Golem.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 80,
      "fire": 0,
      "ice": 0,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "eternal-guardian",
    "name": "Eternal Guardian",
    "imageUrl": "/images/creatures/Eternal_Guardian.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Deeper Banuta"
    ],
    "region": "Port Hope",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 80,
      "fire": 30,
      "ice": 90,
      "energy": 90,
      "earth": 0,
      "holy": 80,
      "death": 80
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "evil-sheep",
    "name": "Evil Sheep",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Evil_Sheep.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 90,
      "fire": 110,
      "ice": 80,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "evil-sheep-lord",
    "name": "Evil Sheep Lord",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Evil_Sheep_Lord.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "execowtioner",
    "name": "Execowtioner",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Execowtioner.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 90,
      "fire": 100,
      "ice": 90,
      "energy": 90,
      "earth": 85,
      "holy": 100,
      "death": 85
    },
    "killsToComplete": 500
  },
  {
    "id": "exotic-bat",
    "name": "Exotic Bat",
    "imageUrl": "/images/creatures/Exotic_Bat.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Exotic Cave Spider Cave"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 95,
      "energy": 95,
      "earth": 99,
      "holy": 95,
      "death": 95
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "exotic-cave-spider",
    "name": "Exotic Cave Spider",
    "imageUrl": "/images/creatures/Exotic_Cave_Spider.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Exotic Cave Spider Cave"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 80,
      "energy": 80,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "faun",
    "name": "Faun",
    "imageUrl": "/images/creatures/Faun.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Feyrist Surface"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 90,
      "fire": 115,
      "ice": 100,
      "energy": 110,
      "earth": 30,
      "holy": 70,
      "death": 80
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "feverish-citizen",
    "name": "Feverish Citizen",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Feverish_Citizen.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 115,
      "fire": 115,
      "ice": 90,
      "energy": 110,
      "earth": 90,
      "holy": 25,
      "death": 90
    },
    "killsToComplete": 1000
  },
  {
    "id": "filth-toad",
    "name": "Filth Toad",
    "imageUrl": "/images/creatures/Filth_Toad.gif",
    "charmPoints": 15,
    "difficulty": "HARD",
    "estimatedHours": 7,
    "respawnCategory": "normal",
    "locations": [
      "Lake Equivocolao"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 80,
      "energy": 100,
      "earth": 80,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 1000
  },
  {
    "id": "fire-devil",
    "name": "Fire Devil",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Fire_Devil.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 90,
      "fire": 0,
      "ice": 120,
      "energy": 70,
      "earth": 80,
      "holy": 110,
      "death": 80
    },
    "killsToComplete": 500
  },
  {
    "id": "fire-elemental",
    "name": "Fire Elemental",
    "imageUrl": "/images/creatures/Fire_Elemental.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "estimatedHours": 3,
    "respawnCategory": "normal",
    "locations": [
      "Hellgate",
      "Magma Dungeon",
      "Formorgar Mines"
    ],
    "region": "Mainland",
    "recommendedLevel": 100,
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 125,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 0
    },
    "killsToComplete": 500,
    "currentKills": 150
  },
  {
    "id": "firestarter",
    "name": "Firestarter",
    "imageUrl": "/images/creatures/Firestarter.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Shadowthorn"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 80,
      "fire": 0,
      "ice": 110,
      "energy": 100,
      "earth": 95,
      "holy": 80,
      "death": 105
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 1000
  },
  {
    "id": "fish",
    "name": "Fish",
    "imageUrl": "/images/creatures/Fish.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Fiehonja"
    ],
    "region": "Mainland",
    "recommendedLevel": 50,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    }
  },
  {
    "id": "flamingo",
    "name": "Flamingo",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Flamingo.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "officialDifficulty": "TRIVIAL",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "forest-fury",
    "name": "Forest Fury",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Forest_Fury.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 90,
      "death": 60
    },
    "killsToComplete": 500
  },
  {
    "id": "fox",
    "name": "Fox",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Fox.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "officialDifficulty": "TRIVIAL",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 100,
      "energy": 100,
      "earth": 95,
      "holy": 70,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "frost-dragon",
    "name": "Frost Dragon",
    "imageUrl": "/images/creatures/Frost_Dragon.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Chyllfroest"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 95,
      "fire": 0,
      "ice": 0,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 90
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "frost-dragon-hatchling",
    "name": "Frost Dragon Hatchling",
    "imageUrl": "/images/creatures/Frost_Dragon_Hatchling.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Chyllfroest"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 0,
      "energy": 105,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "frost-giant",
    "name": "Frost Giant",
    "imageUrl": "/images/creatures/Frost_Giant.gif",
    "charmPoints": 15,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Nibelor"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 0,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "frost-giantess",
    "name": "Frost Giantess",
    "imageUrl": "/images/creatures/Frost_Giantess.gif",
    "charmPoints": 15,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Nibelor"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 0,
      "energy": 110,
      "earth": 100,
      "holy": 90,
      "death": 103
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "frost-troll",
    "name": "Frost Troll",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Frost_Troll.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "officialDifficulty": "TRIVIAL",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 60,
      "ice": 100,
      "energy": 115,
      "earth": 110,
      "holy": 90,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "furious-fire-elemental",
    "name": "Furious Fire Elemental",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Furious_Fire_Elemental.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 125,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 0
    },
    "killsToComplete": 500
  },
  {
    "id": "furious-troll",
    "name": "Furious Troll",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Furious_Troll.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "fury",
    "name": "Fury",
    "imageUrl": "/images/creatures/Fury.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "estimatedHours": 7,
    "respawnCategory": "normal",
    "locations": [
      "Oramond Fury Dungeon"
    ],
    "region": "Mainland",
    "recommendedLevel": 200,
    "elementalResistances": {
      "physical": 110,
      "fire": 0,
      "ice": 95,
      "energy": 110,
      "earth": 110,
      "holy": 70,
      "death": 110
    },
    "officialDifficulty": "HARD",
    "killsToComplete": 500
  },
  {
    "id": "gang-member",
    "name": "Gang Member",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Gang_Member.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 105
    },
    "killsToComplete": 500
  },
  {
    "id": "gargoyle",
    "name": "Gargoyle",
    "imageUrl": "/images/creatures/Gargoyle.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Meriana Gargoyle Cave"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 80,
      "fire": 110,
      "ice": 100,
      "energy": 100,
      "earth": 0,
      "holy": 100,
      "death": 60
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "gazer",
    "name": "Gazer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Gazer.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 80,
      "energy": 90,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "ghastly-dragon",
    "name": "Ghastly Dragon",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Ghastly_Dragon.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 110,
      "fire": 90,
      "ice": 50,
      "energy": 110,
      "earth": 0,
      "holy": 115,
      "death": 0
    },
    "killsToComplete": 500
  },
  {
    "id": "ghost",
    "name": "Ghost",
    "imageUrl": "/images/creatures/Ghost.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Peninsula Tomb"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 0,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 0,
      "holy": 100,
      "death": 0
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "ghost-wolf",
    "name": "Ghost Wolf",
    "imageUrl": "/images/creatures/Ghost_Wolf.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Poacher's Cave (Undead stage)"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 65,
      "fire": 105,
      "ice": 100,
      "energy": 100,
      "earth": 90,
      "holy": 105,
      "death": 80
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 1000
  },
  {
    "id": "ghoul",
    "name": "Ghoul",
    "imageUrl": "/images/creatures/Ghoul.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Yalahar Cemetery, Mount Sternum, Edron Vampire Crypt -1/-2"
    ],
    "region": "Yalahar",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 90,
      "energy": 70,
      "earth": 80,
      "holy": 125,
      "death": 0
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "ghoulish-hyaena",
    "name": "Ghoulish Hyaena",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Ghoulish_Hyaena.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 105,
      "fire": 115,
      "ice": 100,
      "energy": 100,
      "earth": 40,
      "holy": 110,
      "death": 0
    },
    "killsToComplete": 1000
  },
  {
    "id": "giant-spider",
    "name": "Giant Spider",
    "imageUrl": "/images/creatures/Giant_Spider.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Port Hope Spider Cave"
    ],
    "region": "Port Hope",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 80,
      "energy": 80,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "gladiator",
    "name": "Gladiator",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Gladiator.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 95,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 90,
      "death": 105
    },
    "killsToComplete": 500
  },
  {
    "id": "gloom-wolf",
    "name": "Gloom Wolf",
    "imageUrl": "/images/creatures/Gloom_Wolf.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Poacher's Cave (Undead stage)"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 105,
      "energy": 100,
      "earth": 80,
      "holy": 105,
      "death": 90
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 1000
  },
  {
    "id": "glooth-anemone",
    "name": "Glooth Anemone",
    "imageUrl": "/images/creatures/Glooth_Anemone.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Oramond Wildlife Raid"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 100,
      "energy": 90,
      "earth": 0,
      "holy": 100,
      "death": 65
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "glooth-blob",
    "name": "Glooth Blob",
    "imageUrl": "/images/creatures/Glooth_Blob.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Oramond West"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 80,
      "energy": 110,
      "earth": 0,
      "holy": 100,
      "death": 0
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "gnarlhound",
    "name": "Gnarlhound",
    "imageUrl": "/images/creatures/Gnarlhound.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Zao Gnarlhound Cave"
    ],
    "region": "Zao",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "goblin",
    "name": "Goblin",
    "imageUrl": "/images/creatures/Goblin.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Goblin Troll Cave"
    ],
    "region": "Mainland",
    "recommendedLevel": 50,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 80,
      "earth": 110,
      "holy": 80,
      "death": 110
    },
    "officialDifficulty": "TRIVIAL",
    "killsToComplete": 500
  },
  {
    "id": "goblin-assassin",
    "name": "Goblin Assassin",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Goblin_Assassin.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 80,
      "earth": 110,
      "holy": 80,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "goblin-leader",
    "name": "Goblin Leader",
    "imageUrl": "/images/creatures/Goblin_Leader.gif",
    "charmPoints": 30,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Beregar"
    ],
    "region": "Mainland",
    "recommendedLevel": 200,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "goblin-scavenger",
    "name": "Goblin Scavenger",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Goblin_Scavenger.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 80,
      "earth": 110,
      "holy": 80,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "golden-servant",
    "name": "Golden Servant",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Golden_Servant.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 85,
      "ice": 105,
      "energy": 75,
      "earth": 20,
      "holy": 0,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "golden-servant-replica",
    "name": "Golden Servant Replica",
    "imageUrl": "/images/creatures/Golden_Servant_Replica.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Replica Dungeon (Lloyd)"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 85,
      "ice": 105,
      "energy": 75,
      "earth": 20,
      "holy": 0,
      "death": 100
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 1000
  },
  {
    "id": "goldhanded-cultist",
    "name": "Goldhanded Cultist",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Goldhanded_Cultist.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 90,
      "ice": 85,
      "energy": 83,
      "earth": 100,
      "holy": 100,
      "death": 85
    },
    "killsToComplete": 1000
  },
  {
    "id": "goldhanded-cultist-bride",
    "name": "Goldhanded Cultist Bride",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Goldhanded_Cultist_Bride.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 90,
      "ice": 85,
      "energy": 83,
      "earth": 100,
      "holy": 100,
      "death": 85
    },
    "killsToComplete": 1000
  },
  {
    "id": "gozzler",
    "name": "Gozzler",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Gozzler.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 105,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 50,
      "death": 50
    },
    "killsToComplete": 500
  },
  {
    "id": "grave-guard",
    "name": "Grave Guard",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Grave_Guard.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 110,
      "energy": 70,
      "earth": 10,
      "holy": 110,
      "death": 90
    },
    "killsToComplete": 1000
  },
  {
    "id": "grave-robber",
    "name": "Grave Robber",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Grave_Robber.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 110,
      "fire": 80,
      "ice": 110,
      "energy": 100,
      "earth": 100,
      "holy": 80,
      "death": 110
    },
    "killsToComplete": 1000
  },
  {
    "id": "gravedigger",
    "name": "Gravedigger",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Gravedigger.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 0,
      "energy": 0,
      "earth": 105,
      "holy": 105,
      "death": 0
    },
    "killsToComplete": 500
  },
  {
    "id": "green-djinn",
    "name": "Green Djinn",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Green_Djinn.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 80,
      "fire": 20,
      "ice": 110,
      "energy": 50,
      "earth": 100,
      "holy": 113,
      "death": 80
    },
    "killsToComplete": 500
  },
  {
    "id": "green-frog",
    "name": "Green Frog",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Green_Frog.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "officialDifficulty": "TRIVIAL",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "grynch-clan-goblin",
    "name": "Grynch Clan Goblin",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Grynch_Clan_Goblin.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "officialDifficulty": "TRIVIAL",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "haunted-dragon",
    "name": "Haunted Dragon",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Haunted_Dragon.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 50,
      "energy": 100,
      "earth": 0,
      "holy": 140,
      "death": 0
    },
    "killsToComplete": 1000
  },
  {
    "id": "haunted-treeling",
    "name": "Haunted Treeling",
    "imageUrl": "/images/creatures/Haunted_Treeling.gif",
    "charmPoints": 25,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Vengoth Surface"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 90,
      "energy": 100,
      "earth": 0,
      "holy": 80,
      "death": 90
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "herald-of-gloom",
    "name": "Herald of Gloom",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Herald_Of_Gloom.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 110,
      "fire": 60,
      "ice": 100,
      "energy": 100,
      "earth": 30,
      "holy": 110,
      "death": 90
    },
    "killsToComplete": 2500
  },
  {
    "id": "high-voltage-elemental",
    "name": "High Voltage Elemental",
    "imageUrl": "/images/creatures/High_Voltage_Elemental.gif",
    "charmPoints": 25,
    "difficulty": "HARD",
    "estimatedHours": 7,
    "respawnCategory": "normal",
    "locations": [
      "Oramond Glooth Underground Raid, Warzone 5"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 65,
      "fire": 100,
      "ice": 0,
      "energy": 0,
      "earth": 115,
      "holy": 95,
      "death": 95
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "hive-overseer",
    "name": "Hive Overseer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Hive_Overseer.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 70,
      "fire": 60,
      "ice": 95,
      "energy": 80,
      "earth": 0,
      "holy": 90,
      "death": 85
    },
    "killsToComplete": 1000
  },
  {
    "id": "honour-guard",
    "name": "Honour Guard",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Honour_Guard.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 110,
      "death": 0
    },
    "killsToComplete": 1000
  },
  {
    "id": "hot-dog",
    "name": "Hot Dog",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Hot_Dog.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "hunter",
    "name": "Hunter",
    "imageUrl": "/images/creatures/Hunter.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Poacher's Cave (Hunter stage)"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 105,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 80,
      "death": 100
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "husky",
    "name": "Husky",
    "imageUrl": "/images/creatures/Husky.gif",
    "charmPoints": 1,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Svargrond"
    ],
    "region": "Mainland",
    "recommendedLevel": 20,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "HARMLESS",
    "killsToComplete": 1000
  },
  {
    "id": "hyaena",
    "name": "Hyaena",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Hyaena.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "ice-dragon",
    "name": "Ice Dragon",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Ice_Dragon.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 105,
      "fire": 130,
      "ice": 0,
      "energy": 100,
      "earth": 50,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "ice-golem",
    "name": "Ice Golem",
    "imageUrl": "/images/creatures/Ice_Golem.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Nibelor Cave"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 80,
      "fire": 0,
      "ice": 0,
      "energy": 120,
      "earth": 100,
      "holy": 0,
      "death": 0
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "ice-witch",
    "name": "Ice Witch",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Ice_Witch.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 50,
      "ice": 0,
      "energy": 110,
      "earth": 60,
      "holy": 70,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "iks-ahpututu",
    "name": "Iks Ahpututu",
    "imageUrl": "/images/creatures/Iks_Ahpututu.gif",
    "charmPoints": 50,
    "difficulty": "EASY",
    "officialDifficulty": "MEDIUM",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Iksupan"
    ],
    "region": "Mainland",
    "recommendedLevel": 200,
    "elementalResistances": {
      "physical": 105,
      "fire": 95,
      "ice": 100,
      "energy": 100,
      "earth": 75,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500,
    "currentKills": 1000
  },
  {
    "id": "infected-weeper",
    "name": "Infected Weeper",
    "imageUrl": "/images/creatures/Infected_Weeper.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "estimatedHours": 7,
    "respawnCategory": "normal",
    "locations": [
      "Warzone 1-3"
    ],
    "region": "Mainland",
    "recommendedLevel": 200,
    "elementalResistances": {
      "physical": 50,
      "fire": 100,
      "ice": 110,
      "energy": 75,
      "earth": 0,
      "holy": 100,
      "death": 70
    },
    "officialDifficulty": "HARD",
    "killsToComplete": 1000
  },
  {
    "id": "infernal-frog",
    "name": "Infernal Frog",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Infernal_Frog.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "infernalist",
    "name": "Infernalist",
    "imageUrl": "/images/creatures/Infernalist.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "estimatedHours": 7,
    "respawnCategory": "normal",
    "locations": [
      "Fury Dungeon"
    ],
    "region": "Mainland",
    "recommendedLevel": 200,
    "elementalResistances": {
      "physical": 105,
      "fire": 0,
      "ice": 105,
      "energy": 0,
      "earth": 5,
      "holy": 80,
      "death": 90
    },
    "officialDifficulty": "HARD",
    "killsToComplete": 500
  },
  {
    "id": "insect-swarm",
    "name": "Insect Swarm",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Insect_Swarm.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 100,
      "energy": 100,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "insectoid-scout",
    "name": "Insectoid Scout",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Insectoid_Scout.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 95,
      "fire": 110,
      "ice": 110,
      "energy": 105,
      "earth": 80,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "insectoid-worker",
    "name": "Insectoid Worker",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Insectoid_Worker.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 95,
      "fire": 110,
      "ice": 110,
      "energy": 105,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "iron-servant",
    "name": "Iron Servant",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Iron_Servant.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 75,
      "ice": 100,
      "energy": 75,
      "earth": 110,
      "holy": 80,
      "death": 110
    },
    "killsToComplete": 2500
  },
  {
    "id": "iron-servant-replica",
    "name": "Iron Servant Replica",
    "imageUrl": "/images/creatures/Iron_Servant_Replica.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Replica Dungeon (Lloyd)"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 75,
      "ice": 100,
      "energy": 75,
      "earth": 110,
      "holy": 80,
      "death": 110
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "island-troll",
    "name": "Island Troll",
    "imageUrl": "/images/creatures/Island_Troll.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Goroma"
    ],
    "region": "Mainland",
    "recommendedLevel": 50,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "TRIVIAL",
    "killsToComplete": 500
  },
  {
    "id": "jellyfish",
    "name": "Jellyfish",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Jellyfish.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 105,
      "fire": 0,
      "ice": 100,
      "energy": 105,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "killer-caiman",
    "name": "Killer Caiman",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Killer_Caiman.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 90,
      "fire": 100,
      "ice": 90,
      "energy": 105,
      "earth": 80,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "killer-rabbit",
    "name": "Killer Rabbit",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Killer_Rabbit.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "kollos",
    "name": "Kollos",
    "imageUrl": "/images/creatures/Kollos.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Inner Hive"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 70,
      "ice": 107,
      "energy": 90,
      "earth": 0,
      "holy": 100,
      "death": 105
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 1000
  },
  {
    "id": "kongra",
    "name": "Kongra",
    "imageUrl": "/images/creatures/Kongra.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Port Hope Ape City"
    ],
    "region": "Port Hope",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 115,
      "energy": 95,
      "earth": 90,
      "holy": 100,
      "death": 105
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "ladybug",
    "name": "Ladybug",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Ladybug.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 110,
      "fire": 115,
      "ice": 105,
      "energy": 100,
      "earth": 50,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "lancer-beetle",
    "name": "Lancer Beetle",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Lancer_Beetle.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 0,
      "holy": 100,
      "death": 50
    },
    "killsToComplete": 500
  },
  {
    "id": "larva",
    "name": "Larva",
    "imageUrl": "/images/creatures/Larva.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Ankrahmun Larva Caves, Mother of Scarabs Lair -1/-2"
    ],
    "region": "Ankrahmun",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 105,
      "energy": 90,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "lava-golem",
    "name": "Lava Golem",
    "imageUrl": "/images/creatures/Lava_Golem.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "estimatedHours": 7,
    "respawnCategory": "normal",
    "locations": [
      "Warzone 1-3"
    ],
    "region": "Mainland",
    "recommendedLevel": 200,
    "elementalResistances": {
      "physical": 70,
      "fire": 0,
      "ice": 105,
      "energy": 70,
      "earth": 0,
      "holy": 100,
      "death": 65
    },
    "officialDifficulty": "HARD",
    "killsToComplete": 1000
  },
  {
    "id": "leaf-golem",
    "name": "Leaf Golem",
    "imageUrl": "/images/creatures/Leaf_Golem.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Dryad Gardens"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 105,
      "energy": 100,
      "earth": 60,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "lich",
    "name": "Lich",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Lich.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 20,
      "earth": 0,
      "holy": 120,
      "death": 0
    },
    "killsToComplete": 500
  },
  {
    "id": "lion",
    "name": "Lion",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Lion.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 115,
      "energy": 100,
      "earth": 80,
      "holy": 80,
      "death": 108
    },
    "killsToComplete": 500
  },
  {
    "id": "little-corym-charlatan",
    "name": "Little Corym Charlatan",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Little_Corym_Charlatan.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "lizard-chosen",
    "name": "Lizard Chosen",
    "imageUrl": "/images/creatures/Lizard_Chosen.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Temple of Equilibrium"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 90,
      "ice": 90,
      "energy": 80,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "lizard-dragon-priest",
    "name": "Lizard Dragon Priest",
    "imageUrl": "/images/creatures/Lizard_Dragon_Priest.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Lizard City (South mostly)"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 15,
      "ice": 100,
      "energy": 100,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "lizard-high-guard",
    "name": "Lizard High Guard",
    "imageUrl": "/images/creatures/Lizard_High_Guard.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Lizard City"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 55,
      "ice": 110,
      "energy": 100,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "lizard-legionnaire",
    "name": "Lizard Legionnaire",
    "imageUrl": "/images/creatures/Lizard_Legionnaire.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Lizard City"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 55,
      "ice": 110,
      "energy": 100,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "lizard-magistratus",
    "name": "Lizard Magistratus",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Lizard_Magistratus.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 15,
      "ice": 100,
      "energy": 100,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "lizard-noble",
    "name": "Lizard Noble",
    "imageUrl": "/images/creatures/Lizard_Noble.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "estimatedHours": 7,
    "respawnCategory": "normal",
    "locations": [
      "Razzachai"
    ],
    "region": "Mainland",
    "recommendedLevel": 200,
    "elementalResistances": {
      "physical": 100,
      "fire": 15,
      "ice": 100,
      "energy": 100,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "HARD",
    "killsToComplete": 500
  },
  {
    "id": "lizard-sentinel",
    "name": "Lizard Sentinel",
    "imageUrl": "/images/creatures/Lizard_Sentinel.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Chor"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 80,
      "energy": 90,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "lizard-snakecharmer",
    "name": "Lizard Snakecharmer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Lizard_Snakecharmer.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 110,
      "fire": 110,
      "ice": 80,
      "energy": 80,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "lizard-templar",
    "name": "Lizard Templar",
    "imageUrl": "/images/creatures/Lizard_Templar.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Chor"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 90,
      "energy": 80,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "lizard-zaogun",
    "name": "Lizard Zaogun",
    "imageUrl": "/images/creatures/Lizard_Zaogun.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Lower Draken Walls"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 95,
      "fire": 55,
      "ice": 85,
      "energy": 80,
      "earth": 0,
      "holy": 100,
      "death": 90
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "loricate-orger",
    "name": "Loricate Orger",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Loricate_Orger.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 80,
      "earth": 110,
      "holy": 90,
      "death": 110
    },
    "killsToComplete": 1000
  },
  {
    "id": "lumbering-carnivor",
    "name": "Lumbering Carnivor",
    "imageUrl": "/images/creatures/Lumbering_Carnivor.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Carnivora's Rock"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 80,
      "fire": 140,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "mad-scientist",
    "name": "Mad Scientist",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Mad_Scientist.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 90,
      "ice": 90,
      "energy": 80,
      "earth": 80,
      "holy": 80,
      "death": 105
    },
    "killsToComplete": 500
  },
  {
    "id": "magma-crawler",
    "name": "Magma Crawler",
    "imageUrl": "/images/creatures/Magma_Crawler.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "estimatedHours": 7,
    "respawnCategory": "normal",
    "locations": [
      "Warzone 1-3"
    ],
    "region": "Mainland",
    "recommendedLevel": 200,
    "elementalResistances": {
      "physical": 95,
      "fire": 0,
      "ice": 100,
      "energy": 90,
      "earth": 0,
      "holy": 100,
      "death": 75
    },
    "officialDifficulty": "HARD",
    "killsToComplete": 500
  },
  {
    "id": "mammoth",
    "name": "Mammoth",
    "imageUrl": "/images/creatures/Mammoth.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Svargrond Mammoth Mountain (South west from depot)"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 90,
      "fire": 110,
      "ice": 80,
      "energy": 100,
      "earth": 80,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "manta-ray",
    "name": "Manta Ray",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Manta_Ray.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 95,
      "fire": 0,
      "ice": 75,
      "energy": 105,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "marsh-stalker",
    "name": "Marsh Stalker",
    "imageUrl": "/images/creatures/Marsh_Stalker.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Venore Salamander Cave"
    ],
    "region": "Venore",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 95,
      "energy": 100,
      "earth": 105,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "massive-earth-elemental",
    "name": "Massive Earth Elemental",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Massive_Earth_Elemental.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 80,
      "fire": 115,
      "ice": 85,
      "energy": 10,
      "earth": 0,
      "holy": 50,
      "death": 55
    },
    "killsToComplete": 500
  },
  {
    "id": "massive-energy-elemental",
    "name": "Massive Energy Elemental",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Massive_Energy_Elemental.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 50,
      "fire": 0,
      "ice": 0,
      "energy": 0,
      "earth": 105,
      "holy": 80,
      "death": 80
    },
    "killsToComplete": 1000
  },
  {
    "id": "massive-fire-elemental",
    "name": "Massive Fire Elemental",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Massive_Fire_Elemental.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 50,
      "fire": 0,
      "ice": 115,
      "energy": 70,
      "earth": 100,
      "holy": 100,
      "death": 80
    },
    "killsToComplete": 500
  },
  {
    "id": "massive-water-elemental",
    "name": "Massive Water Elemental",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Massive_Water_Elemental.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 60,
      "fire": 0,
      "ice": 0,
      "energy": 125,
      "earth": 0,
      "holy": 50,
      "death": 50
    },
    "killsToComplete": 500
  },
  {
    "id": "menancing-carnivor",
    "name": "Menancing Carnivor",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Menancing_Carnivor.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "estimatedHours": 7,
    "respawnCategory": "normal",
    "locations": [
      "Carnivora's Rock"
    ],
    "region": "Mainland",
    "recommendedLevel": 200
  },
  {
    "id": "mercury-blob",
    "name": "Mercury Blob",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Mercury_Blob.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 90,
      "fire": 90,
      "ice": 85,
      "energy": 100,
      "earth": 35,
      "holy": 35,
      "death": 0
    },
    "killsToComplete": 500
  },
  {
    "id": "merlkin",
    "name": "Merlkin",
    "imageUrl": "/images/creatures/Merlkin.gif",
    "charmPoints": 15,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Port Hope Ape City"
    ],
    "region": "Port Hope",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 115,
      "energy": 90,
      "earth": 100,
      "holy": 90,
      "death": 105
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "metal-gargoyle",
    "name": "Metal Gargoyle",
    "imageUrl": "/images/creatures/Metal_Gargoyle.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Oramond Surface, Abandoned Sewers"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 85,
      "fire": 90,
      "ice": 105,
      "energy": 110,
      "earth": 0,
      "holy": 100,
      "death": 20
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "midnight-panther",
    "name": "Midnight Panther",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Midnight_Panther.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 100,
      "energy": 0,
      "earth": 100,
      "holy": 100,
      "death": 105
    },
    "killsToComplete": 2500
  },
  {
    "id": "midnight-spawn",
    "name": "Midnight Spawn",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Midnight_Spawn.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 90,
      "fire": 70,
      "ice": 110,
      "energy": 90,
      "earth": 20,
      "holy": 70,
      "death": 105
    },
    "killsToComplete": 2500
  },
  {
    "id": "midnight-warrior",
    "name": "Midnight Warrior",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Midnight_Warrior.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 80,
      "energy": 80,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "minotaur",
    "name": "Minotaur",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Minotaur.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 110,
      "energy": 100,
      "earth": 100,
      "holy": 90,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "minotaur-amazon",
    "name": "Minotaur Amazon",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Minotaur_Amazon.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 95,
      "energy": 110,
      "earth": 100,
      "holy": 90,
      "death": 90
    },
    "killsToComplete": 500
  },
  {
    "id": "minotaur-archer",
    "name": "Minotaur Archer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Minotaur_Archer.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 110,
      "energy": 100,
      "earth": 100,
      "holy": 90,
      "death": 105
    },
    "killsToComplete": 500
  },
  {
    "id": "minotaur-cult-follower",
    "name": "Minotaur Cult Follower",
    "imageUrl": "/images/creatures/Minotaur_Cult_Follower.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Mintwallin Cults"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 110,
      "energy": 100,
      "earth": 100,
      "holy": 90,
      "death": 110
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "minotaur-cult-propher",
    "name": "Minotaur Cult Propher",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Minotaur_Cult_Propher.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Mintwallin Cults"
    ],
    "region": "Mainland",
    "recommendedLevel": 150
  },
  {
    "id": "minotaur-cult-zealot",
    "name": "Minotaur Cult Zealot",
    "imageUrl": "/images/creatures/Minotaur_Cult_Zealot.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Mintwallin Cults"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 110,
      "energy": 100,
      "earth": 100,
      "holy": 90,
      "death": 110
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "minotaur-guard",
    "name": "Minotaur Guard",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Minotaur_Guard.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 110,
      "energy": 100,
      "earth": 100,
      "holy": 90,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "minotaur-hunter",
    "name": "Minotaur Hunter",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Minotaur_Hunter.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 90,
      "ice": 105,
      "energy": 100,
      "earth": 100,
      "holy": 90,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "minotaur-mage",
    "name": "Minotaur Mage",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Minotaur_Mage.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 110,
      "energy": 80,
      "earth": 80,
      "holy": 90,
      "death": 105
    },
    "killsToComplete": 500
  },
  {
    "id": "misguided-bully",
    "name": "Misguided Bully",
    "imageUrl": "/images/creatures/Misguided_Bully.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Misguided Camp"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 80,
      "fire": 100,
      "ice": 90,
      "energy": 100,
      "earth": 70,
      "holy": 130,
      "death": 100
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "misguided-thief",
    "name": "Misguided Thief",
    "imageUrl": "/images/creatures/Misguided_Thief.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Misguided Camp"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 80,
      "fire": 100,
      "ice": 90,
      "energy": 100,
      "earth": 70,
      "holy": 130,
      "death": 100
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "modified-gnarlhound",
    "name": "Modified Gnarlhound",
    "imageUrl": "/images/creatures/Modified_Gnarlhound.gif",
    "charmPoints": 1,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Stonehome, under Telas's house"
    ],
    "region": "Mainland",
    "recommendedLevel": 20,
    "elementalResistances": {
      "physical": 10,
      "fire": 10,
      "ice": 10,
      "energy": 10,
      "earth": 0,
      "holy": 0,
      "death": 0
    },
    "officialDifficulty": "HARMLESS",
    "killsToComplete": 1000
  },
  {
    "id": "mole",
    "name": "Mole",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Mole.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 95,
      "fire": 110,
      "ice": 100,
      "energy": 90,
      "earth": 60,
      "holy": 110,
      "death": 60
    },
    "killsToComplete": 1000
  },
  {
    "id": "moohtant",
    "name": "Moohtant",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Moohtant.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 95,
      "ice": 85,
      "energy": 85,
      "earth": 0,
      "holy": 100,
      "death": 90
    },
    "killsToComplete": 500
  },
  {
    "id": "mummy",
    "name": "Mummy",
    "imageUrl": "/images/creatures/Mummy.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Peninsula Tomb"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 80,
      "energy": 100,
      "earth": 0,
      "holy": 125,
      "death": 0
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "mushroom-sniffer",
    "name": "Mushroom Sniffer",
    "imageUrl": "/images/creatures/Mushroom_Sniffer.gif",
    "charmPoints": 1,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Truffels Garden"
    ],
    "region": "Mainland",
    "recommendedLevel": 20,
    "elementalResistances": {
      "physical": 10,
      "fire": 10,
      "ice": 10,
      "energy": 10,
      "earth": 10,
      "holy": 10,
      "death": 10
    },
    "officialDifficulty": "HARMLESS",
    "killsToComplete": 500
  },
  {
    "id": "mutated-bat",
    "name": "Mutated Bat",
    "imageUrl": "/images/creatures/Mutated_Bat.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Souleater Mountains, Farmine Mutated Bat/Tiger Cave"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 0,
      "holy": 100,
      "death": 0
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "mutated-human",
    "name": "Mutated Human",
    "imageUrl": "/images/creatures/Mutated_Human.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Yalahar Alchemist Quarter"
    ],
    "region": "Yalahar",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 80,
      "energy": 100,
      "earth": 0,
      "holy": 125,
      "death": 0
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "mutated-rat",
    "name": "Mutated Rat",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Mutated_Rat.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 100,
      "energy": 100,
      "earth": 0,
      "holy": 90,
      "death": 0
    },
    "killsToComplete": 500
  },
  {
    "id": "mutated-tiger",
    "name": "Mutated Tiger",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Mutated_Tiger.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 80,
      "energy": 80,
      "earth": 20,
      "holy": 100,
      "death": 105
    },
    "killsToComplete": 500
  },
  {
    "id": "necromancer",
    "name": "Necromancer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Necromancer.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 105,
      "fire": 105,
      "ice": 90,
      "energy": 80,
      "earth": 0,
      "holy": 105,
      "death": 50
    },
    "killsToComplete": 500
  },
  {
    "id": "nightfiend",
    "name": "Nightfiend",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Nightfiend.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 90,
      "fire": 105,
      "ice": 80,
      "energy": 90,
      "earth": 0,
      "holy": 108,
      "death": 0
    },
    "killsToComplete": 2500
  },
  {
    "id": "nightslayer",
    "name": "Nightslayer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Nightslayer.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 100,
      "energy": 100,
      "earth": 0,
      "holy": 125,
      "death": 0
    },
    "killsToComplete": 2500
  },
  {
    "id": "nightstalker",
    "name": "Nightstalker",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Nightstalker.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 105,
      "fire": 100,
      "ice": 80,
      "energy": 105,
      "earth": 100,
      "holy": 80,
      "death": 105
    },
    "killsToComplete": 500
  },
  {
    "id": "noble-lion",
    "name": "Noble Lion",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Noble_Lion.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 95,
      "fire": 80,
      "ice": 100,
      "energy": 100,
      "earth": 80,
      "holy": 50,
      "death": 90
    },
    "killsToComplete": 1000
  },
  {
    "id": "nomad-blue",
    "name": "Nomad (Blue)",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Nomad_(blue).gif",
    "charmPoints": 15,
    "difficulty": "HARD",
    "estimatedHours": 7,
    "respawnCategory": "normal",
    "locations": [
      "Ankrahmun Desert"
    ],
    "region": "Ankrahmun",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 110,
      "fire": 80,
      "ice": 110,
      "energy": 100,
      "earth": 100,
      "holy": 80,
      "death": 110
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 1000
  },
  {
    "id": "nomad-female",
    "name": "Nomad (Female)",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Nomad_(female).gif",
    "charmPoints": 15,
    "difficulty": "HARD",
    "estimatedHours": 7,
    "respawnCategory": "normal",
    "locations": [
      "Ankrahmun Desert"
    ],
    "region": "Ankrahmun",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 110,
      "fire": 80,
      "ice": 110,
      "energy": 100,
      "earth": 100,
      "holy": 80,
      "death": 110
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 1000
  },
  {
    "id": "northern-pike",
    "name": "Northern Pike",
    "imageUrl": "/images/creatures/Northern_Pike.gif",
    "charmPoints": 1,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Fiehonja"
    ],
    "region": "Mainland",
    "recommendedLevel": 20,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    }
  },
  {
    "id": "novice-of-the-cult",
    "name": "Novice of the Cult",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Novice_Of_The_Cult.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Yalahar Cults"
    ],
    "region": "Yalahar",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 110,
      "fire": 105,
      "ice": 90,
      "energy": 108,
      "earth": 90,
      "holy": 90,
      "death": 108
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "nymph",
    "name": "Nymph",
    "imageUrl": "/images/creatures/Nymph.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Feyrist Surface"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 110,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 40,
      "holy": 60,
      "death": 60
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "ogre-brute",
    "name": "Ogre Brute",
    "imageUrl": "/images/creatures/Ogre_Brute.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Krailos Surface"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 80,
      "fire": 80,
      "ice": 80,
      "energy": 110,
      "earth": 0,
      "holy": 80,
      "death": 90
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "ogre-savage",
    "name": "Ogre Savage",
    "imageUrl": "/images/creatures/Ogre_Savage.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Krailos Surface"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 80,
      "energy": 110,
      "earth": 0,
      "holy": 50,
      "death": 90
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "ogre-shaman",
    "name": "Ogre Shaman",
    "imageUrl": "/images/creatures/Ogre_Shaman.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Krailos Surface"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 80,
      "energy": 80,
      "earth": 0,
      "holy": 110,
      "death": 0
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "omnivora",
    "name": "Omnivora",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Omnivora.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 80,
      "energy": 90,
      "earth": 0,
      "holy": 100,
      "death": 80
    },
    "killsToComplete": 500
  },
  {
    "id": "orc",
    "name": "Orc",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Orc.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 80,
      "earth": 110,
      "holy": 90,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "orc-berserker",
    "name": "Orc Berserker",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Orc_Berserker.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 85,
      "earth": 110,
      "holy": 90,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "orc-cult-fanatic",
    "name": "Orc Cult Fanatic",
    "imageUrl": "/images/creatures/Orc_Cult_Fanatic.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Edron Orc Cults"
    ],
    "region": "Edron",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 110,
      "fire": 0,
      "ice": 100,
      "energy": 80,
      "earth": 110,
      "holy": 80,
      "death": 110
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 1000
  },
  {
    "id": "orc-cult-inquisitor",
    "name": "Orc Cult Inquisitor",
    "imageUrl": "/images/creatures/Orc_Cult_Inquisitor.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Edron Orc Cults"
    ],
    "region": "Edron",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 85,
      "earth": 110,
      "holy": 90,
      "death": 110
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "orc-cult-minion",
    "name": "Orc Cult Minion",
    "imageUrl": "/images/creatures/Orc_Cult_Minion.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Edron Orc Cults"
    ],
    "region": "Edron",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 80,
      "earth": 110,
      "holy": 80,
      "death": 110
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "orc-cult-priest",
    "name": "Orc Cult Priest",
    "imageUrl": "/images/creatures/Orc_Cult_Priest.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Edron Orc Cults"
    ],
    "region": "Edron",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 50,
      "earth": 110,
      "holy": 90,
      "death": 105
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 1000
  },
  {
    "id": "orc-cultist",
    "name": "Orc Cultist",
    "imageUrl": "/images/creatures/Orc_Cultist.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Edron Orc Cults"
    ],
    "region": "Edron",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 70,
      "earth": 110,
      "holy": 90,
      "death": 110
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 1000
  },
  {
    "id": "orc-leader",
    "name": "Orc Leader",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Orc_Leader.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 100,
      "energy": 80,
      "earth": 110,
      "holy": 80,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "orc-marauder",
    "name": "Orc Marauder",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Orc_Marauder.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 80,
      "earth": 110,
      "holy": 90,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "orc-rider",
    "name": "Orc Rider",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Orc_Rider.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 80,
      "earth": 110,
      "holy": 90,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "orc-shaman",
    "name": "Orc Shaman",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Orc_Shaman.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 50,
      "earth": 110,
      "holy": 90,
      "death": 105
    },
    "killsToComplete": 500
  },
  {
    "id": "orc-spearman",
    "name": "Orc Spearman",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Orc_Spearman.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 80,
      "earth": 110,
      "holy": 80,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "orc-warlord",
    "name": "Orc Warlord",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Orc_Warlord.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 20,
      "ice": 100,
      "energy": 80,
      "earth": 110,
      "holy": 90,
      "death": 105
    },
    "killsToComplete": 500
  },
  {
    "id": "orc-warrior",
    "name": "Orc Warrior",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Orc_Warrior.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 70,
      "earth": 110,
      "holy": 90,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "orchid-frog",
    "name": "Orchid Frog",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Orchid_Frog.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 90,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "orclops-doomhauler",
    "name": "Orclops Doomhauler",
    "imageUrl": "/images/creatures/Orclops_Doomhauler.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Desecrated Glade"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 90,
      "fire": 85,
      "ice": 110,
      "energy": 110,
      "earth": 70,
      "holy": 100,
      "death": 90
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "orclops-ravager",
    "name": "Orclops Ravager",
    "imageUrl": "/images/creatures/Orclops_Ravager.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Desecrated Glade"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 80,
      "energy": 110,
      "earth": 0,
      "holy": 50,
      "death": 90
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "orewalker",
    "name": "Orewalker",
    "imageUrl": "/images/creatures/Orewalker.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "estimatedHours": 7,
    "respawnCategory": "normal",
    "locations": [
      "Warzone 1-3"
    ],
    "region": "Mainland",
    "recommendedLevel": 200,
    "elementalResistances": {
      "physical": 75,
      "fire": 35,
      "ice": 95,
      "energy": 105,
      "earth": 0,
      "holy": 100,
      "death": 75
    },
    "officialDifficulty": "HARD",
    "killsToComplete": 1000
  },
  {
    "id": "orger",
    "name": "Orger",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Orger.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 80,
      "earth": 110,
      "holy": 90,
      "death": 110
    },
    "killsToComplete": 1000
  },
  {
    "id": "panda",
    "name": "Panda",
    "imageUrl": "/images/creatures/Panda.gif",
    "charmPoints": 15,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Southern Tiquanda Coast"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 100,
      "energy": 100,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "parrot",
    "name": "Parrot",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Parrot.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "officialDifficulty": "TRIVIAL",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "penguin",
    "name": "Penguin",
    "imageUrl": "/images/creatures/Penguin.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Svargrond"
    ],
    "region": "Mainland",
    "recommendedLevel": 50,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 80,
      "energy": 110,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "TRIVIAL",
    "killsToComplete": 500
  },
  {
    "id": "percht",
    "name": "Percht",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Percht.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 90,
      "ice": 120,
      "energy": 100,
      "earth": 100,
      "holy": 90,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "pig",
    "name": "Pig",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Pig.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "officialDifficulty": "TRIVIAL",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "pigeon",
    "name": "Pigeon",
    "imageUrl": "/images/creatures/Pigeon.gif",
    "charmPoints": 1,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Venore"
    ],
    "region": "Venore",
    "recommendedLevel": 20,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 110,
      "holy": 100,
      "death": 110
    },
    "officialDifficulty": "HARMLESS",
    "killsToComplete": 1000
  },
  {
    "id": "pirat-bombardier",
    "name": "Pirat Bombardier",
    "imageUrl": "/images/creatures/Pirat_Bombardier.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "The Wreckoning"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 110,
      "fire": 100,
      "ice": 100,
      "energy": 90,
      "earth": 120,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "pirat-cutthroat",
    "name": "Pirat Cutthroat",
    "imageUrl": "/images/creatures/Pirat_Cutthroat.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "The Wreckoning"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 90,
      "fire": 100,
      "ice": 100,
      "energy": 80,
      "earth": 120,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "pirat-mate",
    "name": "Pirat Mate",
    "imageUrl": "/images/creatures/Pirat_Mate.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "The Wreckoning"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 70,
      "earth": 130,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "pirat-scoundrel",
    "name": "Pirat Scoundrel",
    "imageUrl": "/images/creatures/Pirat_Scoundrel.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "The Wreckoning"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 80,
      "fire": 100,
      "ice": 100,
      "energy": 74,
      "earth": 130,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "pirate-corsair",
    "name": "Pirate Corsair",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Pirate_Corsair.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 105,
      "energy": 100,
      "earth": 80,
      "holy": 90,
      "death": 105
    },
    "killsToComplete": 500
  },
  {
    "id": "pirate-cutthroat",
    "name": "Pirate Cutthroat",
    "imageUrl": "/images/creatures/Pirate_Cutthroat.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Yalahar Pirates"
    ],
    "region": "Yalahar",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 105,
      "energy": 100,
      "earth": 90,
      "holy": 80,
      "death": 105
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "pirate-ghost",
    "name": "Pirate Ghost",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Pirate_Ghost.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 0,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 0,
      "holy": 125,
      "death": 0
    },
    "killsToComplete": 500
  },
  {
    "id": "pirate-marauder",
    "name": "Pirate Marauder",
    "imageUrl": "/images/creatures/Pirate_Marauder.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Yalahar Pirates"
    ],
    "region": "Yalahar",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 100,
      "energy": 103,
      "earth": 90,
      "holy": 80,
      "death": 105
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "pirate-skeleton",
    "name": "Pirate Skeleton",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Pirate_Skeleton.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 125,
      "death": 0
    },
    "killsToComplete": 500
  },
  {
    "id": "pixie",
    "name": "Pixie",
    "imageUrl": "/images/creatures/Pixie.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Feyrist Surface"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 105,
      "fire": 110,
      "ice": 105,
      "energy": 100,
      "earth": 40,
      "holy": 40,
      "death": 70
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "poacher",
    "name": "Poacher",
    "imageUrl": "/images/creatures/Poacher.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Poacher's Cave (Hunter stage)"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "poison-spider",
    "name": "Poison Spider",
    "imageUrl": "/images/creatures/Poison_Spider.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "All over Tibia, should be completed naturally"
    ],
    "region": "Mainland",
    "recommendedLevel": 50,
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 100,
      "energy": 100,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "TRIVIAL",
    "killsToComplete": 500
  },
  {
    "id": "polar-bear",
    "name": "Polar Bear",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Polar_Bear.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 90,
      "ice": 80,
      "energy": 105,
      "earth": 100,
      "holy": 100,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "pooka",
    "name": "Pooka",
    "imageUrl": "/images/creatures/Pooka.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Feyrist Surface"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 80,
      "energy": 110,
      "earth": 30,
      "holy": 80,
      "death": 90
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "priestess",
    "name": "Priestess",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Priestess.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 110,
      "fire": 60,
      "ice": 100,
      "energy": 100,
      "earth": 30,
      "holy": 110,
      "death": 90
    },
    "killsToComplete": 500
  },
  {
    "id": "putrid-mummy",
    "name": "Putrid Mummy",
    "imageUrl": "/images/creatures/Putrid_Mummy.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Caverna Exanima"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 120,
      "ice": 80,
      "energy": 100,
      "earth": 0,
      "holy": 125,
      "death": 0
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "quara-constrictor",
    "name": "Quara Constrictor",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Quara_Constrictor.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 0,
      "energy": 125,
      "earth": 110,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "quara-constrictor-scout",
    "name": "Quara Constrictor Scout",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Quara_Constrictor_Scout.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 0,
      "energy": 110,
      "earth": 110,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "quara-hydromancer",
    "name": "Quara Hydromancer",
    "imageUrl": "/images/creatures/Quara_Hydromancer.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Sunken Quarter, Calassa"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 0,
      "energy": 125,
      "earth": 110,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "quara-hydromancer-scout",
    "name": "Quara Hydromancer Scout",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Quara_Hydromancer_Scout.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 0,
      "energy": 110,
      "earth": 110,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "quara-mantassin",
    "name": "Quara Mantassin",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Quara_Mantassin.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 0,
      "energy": 125,
      "earth": 110,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "quara-mantassin-scout",
    "name": "Quara Mantassin Scout",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Quara_Mantassin_Scout.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 0,
      "energy": 110,
      "earth": 110,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "quara-pincher",
    "name": "Quara Pincher",
    "imageUrl": "/images/creatures/Quara_Pincher.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Sunken Quarter, Calassa"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 0,
      "energy": 125,
      "earth": 110,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "quara-pincher-scout",
    "name": "Quara Pincher Scout",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Quara_Pincher_Scout.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 0,
      "energy": 110,
      "earth": 110,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "quara-predator",
    "name": "Quara Predator",
    "imageUrl": "/images/creatures/Quara_Predator.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Sunken Quarter, Calassa"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 0,
      "energy": 125,
      "earth": 110,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "quara-predator-scout",
    "name": "Quara Predator Scout",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Quara_Predator_Scout.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 0,
      "energy": 110,
      "earth": 110,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "rabbit",
    "name": "Rabbit",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Rabbit.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "officialDifficulty": "TRIVIAL",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "raging-fire",
    "name": "Raging Fire",
    "imageUrl": "/images/creatures/Raging_Fire.gif",
    "charmPoints": 50,
    "difficulty": "EASY",
    "officialDifficulty": "MEDIUM",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Jaccus Maxxen's Dungeon"
    ],
    "region": "Mainland",
    "recommendedLevel": 200,
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 110,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 80
    },
    "killsToComplete": 2500,
    "currentKills": 350
  },
  {
    "id": "rat",
    "name": "Rat",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Rat.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "officialDifficulty": "TRIVIAL",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 110,
      "energy": 100,
      "earth": 80,
      "holy": 80,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "redeemed-soul",
    "name": "Redeemed Soul",
    "imageUrl": "/images/creatures/Redeemed_Soul.gif",
    "charmPoints": 15,
    "difficulty": "HARD",
    "estimatedHours": 7,
    "respawnCategory": "normal",
    "locations": [
      "Tainted Caves"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 40,
      "fire": 100,
      "ice": 100,
      "energy": 80,
      "earth": 100,
      "holy": 0,
      "death": 100
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "renegade-quara-constrictor",
    "name": "Renegade Quara Constrictor",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Renegade_Quara_Constrictor.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 0,
      "energy": 125,
      "earth": 110,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "renegade-quara-hydromancer",
    "name": "Renegade Quara Hydromancer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Renegade_Quara_Hydromancer.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 0,
      "energy": 125,
      "earth": 110,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "renegade-quara-mantassin",
    "name": "Renegade Quara Mantassin",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Renegade_Quara_Mantassin.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 0,
      "energy": 125,
      "earth": 110,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "renegade-quara-pincher",
    "name": "Renegade Quara Pincher",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Renegade_Quara_Pincher.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 0,
      "energy": 125,
      "earth": 110,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "renegade-quara-predator",
    "name": "Renegade Quara Predator",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Renegade_Quara_Predator.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 0,
      "energy": 125,
      "earth": 110,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "roaring-lion",
    "name": "Roaring Lion",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Roaring_Lion.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 110,
      "energy": 100,
      "earth": 80,
      "holy": 50,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "roast-pork",
    "name": "Roast Pork",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Roast_Pork.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 100,
      "energy": 100,
      "earth": 110,
      "holy": 100,
      "death": 110
    },
    "killsToComplete": 1000
  },
  {
    "id": "rorc",
    "name": "Rorc",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Rorc.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 80,
      "earth": 110,
      "holy": 90,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "rot-elemental",
    "name": "Rot Elemental",
    "imageUrl": "/images/creatures/Rot_Elemental.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Oramond West"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 90,
      "fire": 100,
      "ice": 70,
      "energy": 105,
      "earth": 0,
      "holy": 80,
      "death": 80
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "rotworm",
    "name": "Rotworm",
    "imageUrl": "/images/creatures/Rotworm.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Darashia Rotworms, Liberty Bay Rotworms"
    ],
    "region": "Liberty Bay",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "sacred-spider",
    "name": "Sacred Spider",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Sacred_Spider.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 115,
      "ice": 110,
      "energy": 90,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "salamander",
    "name": "Salamander",
    "imageUrl": "/images/creatures/Salamander.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Venore Salamander Cave"
    ],
    "region": "Venore",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 90,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "sandcrawler",
    "name": "Sandcrawler",
    "imageUrl": "/images/creatures/Sandcrawler.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "All over Zao Steppe"
    ],
    "region": "Zao",
    "recommendedLevel": 50,
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "TRIVIAL",
    "killsToComplete": 500
  },
  {
    "id": "sandstone-scorpion",
    "name": "Sandstone Scorpion",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Sandstone_Scorpion.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 60,
      "ice": 110,
      "energy": 110,
      "earth": 10,
      "holy": 110,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "scarab",
    "name": "Scarab",
    "imageUrl": "/images/creatures/Scarab.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Ankrahmun Larva Caves, Mother of Scarabs Lair -4/-5"
    ],
    "region": "Ankrahmun",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 95,
      "fire": 118,
      "ice": 80,
      "energy": 90,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "schiach",
    "name": "Schiach",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Schiach.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 120,
      "ice": 90,
      "energy": 100,
      "earth": 100,
      "holy": 120,
      "death": 90
    },
    "killsToComplete": 1000
  },
  {
    "id": "scorpion",
    "name": "Scorpion",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Scorpion.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 110,
      "energy": 80,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "sea-serpent",
    "name": "Sea Serpent",
    "imageUrl": "/images/creatures/Sea_Serpent.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Svargrond Sea Serpent Area"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 110,
      "fire": 70,
      "ice": 0,
      "energy": 105,
      "earth": 100,
      "holy": 100,
      "death": 90
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "seacrest-serpent",
    "name": "Seacrest Serpent",
    "imageUrl": "/images/creatures/Seacrest_Serpent.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "estimatedHours": 7,
    "respawnCategory": "normal",
    "locations": [
      "Oramond Seacrest Grounds"
    ],
    "region": "Mainland",
    "recommendedLevel": 200,
    "elementalResistances": {
      "physical": 90,
      "fire": 80,
      "ice": 0,
      "energy": 100,
      "earth": 95,
      "holy": 100,
      "death": 90
    },
    "officialDifficulty": "HARD",
    "killsToComplete": 1000
  },
  {
    "id": "seagull",
    "name": "Seagull",
    "imageUrl": "/images/creatures/Seagull.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Laguna Islands"
    ],
    "region": "Mainland",
    "recommendedLevel": 50,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "TRIVIAL",
    "killsToComplete": 500
  },
  {
    "id": "shaburak-demon",
    "name": "Shaburak Demon",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Shaburak_Demon.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 40,
      "energy": 40,
      "earth": 125,
      "holy": 100,
      "death": 105
    },
    "killsToComplete": 500
  },
  {
    "id": "shaburak-lord",
    "name": "Shaburak Lord",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Shaburak_Lord.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 35,
      "energy": 35,
      "earth": 120,
      "holy": 100,
      "death": 105
    },
    "killsToComplete": 1000
  },
  {
    "id": "shaburak-prince",
    "name": "Shaburak Prince",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Shaburak_Prince.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 30,
      "energy": 30,
      "earth": 115,
      "holy": 105,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "shadow-hound",
    "name": "Shadow Hound",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Shadow_Hound.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 100,
      "energy": 100,
      "earth": 0,
      "holy": 125,
      "death": 0
    },
    "killsToComplete": 2500
  },
  {
    "id": "shadow-pupil",
    "name": "Shadow Pupil",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Shadow_Pupil.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 105,
      "fire": 105,
      "ice": 80,
      "energy": 90,
      "earth": 0,
      "holy": 105,
      "death": 50
    },
    "killsToComplete": 500
  },
  {
    "id": "shaper-matriarch",
    "name": "Shaper Matriarch",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Shaper_Matriarch.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 105,
      "fire": 100,
      "ice": 80,
      "energy": 105,
      "earth": 60,
      "holy": 70,
      "death": 85
    },
    "killsToComplete": 500
  },
  {
    "id": "shark",
    "name": "Shark",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Shark.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 95,
      "fire": 45,
      "ice": 90,
      "energy": 105,
      "earth": 80,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "sheep",
    "name": "Sheep",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Sheep.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "officialDifficulty": "TRIVIAL",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "sibang",
    "name": "Sibang",
    "imageUrl": "/images/creatures/Sibang.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Port Hope Ape City"
    ],
    "region": "Port Hope",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 75,
      "ice": 115,
      "energy": 100,
      "earth": 100,
      "holy": 90,
      "death": 105
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "silver-rabbit",
    "name": "Silver Rabbit",
    "imageUrl": "/images/creatures/Silver_Rabbit.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Svargrond Mammoth Mountain (South west from depot)"
    ],
    "region": "Mainland",
    "recommendedLevel": 50,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "TRIVIAL",
    "killsToComplete": 500
  },
  {
    "id": "skeleton",
    "name": "Skeleton",
    "imageUrl": "/images/creatures/Skeleton.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Yalahar Cemetery, Mount Sternum, Edron Vampire Crypt -1/-2"
    ],
    "region": "Yalahar",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 125,
      "death": 0
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "skeleton-warrior",
    "name": "Skeleton Warrior",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Skeleton_Warrior.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 125,
      "death": 0
    },
    "killsToComplete": 500
  },
  {
    "id": "skunk",
    "name": "Skunk",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Skunk.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "officialDifficulty": "TRIVIAL",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "slime",
    "name": "Slime",
    "imageUrl": "/images/creatures/Slime.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Vengoth Surface"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 80,
      "energy": 110,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "slug",
    "name": "Slug",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Slug.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 110,
      "fire": 115,
      "ice": 105,
      "energy": 100,
      "earth": 50,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "smuggler",
    "name": "Smuggler",
    "imageUrl": "/images/creatures/Smuggler.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Dark Cathedral"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 105,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 105
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "snake",
    "name": "Snake",
    "imageUrl": "/images/creatures/Snake.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "All over Tibia, Edron Vampire Crypt"
    ],
    "region": "Edron",
    "recommendedLevel": 50,
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 110,
      "energy": 80,
      "earth": 60,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "TRIVIAL",
    "killsToComplete": 500
  },
  {
    "id": "souleater",
    "name": "Souleater",
    "imageUrl": "/images/creatures/Souleater.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Souleater Mountains, Deeper Banuta"
    ],
    "region": "Port Hope",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 40,
      "fire": 110,
      "ice": 50,
      "energy": 110,
      "earth": 100,
      "holy": 110,
      "death": 0
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "spider",
    "name": "Spider",
    "imageUrl": "/images/creatures/Spider.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "All over Tibia, should be completed naturally"
    ],
    "region": "Mainland",
    "recommendedLevel": 50,
    "elementalResistances": {
      "physical": 100,
      "fire": 120,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "TRIVIAL",
    "killsToComplete": 500
  },
  {
    "id": "spidris",
    "name": "Spidris",
    "imageUrl": "/images/creatures/Spidris.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Inner Hive"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 85,
      "ice": 103,
      "energy": 105,
      "earth": 0,
      "holy": 110,
      "death": 90
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 1000
  },
  {
    "id": "spidris-elite",
    "name": "Spidris Elite",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Spidris_Elite.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 85,
      "ice": 103,
      "energy": 105,
      "earth": 0,
      "holy": 110,
      "death": 90
    },
    "killsToComplete": 1000
  },
  {
    "id": "spiky-carnivor",
    "name": "Spiky Carnivor",
    "imageUrl": "/images/creatures/Spiky_Carnivor.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "estimatedHours": 7,
    "respawnCategory": "normal",
    "locations": [
      "Carnivora's Rock"
    ],
    "region": "Mainland",
    "recommendedLevel": 200,
    "elementalResistances": {
      "physical": 60,
      "fire": 130,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "HARD",
    "killsToComplete": 500
  },
  {
    "id": "spit-nettle",
    "name": "Spit Nettle",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Spit_Nettle.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 80,
      "energy": 0,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "spitter",
    "name": "Spitter",
    "imageUrl": "/images/creatures/Spitter.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Inner Hive"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 95,
      "ice": 105,
      "energy": 111,
      "earth": 0,
      "holy": 100,
      "death": 85
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "squidgy-slime",
    "name": "Squidgy Slime",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Squidgy_Slime.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 80,
      "energy": 110,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "squirrel",
    "name": "Squirrel",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Squirrel.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "officialDifficulty": "TRIVIAL",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "stalker",
    "name": "Stalker",
    "imageUrl": "/images/creatures/Stalker.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Peninsula Tomb"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 110,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 110,
      "death": 90
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "stampor",
    "name": "Stampor",
    "imageUrl": "/images/creatures/Stampor.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Stampor Cave Muggy Plains"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 90,
      "energy": 70,
      "earth": 100,
      "holy": 50,
      "death": 90
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "starving-wolf",
    "name": "Starving Wolf",
    "imageUrl": "/images/creatures/Starving_Wolf.gif",
    "charmPoints": 15,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Ab'Dendriel Surroundings"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 110,
      "energy": 100,
      "earth": 100,
      "holy": 70,
      "death": 105
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 1000
  },
  {
    "id": "stone-devourer",
    "name": "Stone Devourer",
    "imageUrl": "/images/creatures/Stone_Devourer.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "estimatedHours": 7,
    "respawnCategory": "normal",
    "locations": [
      "Warzone 1-3"
    ],
    "region": "Mainland",
    "recommendedLevel": 200,
    "elementalResistances": {
      "physical": 90,
      "fire": 95,
      "ice": 70,
      "energy": 70,
      "earth": 0,
      "holy": 70,
      "death": 70
    },
    "officialDifficulty": "HARD",
    "killsToComplete": 1000
  },
  {
    "id": "stone-golem",
    "name": "Stone Golem",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Stone_Golem.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 90,
      "fire": 80,
      "ice": 110,
      "energy": 85,
      "earth": 0,
      "holy": 100,
      "death": 80
    },
    "killsToComplete": 500
  },
  {
    "id": "stone-rhino",
    "name": "Stone Rhino",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Stone_Rhino.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 90,
      "fire": 90,
      "ice": 90,
      "energy": 100,
      "earth": 80,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "stonerefiner",
    "name": "Stonerefiner",
    "imageUrl": "/images/creatures/Stonerefiner.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Corym Mines Venore"
    ],
    "region": "Venore",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 120,
      "fire": 110,
      "ice": 120,
      "energy": 100,
      "earth": 80,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "swamp-troll",
    "name": "Swamp Troll",
    "imageUrl": "/images/creatures/Swamp_Troll.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Port Hope Swamp Trolls Cave"
    ],
    "region": "Port Hope",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 100,
      "energy": 100,
      "earth": 85,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "swampling",
    "name": "Swampling",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Swampling.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "swan-maiden",
    "name": "Swan Maiden",
    "imageUrl": "/images/creatures/Swan_Maiden.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Feyrist Surface"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 110,
      "fire": 110,
      "ice": 100,
      "energy": 100,
      "earth": 70,
      "holy": 70,
      "death": 50
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 1000
  },
  {
    "id": "swarmer",
    "name": "Swarmer",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Swarmer.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 108,
      "ice": 103,
      "energy": 25,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "tainted-soul",
    "name": "Tainted Soul",
    "imageUrl": "/images/creatures/Tainted_Soul.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Tainted Caves"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 50,
      "fire": 100,
      "ice": 100,
      "energy": 80,
      "earth": 100,
      "holy": 110,
      "death": 0
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "tarnished-spirit",
    "name": "Tarnished Spirit",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Tarnished_Spirit.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 0,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 0,
      "holy": 100,
      "death": 0
    },
    "killsToComplete": 500
  },
  {
    "id": "terramite",
    "name": "Terramite",
    "imageUrl": "/images/creatures/Terramite.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Darashia Terramite Cave"
    ],
    "region": "Darashia",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 95,
      "fire": 110,
      "ice": 100,
      "energy": 105,
      "earth": 80,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "terrified-elephant",
    "name": "Terrified Elephant",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Terrified_Elephant.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 90,
      "fire": 100,
      "ice": 80,
      "energy": 110,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "terror-bird",
    "name": "Terror Bird",
    "imageUrl": "/images/creatures/Terror_Bird.gif",
    "charmPoints": 15,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Southern Tiquanda Coast"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 80,
      "energy": 80,
      "earth": 110,
      "holy": 100,
      "death": 105
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "thornback-tortoise",
    "name": "Thornback Tortoise",
    "imageUrl": "/images/creatures/Thornback_Tortoise.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Laguna Islands Tortoise Caves"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 70,
      "fire": 110,
      "ice": 80,
      "energy": 100,
      "earth": 80,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "thornfire-wolf",
    "name": "Thornfire Wolf",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Thornfire_Wolf.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 105,
      "energy": 90,
      "earth": 95,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "tiger",
    "name": "Tiger",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Tiger.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 110,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "toad",
    "name": "Toad",
    "imageUrl": "/images/creatures/Toad.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Laguna Islands, Tainted Soul Cave"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 80,
      "energy": 100,
      "earth": 80,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "tomb-servant",
    "name": "Tomb Servant",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Tomb_Servant.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 0,
      "holy": 125,
      "death": 0
    },
    "killsToComplete": 1000
  },
  {
    "id": "tortoise",
    "name": "Tortoise",
    "imageUrl": "/images/creatures/Tortoise.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Laguna Islands Tortoise Caves"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 80,
      "fire": 110,
      "ice": 80,
      "energy": 100,
      "earth": 80,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "troll",
    "name": "Troll",
    "imageUrl": "/images/creatures/Troll.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Edron Troll Cave"
    ],
    "region": "Edron",
    "recommendedLevel": 50,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 80,
      "earth": 110,
      "holy": 90,
      "death": 110
    },
    "officialDifficulty": "TRIVIAL",
    "killsToComplete": 500
  },
  {
    "id": "troll-champion",
    "name": "Troll Champion",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Troll_Champion.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 80,
      "earth": 110,
      "holy": 90,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "troll-guard",
    "name": "Troll Guard",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Troll_Guard.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 80,
      "earth": 110,
      "holy": 90,
      "death": 110
    },
    "killsToComplete": 2500
  },
  {
    "id": "troll-legionnaire",
    "name": "Troll Legionnaire",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Troll_Legionnaire.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "twisted-pooka",
    "name": "Twisted Pooka",
    "imageUrl": "/images/creatures/Twisted_Pooka.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Dark Faun Cave"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 80,
      "fire": 80,
      "ice": 80,
      "energy": 110,
      "earth": 60,
      "holy": 120,
      "death": 70
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "twisted-shaper",
    "name": "Twisted Shaper",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Twisted_Shaper.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 95,
      "fire": 105,
      "ice": 70,
      "energy": 105,
      "earth": 60,
      "holy": 70,
      "death": 90
    },
    "killsToComplete": 500
  },
  {
    "id": "undead-cavebear",
    "name": "Undead Cavebear",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Undead_Cavebear.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 0,
      "holy": 125,
      "death": 0
    },
    "killsToComplete": 2500
  },
  {
    "id": "undead-gladiator",
    "name": "Undead Gladiator",
    "imageUrl": "/images/creatures/Undead_Gladiator.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Krailos Nightmare Cave"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 20,
      "ice": 100,
      "energy": 80,
      "earth": 110,
      "holy": 90,
      "death": 105
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "undead-jester",
    "name": "Undead Jester",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Undead_Jester.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "officialDifficulty": "TRIVIAL",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 70,
      "energy": 90,
      "earth": 0,
      "holy": 120,
      "death": 0
    },
    "killsToComplete": 2500
  },
  {
    "id": "undead-mine-worker",
    "name": "Undead Mine Worker",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Undead_Mine_Worker.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 125,
      "death": 0
    },
    "killsToComplete": 1000
  },
  {
    "id": "undead-prospector",
    "name": "Undead Prospector",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Undead_Prospector.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 90,
      "energy": 70,
      "earth": 80,
      "holy": 125,
      "death": 0
    },
    "killsToComplete": 1000
  },
  {
    "id": "valkyrie",
    "name": "Valkyrie",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Valkyrie.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 110,
      "fire": 90,
      "ice": 90,
      "energy": 100,
      "earth": 100,
      "holy": 95,
      "death": 105
    },
    "killsToComplete": 500
  },
  {
    "id": "vampire",
    "name": "Vampire",
    "imageUrl": "/images/creatures/Vampire.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Edron Vampire Crypt, Peninsula Tomb"
    ],
    "region": "Edron",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 75,
      "fire": 110,
      "ice": 100,
      "energy": 100,
      "earth": 0,
      "holy": 125,
      "death": 0
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "vampire-bride",
    "name": "Vampire Bride",
    "imageUrl": "/images/creatures/Vampire_Bride.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Edron Vampire Crypt"
    ],
    "region": "Edron",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 80,
      "energy": 90,
      "earth": 80,
      "holy": 110,
      "death": 0
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "vampire-viscount",
    "name": "Vampire Viscount",
    "imageUrl": "/images/creatures/Vampire_Viscount.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Edron Vampire Crypt"
    ],
    "region": "Edron",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 90,
      "fire": 105,
      "ice": 90,
      "energy": 100,
      "earth": 0,
      "holy": 125,
      "death": 0
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "vicious-manbat",
    "name": "Vicious Manbat",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Vicious_Manbat.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 95,
      "fire": 110,
      "ice": 80,
      "energy": 95,
      "earth": 0,
      "holy": 110,
      "death": 0
    },
    "killsToComplete": 2500
  },
  {
    "id": "vulcongra",
    "name": "Vulcongra",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Vulcongra.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "officialDifficulty": "HARD",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 105,
      "energy": 100,
      "earth": 0,
      "holy": 100,
      "death": 95
    },
    "killsToComplete": 500
  },
  {
    "id": "wailing-widow",
    "name": "Wailing Widow",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Wailing_Widow.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 100,
      "energy": 100,
      "earth": 0,
      "holy": 90,
      "death": 0
    },
    "killsToComplete": 500
  },
  {
    "id": "walker",
    "name": "Walker",
    "imageUrl": "/images/creatures/Walker.gif",
    "charmPoints": 25,
    "difficulty": "HARD",
    "estimatedHours": 7,
    "respawnCategory": "normal",
    "locations": [
      "Underground Glooth Factory, Rathleton Sewers"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 95,
      "fire": 65,
      "ice": 95,
      "energy": 100,
      "earth": 50,
      "holy": 60,
      "death": 85
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 1000
  },
  {
    "id": "war-golem",
    "name": "War Golem",
    "imageUrl": "/images/creatures/War_Golem.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Oramond Catacombs - Golem stage"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 90,
      "fire": 85,
      "ice": 70,
      "energy": 95,
      "earth": 50,
      "holy": 50,
      "death": 80
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "war-wolf",
    "name": "War Wolf",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/War_Wolf.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 110,
      "energy": 100,
      "earth": 80,
      "holy": 90,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "warlock",
    "name": "Warlock",
    "imageUrl": "/images/creatures/Warlock.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Demona"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 105,
      "fire": 0,
      "ice": 0,
      "energy": 0,
      "earth": 5,
      "holy": 108,
      "death": 100
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "wasp",
    "name": "Wasp",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Wasp.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "officialDifficulty": "TRIVIAL",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 100,
      "energy": 100,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "waspoid",
    "name": "Waspoid",
    "imageUrl": "/images/creatures/Waspoid.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Inner Hive"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 102,
      "fire": 110,
      "ice": 100,
      "energy": 75,
      "earth": 0,
      "holy": 107,
      "death": 95
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "water-buffalo",
    "name": "Water Buffalo",
    "imageUrl": "/images/creatures/Water_Buffalo.gif",
    "charmPoints": 30,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Venore Southern Swamp"
    ],
    "region": "Venore",
    "recommendedLevel": 200,
    "elementalResistances": {
      "physical": 80,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 2500
  },
  {
    "id": "water-elemental",
    "name": "Water Elemental",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Water_Elemental.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 70,
      "fire": 0,
      "ice": 0,
      "energy": 125,
      "earth": 0,
      "holy": 50,
      "death": 50
    },
    "killsToComplete": 500
  },
  {
    "id": "weakened-frazzlemaw",
    "name": "Weakened Frazzlemaw",
    "imageUrl": "/images/creatures/Weakened_Frazzlemaw.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Feyrist Mini Rosha"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 95,
      "fire": 90,
      "ice": 95,
      "energy": 85,
      "earth": 80,
      "holy": 105,
      "death": 90
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "weeper",
    "name": "Weeper",
    "imageUrl": "/images/creatures/Weeper.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "estimatedHours": 7,
    "respawnCategory": "normal",
    "locations": [
      "Warzone 1-3"
    ],
    "region": "Mainland",
    "recommendedLevel": 200,
    "elementalResistances": {
      "physical": 105,
      "fire": 0,
      "ice": 105,
      "energy": 100,
      "earth": 0,
      "holy": 100,
      "death": 70
    },
    "officialDifficulty": "HARD",
    "killsToComplete": 1000
  },
  {
    "id": "white-deer",
    "name": "White Deer",
    "imageUrl": "/images/creatures/White_Deer.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Ab'Dendriel Surroundings"
    ],
    "region": "Mainland",
    "recommendedLevel": 50,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "TRIVIAL",
    "killsToComplete": 1000
  },
  {
    "id": "white-shade",
    "name": "White Shade",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/White_Shade.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 5,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 0,
      "holy": 110,
      "death": 0
    },
    "killsToComplete": 500
  },
  {
    "id": "wiggler",
    "name": "Wiggler",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Wiggler.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 100,
      "energy": 95,
      "earth": 0,
      "holy": 100,
      "death": 90
    },
    "killsToComplete": 500
  },
  {
    "id": "wild-horse",
    "name": "Wild Horse",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Wild_Horse.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "officialDifficulty": "TRIVIAL",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "wild-warrior",
    "name": "Wild Warrior",
    "imageUrl": "/images/creatures/Wild_Warrior.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Dark Cathedral"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 105,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 90,
      "death": 105
    },
    "officialDifficulty": "EASY",
    "killsToComplete": 500
  },
  {
    "id": "wilting-leaf-golem",
    "name": "Wilting Leaf Golem",
    "imageUrl": "/images/creatures/Wilting_Leaf_Golem.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Dryad Gardens"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 105,
      "energy": 100,
      "earth": 60,
      "holy": 100,
      "death": 100
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "winter-wolf",
    "name": "Winter Wolf",
    "imageUrl": "/images/creatures/Winter_Wolf.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "Svargrond Mammoth Mountain (South west from depot)"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 100,
      "fire": 90,
      "ice": 80,
      "energy": 105,
      "earth": 100,
      "holy": 90,
      "death": 110
    },
    "officialDifficulty": "TRIVIAL",
    "killsToComplete": 500
  },
  {
    "id": "wisp",
    "name": "Wisp",
    "imageUrl": "/images/creatures/Wisp.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Feyrist Surface"
    ],
    "region": "Mainland",
    "recommendedLevel": 50,
    "elementalResistances": {
      "physical": 40,
      "fire": 100,
      "ice": 100,
      "energy": 60,
      "earth": 10,
      "holy": 100,
      "death": 0
    },
    "officialDifficulty": "TRIVIAL",
    "killsToComplete": 500
  },
  {
    "id": "witch",
    "name": "Witch",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Witch.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 105,
      "fire": 100,
      "ice": 100,
      "energy": 0,
      "earth": 80,
      "holy": 100,
      "death": 105
    },
    "killsToComplete": 500
  },
  {
    "id": "wolf",
    "name": "Wolf",
    "imageUrl": "/images/creatures/Wolf.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "All over Tibia, should be completed naturally"
    ],
    "region": "Mainland",
    "recommendedLevel": 50,
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 110,
      "energy": 100,
      "earth": 100,
      "holy": 70,
      "death": 105
    },
    "officialDifficulty": "TRIVIAL",
    "killsToComplete": 500
  },
  {
    "id": "worker-golem",
    "name": "Worker Golem",
    "imageUrl": "/images/creatures/Worker_Golem.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Oramond Catacombs - Golem stage"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 90,
      "fire": 100,
      "ice": 90,
      "energy": 105,
      "earth": 50,
      "holy": 50,
      "death": 90
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "worm-priestess",
    "name": "Worm Priestess",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Worm_Priestess.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 90,
      "ice": 95,
      "energy": 100,
      "earth": 80,
      "holy": 100,
      "death": 95
    },
    "killsToComplete": 500
  },
  {
    "id": "wyvern",
    "name": "Wyvern",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Wyvern.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 90,
      "energy": 80,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "yeti",
    "name": "Yeti",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Yeti.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 100,
      "energy": 108,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "young-sea-serpent",
    "name": "Young Sea Serpent",
    "imageUrl": "/images/creatures/Young_Sea_Serpent.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Svargrond Sea Serpent Area"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "elementalResistances": {
      "physical": 120,
      "fire": 70,
      "ice": 0,
      "energy": 110,
      "earth": 105,
      "holy": 100,
      "death": 115
    },
    "officialDifficulty": "MEDIUM",
    "killsToComplete": 500
  },
  {
    "id": "zombie",
    "name": "Zombie",
    "imageUrl": "https://tibia.fandom.com/wiki/Special:FilePath/Zombie.gif",
    "charmPoints": 5,
    "difficulty": "MEDIUM",
    "officialDifficulty": "MEDIUM",
    "respawnCategory": "normal",
    "locations": [
      "Unknown"
    ],
    "region": "Mainland",
    "elementalResistances": {
      "physical": 100,
      "fire": 50,
      "ice": 0,
      "energy": 0,
      "earth": 0,
      "holy": 100,
      "death": 0
    },
    "killsToComplete": 500
  }
];