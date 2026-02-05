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
 * - hitpoints: number (optional - creature HP/life)
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

import { filterValidBestiaryCreatures } from './excludedFromBestiary';

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
    "imageUrl": "/images/creatures/abyssal-calamary.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "acid-blob",
    "name": "Acid Blob",
    "imageUrl": "/images/creatures/acid-blob.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "acolyte-of-darkness",
    "name": "Acolyte of Darkness",
    "imageUrl": "/images/creatures/acolyte-of-darkness.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "acolyte-of-the-cult",
    "name": "Acolyte of the Cult",
    "imageUrl": "/images/creatures/acolyte-of-the-cult.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "adept-of-the-cult",
    "name": "Adept of the Cult",
    "imageUrl": "/images/creatures/adept-of-the-cult.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "adult-goanna",
    "name": "Adult Goanna",
    "imageUrl": "/images/creatures/adult-goanna.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "adventurer",
    "name": "Adventurer",
    "imageUrl": "/images/creatures/adventurer.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "afflicted-strider",
    "name": "Afflicted Strider",
    "imageUrl": "/images/creatures/afflicted-strider.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "agrestic-chicken",
    "name": "Agrestic Chicken",
    "imageUrl": "/images/creatures/agrestic-chicken.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "albino-dragon",
    "name": "Albino Dragon",
    "imageUrl": "/images/creatures/albino-dragon.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "alchemistical-container",
    "name": "Alchemistical Container",
    "imageUrl": "/images/creatures/alchemistical-container.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "amazon",
    "name": "Amazon",
    "imageUrl": "/images/creatures/amazon.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "an-eye",
    "name": "An Eye",
    "imageUrl": "/images/creatures/an-eye.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "ancient-scarab",
    "name": "Ancient Scarab",
    "imageUrl": "/images/creatures/ancient-scarab.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "angry-plant-thing",
    "name": "Angry Plant Thing",
    "imageUrl": "/images/creatures/angry-plant-thing.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "angry-sugar-fairy",
    "name": "Angry Sugar Fairy",
    "imageUrl": "/images/creatures/angry-sugar-fairy.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "animated-feather",
    "name": "Animated Feather",
    "imageUrl": "/images/creatures/animated-feather.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "animated-snowman",
    "name": "Animated Snowman",
    "imageUrl": "/images/creatures/animated-snowman.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "antenna",
    "name": "Antenna",
    "imageUrl": "/images/creatures/antenna.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "arachnophobica",
    "name": "Arachnophobica",
    "imageUrl": "/images/creatures/arachnophobica.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "arbaziloth",
    "name": "Arbaziloth",
    "imageUrl": "/images/creatures/arbaziloth.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "arctic-faun",
    "name": "Arctic Faun",
    "imageUrl": "/images/creatures/arctic-faun.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "armadile",
    "name": "Armadile",
    "imageUrl": "/images/creatures/armadile.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "askarak-demon",
    "name": "Askarak Demon",
    "imageUrl": "/images/creatures/askarak-demon.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "askarak-lord",
    "name": "Askarak Lord",
    "imageUrl": "/images/creatures/askarak-lord.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "askarak-prince",
    "name": "Askarak Prince",
    "imageUrl": "/images/creatures/askarak-prince.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "assassin",
    "name": "Assassin",
    "imageUrl": "/images/creatures/assassin.gif",
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
    "imageUrl": "/images/creatures/atab.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "azure-frog",
    "name": "Azure Frog",
    "imageUrl": "/images/creatures/azure-frog.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "badger",
    "name": "Badger",
    "imageUrl": "/images/creatures/badger.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "bakragore",
    "name": "Bakragore",
    "imageUrl": "/images/creatures/bakragore.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "baleful-bunny",
    "name": "Baleful Bunny",
    "imageUrl": "/images/creatures/baleful-bunny.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "bandit",
    "name": "Bandit",
    "imageUrl": "/images/creatures/bandit.gif",
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
    "imageUrl": "/images/creatures/bane-bringer.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "bane-of-light",
    "name": "Bane of Light",
    "imageUrl": "/images/creatures/bane-of-light.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "banshee",
    "name": "Banshee",
    "imageUrl": "/images/creatures/banshee.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "barbarian-bloodwalker",
    "name": "Barbarian Bloodwalker",
    "imageUrl": "/images/creatures/barbarian-bloodwalker.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "barbarian-brutetamer",
    "name": "Barbarian Brutetamer",
    "imageUrl": "/images/creatures/barbarian-brutetamer.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "barbarian-headsplitter",
    "name": "Barbarian Headsplitter",
    "imageUrl": "/images/creatures/barbarian-headsplitter.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "barbarian-skullhunter",
    "name": "Barbarian Skullhunter",
    "imageUrl": "/images/creatures/barbarian-skullhunter.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "barkless-devotee",
    "name": "Barkless Devotee",
    "imageUrl": "/images/creatures/barkless-devotee.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "barkless-fanatic",
    "name": "Barkless Fanatic",
    "imageUrl": "/images/creatures/barkless-fanatic.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "bashmu",
    "name": "Bashmu",
    "imageUrl": "/images/creatures/bashmu.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "bat",
    "name": "Bat",
    "imageUrl": "/images/creatures/bat.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "bear",
    "name": "Bear",
    "imageUrl": "/images/creatures/bear.gif",
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
    "imageUrl": "/images/creatures/behemoth.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "bellicose-orger",
    "name": "Bellicose Orger",
    "imageUrl": "/images/creatures/bellicose-orger.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "berrypest",
    "name": "Berrypest",
    "imageUrl": "/images/creatures/berrypest.gif",
    "charmPoints": 5,
    "difficulty": "HARMLESS",
    "officialDifficulty": "HARMLESS",
    "respawnCategory": "rare",
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
    "killsToComplete": 5
  },
  {
    "id": "berserker-chicken",
    "name": "Berserker Chicken",
    "imageUrl": "/images/creatures/berserker-chicken.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "betrayed-wraith",
    "name": "Betrayed Wraith",
    "imageUrl": "/images/creatures/betrayed-wraith.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "billdodger",
    "name": "Billdodger",
    "imageUrl": "/images/creatures/billdodger.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "biting-book",
    "name": "Biting Book",
    "imageUrl": "/images/creatures/biting-book.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "black-sheep",
    "name": "Black Sheep",
    "imageUrl": "/images/creatures/black-sheep.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "black-sphinx-acolyte",
    "name": "Black Sphinx Acolyte",
    "imageUrl": "/images/creatures/black-sphinx-acolyte.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "blemished-spawn",
    "name": "Blemished Spawn",
    "imageUrl": "/images/creatures/blemished-spawn.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "blight-spitter",
    "name": "Blight Spitter",
    "imageUrl": "/images/creatures/blight-spitter.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "blightling",
    "name": "Blightling",
    "imageUrl": "/images/creatures/blightling.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "blightwalker",
    "name": "Blightwalker",
    "imageUrl": "/images/creatures/blightwalker.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "bloated-man-maggot",
    "name": "Bloated Man-Maggot",
    "imageUrl": "/images/creatures/bloated-man-maggot.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "blocking-stalagmite",
    "name": "Blocking Stalagmite",
    "imageUrl": "/images/creatures/blocking-stalagmite.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "blood-beast",
    "name": "Blood Beast",
    "imageUrl": "/images/creatures/blood-beast.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "blood-crab",
    "name": "Blood Crab",
    "imageUrl": "/images/creatures/blood-crab.gif",
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
    "imageUrl": "/images/creatures/blood-guardian.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "blood-hand",
    "name": "Blood Hand",
    "imageUrl": "/images/creatures/blood-hand.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "blood-pool",
    "name": "Blood Pool",
    "imageUrl": "/images/creatures/blood-pool.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "blood-priest",
    "name": "Blood Priest",
    "imageUrl": "/images/creatures/blood-priest.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "blooming-tower-light-blue",
    "name": "Blooming Tower (Light Blue)",
    "imageUrl": "/images/creatures/blooming-tower-light-blue.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "blooming-tower-red",
    "name": "Blooming Tower (Red)",
    "imageUrl": "/images/creatures/blooming-tower-red.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "blooming-tower-violet",
    "name": "Blooming Tower (Violet)",
    "imageUrl": "/images/creatures/blooming-tower-violet.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "blooming-tower-yellow",
    "name": "Blooming Tower (Yellow)",
    "imageUrl": "/images/creatures/blooming-tower-yellow.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "blue-djinn",
    "name": "Blue Djinn",
    "imageUrl": "/images/creatures/blue-djinn.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "bluebeak",
    "name": "Bluebeak",
    "imageUrl": "/images/creatures/bluebeak.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "boar",
    "name": "Boar",
    "imageUrl": "/images/creatures/boar.gif",
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
    "imageUrl": "/images/creatures/boar-man.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "bog-frog",
    "name": "Bog Frog",
    "imageUrl": "/images/creatures/bog-frog.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "bog-raider",
    "name": "Bog Raider",
    "imageUrl": "/images/creatures/bog-raider.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "bone-barrier",
    "name": "Bone Barrier",
    "imageUrl": "/images/creatures/bone-barrier.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "bone-bear",
    "name": "Bone Bear",
    "imageUrl": "/images/creatures/bone-bear.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "bone-overlord",
    "name": "Bone Overlord",
    "imageUrl": "/images/creatures/bone-overlord.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "bonebeast",
    "name": "Bonebeast",
    "imageUrl": "/images/creatures/bonebeast.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "bonelord",
    "name": "Bonelord",
    "imageUrl": "/images/creatures/bonelord.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "bonelord-totem",
    "name": "Bonelord Totem",
    "imageUrl": "/images/creatures/bonelord-totem.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "bonelords-phylactery",
    "name": "Bonelord's Phylactery",
    "imageUrl": "/images/creatures/bonelords-phylactery.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "bony-sea-devil",
    "name": "Bony Sea Devil",
    "imageUrl": "/images/creatures/bony-sea-devil.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "boogy",
    "name": "Boogy",
    "imageUrl": "/images/creatures/boogy.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "bound-ape",
    "name": "Bound Ape",
    "imageUrl": "/images/creatures/bound-ape.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "bound-cave-spider",
    "name": "Bound Cave Spider",
    "imageUrl": "/images/creatures/bound-cave-spider.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "bound-iks-aucar",
    "name": "Bound Iks Aucar",
    "imageUrl": "/images/creatures/bound-iks-aucar.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "brachiodemon",
    "name": "Brachiodemon",
    "imageUrl": "/images/creatures/brachiodemon.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "brain-squid",
    "name": "Brain Squid",
    "imageUrl": "/images/creatures/brain-squid.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "braindeath",
    "name": "Braindeath",
    "imageUrl": "/images/creatures/braindeath.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "bramble-wyrmling",
    "name": "Bramble Wyrmling",
    "imageUrl": "/images/creatures/bramble-wyrmling.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "branchy-crawler",
    "name": "Branchy Crawler",
    "imageUrl": "/images/creatures/branchy-crawler.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "breach-brood",
    "name": "Breach Brood",
    "imageUrl": "/images/creatures/breach-brood.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "bride-of-night",
    "name": "Bride of Night",
    "imageUrl": "/images/creatures/bride-of-night.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "bright-crystal",
    "name": "Bright Crystal",
    "imageUrl": "/images/creatures/bright-crystal.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "brimstone-bug",
    "name": "Brimstone Bug",
    "imageUrl": "/images/creatures/brimstone-bug.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "brinebrute-inferniarch",
    "name": "Brinebrute Inferniarch",
    "imageUrl": "/images/creatures/brinebrute-inferniarch.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "broken-shaper",
    "name": "Broken Shaper",
    "imageUrl": "/images/creatures/broken-shaper.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "broodrider-inferniarch",
    "name": "Broodrider Inferniarch",
    "imageUrl": "/images/creatures/broodrider-inferniarch.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "bug",
    "name": "Bug",
    "imageUrl": "/images/creatures/bug.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "bulltaur-alchemist",
    "name": "Bulltaur Alchemist",
    "imageUrl": "/images/creatures/bulltaur-alchemist.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "bulltaur-brute",
    "name": "Bulltaur Brute",
    "imageUrl": "/images/creatures/bulltaur-brute.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "bulltaur-forgepriest",
    "name": "Bulltaur Forgepriest",
    "imageUrl": "/images/creatures/bulltaur-forgepriest.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "burning-book",
    "name": "Burning Book",
    "imageUrl": "/images/creatures/burning-book.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "burning-gladiator",
    "name": "Burning Gladiator",
    "imageUrl": "/images/creatures/burning-gladiator.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "burster-spectre",
    "name": "Burster Spectre",
    "imageUrl": "/images/creatures/burster-spectre.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "butterfly-blue",
    "name": "Butterfly (Blue)",
    "imageUrl": "/images/creatures/butterfly-blue.gif",
    "charmPoints": 5,
    "difficulty": "HARMLESS",
    "officialDifficulty": "HARMLESS",
    "respawnCategory": "rare",
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
    "killsToComplete": 5
  },
  {
    "id": "butterfly-purple",
    "name": "Butterfly (Purple)",
    "imageUrl": "/images/creatures/butterfly-purple.gif",
    "charmPoints": 5,
    "difficulty": "HARMLESS",
    "officialDifficulty": "HARMLESS",
    "respawnCategory": "rare",
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
    "killsToComplete": 5
  },
  {
    "id": "butterfly-purplebluered",
    "name": "Butterfly (Purple/Blue/Red)",
    "imageUrl": "/images/creatures/butterfly-purplebluered.gif",
    "charmPoints": 1,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "normal",
    "locations": [
      "All over Tiquanda"
    ],
    "region": "Mainland",
    "recommendedLevel": 20,
    "killsToComplete": 25
  },
  {
    "id": "butterfly-red",
    "name": "Butterfly (Red)",
    "imageUrl": "/images/creatures/butterfly-red.gif",
    "charmPoints": 5,
    "difficulty": "HARMLESS",
    "officialDifficulty": "HARMLESS",
    "respawnCategory": "rare",
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
    "killsToComplete": 5
  },
  {
    "id": "cake-golem",
    "name": "Cake Golem",
    "imageUrl": "/images/creatures/cake-golem.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "calamary",
    "name": "Calamary",
    "imageUrl": "/images/creatures/calamary.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "candy-floss-elemental",
    "name": "Candy Floss Elemental",
    "imageUrl": "/images/creatures/candy-floss-elemental.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "candy-horror",
    "name": "Candy Horror",
    "imageUrl": "/images/creatures/candy-horror.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "capricious-phantom",
    "name": "Capricious Phantom",
    "imageUrl": "/images/creatures/capricious-phantom.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "carniphila",
    "name": "Carniphila",
    "imageUrl": "/images/creatures/carniphila.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "carnivorous-butterfly",
    "name": "Carnivorous Butterfly",
    "imageUrl": "/images/creatures/carnivorous-butterfly.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "carnivostrich",
    "name": "Carnivostrich",
    "imageUrl": "/images/creatures/carnivostrich.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "carrion-worm",
    "name": "Carrion Worm",
    "imageUrl": "/images/creatures/carrion-worm.gif",
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
    "imageUrl": "/images/creatures/cat.gif",
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
    "killsToComplete": 25
  },
  {
    "id": "cave-chimera",
    "name": "Cave Chimera",
    "imageUrl": "/images/creatures/cave-chimera.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "cave-devourer",
    "name": "Cave Devourer",
    "imageUrl": "/images/creatures/cave-devourer.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "cave-parrot",
    "name": "Cave Parrot",
    "imageUrl": "/images/creatures/cave-parrot.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "cave-rat",
    "name": "Cave Rat",
    "imageUrl": "/images/creatures/cave-rat.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "cellar-rat",
    "name": "Cellar Rat",
    "imageUrl": "/images/creatures/cellar-rat.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "centipede",
    "name": "Centipede",
    "imageUrl": "/images/creatures/centipede.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "chakoya-toolshaper",
    "name": "Chakoya Toolshaper",
    "imageUrl": "/images/creatures/chakoya-toolshaper.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "chakoya-tribewarden",
    "name": "Chakoya Tribewarden",
    "imageUrl": "/images/creatures/chakoya-tribewarden.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "chakoya-windcaller",
    "name": "Chakoya Windcaller",
    "imageUrl": "/images/creatures/chakoya-windcaller.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "charged-imp",
    "name": "Charged Imp",
    "imageUrl": "/images/creatures/charged-imp.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "chasm-spawn",
    "name": "Chasm Spawn",
    "imageUrl": "/images/creatures/chasm-spawn.gif",
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
    "killsToComplete": 2500
  },
  {
    "id": "cheeky-sugar-cube",
    "name": "Cheeky Sugar Cube",
    "imageUrl": "/images/creatures/cheeky-sugar-cube.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "chicken",
    "name": "Chicken",
    "imageUrl": "/images/creatures/chicken.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "chocolate-blob",
    "name": "Chocolate Blob",
    "imageUrl": "/images/creatures/chocolate-blob.gif",
    "charmPoints": 5,
    "difficulty": "HARMLESS",
    "officialDifficulty": "HARMLESS",
    "respawnCategory": "rare",
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
    "killsToComplete": 5
  },
  {
    "id": "choking-fear",
    "name": "Choking Fear",
    "imageUrl": "/images/creatures/choking-fear.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "cinder-wyrmling",
    "name": "Cinder Wyrmling",
    "imageUrl": "/images/creatures/cinder-wyrmling.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "clavius",
    "name": "Clavius",
    "imageUrl": "/images/creatures/clavius.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "clay-guardian",
    "name": "Clay Guardian",
    "imageUrl": "/images/creatures/clay-guardian.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "cliff-strider",
    "name": "Cliff Strider",
    "imageUrl": "/images/creatures/cliff-strider.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "cloak-of-terror",
    "name": "Cloak of Terror",
    "imageUrl": "/images/creatures/cloak-of-terror.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "clomp",
    "name": "Clomp",
    "imageUrl": "/images/creatures/clomp.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "cobra",
    "name": "Cobra",
    "imageUrl": "/images/creatures/cobra.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "cobra-assassin",
    "name": "Cobra Assassin",
    "imageUrl": "/images/creatures/cobra-assassin.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "cobra-scout",
    "name": "Cobra Scout",
    "imageUrl": "/images/creatures/cobra-scout.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "cobra-vizier",
    "name": "Cobra Vizier",
    "imageUrl": "/images/creatures/cobra-vizier.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "converter",
    "name": "Converter",
    "imageUrl": "/images/creatures/converter.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "coral-frog",
    "name": "Coral Frog",
    "imageUrl": "/images/creatures/coral-frog.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "corrupted-ghost",
    "name": "Corrupted Ghost",
    "imageUrl": "/images/creatures/corrupted-ghost.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "corrupted-skeleton",
    "name": "Corrupted Skeleton",
    "imageUrl": "/images/creatures/corrupted-skeleton.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "corym-charlatan",
    "name": "Corym Charlatan",
    "imageUrl": "/images/creatures/corym-charlatan.gif",
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
    "imageUrl": "/images/creatures/corym-skirmisher.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "corym-vanguard",
    "name": "Corym Vanguard",
    "imageUrl": "/images/creatures/corym-vanguard.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "courage-leech",
    "name": "Courage Leech",
    "imageUrl": "/images/creatures/courage-leech.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "court-warlock",
    "name": "Court Warlock",
    "imageUrl": "/images/creatures/court-warlock.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "cow",
    "name": "Cow",
    "imageUrl": "/images/creatures/cow.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "crab",
    "name": "Crab",
    "imageUrl": "/images/creatures/crab.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "crape-man",
    "name": "Crape Man",
    "imageUrl": "/images/creatures/crape-man.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "crawler",
    "name": "Crawler",
    "imageUrl": "/images/creatures/crawler.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "crazed-beggar",
    "name": "Crazed Beggar",
    "imageUrl": "/images/creatures/crazed-beggar.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "crazed-summer-rearguard",
    "name": "Crazed Summer Rearguard",
    "imageUrl": "/images/creatures/crazed-summer-rearguard.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "crazed-summer-vanguard",
    "name": "Crazed Summer Vanguard",
    "imageUrl": "/images/creatures/crazed-summer-vanguard.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "crazed-winter-rearguard",
    "name": "Crazed Winter Rearguard",
    "imageUrl": "/images/creatures/crazed-winter-rearguard.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "crazed-winter-vanguard",
    "name": "Crazed Winter Vanguard",
    "imageUrl": "/images/creatures/crazed-winter-vanguard.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "cream-blob",
    "name": "Cream Blob",
    "imageUrl": "/images/creatures/cream-blob.gif",
    "charmPoints": 5,
    "difficulty": "HARMLESS",
    "officialDifficulty": "HARMLESS",
    "respawnCategory": "rare",
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
    "killsToComplete": 5
  },
  {
    "id": "creepy-crawler",
    "name": "Creepy Crawler",
    "imageUrl": "/images/creatures/creepy-crawler.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "crimson-frog",
    "name": "Crimson Frog",
    "imageUrl": "/images/creatures/crimson-frog.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "crocodile",
    "name": "Crocodile",
    "imageUrl": "/images/creatures/crocodile.gif",
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
    "imageUrl": "/images/creatures/crusader.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "crustacea-gigantica",
    "name": "Crustacea Gigantica",
    "imageUrl": "/images/creatures/crustacea-gigantica.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "crypt-construct",
    "name": "Crypt Construct",
    "imageUrl": "/images/creatures/crypt-construct.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "crypt-defiler",
    "name": "Crypt Defiler",
    "imageUrl": "/images/creatures/crypt-defiler.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "crypt-fiend",
    "name": "Crypt Fiend",
    "imageUrl": "/images/creatures/crypt-fiend.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "crypt-mage",
    "name": "Crypt Mage",
    "imageUrl": "/images/creatures/crypt-mage.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "crypt-shambler",
    "name": "Crypt Shambler",
    "imageUrl": "/images/creatures/crypt-shambler.gif",
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
    "imageUrl": "/images/creatures/crypt-warden.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "crypt-warrior",
    "name": "Crypt Warrior",
    "imageUrl": "/images/creatures/crypt-warrior.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "crystal-spider",
    "name": "Crystal Spider",
    "imageUrl": "/images/creatures/crystal-spider.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "crystal-wolf",
    "name": "Crystal Wolf",
    "imageUrl": "/images/creatures/crystal-wolf.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "crystalcrusher",
    "name": "Crystalcrusher",
    "imageUrl": "/images/creatures/crystalcrusher.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "cult-believer",
    "name": "Cult Believer",
    "imageUrl": "/images/creatures/cult-believer.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "cult-enforcer",
    "name": "Cult Enforcer",
    "imageUrl": "/images/creatures/cult-enforcer.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "cult-scholar",
    "name": "Cult Scholar",
    "imageUrl": "/images/creatures/cult-scholar.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "cunning-werepanther",
    "name": "Cunning Werepanther",
    "imageUrl": "/images/creatures/cunning-werepanther.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "cursed-ape",
    "name": "Cursed Ape",
    "imageUrl": "/images/creatures/cursed-ape.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "cursed-book",
    "name": "Cursed Book",
    "imageUrl": "/images/creatures/cursed-book.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "cursed-prospector",
    "name": "Cursed Prospector",
    "imageUrl": "/images/creatures/cursed-prospector.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "cyclops",
    "name": "Cyclops",
    "imageUrl": "/images/creatures/cyclops.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "cyclops-drone",
    "name": "Cyclops Drone",
    "imageUrl": "/images/creatures/cyclops-drone.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "cyclops-smith",
    "name": "Cyclops Smith",
    "imageUrl": "/images/creatures/cyclops-smith.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "cyclursus",
    "name": "Cyclursus",
    "imageUrl": "/images/creatures/cyclursus.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "damaged-crystal-golem",
    "name": "Damaged Crystal Golem",
    "imageUrl": "/images/creatures/damaged-crystal-golem.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "damaged-worker-golem",
    "name": "Damaged Worker Golem",
    "imageUrl": "/images/creatures/damaged-worker-golem.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "dangerous-apparatus",
    "name": "Dangerous Apparatus",
    "imageUrl": "/images/creatures/dangerous-apparatus.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "dark-apprentice",
    "name": "Dark Apprentice",
    "imageUrl": "/images/creatures/dark-apprentice.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "dark-carnisylvan",
    "name": "Dark Carnisylvan",
    "imageUrl": "/images/creatures/dark-carnisylvan.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "dark-faun",
    "name": "Dark Faun",
    "imageUrl": "/images/creatures/dark-faun.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "dark-magician",
    "name": "Dark Magician",
    "imageUrl": "/images/creatures/dark-magician.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "dark-merudri",
    "name": "Dark Merudri",
    "imageUrl": "/images/creatures/dark-merudri.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "dark-monk",
    "name": "Dark Monk",
    "imageUrl": "/images/creatures/dark-monk.gif",
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
    "imageUrl": "/images/creatures/dark-torturer.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "darklight-construct",
    "name": "Darklight Construct",
    "imageUrl": "/images/creatures/darklight-construct.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "darklight-emitter",
    "name": "Darklight Emitter",
    "imageUrl": "/images/creatures/darklight-emitter.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "darklight-matter",
    "name": "Darklight Matter",
    "imageUrl": "/images/creatures/darklight-matter.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "darklight-source",
    "name": "Darklight Source",
    "imageUrl": "/images/creatures/darklight-source.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "darklight-striker",
    "name": "Darklight Striker",
    "imageUrl": "/images/creatures/darklight-striker.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "dawnfire-asura",
    "name": "Dawnfire Asura",
    "imageUrl": "/images/creatures/dawnfire-asura.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "death-blob",
    "name": "Death Blob",
    "imageUrl": "/images/creatures/death-blob.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "death-priest",
    "name": "Death Priest",
    "imageUrl": "/images/creatures/death-priest.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "deathling-scout",
    "name": "Deathling Scout",
    "imageUrl": "/images/creatures/deathling-scout.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "deathling-spellsinger",
    "name": "Deathling Spellsinger",
    "imageUrl": "/images/creatures/deathling-spellsinger.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "decaying-totem",
    "name": "Decaying Totem",
    "imageUrl": "/images/creatures/decaying-totem.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "deepling-brawler",
    "name": "Deepling Brawler",
    "imageUrl": "/images/creatures/deepling-brawler.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "deepling-elite",
    "name": "Deepling Elite",
    "imageUrl": "/images/creatures/deepling-elite.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "deepling-guard",
    "name": "Deepling Guard",
    "imageUrl": "/images/creatures/deepling-guard.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "deepling-master-librarian",
    "name": "Deepling Master Librarian",
    "imageUrl": "/images/creatures/deepling-master-librarian.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "deepling-scout",
    "name": "Deepling Scout",
    "imageUrl": "/images/creatures/deepling-scout.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "deepling-spellsinger",
    "name": "Deepling Spellsinger",
    "imageUrl": "/images/creatures/deepling-spellsinger.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "deepling-tyrant",
    "name": "Deepling Tyrant",
    "imageUrl": "/images/creatures/deepling-tyrant.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "deepling-warrior",
    "name": "Deepling Warrior",
    "imageUrl": "/images/creatures/deepling-warrior.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "deepling-worker",
    "name": "Deepling Worker",
    "imageUrl": "/images/creatures/deepling-worker.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "deepsea-blood-crab",
    "name": "Deepsea Blood Crab",
    "imageUrl": "/images/creatures/deepsea-blood-crab.gif",
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
    "imageUrl": "/images/creatures/deepworm.gif",
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
    "killsToComplete": 2500
  },
  {
    "id": "deer",
    "name": "Deer",
    "imageUrl": "/images/creatures/deer.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "defiler",
    "name": "Defiler",
    "imageUrl": "/images/creatures/defiler.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "demon",
    "name": "Demon",
    "imageUrl": "/images/creatures/demon.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "demon-outcast",
    "name": "Demon Outcast",
    "imageUrl": "/images/creatures/demon-outcast.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "demon-parrot",
    "name": "Demon Parrot",
    "imageUrl": "/images/creatures/demon-parrot.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "demon-skeleton",
    "name": "Demon Skeleton",
    "imageUrl": "/images/creatures/demon-skeleton.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "destroyer",
    "name": "Destroyer",
    "imageUrl": "/images/creatures/destroyer.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "devourer",
    "name": "Devourer",
    "imageUrl": "/images/creatures/devourer.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "diabolic-imp",
    "name": "Diabolic Imp",
    "imageUrl": "/images/creatures/diabolic-imp.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "diamond-servant",
    "name": "Diamond Servant",
    "imageUrl": "/images/creatures/diamond-servant.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "diamond-servant-replica",
    "name": "Diamond Servant Replica",
    "imageUrl": "/images/creatures/diamond-servant-replica.gif",
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
    "imageUrl": "/images/creatures/digestive-ooze.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "dire-penguin",
    "name": "Dire Penguin",
    "imageUrl": "/images/creatures/dire-penguin.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "diremaw",
    "name": "Diremaw",
    "imageUrl": "/images/creatures/diremaw.gif",
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
    "killsToComplete": 2500
  },
  {
    "id": "distorted-phantom",
    "name": "Distorted Phantom",
    "imageUrl": "/images/creatures/distorted-phantom.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "dog",
    "name": "Dog",
    "imageUrl": "/images/creatures/dog.gif",
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
    "killsToComplete": 25
  },
  {
    "id": "doom-deer",
    "name": "Doom Deer",
    "imageUrl": "/images/creatures/doom-deer.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "doomsday-cultist",
    "name": "Doomsday Cultist",
    "imageUrl": "/images/creatures/doomsday-cultist.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "dragolisk",
    "name": "Dragolisk",
    "imageUrl": "/images/creatures/dragolisk.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "dragon",
    "name": "Dragon",
    "imageUrl": "/images/creatures/dragon.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "dragon-lord",
    "name": "Dragon Lord",
    "imageUrl": "/images/creatures/dragon-lord.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "dragonling",
    "name": "Dragonling",
    "imageUrl": "/images/creatures/dragonling.gif",
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
    "imageUrl": "/images/creatures/draptor.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "drillworm",
    "name": "Drillworm",
    "imageUrl": "/images/creatures/drillworm.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "dromedary",
    "name": "Dromedary",
    "imageUrl": "/images/creatures/dromedary.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "dryad",
    "name": "Dryad",
    "imageUrl": "/images/creatures/dryad.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "duskbringer",
    "name": "Duskbringer",
    "imageUrl": "/images/creatures/duskbringer.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "dwarf",
    "name": "Dwarf",
    "imageUrl": "/images/creatures/dwarf.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "dwarf-geomancer",
    "name": "Dwarf Geomancer",
    "imageUrl": "/images/creatures/dwarf-geomancer.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "dwarf-guard",
    "name": "Dwarf Guard",
    "imageUrl": "/images/creatures/dwarf-guard.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "dwarf-henchman",
    "name": "Dwarf Henchman",
    "imageUrl": "/images/creatures/dwarf-henchman.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "dwarf-soldier",
    "name": "Dwarf Soldier",
    "imageUrl": "/images/creatures/dwarf-soldier.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "dworc-fleshhunter",
    "name": "Dworc Fleshhunter",
    "imageUrl": "/images/creatures/dworc-fleshhunter.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "dworc-venomsniper",
    "name": "Dworc Venomsniper",
    "imageUrl": "/images/creatures/dworc-venomsniper.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "dworc-voodoomaster",
    "name": "Dworc Voodoomaster",
    "imageUrl": "/images/creatures/dworc-voodoomaster.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "earth-elemental",
    "name": "Earth Elemental",
    "imageUrl": "/images/creatures/earth-elemental.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "elder-bonelord",
    "name": "Elder Bonelord",
    "imageUrl": "/images/creatures/elder-bonelord.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "elder-forest-fury",
    "name": "Elder Forest Fury",
    "imageUrl": "/images/creatures/elder-forest-fury.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "elder-mummy",
    "name": "Elder Mummy",
    "imageUrl": "/images/creatures/elder-mummy.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "elephant",
    "name": "Elephant",
    "imageUrl": "/images/creatures/elephant.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "elf",
    "name": "Elf",
    "imageUrl": "/images/creatures/elf.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "elf-arcanist",
    "name": "Elf Arcanist",
    "imageUrl": "/images/creatures/elf-arcanist.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "elf-overseer",
    "name": "Elf Overseer",
    "imageUrl": "/images/creatures/elf-overseer.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "elf-scout",
    "name": "Elf Scout",
    "imageUrl": "/images/creatures/elf-scout.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "emerald-damselfly",
    "name": "Emerald Damselfly",
    "imageUrl": "/images/creatures/emerald-damselfly.gif",
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
    "imageUrl": "/images/creatures/energy-elemental.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "enfeebled-silencer",
    "name": "Enfeebled Silencer",
    "imageUrl": "/images/creatures/enfeebled-silencer.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "enlightened-of-the-cult",
    "name": "Enlightened of the Cult",
    "imageUrl": "/images/creatures/enlightened-of-the-cult.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "enraged-crystal-golem",
    "name": "Enraged Crystal Golem",
    "imageUrl": "/images/creatures/enraged-crystal-golem.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "eternal-guardian",
    "name": "Eternal Guardian",
    "imageUrl": "/images/creatures/eternal-guardian.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "evil-sheep",
    "name": "Evil Sheep",
    "imageUrl": "/images/creatures/evil-sheep.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "evil-sheep-lord",
    "name": "Evil Sheep Lord",
    "imageUrl": "/images/creatures/evil-sheep-lord.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "execowtioner",
    "name": "Execowtioner",
    "imageUrl": "/images/creatures/execowtioner.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "exotic-bat",
    "name": "Exotic Bat",
    "imageUrl": "/images/creatures/exotic-bat.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "exotic-cave-spider",
    "name": "Exotic Cave Spider",
    "imageUrl": "/images/creatures/exotic-cave-spider.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "faun",
    "name": "Faun",
    "imageUrl": "/images/creatures/faun.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "feverish-citizen",
    "name": "Feverish Citizen",
    "imageUrl": "/images/creatures/feverish-citizen.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "filth-toad",
    "name": "Filth Toad",
    "imageUrl": "/images/creatures/filth-toad.gif",
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
    "killsToComplete": 500
  },
  {
    "id": "fire-devil",
    "name": "Fire Devil",
    "imageUrl": "/images/creatures/fire-devil.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "fire-elemental",
    "name": "Fire Elemental",
    "imageUrl": "/images/creatures/fire-elemental.gif",
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
    "killsToComplete": 1000,
    "currentKills": 150
  },
  {
    "id": "firestarter",
    "name": "Firestarter",
    "imageUrl": "/images/creatures/firestarter.gif",
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
    "killsToComplete": 500
  },
  {
    "id": "fish",
    "name": "Fish",
    "imageUrl": "/images/creatures/fish.gif",
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
    },
    "killsToComplete": 250
  },
  {
    "id": "flamingo",
    "name": "Flamingo",
    "imageUrl": "/images/creatures/flamingo.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "forest-fury",
    "name": "Forest Fury",
    "imageUrl": "/images/creatures/forest-fury.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "fox",
    "name": "Fox",
    "imageUrl": "/images/creatures/fox.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "frost-dragon",
    "name": "Frost Dragon",
    "imageUrl": "/images/creatures/frost-dragon.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "frost-dragon-hatchling",
    "name": "Frost Dragon Hatchling",
    "imageUrl": "/images/creatures/frost-dragon-hatchling.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "frost-giant",
    "name": "Frost Giant",
    "imageUrl": "/images/creatures/frost-giant.gif",
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
    "imageUrl": "/images/creatures/frost-giantess.gif",
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
    "imageUrl": "/images/creatures/frost-troll.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "furious-fire-elemental",
    "name": "Furious Fire Elemental",
    "imageUrl": "/images/creatures/furious-fire-elemental.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "furious-troll",
    "name": "Furious Troll",
    "imageUrl": "/images/creatures/furious-troll.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "fury",
    "name": "Fury",
    "imageUrl": "/images/creatures/fury.gif",
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
    "killsToComplete": 2500
  },
  {
    "id": "gang-member",
    "name": "Gang Member",
    "imageUrl": "/images/creatures/gang-member.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "gargoyle",
    "name": "Gargoyle",
    "imageUrl": "/images/creatures/gargoyle.gif",
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
    "imageUrl": "/images/creatures/gazer.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "ghastly-dragon",
    "name": "Ghastly Dragon",
    "imageUrl": "/images/creatures/ghastly-dragon.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "ghost",
    "name": "Ghost",
    "imageUrl": "/images/creatures/ghost.gif",
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
    "imageUrl": "/images/creatures/ghost-wolf.gif",
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
    "killsToComplete": 500
  },
  {
    "id": "ghoul",
    "name": "Ghoul",
    "imageUrl": "/images/creatures/ghoul.gif",
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
    "imageUrl": "/images/creatures/ghoulish-hyaena.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "giant-spider",
    "name": "Giant Spider",
    "imageUrl": "/images/creatures/giant-spider.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "gladiator",
    "name": "Gladiator",
    "imageUrl": "/images/creatures/gladiator.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "gloom-wolf",
    "name": "Gloom Wolf",
    "imageUrl": "/images/creatures/gloom-wolf.gif",
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
    "killsToComplete": 500
  },
  {
    "id": "glooth-anemone",
    "name": "Glooth Anemone",
    "imageUrl": "/images/creatures/glooth-anemone.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "glooth-blob",
    "name": "Glooth Blob",
    "imageUrl": "/images/creatures/glooth-blob.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "gnarlhound",
    "name": "Gnarlhound",
    "imageUrl": "/images/creatures/gnarlhound.gif",
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
    "imageUrl": "/images/creatures/goblin.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "goblin-assassin",
    "name": "Goblin Assassin",
    "imageUrl": "/images/creatures/goblin-assassin.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "goblin-leader",
    "name": "Goblin Leader",
    "imageUrl": "/images/creatures/goblin-leader.gif",
    "charmPoints": 30,
    "difficulty": "EASY",
    "officialDifficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "rare",
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
    "killsToComplete": 5
  },
  {
    "id": "goblin-scavenger",
    "name": "Goblin Scavenger",
    "imageUrl": "/images/creatures/goblin-scavenger.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "golden-servant",
    "name": "Golden Servant",
    "imageUrl": "/images/creatures/golden-servant.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "golden-servant-replica",
    "name": "Golden Servant Replica",
    "imageUrl": "/images/creatures/golden-servant-replica.gif",
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
    "imageUrl": "/images/creatures/goldhanded-cultist.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "goldhanded-cultist-bride",
    "name": "Goldhanded Cultist Bride",
    "imageUrl": "/images/creatures/goldhanded-cultist-bride.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "gozzler",
    "name": "Gozzler",
    "imageUrl": "/images/creatures/gozzler.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "grave-guard",
    "name": "Grave Guard",
    "imageUrl": "/images/creatures/grave-guard.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "grave-robber",
    "name": "Grave Robber",
    "imageUrl": "/images/creatures/grave-robber.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "gravedigger",
    "name": "Gravedigger",
    "imageUrl": "/images/creatures/gravedigger.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "green-djinn",
    "name": "Green Djinn",
    "imageUrl": "/images/creatures/green-djinn.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "green-frog",
    "name": "Green Frog",
    "imageUrl": "/images/creatures/green-frog.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "grynch-clan-goblin",
    "name": "Grynch Clan Goblin",
    "imageUrl": "/images/creatures/grynch-clan-goblin.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "haunted-dragon",
    "name": "Haunted Dragon",
    "imageUrl": "/images/creatures/haunted-dragon.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "haunted-treeling",
    "name": "Haunted Treeling",
    "imageUrl": "/images/creatures/haunted-treeling.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "herald-of-gloom",
    "name": "Herald of Gloom",
    "imageUrl": "/images/creatures/herald-of-gloom.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "high-voltage-elemental",
    "name": "High Voltage Elemental",
    "imageUrl": "/images/creatures/high-voltage-elemental.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "hive-overseer",
    "name": "Hive Overseer",
    "imageUrl": "/images/creatures/hive-overseer.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "honour-guard",
    "name": "Honour Guard",
    "imageUrl": "/images/creatures/honour-guard.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "hot-dog",
    "name": "Hot Dog",
    "imageUrl": "/images/creatures/hot-dog.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "hunter",
    "name": "Hunter",
    "imageUrl": "/images/creatures/hunter.gif",
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
    "imageUrl": "/images/creatures/husky.gif",
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
    "killsToComplete": 25
  },
  {
    "id": "hyaena",
    "name": "Hyaena",
    "imageUrl": "/images/creatures/hyaena.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "ice-dragon",
    "name": "Ice Dragon",
    "imageUrl": "/images/creatures/ice-dragon.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "ice-golem",
    "name": "Ice Golem",
    "imageUrl": "/images/creatures/ice-golem.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "ice-witch",
    "name": "Ice Witch",
    "imageUrl": "/images/creatures/ice-witch.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "iks-ahpututu",
    "name": "Iks Ahpututu",
    "imageUrl": "/images/creatures/iks-ahpututu.gif",
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
    "imageUrl": "/images/creatures/infected-weeper.gif",
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
    "killsToComplete": 2500
  },
  {
    "id": "infernal-frog",
    "name": "Infernal Frog",
    "imageUrl": "/images/creatures/infernal-frog.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "infernalist",
    "name": "Infernalist",
    "imageUrl": "/images/creatures/infernalist.gif",
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
    "killsToComplete": 2500
  },
  {
    "id": "insect-swarm",
    "name": "Insect Swarm",
    "imageUrl": "/images/creatures/insect-swarm.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "insectoid-scout",
    "name": "Insectoid Scout",
    "imageUrl": "/images/creatures/insectoid-scout.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "insectoid-worker",
    "name": "Insectoid Worker",
    "imageUrl": "/images/creatures/insectoid-worker.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "iron-servant",
    "name": "Iron Servant",
    "imageUrl": "/images/creatures/iron-servant.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "iron-servant-replica",
    "name": "Iron Servant Replica",
    "imageUrl": "/images/creatures/iron-servant-replica.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "island-troll",
    "name": "Island Troll",
    "imageUrl": "/images/creatures/island-troll.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "jellyfish",
    "name": "Jellyfish",
    "imageUrl": "/images/creatures/jellyfish.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "killer-caiman",
    "name": "Killer Caiman",
    "imageUrl": "/images/creatures/killer-caiman.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "killer-rabbit",
    "name": "Killer Rabbit",
    "imageUrl": "/images/creatures/killer-rabbit.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "kollos",
    "name": "Kollos",
    "imageUrl": "/images/creatures/kollos.gif",
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
    "imageUrl": "/images/creatures/kongra.gif",
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
    "imageUrl": "/images/creatures/ladybug.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "lancer-beetle",
    "name": "Lancer Beetle",
    "imageUrl": "/images/creatures/lancer-beetle.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "larva",
    "name": "Larva",
    "imageUrl": "/images/creatures/larva.gif",
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
    "imageUrl": "/images/creatures/lava-golem.gif",
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
    "killsToComplete": 2500
  },
  {
    "id": "leaf-golem",
    "name": "Leaf Golem",
    "imageUrl": "/images/creatures/leaf-golem.gif",
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
    "imageUrl": "/images/creatures/lich.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "lion",
    "name": "Lion",
    "imageUrl": "/images/creatures/lion.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "little-corym-charlatan",
    "name": "Little Corym Charlatan",
    "imageUrl": "/images/creatures/little-corym-charlatan.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "lizard-chosen",
    "name": "Lizard Chosen",
    "imageUrl": "/images/creatures/lizard-chosen.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "lizard-dragon-priest",
    "name": "Lizard Dragon Priest",
    "imageUrl": "/images/creatures/lizard-dragon-priest.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "lizard-high-guard",
    "name": "Lizard High Guard",
    "imageUrl": "/images/creatures/lizard-high-guard.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "lizard-legionnaire",
    "name": "Lizard Legionnaire",
    "imageUrl": "/images/creatures/lizard-legionnaire.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "lizard-magistratus",
    "name": "Lizard Magistratus",
    "imageUrl": "/images/creatures/lizard-magistratus.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "lizard-noble",
    "name": "Lizard Noble",
    "imageUrl": "/images/creatures/lizard-noble.gif",
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
    "killsToComplete": 2500
  },
  {
    "id": "lizard-sentinel",
    "name": "Lizard Sentinel",
    "imageUrl": "/images/creatures/lizard-sentinel.gif",
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
    "imageUrl": "/images/creatures/lizard-snakecharmer.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "lizard-templar",
    "name": "Lizard Templar",
    "imageUrl": "/images/creatures/lizard-templar.gif",
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
    "imageUrl": "/images/creatures/lizard-zaogun.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "loricate-orger",
    "name": "Loricate Orger",
    "imageUrl": "/images/creatures/loricate-orger.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "lumbering-carnivor",
    "name": "Lumbering Carnivor",
    "imageUrl": "/images/creatures/lumbering-carnivor.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "mad-scientist",
    "name": "Mad Scientist",
    "imageUrl": "/images/creatures/mad-scientist.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "magma-crawler",
    "name": "Magma Crawler",
    "imageUrl": "/images/creatures/magma-crawler.gif",
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
    "killsToComplete": 2500
  },
  {
    "id": "mammoth",
    "name": "Mammoth",
    "imageUrl": "/images/creatures/mammoth.gif",
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
    "imageUrl": "/images/creatures/manta-ray.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "marsh-stalker",
    "name": "Marsh Stalker",
    "imageUrl": "/images/creatures/marsh-stalker.gif",
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
    "imageUrl": "/images/creatures/massive-earth-elemental.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "massive-energy-elemental",
    "name": "Massive Energy Elemental",
    "imageUrl": "/images/creatures/massive-energy-elemental.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "massive-fire-elemental",
    "name": "Massive Fire Elemental",
    "imageUrl": "/images/creatures/massive-fire-elemental.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "massive-water-elemental",
    "name": "Massive Water Elemental",
    "imageUrl": "/images/creatures/massive-water-elemental.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "menancing-carnivor",
    "name": "Menancing Carnivor",
    "imageUrl": "/images/creatures/menancing-carnivor.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "estimatedHours": 7,
    "respawnCategory": "normal",
    "locations": [
      "Carnivora's Rock"
    ],
    "region": "Mainland",
    "recommendedLevel": 200,
    "killsToComplete": 2500
  },
  {
    "id": "mercury-blob",
    "name": "Mercury Blob",
    "imageUrl": "/images/creatures/mercury-blob.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "merlkin",
    "name": "Merlkin",
    "imageUrl": "/images/creatures/merlkin.gif",
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
    "imageUrl": "/images/creatures/metal-gargoyle.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "midnight-panther",
    "name": "Midnight Panther",
    "imageUrl": "/images/creatures/midnight-panther.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "midnight-spawn",
    "name": "Midnight Spawn",
    "imageUrl": "/images/creatures/midnight-spawn.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "midnight-warrior",
    "name": "Midnight Warrior",
    "imageUrl": "/images/creatures/midnight-warrior.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "minotaur",
    "name": "Minotaur",
    "imageUrl": "/images/creatures/minotaur.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "minotaur-amazon",
    "name": "Minotaur Amazon",
    "imageUrl": "/images/creatures/minotaur-amazon.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "minotaur-archer",
    "name": "Minotaur Archer",
    "imageUrl": "/images/creatures/minotaur-archer.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "minotaur-cult-follower",
    "name": "Minotaur Cult Follower",
    "imageUrl": "/images/creatures/minotaur-cult-follower.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "minotaur-cult-propher",
    "name": "Minotaur Cult Propher",
    "imageUrl": "/images/creatures/minotaur-cult-propher.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "estimatedHours": 3.5,
    "respawnCategory": "normal",
    "locations": [
      "Mintwallin Cults"
    ],
    "region": "Mainland",
    "recommendedLevel": 150,
    "killsToComplete": 1000
  },
  {
    "id": "minotaur-cult-zealot",
    "name": "Minotaur Cult Zealot",
    "imageUrl": "/images/creatures/minotaur-cult-zealot.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "minotaur-guard",
    "name": "Minotaur Guard",
    "imageUrl": "/images/creatures/minotaur-guard.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "minotaur-hunter",
    "name": "Minotaur Hunter",
    "imageUrl": "/images/creatures/minotaur-hunter.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "minotaur-mage",
    "name": "Minotaur Mage",
    "imageUrl": "/images/creatures/minotaur-mage.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "misguided-bully",
    "name": "Misguided Bully",
    "imageUrl": "/images/creatures/misguided-bully.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "misguided-thief",
    "name": "Misguided Thief",
    "imageUrl": "/images/creatures/misguided-thief.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "modified-gnarlhound",
    "name": "Modified Gnarlhound",
    "imageUrl": "/images/creatures/modified-gnarlhound.gif",
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
    "killsToComplete": 25
  },
  {
    "id": "mole",
    "name": "Mole",
    "imageUrl": "/images/creatures/mole.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "moohtant",
    "name": "Moohtant",
    "imageUrl": "/images/creatures/moohtant.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "mummy",
    "name": "Mummy",
    "imageUrl": "/images/creatures/mummy.gif",
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
    "imageUrl": "/images/creatures/mushroom-sniffer.gif",
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
    "killsToComplete": 25
  },
  {
    "id": "mutated-bat",
    "name": "Mutated Bat",
    "imageUrl": "/images/creatures/mutated-bat.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "mutated-human",
    "name": "Mutated Human",
    "imageUrl": "/images/creatures/mutated-human.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "mutated-rat",
    "name": "Mutated Rat",
    "imageUrl": "/images/creatures/mutated-rat.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "mutated-tiger",
    "name": "Mutated Tiger",
    "imageUrl": "/images/creatures/mutated-tiger.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "necromancer",
    "name": "Necromancer",
    "imageUrl": "/images/creatures/necromancer.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "nightfiend",
    "name": "Nightfiend",
    "imageUrl": "/images/creatures/nightfiend.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "nightslayer",
    "name": "Nightslayer",
    "imageUrl": "/images/creatures/nightslayer.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "nightstalker",
    "name": "Nightstalker",
    "imageUrl": "/images/creatures/nightstalker.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "noble-lion",
    "name": "Noble Lion",
    "imageUrl": "/images/creatures/noble-lion.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "nomad-blue",
    "name": "Nomad (Blue)",
    "imageUrl": "/images/creatures/nomad-blue.gif",
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
    "killsToComplete": 500
  },
  {
    "id": "nomad-female",
    "name": "Nomad (Female)",
    "imageUrl": "/images/creatures/nomad-female.gif",
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
    "killsToComplete": 500
  },
  {
    "id": "northern-pike",
    "name": "Northern Pike",
    "imageUrl": "/images/creatures/northern-pike.gif",
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
    },
    "killsToComplete": 25
  },
  {
    "id": "novice-of-the-cult",
    "name": "Novice of the Cult",
    "imageUrl": "/images/creatures/novice-of-the-cult.gif",
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
    "imageUrl": "/images/creatures/nymph.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "ogre-brute",
    "name": "Ogre Brute",
    "imageUrl": "/images/creatures/ogre-brute.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "ogre-savage",
    "name": "Ogre Savage",
    "imageUrl": "/images/creatures/ogre-savage.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "ogre-shaman",
    "name": "Ogre Shaman",
    "imageUrl": "/images/creatures/ogre-shaman.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "omnivora",
    "name": "Omnivora",
    "imageUrl": "/images/creatures/omnivora.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "orc",
    "name": "Orc",
    "imageUrl": "/images/creatures/orc.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "orc-berserker",
    "name": "Orc Berserker",
    "imageUrl": "/images/creatures/orc-berserker.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "orc-cult-fanatic",
    "name": "Orc Cult Fanatic",
    "imageUrl": "/images/creatures/orc-cult-fanatic.gif",
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
    "imageUrl": "/images/creatures/orc-cult-inquisitor.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "orc-cult-minion",
    "name": "Orc Cult Minion",
    "imageUrl": "/images/creatures/orc-cult-minion.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "orc-cult-priest",
    "name": "Orc Cult Priest",
    "imageUrl": "/images/creatures/orc-cult-priest.gif",
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
    "imageUrl": "/images/creatures/orc-cultist.gif",
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
    "imageUrl": "/images/creatures/orc-leader.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "orc-marauder",
    "name": "Orc Marauder",
    "imageUrl": "/images/creatures/orc-marauder.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "orc-rider",
    "name": "Orc Rider",
    "imageUrl": "/images/creatures/orc-rider.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "orc-shaman",
    "name": "Orc Shaman",
    "imageUrl": "/images/creatures/orc-shaman.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "orc-spearman",
    "name": "Orc Spearman",
    "imageUrl": "/images/creatures/orc-spearman.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "orc-warlord",
    "name": "Orc Warlord",
    "imageUrl": "/images/creatures/orc-warlord.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "orc-warrior",
    "name": "Orc Warrior",
    "imageUrl": "/images/creatures/orc-warrior.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "orchid-frog",
    "name": "Orchid Frog",
    "imageUrl": "/images/creatures/orchid-frog.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "orclops-doomhauler",
    "name": "Orclops Doomhauler",
    "imageUrl": "/images/creatures/orclops-doomhauler.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "orclops-ravager",
    "name": "Orclops Ravager",
    "imageUrl": "/images/creatures/orclops-ravager.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "orewalker",
    "name": "Orewalker",
    "imageUrl": "/images/creatures/orewalker.gif",
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
    "killsToComplete": 2500
  },
  {
    "id": "orger",
    "name": "Orger",
    "imageUrl": "/images/creatures/orger.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "panda",
    "name": "Panda",
    "imageUrl": "/images/creatures/panda.gif",
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
    "imageUrl": "/images/creatures/parrot.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "penguin",
    "name": "Penguin",
    "imageUrl": "/images/creatures/penguin.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "percht",
    "name": "Percht",
    "imageUrl": "/images/creatures/percht.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "pig",
    "name": "Pig",
    "imageUrl": "/images/creatures/pig.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "pigeon",
    "name": "Pigeon",
    "imageUrl": "/images/creatures/pigeon.gif",
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
    "killsToComplete": 25
  },
  {
    "id": "pirat-bombardier",
    "name": "Pirat Bombardier",
    "imageUrl": "/images/creatures/pirat-bombardier.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "pirat-cutthroat",
    "name": "Pirat Cutthroat",
    "imageUrl": "/images/creatures/pirat-cutthroat.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "pirat-mate",
    "name": "Pirat Mate",
    "imageUrl": "/images/creatures/pirat-mate.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "pirat-scoundrel",
    "name": "Pirat Scoundrel",
    "imageUrl": "/images/creatures/pirat-scoundrel.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "pirate-corsair",
    "name": "Pirate Corsair",
    "imageUrl": "/images/creatures/pirate-corsair.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "pirate-cutthroat",
    "name": "Pirate Cutthroat",
    "imageUrl": "/images/creatures/pirate-cutthroat.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "pirate-ghost",
    "name": "Pirate Ghost",
    "imageUrl": "/images/creatures/pirate-ghost.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "pirate-marauder",
    "name": "Pirate Marauder",
    "imageUrl": "/images/creatures/pirate-marauder.gif",
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
    "imageUrl": "/images/creatures/pirate-skeleton.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "pixie",
    "name": "Pixie",
    "imageUrl": "/images/creatures/pixie.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "poacher",
    "name": "Poacher",
    "imageUrl": "/images/creatures/poacher.gif",
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
    "imageUrl": "/images/creatures/poison-spider.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "polar-bear",
    "name": "Polar Bear",
    "imageUrl": "/images/creatures/polar-bear.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "pooka",
    "name": "Pooka",
    "imageUrl": "/images/creatures/pooka.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "priestess",
    "name": "Priestess",
    "imageUrl": "/images/creatures/priestess.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "putrid-mummy",
    "name": "Putrid Mummy",
    "imageUrl": "/images/creatures/putrid-mummy.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "quara-constrictor",
    "name": "Quara Constrictor",
    "imageUrl": "/images/creatures/quara-constrictor.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "quara-constrictor-scout",
    "name": "Quara Constrictor Scout",
    "imageUrl": "/images/creatures/quara-constrictor-scout.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "quara-hydromancer",
    "name": "Quara Hydromancer",
    "imageUrl": "/images/creatures/quara-hydromancer.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "quara-hydromancer-scout",
    "name": "Quara Hydromancer Scout",
    "imageUrl": "/images/creatures/quara-hydromancer-scout.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "quara-mantassin",
    "name": "Quara Mantassin",
    "imageUrl": "/images/creatures/quara-mantassin.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "quara-mantassin-scout",
    "name": "Quara Mantassin Scout",
    "imageUrl": "/images/creatures/quara-mantassin-scout.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "quara-pincher",
    "name": "Quara Pincher",
    "imageUrl": "/images/creatures/quara-pincher.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "quara-pincher-scout",
    "name": "Quara Pincher Scout",
    "imageUrl": "/images/creatures/quara-pincher-scout.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "quara-predator",
    "name": "Quara Predator",
    "imageUrl": "/images/creatures/quara-predator.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "quara-predator-scout",
    "name": "Quara Predator Scout",
    "imageUrl": "/images/creatures/quara-predator-scout.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "rabbit",
    "name": "Rabbit",
    "imageUrl": "/images/creatures/rabbit.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "raging-fire",
    "name": "Raging Fire",
    "imageUrl": "/images/creatures/raging-fire.gif",
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
    "imageUrl": "/images/creatures/rat.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "redeemed-soul",
    "name": "Redeemed Soul",
    "imageUrl": "/images/creatures/redeemed-soul.gif",
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
    "imageUrl": "/images/creatures/renegade-quara-constrictor.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "renegade-quara-hydromancer",
    "name": "Renegade Quara Hydromancer",
    "imageUrl": "/images/creatures/renegade-quara-hydromancer.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "renegade-quara-mantassin",
    "name": "Renegade Quara Mantassin",
    "imageUrl": "/images/creatures/renegade-quara-mantassin.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "renegade-quara-pincher",
    "name": "Renegade Quara Pincher",
    "imageUrl": "/images/creatures/renegade-quara-pincher.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "renegade-quara-predator",
    "name": "Renegade Quara Predator",
    "imageUrl": "/images/creatures/renegade-quara-predator.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "roaring-lion",
    "name": "Roaring Lion",
    "imageUrl": "/images/creatures/roaring-lion.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "roast-pork",
    "name": "Roast Pork",
    "imageUrl": "/images/creatures/roast-pork.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "rorc",
    "name": "Rorc",
    "imageUrl": "/images/creatures/rorc.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "rot-elemental",
    "name": "Rot Elemental",
    "imageUrl": "/images/creatures/rot-elemental.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "rotworm",
    "name": "Rotworm",
    "imageUrl": "/images/creatures/rotworm.gif",
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
    "imageUrl": "/images/creatures/sacred-spider.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "salamander",
    "name": "Salamander",
    "imageUrl": "/images/creatures/salamander.gif",
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
    "imageUrl": "/images/creatures/sandcrawler.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "sandstone-scorpion",
    "name": "Sandstone Scorpion",
    "imageUrl": "/images/creatures/sandstone-scorpion.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "scarab",
    "name": "Scarab",
    "imageUrl": "/images/creatures/scarab.gif",
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
    "imageUrl": "/images/creatures/schiach.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "scorpion",
    "name": "Scorpion",
    "imageUrl": "/images/creatures/scorpion.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "sea-serpent",
    "name": "Sea Serpent",
    "imageUrl": "/images/creatures/sea-serpent.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "seacrest-serpent",
    "name": "Seacrest Serpent",
    "imageUrl": "/images/creatures/seacrest-serpent.gif",
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
    "killsToComplete": 2500
  },
  {
    "id": "seagull",
    "name": "Seagull",
    "imageUrl": "/images/creatures/seagull.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "shaburak-demon",
    "name": "Shaburak Demon",
    "imageUrl": "/images/creatures/shaburak-demon.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "shaburak-lord",
    "name": "Shaburak Lord",
    "imageUrl": "/images/creatures/shaburak-lord.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "shaburak-prince",
    "name": "Shaburak Prince",
    "imageUrl": "/images/creatures/shaburak-prince.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "shadow-hound",
    "name": "Shadow Hound",
    "imageUrl": "/images/creatures/shadow-hound.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "shadow-pupil",
    "name": "Shadow Pupil",
    "imageUrl": "/images/creatures/shadow-pupil.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "shaper-matriarch",
    "name": "Shaper Matriarch",
    "imageUrl": "/images/creatures/shaper-matriarch.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "shark",
    "name": "Shark",
    "imageUrl": "/images/creatures/shark.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "sheep",
    "name": "Sheep",
    "imageUrl": "/images/creatures/sheep.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "sibang",
    "name": "Sibang",
    "imageUrl": "/images/creatures/sibang.gif",
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
    "imageUrl": "/images/creatures/silver-rabbit.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "skeleton",
    "name": "Skeleton",
    "imageUrl": "/images/creatures/skeleton.gif",
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
    "imageUrl": "/images/creatures/skeleton-warrior.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "skunk",
    "name": "Skunk",
    "imageUrl": "/images/creatures/skunk.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "slime",
    "name": "Slime",
    "imageUrl": "/images/creatures/slime.gif",
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
    "imageUrl": "/images/creatures/slug.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "smuggler",
    "name": "Smuggler",
    "imageUrl": "/images/creatures/smuggler.gif",
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
    "imageUrl": "/images/creatures/snake.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "souleater",
    "name": "Souleater",
    "imageUrl": "/images/creatures/souleater.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "spider",
    "name": "Spider",
    "imageUrl": "/images/creatures/spider.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "spidris",
    "name": "Spidris",
    "imageUrl": "/images/creatures/spidris.gif",
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
    "imageUrl": "/images/creatures/spidris-elite.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "spiky-carnivor",
    "name": "Spiky Carnivor",
    "imageUrl": "/images/creatures/spiky-carnivor.gif",
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
    "killsToComplete": 2500
  },
  {
    "id": "spit-nettle",
    "name": "Spit Nettle",
    "imageUrl": "/images/creatures/spit-nettle.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "spitter",
    "name": "Spitter",
    "imageUrl": "/images/creatures/spitter.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "squidgy-slime",
    "name": "Squidgy Slime",
    "imageUrl": "/images/creatures/squidgy-slime.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "squirrel",
    "name": "Squirrel",
    "imageUrl": "/images/creatures/squirrel.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "stalker",
    "name": "Stalker",
    "imageUrl": "/images/creatures/stalker.gif",
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
    "imageUrl": "/images/creatures/stampor.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "starving-wolf",
    "name": "Starving Wolf",
    "imageUrl": "/images/creatures/starving-wolf.gif",
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
    "killsToComplete": 500
  },
  {
    "id": "stone-devourer",
    "name": "Stone Devourer",
    "imageUrl": "/images/creatures/stone-devourer.gif",
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
    "killsToComplete": 2500
  },
  {
    "id": "stone-golem",
    "name": "Stone Golem",
    "imageUrl": "/images/creatures/stone-golem.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "stone-rhino",
    "name": "Stone Rhino",
    "imageUrl": "/images/creatures/stone-rhino.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "stonerefiner",
    "name": "Stonerefiner",
    "imageUrl": "/images/creatures/stonerefiner.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "swamp-troll",
    "name": "Swamp Troll",
    "imageUrl": "/images/creatures/swamp-troll.gif",
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
    "imageUrl": "/images/creatures/swampling.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "swan-maiden",
    "name": "Swan Maiden",
    "imageUrl": "/images/creatures/swan-maiden.gif",
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
    "imageUrl": "/images/creatures/swarmer.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "tainted-soul",
    "name": "Tainted Soul",
    "imageUrl": "/images/creatures/tainted-soul.gif",
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
    "imageUrl": "/images/creatures/tarnished-spirit.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "terramite",
    "name": "Terramite",
    "imageUrl": "/images/creatures/terramite.gif",
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
    "imageUrl": "/images/creatures/terrified-elephant.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "terror-bird",
    "name": "Terror Bird",
    "imageUrl": "/images/creatures/terror-bird.gif",
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
    "imageUrl": "/images/creatures/thornback-tortoise.gif",
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
    "imageUrl": "/images/creatures/thornfire-wolf.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "tiger",
    "name": "Tiger",
    "imageUrl": "/images/creatures/tiger.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "toad",
    "name": "Toad",
    "imageUrl": "/images/creatures/toad.gif",
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
    "imageUrl": "/images/creatures/tomb-servant.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "tortoise",
    "name": "Tortoise",
    "imageUrl": "/images/creatures/tortoise.gif",
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
    "imageUrl": "/images/creatures/troll.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "troll-champion",
    "name": "Troll Champion",
    "imageUrl": "/images/creatures/troll-champion.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "troll-guard",
    "name": "Troll Guard",
    "imageUrl": "/images/creatures/troll-guard.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "troll-legionnaire",
    "name": "Troll Legionnaire",
    "imageUrl": "/images/creatures/troll-legionnaire.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "twisted-pooka",
    "name": "Twisted Pooka",
    "imageUrl": "/images/creatures/twisted-pooka.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "twisted-shaper",
    "name": "Twisted Shaper",
    "imageUrl": "/images/creatures/twisted-shaper.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "undead-cavebear",
    "name": "Undead Cavebear",
    "imageUrl": "/images/creatures/undead-cavebear.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "undead-gladiator",
    "name": "Undead Gladiator",
    "imageUrl": "/images/creatures/undead-gladiator.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "undead-jester",
    "name": "Undead Jester",
    "imageUrl": "/images/creatures/undead-jester.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "undead-mine-worker",
    "name": "Undead Mine Worker",
    "imageUrl": "/images/creatures/undead-mine-worker.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "undead-prospector",
    "name": "Undead Prospector",
    "imageUrl": "/images/creatures/undead-prospector.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "valkyrie",
    "name": "Valkyrie",
    "imageUrl": "/images/creatures/valkyrie.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "vampire",
    "name": "Vampire",
    "imageUrl": "/images/creatures/vampire.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "vampire-bride",
    "name": "Vampire Bride",
    "imageUrl": "/images/creatures/vampire-bride.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "vampire-viscount",
    "name": "Vampire Viscount",
    "imageUrl": "/images/creatures/vampire-viscount.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "vicious-manbat",
    "name": "Vicious Manbat",
    "imageUrl": "/images/creatures/vicious-manbat.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "vulcongra",
    "name": "Vulcongra",
    "imageUrl": "/images/creatures/vulcongra.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "wailing-widow",
    "name": "Wailing Widow",
    "imageUrl": "/images/creatures/wailing-widow.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "walker",
    "name": "Walker",
    "imageUrl": "/images/creatures/walker.gif",
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
    "imageUrl": "/images/creatures/war-golem.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "war-wolf",
    "name": "War Wolf",
    "imageUrl": "/images/creatures/war-wolf.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "warlock",
    "name": "Warlock",
    "imageUrl": "/images/creatures/warlock.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "wasp",
    "name": "Wasp",
    "imageUrl": "/images/creatures/wasp.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "waspoid",
    "name": "Waspoid",
    "imageUrl": "/images/creatures/waspoid.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "water-buffalo",
    "name": "Water Buffalo",
    "imageUrl": "/images/creatures/water-buffalo.gif",
    "charmPoints": 30,
    "difficulty": "EASY",
    "estimatedHours": 1,
    "respawnCategory": "rare",
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
    "killsToComplete": 5
  },
  {
    "id": "water-elemental",
    "name": "Water Elemental",
    "imageUrl": "/images/creatures/water-elemental.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "weakened-frazzlemaw",
    "name": "Weakened Frazzlemaw",
    "imageUrl": "/images/creatures/weakened-frazzlemaw.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "weeper",
    "name": "Weeper",
    "imageUrl": "/images/creatures/weeper.gif",
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
    "killsToComplete": 2500
  },
  {
    "id": "white-deer",
    "name": "White Deer",
    "imageUrl": "/images/creatures/white-deer.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "white-shade",
    "name": "White Shade",
    "imageUrl": "/images/creatures/white-shade.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "wiggler",
    "name": "Wiggler",
    "imageUrl": "/images/creatures/wiggler.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "wild-horse",
    "name": "Wild Horse",
    "imageUrl": "/images/creatures/wild-horse.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "wild-warrior",
    "name": "Wild Warrior",
    "imageUrl": "/images/creatures/wild-warrior.gif",
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
    "imageUrl": "/images/creatures/wilting-leaf-golem.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "winter-wolf",
    "name": "Winter Wolf",
    "imageUrl": "/images/creatures/winter-wolf.gif",
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
    "imageUrl": "/images/creatures/wisp.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "witch",
    "name": "Witch",
    "imageUrl": "/images/creatures/witch.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "wolf",
    "name": "Wolf",
    "imageUrl": "/images/creatures/wolf.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "worker-golem",
    "name": "Worker Golem",
    "imageUrl": "/images/creatures/worker-golem.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "worm-priestess",
    "name": "Worm Priestess",
    "imageUrl": "/images/creatures/worm-priestess.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "wyvern",
    "name": "Wyvern",
    "imageUrl": "/images/creatures/wyvern.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "yeti",
    "name": "Yeti",
    "imageUrl": "/images/creatures/yeti.gif",
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
    "killsToComplete": 250
  },
  {
    "id": "young-sea-serpent",
    "name": "Young Sea Serpent",
    "imageUrl": "/images/creatures/young-sea-serpent.gif",
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
    "killsToComplete": 1000
  },
  {
    "id": "zombie",
    "name": "Zombie",
    "imageUrl": "/images/creatures/zombie.gif",
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
    "killsToComplete": 250
  }
];

/**
 * Filtered bestiary data - excludes creatures that are not part of the official bestiary
 * Use this for the Bestiary Planner to ensure accurate tracking
 */
export const VALID_BESTIARY_DATA = filterValidBestiaryCreatures(BESTIARY_DATA);
