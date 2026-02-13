/**
 * Bestiary data structure
 *
 * Fields per creature:
 * - id: string (kebab-case identifier)
 * - name: string (official creature name)
 * - imageUrl: string (path to creature image)
 * - charmPoints: number (CP reward, fixed by difficulty + rarity)
 * - difficulty: string (HARMLESS, TRIVIAL, EASY, MEDIUM, HARD, CHALLENGING)
 * - hitpoints: number (creature HP/life)
 * - creatureCategory: string (normal, rare)
 * - locations: array<string> (spawn locations)
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

export const CREATURE_CATEGORY = {
  NORMAL: 'normal',
  RARE: 'rare',
};


export const BESTIARY_DATA = [
  {
    "id": "abyssal-calamary",
    "name": "Abyssal Calamary",
    "imageUrl": "/images/creatures/abyssal-calamary.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 300,
    "creatureCategory": "normal",
    "locations": ["Seacrest Grounds"],
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
    "id": "acolyte-of-darkness",
    "name": "Acolyte of Darkness",
    "imageUrl": "/images/creatures/acolyte-of-darkness.gif",
    "charmPoints": 30,
    "difficulty": "EASY",
    "hitpoints": 325,
    "creatureCategory": "rare",
    "locations": ["Drefia around the Lightbringer's basin"],
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
    "hitpoints": 390,
    "creatureCategory": "normal",
    "locations": ["Yalahar Cults, Goroma Volcano"],
    "elementalResistances": {
      "physical": 110,
      "fire": 100,
      "ice": 80,
      "energy": 110,
      "earth": 80,
      "holy": 80,
      "death": 105
    },
    "killsToComplete": 1000
  },
  {
    "id": "adept-of-the-cult",
    "name": "Adept of the Cult",
    "imageUrl": "/images/creatures/adept-of-the-cult.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 430,
    "creatureCategory": "normal",
    "locations": ["Yalahar Cults, Goroma Volcano"],
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 80,
      "energy": 105,
      "earth": 60,
      "holy": 70,
      "death": 105
    },
    "killsToComplete": 1000
  },
  {
    "id": "adult-goanna",
    "name": "Adult Goanna",
    "imageUrl": "/images/creatures/adult-goanna.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "hitpoints": 8300,
    "creatureCategory": "normal",
    "locations": ["Kilmaresh"],
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
    "hitpoints": 65,
    "creatureCategory": "normal",
    "locations": ["Venore swamp"],
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
    "hitpoints": 10000,
    "creatureCategory": "normal",
    "locations": ["Antrum of the Fallen"],
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
    "hitpoints": 15,
    "creatureCategory": "normal",
    "locations": ["Bounac"],
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
    "hitpoints": 110,
    "creatureCategory": "normal",
    "locations": [
      "Venore Amazon Camp",
      "Carlin Amazon Camp",
      "Amazon Tower",
      "east of Carlin",
      "underneath the Fields of Glory",
      "west of Venore"
    ],
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
    "id": "ancient-scarab",
    "name": "Ancient Scarab",
    "imageUrl": "/images/creatures/ancient-scarab.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1000,
    "creatureCategory": "normal",
    "locations": ["Mother of Scarabs Lair -4/-5"],
    "elementalResistances": {
      "physical": 90,
      "fire": 120,
      "ice": 105,
      "energy": 80,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "angry-sugar-fairy",
    "name": "Angry Sugar Fairy",
    "imageUrl": "/images/creatures/angry-sugar-fairy.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "hitpoints": 3000,
    "creatureCategory": "normal",
    "locations": ["Dessert Dungeons"],
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
    "hitpoints": 13000,
    "creatureCategory": "normal",
    "locations": ["The Secret Library ice section"],
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
    "id": "arachnophobica",
    "name": "Arachnophobica",
    "imageUrl": "/images/creatures/arachnophobica.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "hitpoints": 5000,
    "creatureCategory": "normal",
    "locations": [
      "Buried Cathedral",
      "Haunted Cellar",
      "Court of Summer",
      "Court of Winter",
      "Dream Labyrinth"
    ],
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
    "id": "armadile",
    "name": "Armadile",
    "imageUrl": "/images/creatures/armadile.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "hitpoints": 3800,
    "creatureCategory": "normal",
    "locations": ["Warzone 1"],
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
    "id": "assassin",
    "name": "Assassin",
    "imageUrl": "/images/creatures/assassin.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 175,
    "creatureCategory": "normal",
    "locations": ["Dark Cathedral"],
    "elementalResistances": {
      "physical": 110,
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
    "id": "azure-frog",
    "name": "Azure Frog",
    "imageUrl": "/images/creatures/azure-frog.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 60,
    "creatureCategory": "normal",
    "locations": [
      "Meriana",
      "Laguna Islands",
      "and other Shattered Isles"
    ],
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
    "difficulty": "TRIVIAL",
    "hitpoints": 23,
    "creatureCategory": "normal",
    "locations": ["Svargrond Mammoth Mountain (South west from depot)"],
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
    "id": "bandit",
    "name": "Bandit",
    "imageUrl": "/images/creatures/bandit.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 245,
    "creatureCategory": "normal",
    "locations": ["Dark Cathedral"],
    "elementalResistances": {
      "physical": 110,
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
    "id": "barbarian-brutetamer",
    "name": "Barbarian Brutetamer",
    "imageUrl": "/images/creatures/barbarian-brutetamer.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 145,
    "creatureCategory": "normal",
    "locations": [
      "Krimhorn",
      "Bittermor",
      "Ragnir",
      "and Fenrock"
    ],
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
    "hitpoints": 100,
    "creatureCategory": "normal",
    "locations": [
      "Krimhorn",
      "Bittermor",
      "Ragnir",
      "and Fenrock"
    ],
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
    "hitpoints": 135,
    "creatureCategory": "normal",
    "locations": [
      "Ragnir",
      "Krimhorn",
      "Bittermor",
      "and Fenrock"
    ],
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
    "hitpoints": 2800,
    "creatureCategory": "normal",
    "locations": ["Ab'Dendriel Cults"],
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
    "id": "barkless-fanatic",
    "name": "Barkless Fanatic",
    "imageUrl": "/images/creatures/barkless-fanatic.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 3200,
    "creatureCategory": "normal",
    "locations": ["Ab'Dendriel Cults"],
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
    "id": "bashmu",
    "name": "Bashmu",
    "imageUrl": "/images/creatures/bashmu.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "hitpoints": 8200,
    "creatureCategory": "normal",
    "locations": ["Salt Caves"],
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
    "hitpoints": 30,
    "creatureCategory": "normal",
    "locations": [
      "Dark Cathedral",
      "Tiquanda",
      "Drefia",
      "Mount Sternum",
      "Folda",
      "Ghostlands",
      "Kazordoon",
      "Femor Hills",
      "Thais Bat Dungeon",
      "Thais Bandit Cave and in many other caves"
    ],
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
    "hitpoints": 80,
    "creatureCategory": "normal",
    "locations": ["Poacher's Cave (Wildlife stage)"],
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 110,
      "energy": 100,
      "earth": 100,
      "holy": 90,
      "death": 105
    },
    "killsToComplete": 500
  },
  {
    "id": "berrypest",
    "name": "Berrypest",
    "imageUrl": "/images/creatures/berrypest.gif",
    "charmPoints": 5,
    "difficulty": "HARMLESS",
    "hitpoints": 500,
    "creatureCategory": "rare",
    "locations": ["Winterberry Cellar"],
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
    "id": "biting-book",
    "name": "Biting Book",
    "imageUrl": "/images/creatures/biting-book.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "hitpoints": 6500,
    "creatureCategory": "normal",
    "locations": [
      "Secret Library earth",
      "energy",
      "fire and ice sections. Also two incarcerated in the Issavi prison"
    ],
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
    "hitpoints": 20,
    "creatureCategory": "normal",
    "locations": ["Femor Hills"],
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
    "hitpoints": 8100,
    "creatureCategory": "normal",
    "locations": ["Issavi Sewers", "Kilmaresh Catacombs and Kilmaresh Mountains (above and under ground)"],
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
    "hitpoints": 9000,
    "creatureCategory": "normal",
    "locations": ["Antrum of the Fallen"],
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
    "id": "blightwalker",
    "name": "Blightwalker",
    "imageUrl": "/images/creatures/blightwalker.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "hitpoints": 8100,
    "creatureCategory": "normal",
    "locations": [
      "Pits of Inferno",
      "Edron (In the Vats during The Inquisition Quest)",
      "Roshamuul Prison and Grounds of Undeath"
    ],
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
    "hitpoints": 31700,
    "creatureCategory": "normal",
    "locations": ["Jaded Roots"],
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
    "id": "blood-beast",
    "name": "Blood Beast",
    "imageUrl": "/images/creatures/blood-beast.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1600,
    "creatureCategory": "normal",
    "locations": ["Oramond West"],
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 100,
      "energy": 90,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "blood-crab",
    "name": "Blood Crab",
    "imageUrl": "/images/creatures/blood-crab.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 290,
    "creatureCategory": "normal",
    "locations": ["Laguna Blood Crab Caves"],
    "elementalResistances": {
      "physical": 95,
      "fire": 110,
      "ice": 0,
      "energy": 105,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "bluebeak",
    "name": "Bluebeak",
    "imageUrl": "/images/creatures/bluebeak.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "hitpoints": 2430,
    "creatureCategory": "normal",
    "locations": ["Book World"],
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
    "hitpoints": 198,
    "creatureCategory": "normal",
    "locations": ["Poacher's Cave (Wildlife stage)"],
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
    "id": "boar-man",
    "name": "Boar Man",
    "imageUrl": "/images/creatures/boar-man.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "hitpoints": 9200,
    "creatureCategory": "normal",
    "locations": ["Ingol"],
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
    "hitpoints": 25,
    "creatureCategory": "normal",
    "locations": [
      "Shadowthorn",
      "Drefia",
      "Lake Equivocolao"
    ],
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
    "hitpoints": 1300,
    "creatureCategory": "normal",
    "locations": ["Oramond Hydra Cave"],
    "elementalResistances": {
      "physical": 105,
      "fire": 15,
      "ice": 105,
      "energy": 110,
      "earth": 70,
      "holy": 105,
      "death": 95
    },
    "killsToComplete": 1000
  },
  {
    "id": "bonebeast",
    "name": "Bonebeast",
    "imageUrl": "/images/creatures/bonebeast.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 515,
    "creatureCategory": "normal",
    "locations": ["Mother of Scarabs Lair -4/-5, Edron Old Fortress -1"],
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 100,
      "energy": 100,
      "earth": 0,
      "holy": 125,
      "death": 0
    },
    "killsToComplete": 1000
  },
  {
    "id": "bonelord",
    "name": "Bonelord",
    "imageUrl": "/images/creatures/bonelord.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 260,
    "creatureCategory": "normal",
    "locations": [
      "Ancient Temple",
      "Alatar Lake",
      "Mount Sternum Undead Cave",
      "Desert Dungeon",
      "Hellgate",
      "Helheim",
      "Fibula Dungeon",
      "Villa Scapula",
      "Hero Cave before Dragons",
      "Eastern Drefia",
      "Folda hidden cave",
      "Maze of Lost Souls",
      "way to Mintwallin",
      "before Kazordoon city entrance",
      "abandoned building east of Venore",
      "Green Claw Swamp",
      "north of the Amazon Camp (Venore)"
    ],
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
    "id": "bony-sea-devil",
    "name": "Bony Sea Devil",
    "imageUrl": "/images/creatures/bony-sea-devil.gif",
    "charmPoints": 5,
    "difficulty": "CHALLENGING",
    "hitpoints": 24000,
    "creatureCategory": "normal",
    "locations": ["Ebb and Flow"],
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
    "hitpoints": 1300,
    "creatureCategory": "normal",
    "locations": ["Dark Faun Cave"],
    "elementalResistances": {
      "physical": 90,
      "fire": 100,
      "ice": 90,
      "energy": 100,
      "earth": 30,
      "holy": 60,
      "death": 80
    },
    "killsToComplete": 1000
  },
  {
    "id": "brachiodemon",
    "name": "Brachiodemon",
    "imageUrl": "/images/creatures/brachiodemon.gif",
    "charmPoints": 5,
    "difficulty": "CHALLENGING",
    "hitpoints": 25000,
    "creatureCategory": "normal",
    "locations": ["Claustrophobic Inferno"],
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
    "hitpoints": 18000,
    "creatureCategory": "normal",
    "locations": ["Secret Library energy section"],
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
    "id": "bramble-wyrmling",
    "name": "Bramble Wyrmling",
    "imageUrl": "/images/creatures/bramble-wyrmling.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "hitpoints": 2350,
    "creatureCategory": "normal",
    "locations": ["Book World"],
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
    "hitpoints": 27000,
    "creatureCategory": "normal",
    "locations": ["Rotten Wasteland"],
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
    "hitpoints": 3500,
    "creatureCategory": "normal",
    "locations": ["Otherworld"],
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
    "id": "brinebrute-inferniarch",
    "name": "Brinebrute Inferniarch",
    "imageUrl": "/images/creatures/brinebrute-inferniarch.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "hitpoints": 32000,
    "creatureCategory": "normal",
    "locations": ["Azzilon Castle"],
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
    "id": "broodrider-inferniarch",
    "name": "Broodrider Inferniarch",
    "imageUrl": "/images/creatures/broodrider-inferniarch.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "hitpoints": 9600,
    "creatureCategory": "normal",
    "locations": ["Azzilon Castle"],
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
    "hitpoints": 29,
    "creatureCategory": "normal",
    "locations": ["In many parts around Tibia", "including Rookgaard"],
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
    "hitpoints": 5690,
    "creatureCategory": "normal",
    "locations": ["Bulltaur Lair"],
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
    "hitpoints": 6560,
    "creatureCategory": "normal",
    "locations": ["Bulltaur Lair"],
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
    "hitpoints": 6840,
    "creatureCategory": "normal",
    "locations": ["Bulltaur Lair"],
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
    "hitpoints": 18000,
    "creatureCategory": "normal",
    "locations": ["Secret Library fire section"],
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
    "hitpoints": 10000,
    "creatureCategory": "normal",
    "locations": ["Issavi Sewers", "Kilmaresh Catacombs and Kilmaresh Mountains (above and under ground)"],
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
    "hitpoints": 6500,
    "creatureCategory": "normal",
    "locations": ["Haunted Tomb west of Darashia", "Buried Cathedral"],
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
    "charmPoints": 1,
    "difficulty": "HARMLESS",
    "hitpoints": 2,
    "creatureCategory": "normal",
    "locations": [
      "Ab'Dendriel",
      "Carlin",
      "Cormaya",
      "Feyrist Meadows",
      "Grimvale",
      "Isle of Solitude",
      "Issavi",
      "Kazordoon",
      "Liberty Bay",
      "Meriana",
      "Moonfall",
      "Oskayaat",
      "Plains of Havoc",
      "Port Hope",
      "Silvertides",
      "Sparkling Lagoon",
      "Stardance Mountains",
      "Yalahar Arena Quarter",
      "Yalahar Centre",
      "Yalahar Magician Quarter"
    ],
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
    "charmPoints": 1,
    "difficulty": "HARMLESS",
    "hitpoints": 2,
    "creatureCategory": "normal",
    "locations": [
      "Ab'Dendriel",
      "Alatar Lake",
      "Carlin",
      "Cormaya",
      "Edron",
      "Feyrist Meadows",
      "Fibula",
      "Fields of Glory",
      "Green Claw Swamp",
      "Isle of Solitude",
      "Issavi",
      "Kazordoon",
      "Meriana",
      "Moonfall",
      "Outlaw Camp",
      "Port Hope",
      "Silvertides",
      "Sparkling Lagoon",
      "Stardance Mountains",
      "Stonehome",
      "Thais",
      "Venore",
      "Venore Southern Swamp"
    ],
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
    "id": "butterfly-red",
    "name": "Butterfly (Red)",
    "imageUrl": "/images/creatures/butterfly-red.gif",
    "charmPoints": 1,
    "difficulty": "HARMLESS",
    "hitpoints": 2,
    "creatureCategory": "normal",
    "locations": [
      "Banuta",
      "Carlin",
      "Feyrist Meadows",
      "Grimvale",
      "Isle of Solitude",
      "Liberty Bay",
      "Meriana",
      "Moonfall",
      "Oskayaat",
      "Pantibian Course V",
      "Plains of Havoc",
      "Port Hope",
      "Silvertides",
      "Sparkling Lagoon",
      "Stardance Mountains",
      "Yalahar Arena Quarter",
      "Yalahar Centre",
      "Yalahar Magician Quarter"
    ],
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
    "charmPoints": 30,
    "difficulty": "EASY",
    "hitpoints": 444,
    "creatureCategory": "rare",
    "locations": [
      "Thais",
      "Carlin",
      "Edron",
      "Darashia and Liberty Bay during A Piece of Cake"
    ],
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
    "hitpoints": 75,
    "creatureCategory": "normal",
    "locations": [
      "Fiehonja",
      "Ancient Ancestorial Grounds",
      "Deepling Outpost",
      "Deepling Temple Complex",
      "Drowned Library"
    ],
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
    "hitpoints": 3700,
    "creatureCategory": "normal",
    "locations": ["Dessert Dungeons"],
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
    "hitpoints": 3100,
    "creatureCategory": "normal",
    "locations": ["Chocolate Mines"],
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
    "hitpoints": 30000,
    "creatureCategory": "normal",
    "locations": ["Ebb and Flow"],
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
    "id": "carnivostrich",
    "name": "Carnivostrich",
    "imageUrl": "/images/creatures/carnivostrich.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "hitpoints": 8250,
    "creatureCategory": "normal",
    "locations": ["Ingol"],
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
    "difficulty": "EASY",
    "hitpoints": 145,
    "creatureCategory": "normal",
    "locations": ["Liberty Bay Rotworms"],
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 105,
      "energy": 90,
      "earth": 80,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "cat",
    "name": "Cat",
    "imageUrl": "/images/creatures/cat.gif",
    "charmPoints": 1,
    "difficulty": "HARMLESS",
    "hitpoints": 20,
    "creatureCategory": "normal",
    "locations": ["Yalahar"],
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
    "id": "cave-chimera",
    "name": "Cave Chimera",
    "imageUrl": "/images/creatures/cave-chimera.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "hitpoints": 8000,
    "creatureCategory": "normal",
    "locations": ["Dwelling of the Forgotten"],
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
    "hitpoints": 4500,
    "creatureCategory": "normal",
    "locations": ["Warzone 5"],
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
    "hitpoints": 30,
    "creatureCategory": "normal",
    "locations": ["Desecrated Glade"],
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
    "hitpoints": 30,
    "creatureCategory": "normal",
    "locations": [
      "Almost everywhere in Tibia",
      "Greenshore",
      "Port Hope",
      "Ankrahmun"
    ],
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
    "id": "centipede",
    "name": "Centipede",
    "imageUrl": "/images/creatures/centipede.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 70,
    "creatureCategory": "normal",
    "locations": [
      "All around Port Hope and Tiquanda",
      "Dark Cathedral",
      "Vandura",
      "Meriana",
      "Razachai",
      "and Slime cave east of Venore",
      "Arena and Zoo Quarter",
      "Gnarlhound Caves"
    ],
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
    "hitpoints": 80,
    "creatureCategory": "normal",
    "locations": [
      "Inukaya",
      "Chyllfroest",
      "Chakoya Iceberg"
    ],
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
    "hitpoints": 68,
    "creatureCategory": "normal",
    "locations": [
      "Inukaya",
      "Chyllfroest",
      "Chakoya Iceberg",
      "Nibelor (during a The Ice Islands Quest"
    ],
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
    "hitpoints": 84,
    "creatureCategory": "normal",
    "locations": [
      "Inukaya",
      "Chyllfroest",
      "Chakoya Iceberg"
    ],
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
    "id": "chasm-spawn",
    "name": "Chasm Spawn",
    "imageUrl": "/images/creatures/chasm-spawn.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 4500,
    "creatureCategory": "normal",
    "locations": ["Warzone 4 (650/h~)"],
    "elementalResistances": {
      "physical": 100,
      "fire": 130,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "chicken",
    "name": "Chicken",
    "imageUrl": "/images/creatures/chicken.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "hitpoints": 15,
    "creatureCategory": "normal",
    "locations": [
      "Sabrehaven",
      "Rookgaard",
      "Donald McRonald"
    ],
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
    "charmPoints": 1,
    "difficulty": "HARMLESS",
    "hitpoints": 70,
    "creatureCategory": "normal",
    "locations": ["Candia"],
    "elementalResistances": {
      "physical": 70,
      "fire": 60,
      "ice": 105,
      "energy": 100,
      "earth": 60,
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
    "hitpoints": 5800,
    "creatureCategory": "normal",
    "locations": ["All over the surface of Upper Roshamuul and Nightmare Isles"],
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
    "hitpoints": 2350,
    "creatureCategory": "normal",
    "locations": ["Crumbling Caverns"],
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
    "id": "cliff-strider",
    "name": "Cliff Strider",
    "imageUrl": "/images/creatures/cliff-strider.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "hitpoints": 9400,
    "creatureCategory": "normal",
    "locations": ["Warzone 3"],
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
    "hitpoints": 28000,
    "creatureCategory": "normal",
    "locations": ["Furious Crater"],
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
    "hitpoints": 900,
    "creatureCategory": "normal",
    "locations": ["Krailos Surface"],
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
    "id": "cobra",
    "name": "Cobra",
    "imageUrl": "/images/creatures/cobra.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 65,
    "creatureCategory": "normal",
    "locations": [
      "Ankrahmun Library Tomb",
      "Tarpit Tomb",
      "Mountain Tomb",
      "Peninsula Tomb",
      "Darama",
      "Tiquanda",
      "Drefia",
      "Forbidden Lands",
      "Arena Quarter",
      "Lion's Rock"
    ],
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
    "hitpoints": 8200,
    "creatureCategory": "normal",
    "locations": ["Cobra Bastion"],
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
    "hitpoints": 8500,
    "creatureCategory": "normal",
    "locations": ["Cobra Bastion"],
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
    "hitpoints": 8500,
    "creatureCategory": "normal",
    "locations": ["Cobra Bastion"],
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
    "hitpoints": 29600,
    "creatureCategory": "normal",
    "locations": ["Gloom Pillars"],
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
    "hitpoints": 60,
    "creatureCategory": "normal",
    "locations": [
      "Meriana",
      "Laguna Islands",
      "and other Shattered Isles"
    ],
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
    "hitpoints": 30,
    "creatureCategory": "normal",
    "locations": ["Newhaven"],
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
    "hitpoints": 45,
    "creatureCategory": "normal",
    "locations": ["Newhaven"],
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
    "hitpoints": 250,
    "creatureCategory": "normal",
    "locations": ["Coryms PH, Coryms Venore"],
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 75,
      "earth": 75,
      "holy": 105,
      "death": 85
    },
    "killsToComplete": 500
  },
  {
    "id": "courage-leech",
    "name": "Courage Leech",
    "imageUrl": "/images/creatures/courage-leech.gif",
    "charmPoints": 5,
    "difficulty": "CHALLENGING",
    "hitpoints": 27000,
    "creatureCategory": "normal",
    "locations": ["Furious Crater"],
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
    "id": "crab",
    "name": "Crab",
    "imageUrl": "/images/creatures/crab.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 55,
    "creatureCategory": "normal",
    "locations": [
      "Various locations like Goroma",
      "Edron",
      "Port Hope",
      "Nargor and other Shattered Isles. There is also one located underwater by The Tibianic",
      "however it is unreachable"
    ],
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
    "hitpoints": 9150,
    "creatureCategory": "normal",
    "locations": ["Ingol"],
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
    "hitpoints": 1450,
    "creatureCategory": "normal",
    "locations": ["Inner Hive"],
    "elementalResistances": {
      "physical": 100,
      "fire": 108,
      "ice": 107,
      "energy": 100,
      "earth": 0,
      "holy": 105,
      "death": 95
    },
    "killsToComplete": 1000
  },
  {
    "id": "crazed-beggar",
    "name": "Crazed Beggar",
    "imageUrl": "/images/creatures/crazed-beggar.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 100,
    "creatureCategory": "normal",
    "locations": ["Factory Quarter"],
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
    "hitpoints": 5300,
    "creatureCategory": "normal",
    "locations": ["Court of Summer", "Dream Labyrinth"],
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
    "hitpoints": 5500,
    "creatureCategory": "normal",
    "locations": ["Court of Summer", "Dream Labyrinth"],
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
    "hitpoints": 5200,
    "creatureCategory": "normal",
    "locations": ["Court of Winter", "Dream Labyrinth"],
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
    "hitpoints": 5800,
    "creatureCategory": "normal",
    "locations": ["Court of Winter", "Dream Labyrinth"],
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
    "charmPoints": 1,
    "difficulty": "HARMLESS",
    "hitpoints": 76,
    "creatureCategory": "normal",
    "locations": ["Candia"],
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
    "hitpoints": 27000,
    "creatureCategory": "normal",
    "locations": ["Unhallowed Crypt"],
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
    "hitpoints": 60,
    "creatureCategory": "normal",
    "locations": [
      "Meriana",
      "Laguna Islands",
      "and other Shattered Isles"
    ],
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
    "hitpoints": 105,
    "creatureCategory": "normal",
    "locations": ["Port Hope Crocodile Cave"],
    "elementalResistances": {
      "physical": 110,
      "fire": 110,
      "ice": 90,
      "energy": 105,
      "earth": 80,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "crusader",
    "name": "Crusader",
    "imageUrl": "/images/creatures/crusader.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "hitpoints": 3400,
    "creatureCategory": "normal",
    "locations": ["Book World"],
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
    "id": "crypt-construct",
    "name": "Crypt Construct",
    "imageUrl": "/images/creatures/crypt-construct.gif",
    "charmPoints": 5,
    "difficulty": "CHALLENGING",
    "hitpoints": 25000,
    "creatureCategory": "normal",
    "locations": ["Forgotten Crypt", "Unhallowed Crypt"],
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
    "hitpoints": 185,
    "creatureCategory": "normal",
    "locations": ["Horestis Tomb"],
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
    "hitpoints": 30000,
    "creatureCategory": "normal",
    "locations": ["Unhallowed Crypt"],
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
    "hitpoints": 14000,
    "creatureCategory": "normal",
    "locations": ["Forsaken Crypt"],
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
    "difficulty": "EASY",
    "hitpoints": 330,
    "creatureCategory": "normal",
    "locations": ["Yalahar Cemetery, Mount Sternum, Ramoa -1/-2"],
    "elementalResistances": {
      "physical": 100,
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
    "id": "crypt-warden",
    "name": "Crypt Warden",
    "imageUrl": "/images/creatures/crypt-warden.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "hitpoints": 8300,
    "creatureCategory": "normal",
    "locations": ["Kilmaresh Catacombs"],
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
    "hitpoints": 7800,
    "creatureCategory": "normal",
    "locations": ["Bounac"],
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
    "id": "cunning-werepanther",
    "name": "Cunning Werepanther",
    "imageUrl": "/images/creatures/cunning-werepanther.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "hitpoints": 4300,
    "creatureCategory": "normal",
    "locations": ["Oskayaat", "Oskayaat Undercity"],
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
    "id": "cursed-book",
    "name": "Cursed Book",
    "imageUrl": "/images/creatures/cursed-book.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "hitpoints": 20000,
    "creatureCategory": "normal",
    "locations": ["Secret Library earth section"],
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
    "hitpoints": 3900,
    "creatureCategory": "normal",
    "locations": ["Barren Drift"],
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
    "hitpoints": 260,
    "creatureCategory": "normal",
    "locations": [
      "Plains of Havoc",
      "Mount Sternum",
      "Femor Hills",
      "Cyclops Camp",
      "Cyclopolis",
      "Ancient Temple",
      "Shadowthorn",
      "Orc Fort",
      "Mistrock",
      "Foreigner Quarter",
      "Outlaw Camp and in the Forsaken Mine"
    ],
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
    "id": "cyclursus",
    "name": "Cyclursus",
    "imageUrl": "/images/creatures/cyclursus.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "hitpoints": 13500,
    "creatureCategory": "normal",
    "locations": ["Forsaken Crypt"],
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
    "hitpoints": 500,
    "creatureCategory": "normal",
    "locations": ["Golem Workshop in Gnomebase Alpha"],
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
    "hitpoints": 260,
    "creatureCategory": "normal",
    "locations": ["Factory Quarter"],
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
    "id": "dark-apprentice",
    "name": "Dark Apprentice",
    "imageUrl": "/images/creatures/dark-apprentice.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 225,
    "creatureCategory": "normal",
    "locations": [
      "Magician Tower",
      "Dark Cathedral",
      "Hero Cave",
      "Magician Quarter"
    ],
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
    "hitpoints": 7500,
    "creatureCategory": "normal",
    "locations": ["Forest of Life"],
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
    "id": "dark-magician",
    "name": "Dark Magician",
    "imageUrl": "/images/creatures/dark-magician.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 325,
    "creatureCategory": "normal",
    "locations": [
      "Hero Cave (Edron)",
      "Magician Tower",
      "Dark Cathedral",
      "Yalahar Magician Quarter"
    ],
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
    "id": "dark-monk",
    "name": "Dark Monk",
    "imageUrl": "/images/creatures/dark-monk.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 190,
    "creatureCategory": "normal",
    "locations": ["Dark Cathedral"],
    "elementalResistances": {
      "physical": 110,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 110,
      "death": 60
    },
    "killsToComplete": 500
  },
  {
    "id": "dark-torturer",
    "name": "Dark Torturer",
    "imageUrl": "/images/creatures/dark-torturer.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "hitpoints": 7350,
    "creatureCategory": "normal",
    "locations": ["Pits of Inferno", "Vengoth"],
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
    "hitpoints": 32200,
    "creatureCategory": "normal",
    "locations": ["Gloom Pillars"],
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
    "hitpoints": 27500,
    "creatureCategory": "normal",
    "locations": ["Gloom Pillars"],
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
    "hitpoints": 30150,
    "creatureCategory": "normal",
    "locations": ["Darklight Core"],
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
    "hitpoints": 31550,
    "creatureCategory": "normal",
    "locations": ["Darklight Core"],
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
    "hitpoints": 29700,
    "creatureCategory": "normal",
    "locations": ["Darklight Core"],
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
    "hitpoints": 2900,
    "creatureCategory": "normal",
    "locations": ["Asura Palace"],
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
    "hitpoints": 320,
    "creatureCategory": "normal",
    "locations": ["Souleater Mountains"],
    "elementalResistances": {
      "physical": 80,
      "fire": 110,
      "ice": 90,
      "energy": 110,
      "earth": 0,
      "holy": 110,
      "death": 0
    },
    "killsToComplete": 1000
  },
  {
    "id": "deathling-scout",
    "name": "Deathling Scout",
    "imageUrl": "/images/creatures/deathling-scout.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "hitpoints": 7200,
    "creatureCategory": "normal",
    "locations": [
      "Ancient Ancestorial Grounds",
      "Deathling Menace",
      "Sunken Temple"
    ],
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
    "hitpoints": 7200,
    "creatureCategory": "normal",
    "locations": ["Ancient Ancestorial Grounds and Sunken Temple"],
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
    "id": "deepling-tyrant",
    "name": "Deepling Tyrant",
    "imageUrl": "/images/creatures/deepling-tyrant.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "hitpoints": 4500,
    "creatureCategory": "normal",
    "locations": ["Fiehonja"],
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
    "hitpoints": 190,
    "creatureCategory": "normal",
    "locations": [
      "Deepling Temple Complex",
      "Hatchery",
      "Fiehonja soul net area"
    ],
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
    "hitpoints": 320,
    "creatureCategory": "normal",
    "locations": ["Sea Serpent Area Svargrond"],
    "elementalResistances": {
      "physical": 95,
      "fire": 110,
      "ice": 0,
      "energy": 105,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "deepworm",
    "name": "Deepworm",
    "imageUrl": "/images/creatures/deepworm.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 3500,
    "creatureCategory": "normal",
    "locations": ["Warzone 6"],
    "elementalResistances": {
      "physical": 100,
      "fire": 120,
      "ice": 100,
      "energy": 100,
      "earth": 80,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "deer",
    "name": "Deer",
    "imageUrl": "/images/creatures/deer.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "hitpoints": 25,
    "creatureCategory": "normal",
    "locations": ["Svargrond Mammoth Mountain (South west from depot)"],
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
    "id": "defiler",
    "name": "Defiler",
    "imageUrl": "/images/creatures/defiler.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "hitpoints": 3650,
    "creatureCategory": "normal",
    "locations": ["Pits of Inferno"],
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
    "hitpoints": 8200,
    "creatureCategory": "normal",
    "locations": ["Hero Cave", "Kharos"],
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
    "hitpoints": 6900,
    "creatureCategory": "normal",
    "locations": ["Roshamuul Prison"],
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
    "id": "devourer",
    "name": "Devourer",
    "imageUrl": "/images/creatures/devourer.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1900,
    "creatureCategory": "normal",
    "locations": ["Oramond West"],
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 85,
      "energy": 105,
      "earth": 0,
      "holy": 100,
      "death": 90
    },
    "killsToComplete": 1000
  },
  {
    "id": "diamond-servant-replica",
    "name": "Diamond Servant Replica",
    "imageUrl": "/images/creatures/diamond-servant-replica.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 2000,
    "creatureCategory": "normal",
    "locations": ["Replica Dungeon (Lloyd)"],
    "elementalResistances": {
      "physical": 100,
      "fire": 90,
      "ice": 100,
      "energy": 0,
      "earth": 25,
      "holy": 115,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "dire-penguin",
    "name": "Dire Penguin",
    "imageUrl": "/images/creatures/dire-penguin.gif",
    "charmPoints": 30,
    "difficulty": "EASY",
    "hitpoints": 173,
    "creatureCategory": "rare",
    "locations": ["Many places with penguins"],
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
    "hitpoints": 3600,
    "creatureCategory": "normal",
    "locations": ["Warzone 6"],
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 120,
      "energy": 100,
      "earth": 80,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "distorted-phantom",
    "name": "Distorted Phantom",
    "imageUrl": "/images/creatures/distorted-phantom.gif",
    "charmPoints": 5,
    "difficulty": "CHALLENGING",
    "hitpoints": 26000,
    "creatureCategory": "normal",
    "locations": ["Mirrored Nightmare"],
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
    "difficulty": "HARMLESS",
    "hitpoints": 20,
    "creatureCategory": "normal",
    "locations": ["Thais"],
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
    "id": "doomsday-cultist",
    "name": "Doomsday Cultist",
    "imageUrl": "/images/creatures/doomsday-cultist.gif",
    "charmPoints": 30,
    "difficulty": "EASY",
    "hitpoints": 125,
    "creatureCategory": "rare",
    "locations": ["Tarpit Tomb around the Lightbringer's basin"],
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
    "hitpoints": 6180,
    "creatureCategory": "normal",
    "locations": ["Nimmersatt's Breeding Ground"],
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
    "hitpoints": 1000,
    "creatureCategory": "normal",
    "locations": ["Yalahar Dragons, Edron Dragons"],
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 110,
      "energy": 80,
      "earth": 20,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "dragon-hatchling",
    "name": "Dragon Hatchling",
    "imageUrl": "/images/creatures/dragon-hatchling.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 380,
    "creatureCategory": "normal",
    "locations": [
      "Thais Dragon Lair",
      "beneath Fenrock",
      "Darashia Dragon Lair",
      "Venore Dragon Lair",
      "Edron Dragon Lair",
      "Dragonblaze Peaks",
      "Krailos Steppe. Also summoned by Lizard Dragon Priests"
    ],
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 110,
      "energy": 105,
      "earth": 25,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "dragon-lord",
    "name": "Dragon Lord",
    "imageUrl": "/images/creatures/dragon-lord.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1900,
    "creatureCategory": "normal",
    "locations": ["Fenrock DLs, POI DLs"],
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 110,
      "energy": 80,
      "earth": 20,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "dragon-lord-hatchling",
    "name": "Dragon Lord Hatchling",
    "imageUrl": "/images/creatures/dragon-lord-hatchling.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 750,
    "creatureCategory": "normal",
    "locations": [
      "Thais Dragon Lair",
      "Venore Dragon Lair",
      "Edron Dragon Lair by the Fire Axe Quest",
      "on the way to Pythius the Rotten",
      "Razachai",
      "Dragonblaze Peaks"
    ],
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 110,
      "energy": 105,
      "earth": 25,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "dragonling",
    "name": "Dragonling",
    "imageUrl": "/images/creatures/dragonling.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 2600,
    "creatureCategory": "normal",
    "locations": ["Fury Dungeon"],
    "elementalResistances": {
      "physical": 105,
      "fire": 0,
      "ice": 95,
      "energy": 95,
      "earth": 110,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "draken-abomination",
    "name": "Draken Abomination",
    "imageUrl": "/images/creatures/draken-abomination.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 6250,
    "creatureCategory": "normal",
    "locations": ["Razachai including the Inner Sanctum"],
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 95,
      "energy": 105,
      "earth": 0,
      "holy": 105,
      "death": 0
    },
    "killsToComplete": 2500
  },
  {
    "id": "draken-elite",
    "name": "Draken Elite",
    "imageUrl": "/images/creatures/draken-elite.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 5550,
    "creatureCategory": "normal",
    "locations": ["Razachai", "including the Crystal Column chambers in the Inner Sanctum"],
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 100,
      "energy": 60,
      "earth": 0,
      "holy": 70,
      "death": 70
    },
    "killsToComplete": 2500
  },
  {
    "id": "draken-spellweaver",
    "name": "Draken Spellweaver",
    "imageUrl": "/images/creatures/draken-spellweaver.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 5000,
    "creatureCategory": "normal",
    "locations": [
      "Zao Palace",
      "Razachai",
      "Zzaion"
    ],
    "elementalResistances": {
      "physical": 110,
      "fire": 0,
      "ice": 110,
      "energy": 110,
      "earth": 0,
      "holy": 105,
      "death": 20
    },
    "killsToComplete": 2500
  },
  {
    "id": "draken-warmaster",
    "name": "Draken Warmaster",
    "imageUrl": "/images/creatures/draken-warmaster.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 4150,
    "creatureCategory": "normal",
    "locations": [
      "Zao Palace",
      "Chazorai",
      "Razachai",
      "Zzaion"
    ],
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 105,
      "energy": 95,
      "earth": 0,
      "holy": 95,
      "death": 50
    },
    "killsToComplete": 1000
  },
  {
    "id": "dread-intruder",
    "name": "Dread Intruder",
    "imageUrl": "/images/creatures/dread-intruder.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 4500,
    "creatureCategory": "normal",
    "locations": ["Otherworld"],
    "elementalResistances": {
      "physical": 100,
      "fire": 90,
      "ice": 95,
      "energy": 10,
      "earth": 100,
      "holy": 110,
      "death": 20
    },
    "killsToComplete": 2500
  },
  {
    "id": "drillworm",
    "name": "Drillworm",
    "imageUrl": "/images/creatures/drillworm.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1500,
    "creatureCategory": "normal",
    "locations": ["Warzone 4"],
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 84,
      "energy": 85,
      "earth": 0,
      "holy": 85,
      "death": 85
    },
    "killsToComplete": 1000
  },
  {
    "id": "dromedary",
    "name": "Dromedary",
    "imageUrl": "/images/creatures/dromedary.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "hitpoints": 45,
    "creatureCategory": "normal",
    "locations": [
      "Ankrahmun near the way to Darashia",
      "Ankrahmun near sea",
      "around Darashia",
      "Issavi"
    ],
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
    "id": "druids-apparition",
    "name": "Druid's Apparition",
    "imageUrl": "/images/creatures/druids-apparition.gif",
    "charmPoints": 100,
    "difficulty": "CHALLENGING",
    "hitpoints": 25000,
    "creatureCategory": "normal",
    "locations": ["Mirrored Nightmare", "after Mirror Images are attacked"],
    "elementalResistances": {
      "physical": 120,
      "fire": 120,
      "ice": 70,
      "energy": 100,
      "earth": 100,
      "holy": 60,
      "death": 120
    },
    "killsToComplete": 5000
  },
  {
    "id": "dwarf",
    "name": "Dwarf",
    "imageUrl": "/images/creatures/dwarf.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 90,
    "creatureCategory": "normal",
    "locations": [
      "Kazordoon Dwarf Mines",
      "Dwarf Bridge",
      "deep Elvenbane",
      "Tiquanda Dwarf Cave",
      "Cormaya Dwarf Cave",
      "Island of Destiny (Knights area)",
      "Beregar"
    ],
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
    "id": "dwarf-guard",
    "name": "Dwarf Guard",
    "imageUrl": "/images/creatures/dwarf-guard.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 245,
    "creatureCategory": "normal",
    "locations": [
      "Kazordoon Dwarf Mines",
      "Dwacatra",
      "Ferngrims Gate",
      "Cyclopolis",
      "Mount Sternum Undead Cave",
      "Stonehome Rotworm cave (near Edron)",
      "Maze of Lost Souls",
      "Tiquanda Dwarf Cave",
      "Beregar",
      "Cormaya Dwarf Cave"
    ],
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
    "id": "dwarf-soldier",
    "name": "Dwarf Soldier",
    "imageUrl": "/images/creatures/dwarf-soldier.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 135,
    "creatureCategory": "normal",
    "locations": [
      "Kazordoon Dwarf Mines",
      "Cyclopolis",
      "Dwacatra",
      "Ferngrims Gate",
      "Dwarf Bridge",
      "Mount Sternum Undead Cave",
      "Beregar",
      "Tiquanda Dwarf Cave",
      "Cormaya Dwarf Cave"
    ],
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
    "hitpoints": 85,
    "creatureCategory": "normal",
    "locations": ["South of Port Hope (Trapwood) on ground level and underground"],
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
    "id": "dworc-shadowstalker",
    "name": "Dworc Shadowstalker",
    "imageUrl": "/images/creatures/dworc-shadowstalker.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 8900,
    "creatureCategory": "normal",
    "locations": ["Norcferatu Dungeons", "Norcferatu Fortress"],
    "elementalResistances": {
      "physical": 95,
      "fire": 105,
      "ice": 105,
      "energy": 105,
      "earth": 95,
      "holy": 100,
      "death": 60
    },
    "killsToComplete": 2500
  },
  {
    "id": "dworc-venomsniper",
    "name": "Dworc Venomsniper",
    "imageUrl": "/images/creatures/dworc-venomsniper.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 80,
    "creatureCategory": "normal",
    "locations": ["South of Port Hope (Trapwood) on ground level and underground and on Foreigner Quarter of Yalahar"],
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
    "hitpoints": 80,
    "creatureCategory": "normal",
    "locations": ["South of Port Hope around Trapwood. There is also a group of 3 voodoomasters and 2 crypt shamblers on the shore east of Trapwood"],
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
    "id": "efreet",
    "name": "Efreet",
    "imageUrl": "/images/creatures/efreet.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 550,
    "creatureCategory": "normal",
    "locations": [
      "Mal'ouquah",
      "Deeper Banuta",
      "Goromas Cult Cave (in the classroom)",
      "Magician Quarter",
      "The Arcanum",
      "Djinn Battle island through the Haunted Tomb"
    ],
    "elementalResistances": {
      "physical": 100,
      "fire": 10,
      "ice": 105,
      "energy": 40,
      "earth": 90,
      "holy": 108,
      "death": 80
    },
    "killsToComplete": 1000
  },
  {
    "id": "elder-wyrm",
    "name": "Elder Wyrm",
    "imageUrl": "/images/creatures/elder-wyrm.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 2700,
    "creatureCategory": "normal",
    "locations": [
      "Drefia Wyrm Lair",
      "Vandura Wyrm Cave",
      "Oramond Factory Raids (west)",
      "Warzone 4"
    ],
    "elementalResistances": {
      "physical": 100,
      "fire": 70,
      "ice": 100,
      "energy": 0,
      "earth": 25,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "elephant",
    "name": "Elephant",
    "imageUrl": "/images/creatures/elephant.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 320,
    "creatureCategory": "normal",
    "locations": ["East of Port Hope close to Grizzly Adams and also in this area"],
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
    "hitpoints": 100,
    "creatureCategory": "normal",
    "locations": [
      "Yalahar Foreigner Quarter and Trade Quarter",
      "Maze of Lost Souls",
      "Orc Fort (unreachable)",
      "Hellgate",
      "Shadowthorn",
      "Ab'Dendriel elf caves",
      "Elvenbane",
      "north of Thais"
    ],
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
    "hitpoints": 220,
    "creatureCategory": "normal",
    "locations": [
      "Yalahar Foreigner Quarter",
      "Demona",
      "Shadowthorn",
      "northwest of Ab'Dendriel",
      "Maze of Lost Souls",
      "Cyclopolis",
      "Elvenbane",
      "near Mount Sternum"
    ],
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
    "id": "elf-scout",
    "name": "Elf Scout",
    "imageUrl": "/images/creatures/elf-scout.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 160,
    "creatureCategory": "normal",
    "locations": [
      "Yalahar Foreigner Quarter",
      "Shadowthorn",
      "northwest of Ab'Dendriel",
      "north and west of Mount Sternum",
      "Hellgate",
      "Maze of Lost Souls",
      "near Knightwatch Tower in the Plains of Havoc. Two may also spawn when a Desperate White Deer or an Enraged White Deer is killed"
    ],
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
    "hitpoints": 90,
    "creatureCategory": "normal",
    "locations": ["Venore Salamander Cave"],
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
    "id": "emerald-tortoise",
    "name": "Emerald Tortoise",
    "imageUrl": "/images/creatures/emerald-tortoise.gif",
    "charmPoints": 100,
    "difficulty": "CHALLENGING",
    "hitpoints": 22300,
    "creatureCategory": "normal",
    "locations": ["Sparkling Pools"],
    "elementalResistances": {
      "physical": 80,
      "fire": 90,
      "ice": 90,
      "energy": 90,
      "earth": 115,
      "holy": 90,
      "death": 100
    },
    "killsToComplete": 5000
  },
  {
    "id": "energetic-book",
    "name": "Energetic Book",
    "imageUrl": "/images/creatures/energetic-book.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 18500,
    "creatureCategory": "normal",
    "locations": ["Secret Library energy section"],
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 0,
      "earth": 110,
      "holy": 0,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "energuardian-of-tales",
    "name": "Energuardian of Tales",
    "imageUrl": "/images/creatures/energuardian-of-tales.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 14000,
    "creatureCategory": "normal",
    "locations": ["The Secret Library energy section"],
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 0,
      "earth": 112,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "enfeebled-silencer",
    "name": "Enfeebled Silencer",
    "imageUrl": "/images/creatures/enfeebled-silencer.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1100,
    "creatureCategory": "normal",
    "locations": ["Feyrist Mini Rosha"],
    "elementalResistances": {
      "physical": 95,
      "fire": 70,
      "ice": 85,
      "energy": 85,
      "earth": 40,
      "holy": 125,
      "death": 35
    },
    "killsToComplete": 1000
  },
  {
    "id": "enlightened-of-the-cult",
    "name": "Enlightened of the Cult",
    "imageUrl": "/images/creatures/enlightened-of-the-cult.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 700,
    "creatureCategory": "normal",
    "locations": ["Yalahar Cults"],
    "elementalResistances": {
      "physical": 105,
      "fire": 100,
      "ice": 80,
      "energy": 105,
      "earth": 100,
      "holy": 80,
      "death": 105
    },
    "killsToComplete": 1000
  },
  {
    "id": "enslaved-dwarf",
    "name": "Enslaved Dwarf",
    "imageUrl": "/images/creatures/enslaved-dwarf.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 3800,
    "creatureCategory": "normal",
    "locations": ["Caves of the Lost", "Lower Spike and Jaccus Maxxen's Dungeon"],
    "elementalResistances": {
      "physical": 103,
      "fire": 0,
      "ice": 90,
      "energy": 95,
      "earth": 70,
      "holy": 100,
      "death": 85
    },
    "killsToComplete": 1000
  },
  {
    "id": "eternal-guardian",
    "name": "Eternal Guardian",
    "imageUrl": "/images/creatures/eternal-guardian.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 2500,
    "creatureCategory": "normal",
    "locations": ["Deeper Banuta"],
    "elementalResistances": {
      "physical": 80,
      "fire": 30,
      "ice": 90,
      "energy": 90,
      "earth": 0,
      "holy": 80,
      "death": 80
    },
    "killsToComplete": 1000
  },
  {
    "id": "evil-prospector",
    "name": "Evil Prospector",
    "imageUrl": "/images/creatures/evil-prospector.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 8500,
    "creatureCategory": "normal",
    "locations": ["Barren Drift"],
    "elementalResistances": {
      "physical": 35,
      "fire": 105,
      "ice": 105,
      "energy": 70,
      "earth": 100,
      "holy": 65,
      "death": 110
    },
    "killsToComplete": 2500
  },
  {
    "id": "exotic-bat",
    "name": "Exotic Bat",
    "imageUrl": "/images/creatures/exotic-bat.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1500,
    "creatureCategory": "normal",
    "locations": ["Exotic Cave Spider Cave"],
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 95,
      "energy": 95,
      "earth": 99,
      "holy": 95,
      "death": 95
    },
    "killsToComplete": 1000
  },
  {
    "id": "exotic-cave-spider",
    "name": "Exotic Cave Spider",
    "imageUrl": "/images/creatures/exotic-cave-spider.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1900,
    "creatureCategory": "normal",
    "locations": ["Exotic Cave Spider Cave"],
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 80,
      "energy": 80,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "eyeless-devourer",
    "name": "Eyeless Devourer",
    "imageUrl": "/images/creatures/eyeless-devourer.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 10000,
    "creatureCategory": "normal",
    "locations": ["Antrum of the Fallen"],
    "elementalResistances": {
      "physical": 110,
      "fire": 100,
      "ice": 100,
      "energy": 95,
      "earth": 90,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "falcon-knight",
    "name": "Falcon Knight",
    "imageUrl": "/images/creatures/falcon-knight.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 9000,
    "creatureCategory": "normal",
    "locations": ["Falcon Bastion"],
    "elementalResistances": {
      "physical": 70,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 110,
      "death": 50
    },
    "killsToComplete": 2500
  },
  {
    "id": "falcon-paladin",
    "name": "Falcon Paladin",
    "imageUrl": "/images/creatures/falcon-paladin.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 8500,
    "creatureCategory": "normal",
    "locations": ["Falcon Bastion"],
    "elementalResistances": {
      "physical": 90,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 110,
      "death": 50
    },
    "killsToComplete": 2500
  },
  {
    "id": "faun",
    "name": "Faun",
    "imageUrl": "/images/creatures/faun.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 900,
    "creatureCategory": "normal",
    "locations": ["Feyrist Surface"],
    "elementalResistances": {
      "physical": 90,
      "fire": 115,
      "ice": 100,
      "energy": 110,
      "earth": 30,
      "holy": 70,
      "death": 80
    },
    "killsToComplete": 1000
  },
  {
    "id": "feral-sphinx",
    "name": "Feral Sphinx",
    "imageUrl": "/images/creatures/feral-sphinx.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 9800,
    "creatureCategory": "normal",
    "locations": ["Kilmaresh", "south of Issavi"],
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 115,
      "energy": 100,
      "earth": 100,
      "holy": 80,
      "death": 115
    },
    "killsToComplete": 2500
  },
  {
    "id": "feral-werecrocodile",
    "name": "Feral Werecrocodile",
    "imageUrl": "/images/creatures/feral-werecrocodile.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 6400,
    "creatureCategory": "normal",
    "locations": ["Murky Caverns", "Oskayaat"],
    "elementalResistances": {
      "physical": 75,
      "fire": 65,
      "ice": 115,
      "energy": 105,
      "earth": 80,
      "holy": 120,
      "death": 40
    },
    "killsToComplete": 2500
  },
  {
    "id": "feverish-citizen",
    "name": "Feverish Citizen",
    "imageUrl": "/images/creatures/feverish-citizen.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 125,
    "creatureCategory": "normal",
    "locations": ["Venore"],
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
    "id": "feversleep",
    "name": "Feversleep",
    "imageUrl": "/images/creatures/feversleep.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 5900,
    "creatureCategory": "normal",
    "locations": ["Roshamuul Mines"],
    "elementalResistances": {
      "physical": 85,
      "fire": 65,
      "ice": 95,
      "energy": 105,
      "earth": 0,
      "holy": 110,
      "death": 45
    },
    "killsToComplete": 1000
  },
  {
    "id": "filth-toad",
    "name": "Filth Toad",
    "imageUrl": "/images/creatures/filth-toad.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 185,
    "creatureCategory": "normal",
    "locations": ["Lake Equivocolao"],
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 80,
      "energy": 100,
      "earth": 80,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "fire-devil",
    "name": "Fire Devil",
    "imageUrl": "/images/creatures/fire-devil.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 200,
    "creatureCategory": "normal",
    "locations": [
      "Desert Dungeon",
      "Ancient Temple",
      "Magician Tower",
      "Shadow Tomb",
      "Ghostlands",
      "Goroma",
      "Plains of Havoc at Ornamented Shield Quest",
      "Spike Sword Quest"
    ],
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
    "hitpoints": 280,
    "creatureCategory": "normal",
    "locations": [
      "Hellgate",
      "Magma Dungeon",
      "Formorgar Mines"
    ],
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
    "hitpoints": 180,
    "creatureCategory": "normal",
    "locations": ["Shadowthorn"],
    "elementalResistances": {
      "physical": 80,
      "fire": 0,
      "ice": 110,
      "energy": 100,
      "earth": 95,
      "holy": 80,
      "death": 105
    },
    "killsToComplete": 500
  },
  {
    "id": "fish",
    "name": "Fish",
    "imageUrl": "/images/creatures/fish.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "hitpoints": 25,
    "creatureCategory": "normal",
    "locations": ["Fiehonja"],
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
    "hitpoints": 25,
    "creatureCategory": "normal",
    "locations": [
      "Tiquanda",
      "Shattered Isles",
      "Gardens of Night"
    ],
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
    "id": "flimsy-lost-soul",
    "name": "Flimsy Lost Soul",
    "imageUrl": "/images/creatures/flimsy-lost-soul.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 4000,
    "creatureCategory": "normal",
    "locations": [
      "Brain Grounds",
      "Netherworld",
      "Zarganash"
    ],
    "elementalResistances": {
      "physical": 50,
      "fire": 100,
      "ice": 100,
      "energy": 80,
      "earth": 80,
      "holy": 120,
      "death": 0
    },
    "killsToComplete": 2500
  },
  {
    "id": "floating-savant",
    "name": "Floating Savant",
    "imageUrl": "/images/creatures/floating-savant.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 8000,
    "creatureCategory": "normal",
    "locations": ["The Extension Site"],
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 110,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 50
    },
    "killsToComplete": 2500
  },
  {
    "id": "flying-book",
    "name": "Flying Book",
    "imageUrl": "/images/creatures/flying-book.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 500,
    "creatureCategory": "normal",
    "locations": ["Edron"],
    "elementalResistances": {
      "physical": 90,
      "fire": 85,
      "ice": 70,
      "energy": 95,
      "earth": 50,
      "holy": 10,
      "death": 80
    },
    "killsToComplete": 1000
  },
  {
    "id": "foam-stalker",
    "name": "Foam Stalker",
    "imageUrl": "/images/creatures/foam-stalker.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 4500,
    "creatureCategory": "normal",
    "locations": ["Great Pearl Fan Reef"],
    "elementalResistances": {
      "physical": 100,
      "fire": 20,
      "ice": 80,
      "energy": 130,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "fox",
    "name": "Fox",
    "imageUrl": "/images/creatures/fox.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "hitpoints": 22,
    "creatureCategory": "normal",
    "locations": [
      "Forests of Edron",
      "Cormaya",
      "possibly other places"
    ],
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
    "id": "frazzlemaw",
    "name": "Frazzlemaw",
    "imageUrl": "/images/creatures/frazzlemaw.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 4100,
    "creatureCategory": "normal",
    "locations": [
      "Lower Roshamuul",
      "Guzzlemaw Valley",
      "the entrance to Upper Roshamuul"
    ],
    "elementalResistances": {
      "physical": 95,
      "fire": 90,
      "ice": 95,
      "energy": 85,
      "earth": 80,
      "holy": 105,
      "death": 90
    },
    "killsToComplete": 2500
  },
  {
    "id": "freakish-lost-soul",
    "name": "Freakish Lost Soul",
    "imageUrl": "/images/creatures/freakish-lost-soul.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 7000,
    "creatureCategory": "normal",
    "locations": [
      "Brain Grounds",
      "Netherworld",
      "Zarganash"
    ],
    "elementalResistances": {
      "physical": 40,
      "fire": 100,
      "ice": 100,
      "energy": 65,
      "earth": 30,
      "holy": 140,
      "death": 0
    },
    "killsToComplete": 2500
  },
  {
    "id": "frost-dragon",
    "name": "Frost Dragon",
    "imageUrl": "/images/creatures/frost-dragon.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1800,
    "creatureCategory": "normal",
    "locations": ["Chyllfroest"],
    "elementalResistances": {
      "physical": 95,
      "fire": 0,
      "ice": 0,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 90
    },
    "killsToComplete": 1000
  },
  {
    "id": "frost-dragon-hatchling",
    "name": "Frost Dragon Hatchling",
    "imageUrl": "/images/creatures/frost-dragon-hatchling.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 800,
    "creatureCategory": "normal",
    "locations": ["Chyllfroest"],
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 0,
      "energy": 105,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "frost-flower-asura",
    "name": "Frost Flower Asura",
    "imageUrl": "/images/creatures/frost-flower-asura.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 3500,
    "creatureCategory": "normal",
    "locations": ["Asura Palace"],
    "elementalResistances": {
      "physical": 105,
      "fire": 115,
      "ice": 0,
      "energy": 100,
      "earth": 110,
      "holy": 70,
      "death": 80
    },
    "killsToComplete": 1000
  },
  {
    "id": "frost-giant",
    "name": "Frost Giant",
    "imageUrl": "/images/creatures/frost-giant.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 270,
    "creatureCategory": "normal",
    "locations": ["Nibelor"],
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 0,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "frost-giantess",
    "name": "Frost Giantess",
    "imageUrl": "/images/creatures/frost-giantess.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 275,
    "creatureCategory": "normal",
    "locations": ["Nibelor"],
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 0,
      "energy": 110,
      "earth": 100,
      "holy": 90,
      "death": 103
    },
    "killsToComplete": 500
  },
  {
    "id": "frost-troll",
    "name": "Frost Troll",
    "imageUrl": "/images/creatures/frost-troll.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "hitpoints": 55,
    "creatureCategory": "normal",
    "locations": [
      "Bittermor",
      "Edron Troll Cave",
      "Folda",
      "Formorgar Glacier",
      "Formorgar Mines",
      "Krimhorn",
      "Ragnir",
      "& Senja"
    ],
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
    "id": "fruit-drop",
    "name": "Fruit Drop",
    "imageUrl": "/images/creatures/fruit-drop.gif",
    "charmPoints": 1,
    "difficulty": "HARMLESS",
    "hitpoints": 63,
    "creatureCategory": "normal",
    "locations": [
      "Candia",
      "Chocolate Mines",
      "Dessert Dungeons"
    ],
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 90,
      "energy": 90,
      "earth": 95,
      "holy": 95,
      "death": 105
    },
    "killsToComplete": 250
  },
  {
    "id": "furious-troll",
    "name": "Furious Troll",
    "imageUrl": "/images/creatures/furious-troll.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 245,
    "creatureCategory": "normal",
    "locations": ["Old Beregar mines"],
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
    "hitpoints": 4100,
    "creatureCategory": "normal",
    "locations": ["Oramond Fury Dungeon"],
    "elementalResistances": {
      "physical": 110,
      "fire": 0,
      "ice": 95,
      "energy": 110,
      "earth": 110,
      "holy": 70,
      "death": 110
    },
    "killsToComplete": 2500
  },
  {
    "id": "gang-member",
    "name": "Gang Member",
    "imageUrl": "/images/creatures/gang-member.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 295,
    "creatureCategory": "normal",
    "locations": ["Throughout the Foreigner Quarter"],
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
    "hitpoints": 250,
    "creatureCategory": "normal",
    "locations": ["Meriana Gargoyle Cave"],
    "elementalResistances": {
      "physical": 80,
      "fire": 110,
      "ice": 100,
      "energy": 100,
      "earth": 0,
      "holy": 100,
      "death": 60
    },
    "killsToComplete": 500
  },
  {
    "id": "gazer",
    "name": "Gazer",
    "imageUrl": "/images/creatures/gazer.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 120,
    "creatureCategory": "normal",
    "locations": [
      "Hellgate bonelord cave",
      "Vandura Bonelord Cave",
      "also anywhere Elder Bonelords exist",
      "as summons"
    ],
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
    "id": "gazer-spectre",
    "name": "Gazer Spectre",
    "imageUrl": "/images/creatures/gazer-spectre.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 4500,
    "creatureCategory": "normal",
    "locations": ["Haunted Temple", "Buried Cathedral"],
    "elementalResistances": {
      "physical": 15,
      "fire": 30,
      "ice": 130,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "ghastly-dragon",
    "name": "Ghastly Dragon",
    "imageUrl": "/images/creatures/ghastly-dragon.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "hitpoints": 7800,
    "creatureCategory": "normal",
    "locations": [
      "Ghastly Dragon Lair",
      "Corruption Hole",
      "Razachai",
      "Zao Palace",
      "Deeper Banuta"
    ],
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
    "hitpoints": 150,
    "creatureCategory": "normal",
    "locations": ["Peninsula Tomb"],
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
    "id": "ghost-wolf",
    "name": "Ghost Wolf",
    "imageUrl": "/images/creatures/ghost-wolf.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 160,
    "creatureCategory": "normal",
    "locations": ["Poacher's Cave (Undead stage)"],
    "elementalResistances": {
      "physical": 65,
      "fire": 105,
      "ice": 100,
      "energy": 100,
      "earth": 90,
      "holy": 105,
      "death": 80
    },
    "killsToComplete": 500
  },
  {
    "id": "ghoul",
    "name": "Ghoul",
    "imageUrl": "/images/creatures/ghoul.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 100,
    "creatureCategory": "normal",
    "locations": ["Yalahar Cemetery, Mount Sternum, Edron Vampire Crypt -1/-2"],
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 90,
      "energy": 70,
      "earth": 80,
      "holy": 125,
      "death": 0
    },
    "killsToComplete": 500
  },
  {
    "id": "giant-spider",
    "name": "Giant Spider",
    "imageUrl": "/images/creatures/giant-spider.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1300,
    "creatureCategory": "normal",
    "locations": ["Port Hope Spider Cave"],
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 80,
      "energy": 80,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "gingerbread-man",
    "name": "Gingerbread Man",
    "imageUrl": "/images/creatures/gingerbread-man.gif",
    "charmPoints": 1,
    "difficulty": "HARMLESS",
    "hitpoints": 85,
    "creatureCategory": "normal",
    "locations": ["Candia"],
    "elementalResistances": {
      "physical": 80,
      "fire": 110,
      "ice": 100,
      "energy": 100,
      "earth": 60,
      "holy": 90,
      "death": 80
    },
    "killsToComplete": 250
  },
  {
    "id": "girtablilu-warrior",
    "name": "Girtablilu Warrior",
    "imageUrl": "/images/creatures/girtablilu-warrior.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 8500,
    "creatureCategory": "normal",
    "locations": ["Ruins of Nuur"],
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 115,
      "earth": 90,
      "holy": 110,
      "death": 85
    },
    "killsToComplete": 2500
  },
  {
    "id": "gladiator",
    "name": "Gladiator",
    "imageUrl": "/images/creatures/gladiator.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 185,
    "creatureCategory": "normal",
    "locations": ["Trade Quarter", "Arena and Zoo Quarter"],
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
    "id": "gloom-maw",
    "name": "Gloom Maw",
    "imageUrl": "/images/creatures/gloom-maw.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 8700,
    "creatureCategory": "normal",
    "locations": ["Norcferatu Dungeons", "Norcferatu Fortress"],
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 100,
      "energy": 110,
      "earth": 110,
      "holy": 105,
      "death": 75
    },
    "killsToComplete": 2500
  },
  {
    "id": "gloom-wolf",
    "name": "Gloom Wolf",
    "imageUrl": "/images/creatures/gloom-wolf.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 200,
    "creatureCategory": "normal",
    "locations": ["Poacher's Cave (Undead stage)"],
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 105,
      "energy": 100,
      "earth": 80,
      "holy": 105,
      "death": 90
    },
    "killsToComplete": 500
  },
  {
    "id": "glooth-anemone",
    "name": "Glooth Anemone",
    "imageUrl": "/images/creatures/glooth-anemone.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 2400,
    "creatureCategory": "normal",
    "locations": ["Oramond Wildlife Raid"],
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 100,
      "energy": 90,
      "earth": 0,
      "holy": 100,
      "death": 65
    },
    "killsToComplete": 1000
  },
  {
    "id": "glooth-bandit",
    "name": "Glooth Bandit",
    "imageUrl": "/images/creatures/glooth-bandit.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 2600,
    "creatureCategory": "normal",
    "locations": ["Underground Glooth Factory"],
    "elementalResistances": {
      "physical": 85,
      "fire": 105,
      "ice": 90,
      "energy": 80,
      "earth": 0,
      "holy": 100,
      "death": 80
    },
    "killsToComplete": 1000
  },
  {
    "id": "glooth-blob",
    "name": "Glooth Blob",
    "imageUrl": "/images/creatures/glooth-blob.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 750,
    "creatureCategory": "normal",
    "locations": ["Oramond West"],
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 80,
      "energy": 110,
      "earth": 0,
      "holy": 100,
      "death": 0
    },
    "killsToComplete": 1000
  },
  {
    "id": "glooth-brigand",
    "name": "Glooth Brigand",
    "imageUrl": "/images/creatures/glooth-brigand.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 2400,
    "creatureCategory": "normal",
    "locations": ["Underground Glooth Factory"],
    "elementalResistances": {
      "physical": 90,
      "fire": 100,
      "ice": 90,
      "energy": 75,
      "earth": 0,
      "holy": 105,
      "death": 85
    },
    "killsToComplete": 1000
  },
  {
    "id": "glooth-golem",
    "name": "Glooth Golem",
    "imageUrl": "/images/creatures/glooth-golem.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 2700,
    "creatureCategory": "normal",
    "locations": [
      "Glooth Factory",
      "Underground Glooth Factory",
      "Rathleton Sewers",
      "Jaccus Maxxen's Dungeon",
      "Oramond Dungeon (depending on Magistrate votes)"
    ],
    "elementalResistances": {
      "physical": 95,
      "fire": 105,
      "ice": 100,
      "energy": 95,
      "earth": 0,
      "holy": 85,
      "death": 70
    },
    "killsToComplete": 1000
  },
  {
    "id": "gnarlhound",
    "name": "Gnarlhound",
    "imageUrl": "/images/creatures/gnarlhound.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 198,
    "creatureCategory": "normal",
    "locations": ["Zao Gnarlhound Cave"],
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
    "id": "goblin",
    "name": "Goblin",
    "imageUrl": "/images/creatures/goblin.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "hitpoints": 50,
    "creatureCategory": "normal",
    "locations": ["Goblin Troll Cave"],
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
    "id": "goblin-assassin",
    "name": "Goblin Assassin",
    "imageUrl": "/images/creatures/goblin-assassin.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 75,
    "creatureCategory": "normal",
    "locations": ["Femor Hills", "Edron Goblin Cave and Fenrock"],
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
    "hitpoints": 50,
    "creatureCategory": "rare",
    "locations": ["Beregar Mines", "Femor Hills"],
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
    "hitpoints": 60,
    "creatureCategory": "normal",
    "locations": [
      "Femor Hills",
      "Edron Goblin Cave",
      "and Fenrock"
    ],
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
    "id": "goggle-cake",
    "name": "Goggle Cake",
    "imageUrl": "/images/creatures/goggle-cake.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 2700,
    "creatureCategory": "normal",
    "locations": ["Dessert Dungeons"],
    "elementalResistances": {
      "physical": 95,
      "fire": 110,
      "ice": 85,
      "energy": 85,
      "earth": 105,
      "holy": 95,
      "death": 85
    },
    "killsToComplete": 2500
  },
  {
    "id": "golden-servant-replica",
    "name": "Golden Servant Replica",
    "imageUrl": "/images/creatures/golden-servant-replica.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 2000,
    "creatureCategory": "normal",
    "locations": ["Replica Dungeon (Lloyd)"],
    "elementalResistances": {
      "physical": 100,
      "fire": 85,
      "ice": 105,
      "energy": 75,
      "earth": 20,
      "holy": 0,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "gore-horn",
    "name": "Gore Horn",
    "imageUrl": "/images/creatures/gore-horn.gif",
    "charmPoints": 100,
    "difficulty": "CHALLENGING",
    "hitpoints": 20620,
    "creatureCategory": "normal",
    "locations": ["Sparkling Pools"],
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 90,
      "energy": 50,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 5000
  },
  {
    "id": "gorerilla",
    "name": "Gorerilla",
    "imageUrl": "/images/creatures/gorerilla.gif",
    "charmPoints": 100,
    "difficulty": "CHALLENGING",
    "hitpoints": 16850,
    "creatureCategory": "normal",
    "locations": ["Sparkling Pools"],
    "elementalResistances": {
      "physical": 70,
      "fire": 80,
      "ice": 105,
      "energy": 100,
      "earth": 100,
      "holy": 105,
      "death": 100
    },
    "killsToComplete": 5000
  },
  {
    "id": "gorger-inferniarch",
    "name": "Gorger Inferniarch",
    "imageUrl": "/images/creatures/gorger-inferniarch.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 9450,
    "creatureCategory": "normal",
    "locations": ["Azzilon Castle"],
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 110,
      "energy": 105,
      "earth": 100,
      "holy": 100,
      "death": 90
    },
    "killsToComplete": 2500
  },
  {
    "id": "gozzler",
    "name": "Gozzler",
    "imageUrl": "/images/creatures/gozzler.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 240,
    "creatureCategory": "normal",
    "locations": [
      "Magician Quarter",
      "cave in Beregar",
      "Farmine Mines"
    ],
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
    "id": "grave-robber",
    "name": "Grave Robber",
    "imageUrl": "/images/creatures/grave-robber.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 165,
    "creatureCategory": "normal",
    "locations": ["Horestis Tomb"],
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
    "id": "green-frog",
    "name": "Green Frog",
    "imageUrl": "/images/creatures/green-frog.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "hitpoints": 25,
    "creatureCategory": "normal",
    "locations": [
      "Meriana",
      "Shattered Isles",
      "Port Hope caves"
    ],
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
    "id": "grim-reaper",
    "name": "Grim Reaper",
    "imageUrl": "/images/creatures/grim-reaper.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 3900,
    "creatureCategory": "normal",
    "locations": [
      "Drefia Grim Reaper Dungeons",
      "deep in Drefia Wyrm Lair (after the Medusa Shield Quest)",
      "Edron (Hero Cave)",
      "Yalahar (Cemetery Quarter)",
      "Oramond Dungeon",
      "Abandoned Sewers and optionally in the Demon Oak Quest"
    ],
    "elementalResistances": {
      "physical": 75,
      "fire": 110,
      "ice": 35,
      "energy": 110,
      "earth": 60,
      "holy": 110,
      "death": 20
    },
    "killsToComplete": 2500
  },
  {
    "id": "grimeleech",
    "name": "Grimeleech",
    "imageUrl": "/images/creatures/grimeleech.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 9500,
    "creatureCategory": "normal",
    "locations": [
      "Grounds of Damnation",
      "Grounds of Deceit",
      "Grounds of Despair",
      "Grounds of Fire",
      "Grounds of Plague",
      "Halls of Ascension and Hell Hub"
    ],
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 100,
      "energy": 105,
      "earth": 60,
      "holy": 100,
      "death": 40
    },
    "killsToComplete": 2500
  },
  {
    "id": "grynch-clan-goblin",
    "name": "Grynch Clan Goblin",
    "imageUrl": "/images/creatures/grynch-clan-goblin.gif",
    "charmPoints": 10,
    "difficulty": "TRIVIAL",
    "hitpoints": 80,
    "creatureCategory": "rare",
    "locations": ["Various Tibian cities (event raid)"],
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
    "id": "gryphon",
    "name": "Gryphon",
    "imageUrl": "/images/creatures/gryphon.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 3200,
    "creatureCategory": "normal",
    "locations": ["Kilmaresh Mountains"],
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
    "id": "guardian-of-tales",
    "name": "Guardian of Tales",
    "imageUrl": "/images/creatures/guardian-of-tales.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 15000,
    "creatureCategory": "normal",
    "locations": ["Secret Library fire section"],
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 112,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 50
    },
    "killsToComplete": 2500
  },
  {
    "id": "guzzlemaw",
    "name": "Guzzlemaw",
    "imageUrl": "/images/creatures/guzzlemaw.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 6400,
    "creatureCategory": "normal",
    "locations": ["Guzzlemaw Valley", "Upper Roshamuul"],
    "elementalResistances": {
      "physical": 95,
      "fire": 90,
      "ice": 95,
      "energy": 85,
      "earth": 80,
      "holy": 105,
      "death": 90
    },
    "killsToComplete": 2500
  },
  {
    "id": "hand-of-cursed-fate",
    "name": "Hand of Cursed Fate",
    "imageUrl": "/images/creatures/hand-of-cursed-fate.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 6600,
    "creatureCategory": "normal",
    "locations": ["Pits of Inferno"],
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 110,
      "energy": 95,
      "earth": 0,
      "holy": 125,
      "death": 0
    },
    "killsToComplete": 2500
  },
  {
    "id": "harpy",
    "name": "Harpy",
    "imageUrl": "/images/creatures/harpy.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 7700,
    "creatureCategory": "normal",
    "locations": ["Ingol"],
    "elementalResistances": {
      "physical": 105,
      "fire": 105,
      "ice": 110,
      "energy": 75,
      "earth": 90,
      "holy": 100,
      "death": 105
    },
    "killsToComplete": 2500
  },
  {
    "id": "haunted-dragon",
    "name": "Haunted Dragon",
    "imageUrl": "/images/creatures/haunted-dragon.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "hitpoints": 6500,
    "creatureCategory": "normal",
    "locations": ["The First Dragon's Lair", "fourth floor"],
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
    "id": "haunted-hunter",
    "name": "Haunted Hunter",
    "imageUrl": "/images/creatures/haunted-hunter.gif",
    "charmPoints": 100,
    "difficulty": "CHALLENGING",
    "hitpoints": 23000,
    "creatureCategory": "normal",
    "locations": ["Forgotten Crypt"],
    "elementalResistances": {
      "physical": 103,
      "fire": 91,
      "ice": 109,
      "energy": 106,
      "earth": 85,
      "holy": 94,
      "death": 112
    },
    "killsToComplete": 5000
  },
  {
    "id": "haunted-treeling",
    "name": "Haunted Treeling",
    "imageUrl": "/images/creatures/haunted-treeling.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 450,
    "creatureCategory": "normal",
    "locations": ["Vengoth Surface"],
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 90,
      "energy": 100,
      "earth": 0,
      "holy": 80,
      "death": 90
    },
    "killsToComplete": 1000
  },
  {
    "id": "hawk-hopper",
    "name": "Hawk Hopper",
    "imageUrl": "/images/creatures/hawk-hopper.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 2180,
    "creatureCategory": "normal",
    "locations": ["Book World"],
    "elementalResistances": {
      "physical": 105,
      "fire": 110,
      "ice": 100,
      "energy": 90,
      "earth": 85,
      "holy": 100,
      "death": 105
    },
    "killsToComplete": 1000
  },
  {
    "id": "headpecker",
    "name": "Headpecker",
    "imageUrl": "/images/creatures/headpecker.gif",
    "charmPoints": 100,
    "difficulty": "CHALLENGING",
    "hitpoints": 16300,
    "creatureCategory": "normal",
    "locations": ["Crystal Enigma"],
    "elementalResistances": {
      "physical": 110,
      "fire": 110,
      "ice": 110,
      "energy": 90,
      "earth": 90,
      "holy": 0,
      "death": 110
    },
    "killsToComplete": 5000
  },
  {
    "id": "headwalker",
    "name": "Headwalker",
    "imageUrl": "/images/creatures/headwalker.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 2460,
    "creatureCategory": "normal",
    "locations": ["Book World"],
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 105,
      "energy": 85,
      "earth": 105,
      "holy": 105,
      "death": 110
    },
    "killsToComplete": 2500
  },
  {
    "id": "hellfire-fighter",
    "name": "Hellfire Fighter",
    "imageUrl": "/images/creatures/hellfire-fighter.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 3800,
    "creatureCategory": "normal",
    "locations": [
      "Pits of Inferno",
      "Demon Forge",
      "Fury Dungeon"
    ],
    "elementalResistances": {
      "physical": 50,
      "fire": 0,
      "ice": 125,
      "energy": 80,
      "earth": 100,
      "holy": 100,
      "death": 80
    },
    "killsToComplete": 2500
  },
  {
    "id": "hellflayer",
    "name": "Hellflayer",
    "imageUrl": "/images/creatures/hellflayer.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 14000,
    "creatureCategory": "normal",
    "locations": [
      "Grounds of Damnation",
      "Grounds of Despair",
      "Grounds of Destruction",
      "Grounds of Fire",
      "Grounds of Plague",
      "Grounds of Undeath",
      "Halls of Ascension and Hell Hub"
    ],
    "elementalResistances": {
      "physical": 100,
      "fire": 30,
      "ice": 95,
      "energy": 105,
      "earth": 80,
      "holy": 105,
      "death": 75
    },
    "killsToComplete": 2500
  },
  {
    "id": "hellhound",
    "name": "Hellhound",
    "imageUrl": "/images/creatures/hellhound.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 7500,
    "creatureCategory": "normal",
    "locations": ["Pits of Inferno"],
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 105,
      "energy": 90,
      "earth": 80,
      "holy": 105,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "hellhunter-inferniarch",
    "name": "Hellhunter Inferniarch",
    "imageUrl": "/images/creatures/hellhunter-inferniarch.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 11300,
    "creatureCategory": "normal",
    "locations": ["Azzilon Castle"],
    "elementalResistances": {
      "physical": 90,
      "fire": 100,
      "ice": 95,
      "energy": 85,
      "earth": 115,
      "holy": 100,
      "death": 115
    },
    "killsToComplete": 2500
  },
  {
    "id": "hellspawn",
    "name": "Hellspawn",
    "imageUrl": "/images/creatures/hellspawn.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 3500,
    "creatureCategory": "normal",
    "locations": [
      "Magician Quarter",
      "Vengoth",
      "Deeper Banuta (small spawn"
    ],
    "elementalResistances": {
      "physical": 90,
      "fire": 60,
      "ice": 110,
      "energy": 90,
      "earth": 20,
      "holy": 70,
      "death": 105
    },
    "killsToComplete": 1000
  },
  {
    "id": "hero",
    "name": "Hero",
    "imageUrl": "/images/creatures/hero.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1400,
    "creatureCategory": "normal",
    "locations": ["Hero Cave (Edron)", "Magician Quarter"],
    "elementalResistances": {
      "physical": 90,
      "fire": 70,
      "ice": 90,
      "energy": 60,
      "earth": 50,
      "holy": 50,
      "death": 120
    },
    "killsToComplete": 1000
  },
  {
    "id": "hibernal-moth",
    "name": "Hibernal Moth",
    "imageUrl": "/images/creatures/hibernal-moth.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 850,
    "creatureCategory": "normal",
    "locations": ["Court of Winter"],
    "elementalResistances": {
      "physical": 100,
      "fire": 130,
      "ice": 75,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "hideous-fungus",
    "name": "Hideous Fungus",
    "imageUrl": "/images/creatures/hideous-fungus.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 4600,
    "creatureCategory": "normal",
    "locations": ["Warzone 1", "Rathleton Sewers"],
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 85,
      "energy": 85,
      "earth": 0,
      "holy": 95,
      "death": 65
    },
    "killsToComplete": 2500
  },
  {
    "id": "high-voltage-elemental",
    "name": "High Voltage Elemental",
    "imageUrl": "/images/creatures/high-voltage-elemental.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1500,
    "creatureCategory": "normal",
    "locations": ["Oramond Glooth Underground Raid, Warzone 5"],
    "elementalResistances": {
      "physical": 65,
      "fire": 100,
      "ice": 0,
      "energy": 0,
      "earth": 115,
      "holy": 95,
      "death": 95
    },
    "killsToComplete": 1000
  },
  {
    "id": "hive-overseer",
    "name": "Hive Overseer",
    "imageUrl": "/images/creatures/hive-overseer.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "hitpoints": 7500,
    "creatureCategory": "normal",
    "locations": [
      "The Hive towers: on the highest floor of each tower",
      "and in many of the closed rooms accessed with pheromones",
      "many in the large underground room of the west tower. Liberty Bay Hive Outpost: one spawn on the second floor underground"
    ],
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
    "id": "honey-elemental",
    "name": "Honey Elemental",
    "imageUrl": "/images/creatures/honey-elemental.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 2560,
    "creatureCategory": "normal",
    "locations": ["Chocolate Mines"],
    "elementalResistances": {
      "physical": 70,
      "fire": 80,
      "ice": 105,
      "energy": 110,
      "earth": 80,
      "holy": 95,
      "death": 70
    },
    "killsToComplete": 1000
  },
  {
    "id": "honour-guard",
    "name": "Honour Guard",
    "imageUrl": "/images/creatures/honour-guard.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 85,
    "creatureCategory": "normal",
    "locations": ["Desert north of Ankrahmun"],
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
    "id": "horse-brown",
    "name": "Horse (Brown)",
    "imageUrl": "/images/creatures/horse-brown.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "hitpoints": 75,
    "creatureCategory": "normal",
    "locations": [
      "South-east of Thais",
      "East of Thais",
      "North-east of Thais"
    ],
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
    "id": "horse-grey",
    "name": "Horse (Grey)",
    "imageUrl": "/images/creatures/horse-grey.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "hitpoints": 75,
    "creatureCategory": "normal",
    "locations": [
      "South-east of Thais",
      "East of Thais",
      "North-east of Thais"
    ],
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
    "id": "horse-taupe",
    "name": "Horse (Taupe)",
    "imageUrl": "/images/creatures/horse-taupe.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "hitpoints": 75,
    "creatureCategory": "normal",
    "locations": [
      "South-east of Thais",
      "East of Thais",
      "North-east of Thais"
    ],
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
    "id": "hulking-carnisylvan",
    "name": "Hulking Carnisylvan",
    "imageUrl": "/images/creatures/hulking-carnisylvan.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 8600,
    "creatureCategory": "normal",
    "locations": ["Forest of Life"],
    "elementalResistances": {
      "physical": 100,
      "fire": 120,
      "ice": 110,
      "energy": 85,
      "earth": 80,
      "holy": 100,
      "death": 90
    },
    "killsToComplete": 2500
  },
  {
    "id": "hulking-prehemoth",
    "name": "Hulking Prehemoth",
    "imageUrl": "/images/creatures/hulking-prehemoth.gif",
    "charmPoints": 100,
    "difficulty": "CHALLENGING",
    "hitpoints": 20700,
    "creatureCategory": "normal",
    "locations": ["Sparkling Pools"],
    "elementalResistances": {
      "physical": 95,
      "fire": 60,
      "ice": 115,
      "energy": 70,
      "earth": 120,
      "holy": 115,
      "death": 110
    },
    "killsToComplete": 5000
  },
  {
    "id": "humongous-fungus",
    "name": "Humongous Fungus",
    "imageUrl": "/images/creatures/humongous-fungus.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 3400,
    "creatureCategory": "normal",
    "locations": ["Warzone 1", "Rathleton Sewers"],
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 85,
      "energy": 85,
      "earth": 0,
      "holy": 95,
      "death": 65
    },
    "killsToComplete": 2500
  },
  {
    "id": "hunter",
    "name": "Hunter",
    "imageUrl": "/images/creatures/hunter.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 150,
    "creatureCategory": "normal",
    "locations": ["Poacher's Cave (Hunter stage)"],
    "elementalResistances": {
      "physical": 105,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 80,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "husky",
    "name": "Husky",
    "imageUrl": "/images/creatures/husky.gif",
    "charmPoints": 1,
    "difficulty": "HARMLESS",
    "hitpoints": 140,
    "creatureCategory": "normal",
    "locations": ["Svargrond"],
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
    "id": "hyaena",
    "name": "Hyaena",
    "imageUrl": "/images/creatures/hyaena.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 60,
    "creatureCategory": "normal",
    "locations": ["Desert areas like those around Ankrahmun and Darashia"],
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
    "id": "hydra",
    "name": "Hydra",
    "imageUrl": "/images/creatures/hydra.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 2350,
    "creatureCategory": "normal",
    "locations": [
      "Tiquanda Hydra Mountain",
      "Forbidden Lands",
      "Deeper Banuta"
    ],
    "elementalResistances": {
      "physical": 105,
      "fire": 100,
      "ice": 50,
      "energy": 110,
      "earth": 0,
      "holy": 70,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "ice-golem",
    "name": "Ice Golem",
    "imageUrl": "/images/creatures/ice-golem.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 385,
    "creatureCategory": "normal",
    "locations": ["Nibelor Cave"],
    "elementalResistances": {
      "physical": 80,
      "fire": 0,
      "ice": 0,
      "energy": 120,
      "earth": 100,
      "holy": 0,
      "death": 0
    },
    "killsToComplete": 1000
  },
  {
    "id": "icecold-book",
    "name": "Icecold Book",
    "imageUrl": "/images/creatures/icecold-book.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 21000,
    "creatureCategory": "normal",
    "locations": ["Secret Library ice section"],
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 0,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "iks-ahpututu",
    "name": "Iks Ahpututu",
    "imageUrl": "/images/creatures/iks-ahpututu.gif",
    "charmPoints": 50,
    "difficulty": "MEDIUM",
    "hitpoints": 1630,
    "creatureCategory": "rare",
    "locations": ["Iksupan"],
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
    "id": "iks-aucar",
    "name": "Iks Aucar",
    "imageUrl": "/images/creatures/iks-aucar.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1520,
    "creatureCategory": "normal",
    "locations": ["Iksupan"],
    "elementalResistances": {
      "physical": 95,
      "fire": 95,
      "ice": 105,
      "energy": 105,
      "earth": 100,
      "holy": 100,
      "death": 110
    },
    "killsToComplete": 1000
  },
  {
    "id": "iks-chuka",
    "name": "Iks Chuka",
    "imageUrl": "/images/creatures/iks-chuka.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1240,
    "creatureCategory": "normal",
    "locations": ["Iksupan"],
    "elementalResistances": {
      "physical": 100,
      "fire": 95,
      "ice": 100,
      "energy": 105,
      "earth": 100,
      "holy": 110,
      "death": 85
    },
    "killsToComplete": 1000
  },
  {
    "id": "iks-churrascan",
    "name": "Iks Churrascan",
    "imageUrl": "/images/creatures/iks-churrascan.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1520,
    "creatureCategory": "normal",
    "locations": ["Iksupan"],
    "elementalResistances": {
      "physical": 95,
      "fire": 95,
      "ice": 105,
      "energy": 105,
      "earth": 100,
      "holy": 100,
      "death": 110
    },
    "killsToComplete": 1000
  },
  {
    "id": "iks-pututu",
    "name": "Iks Pututu",
    "imageUrl": "/images/creatures/iks-pututu.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1310,
    "creatureCategory": "normal",
    "locations": ["Iksupan"],
    "elementalResistances": {
      "physical": 105,
      "fire": 95,
      "ice": 100,
      "energy": 100,
      "earth": 75,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "iks-yapunac",
    "name": "Iks Yapunac",
    "imageUrl": "/images/creatures/iks-yapunac.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 3125,
    "creatureCategory": "normal",
    "locations": [
      "Iksupan Last Stand",
      "Iksupan Occupied Sanctuary",
      "Iksupan Undercity",
      "Iksupan Waterways"
    ],
    "elementalResistances": {
      "physical": 85,
      "fire": 90,
      "ice": 105,
      "energy": 110,
      "earth": 90,
      "holy": 85,
      "death": 120
    },
    "killsToComplete": 2500
  },
  {
    "id": "imperial",
    "name": "Imperial",
    "imageUrl": "/images/creatures/imperial.gif",
    "charmPoints": 10,
    "difficulty": "TRIVIAL",
    "hitpoints": 100,
    "creatureCategory": "rare",
    "locations": ["Arena Outskirts"],
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
    "id": "infected-weeper",
    "name": "Infected Weeper",
    "imageUrl": "/images/creatures/infected-weeper.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 3000,
    "creatureCategory": "normal",
    "locations": ["Warzone 1-3"],
    "elementalResistances": {
      "physical": 50,
      "fire": 100,
      "ice": 110,
      "energy": 75,
      "earth": 0,
      "holy": 100,
      "death": 70
    },
    "killsToComplete": 2500
  },
  {
    "id": "infernal-demon",
    "name": "Infernal Demon",
    "imageUrl": "/images/creatures/infernal-demon.gif",
    "charmPoints": 100,
    "difficulty": "CHALLENGING",
    "hitpoints": 32000,
    "creatureCategory": "normal",
    "locations": ["Claustrophobic Inferno"],
    "elementalResistances": {
      "physical": 70,
      "fire": 60,
      "ice": 120,
      "energy": 100,
      "earth": 100,
      "holy": 125,
      "death": 50
    },
    "killsToComplete": 5000
  },
  {
    "id": "infernal-phantom",
    "name": "Infernal Phantom",
    "imageUrl": "/images/creatures/infernal-phantom.gif",
    "charmPoints": 100,
    "difficulty": "CHALLENGING",
    "hitpoints": 26000,
    "creatureCategory": "normal",
    "locations": ["Claustrophobic Inferno"],
    "elementalResistances": {
      "physical": 110,
      "fire": 20,
      "ice": 120,
      "energy": 99,
      "earth": 110,
      "holy": 120,
      "death": 0
    },
    "killsToComplete": 5000
  },
  {
    "id": "infernalist",
    "name": "Infernalist",
    "imageUrl": "/images/creatures/infernalist.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 3650,
    "creatureCategory": "normal",
    "locations": ["Fury Dungeon"],
    "elementalResistances": {
      "physical": 105,
      "fire": 0,
      "ice": 105,
      "energy": 0,
      "earth": 5,
      "holy": 80,
      "death": 90
    },
    "killsToComplete": 2500
  },
  {
    "id": "ink-blob",
    "name": "Ink Blob",
    "imageUrl": "/images/creatures/ink-blob.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 9500,
    "creatureCategory": "normal",
    "locations": ["Secret Library earth", "fire and ice sections"],
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 108,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "ink-splash",
    "name": "Ink Splash",
    "imageUrl": "/images/creatures/ink-splash.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1950,
    "creatureCategory": "normal",
    "locations": ["Fields of Glory"],
    "elementalResistances": {
      "physical": 90,
      "fire": 105,
      "ice": 100,
      "energy": 110,
      "earth": 85,
      "holy": 100,
      "death": 85
    },
    "killsToComplete": 1000
  },
  {
    "id": "insane-siren",
    "name": "Insane Siren",
    "imageUrl": "/images/creatures/insane-siren.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 6500,
    "creatureCategory": "normal",
    "locations": ["Court of Summer"],
    "elementalResistances": {
      "physical": 110,
      "fire": 45,
      "ice": 120,
      "energy": 100,
      "earth": 100,
      "holy": 75,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "insect-swarm",
    "name": "Insect Swarm",
    "imageUrl": "/images/creatures/insect-swarm.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 50,
    "creatureCategory": "normal",
    "locations": [
      "Zao Steppe",
      "Northern Zao Plantations",
      "and the Horestis Tomb (only when the curse of Horestis is not active)"
    ],
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
    "hitpoints": 230,
    "creatureCategory": "normal",
    "locations": ["Greenshore"],
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
    "id": "instable-breach-brood",
    "name": "Instable Breach Brood",
    "imageUrl": "/images/creatures/instable-breach-brood.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 2200,
    "creatureCategory": "normal",
    "locations": ["Otherworld (Dwarf Bridge)"],
    "elementalResistances": {
      "physical": 100,
      "fire": 60,
      "ice": 70,
      "energy": 25,
      "earth": 115,
      "holy": 100,
      "death": 90
    },
    "killsToComplete": 1000
  },
  {
    "id": "instable-sparkion",
    "name": "Instable Sparkion",
    "imageUrl": "/images/creatures/instable-sparkion.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1900,
    "creatureCategory": "normal",
    "locations": ["Otherworld (Dwarf Bridge)"],
    "elementalResistances": {
      "physical": 95,
      "fire": 80,
      "ice": 40,
      "energy": 20,
      "earth": 115,
      "holy": 95,
      "death": 95
    },
    "killsToComplete": 1000
  },
  {
    "id": "iron-servant",
    "name": "Iron Servant",
    "imageUrl": "/images/creatures/iron-servant.gif",
    "charmPoints": 30,
    "difficulty": "EASY",
    "hitpoints": 350,
    "creatureCategory": "rare",
    "locations": ["Edron"],
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
    "hitpoints": 1000,
    "creatureCategory": "normal",
    "locations": ["Replica Dungeon (Lloyd)"],
    "elementalResistances": {
      "physical": 100,
      "fire": 75,
      "ice": 100,
      "energy": 75,
      "earth": 110,
      "holy": 80,
      "death": 110
    },
    "killsToComplete": 1000
  },
  {
    "id": "ironblight",
    "name": "Ironblight",
    "imageUrl": "/images/creatures/ironblight.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 6600,
    "creatureCategory": "normal",
    "locations": ["Warzone 3"],
    "elementalResistances": {
      "physical": 85,
      "fire": 40,
      "ice": 80,
      "energy": 95,
      "earth": 0,
      "holy": 100,
      "death": 60
    },
    "killsToComplete": 2500
  },
  {
    "id": "island-troll",
    "name": "Island Troll",
    "imageUrl": "/images/creatures/island-troll.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "hitpoints": 50,
    "creatureCategory": "normal",
    "locations": ["Goroma"],
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
    "id": "jellyfish",
    "name": "Jellyfish",
    "imageUrl": "/images/creatures/jellyfish.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 55,
    "creatureCategory": "normal",
    "locations": ["Fiehonja", "Krailos Steppe underwater cave"],
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
    "id": "juggernaut",
    "name": "Juggernaut",
    "imageUrl": "/images/creatures/juggernaut.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 18000,
    "creatureCategory": "normal",
    "locations": ["Pits of Inferno", "Demon Forge"],
    "elementalResistances": {
      "physical": 70,
      "fire": 70,
      "ice": 90,
      "energy": 110,
      "earth": 80,
      "holy": 105,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "jungle-moa",
    "name": "Jungle Moa",
    "imageUrl": "/images/creatures/jungle-moa.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1300,
    "creatureCategory": "normal",
    "locations": [
      "All around Marapur including the Emerald Gardens",
      "Fading Isles",
      "Murmuring Wilderness",
      "Silent Waters",
      "Sparkling Lagoon",
      "Stardance Mountains"
    ],
    "elementalResistances": {
      "physical": 90,
      "fire": 100,
      "ice": 90,
      "energy": 90,
      "earth": 105,
      "holy": 100,
      "death": 110
    },
    "killsToComplete": 1000
  },
  {
    "id": "juvenile-bashmu",
    "name": "Juvenile Bashmu",
    "imageUrl": "/images/creatures/juvenile-bashmu.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 7500,
    "creatureCategory": "normal",
    "locations": ["Salt Caves"],
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 110,
      "energy": 95,
      "earth": 95,
      "holy": 120,
      "death": 95
    },
    "killsToComplete": 2500
  },
  {
    "id": "killer-rabbit",
    "name": "Killer Rabbit",
    "imageUrl": "/images/creatures/killer-rabbit.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 205,
    "creatureCategory": "normal",
    "locations": ["Isle of Evil and Deeper Ingol"],
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
    "id": "knights-apparition",
    "name": "Knight's Apparition",
    "imageUrl": "/images/creatures/knights-apparition.gif",
    "charmPoints": 100,
    "difficulty": "CHALLENGING",
    "hitpoints": 25000,
    "creatureCategory": "normal",
    "locations": ["The Mirrored Nightmare", "after Mirror Images are attacked"],
    "elementalResistances": {
      "physical": 50,
      "fire": 120,
      "ice": 90,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 120
    },
    "killsToComplete": 5000
  },
  {
    "id": "knowledge-elemental",
    "name": "Knowledge Elemental",
    "imageUrl": "/images/creatures/knowledge-elemental.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 10500,
    "creatureCategory": "normal",
    "locations": ["Secret Library energy section"],
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 0,
      "earth": 100,
      "holy": 50,
      "death": 120
    },
    "killsToComplete": 2500
  },
  {
    "id": "kollos",
    "name": "Kollos",
    "imageUrl": "/images/creatures/kollos.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 3800,
    "creatureCategory": "normal",
    "locations": ["Inner Hive"],
    "elementalResistances": {
      "physical": 100,
      "fire": 70,
      "ice": 107,
      "energy": 90,
      "earth": 0,
      "holy": 100,
      "death": 105
    },
    "killsToComplete": 1000
  },
  {
    "id": "kongra",
    "name": "Kongra",
    "imageUrl": "/images/creatures/kongra.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 340,
    "creatureCategory": "normal",
    "locations": ["Port Hope Ape City"],
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 115,
      "energy": 95,
      "earth": 90,
      "holy": 100,
      "death": 105
    },
    "killsToComplete": 500
  },
  {
    "id": "lacewing-moth",
    "name": "Lacewing Moth",
    "imageUrl": "/images/creatures/lacewing-moth.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 900,
    "creatureCategory": "normal",
    "locations": ["Court of Summer"],
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 70,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "ladybug",
    "name": "Ladybug",
    "imageUrl": "/images/creatures/ladybug.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 255,
    "creatureCategory": "normal",
    "locations": ["The Hive surface"],
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
    "id": "lamassu",
    "name": "Lamassu",
    "imageUrl": "/images/creatures/lamassu.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 8700,
    "creatureCategory": "normal",
    "locations": ["Kilmaresh"],
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 80,
      "holy": 80,
      "death": 120
    },
    "killsToComplete": 2500
  },
  {
    "id": "larva",
    "name": "Larva",
    "imageUrl": "/images/creatures/larva.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 70,
    "creatureCategory": "normal",
    "locations": ["Ankrahmun Larva Caves, Mother of Scarabs Lair -1/-2"],
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 105,
      "energy": 90,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "lava-golem",
    "name": "Lava Golem",
    "imageUrl": "/images/creatures/lava-golem.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 9000,
    "creatureCategory": "normal",
    "locations": ["Warzone 1-3"],
    "elementalResistances": {
      "physical": 70,
      "fire": 0,
      "ice": 105,
      "energy": 70,
      "earth": 0,
      "holy": 100,
      "death": 65
    },
    "killsToComplete": 2500
  },
  {
    "id": "lava-lurker",
    "name": "Lava Lurker",
    "imageUrl": "/images/creatures/lava-lurker.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 5900,
    "creatureCategory": "normal",
    "locations": ["Gnome Deep Hub"],
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
    "id": "lavafungus",
    "name": "Lavafungus",
    "imageUrl": "/images/creatures/lavafungus.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 7200,
    "creatureCategory": "normal",
    "locations": ["Grotto of the Lost"],
    "elementalResistances": {
      "physical": 100,
      "fire": 90,
      "ice": 120,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 80
    },
    "killsToComplete": 2500
  },
  {
    "id": "lavaworm",
    "name": "Lavaworm",
    "imageUrl": "/images/creatures/lavaworm.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 7500,
    "creatureCategory": "normal",
    "locations": ["Grotto of the Lost"],
    "elementalResistances": {
      "physical": 100,
      "fire": 85,
      "ice": 115,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 90
    },
    "killsToComplete": 2500
  },
  {
    "id": "leaf-golem",
    "name": "Leaf Golem",
    "imageUrl": "/images/creatures/leaf-golem.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 90,
    "creatureCategory": "normal",
    "locations": ["Dryad Gardens"],
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 105,
      "energy": 100,
      "earth": 60,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "liodile",
    "name": "Liodile",
    "imageUrl": "/images/creatures/liodile.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 8600,
    "creatureCategory": "normal",
    "locations": ["Ingol"],
    "elementalResistances": {
      "physical": 110,
      "fire": 110,
      "ice": 105,
      "energy": 75,
      "earth": 70,
      "holy": 115,
      "death": 95
    },
    "killsToComplete": 2500
  },
  {
    "id": "lion",
    "name": "Lion",
    "imageUrl": "/images/creatures/lion.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 80,
    "creatureCategory": "normal",
    "locations": [
      "Jakundaf Desert",
      "Darama",
      "Arena Quarter",
      "Amazon Camp (Venore)"
    ],
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
    "id": "lion-hydra",
    "name": "Lion Hydra",
    "imageUrl": "/images/creatures/lion-hydra.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 2760,
    "creatureCategory": "normal",
    "locations": ["Book World"],
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 105,
      "holy": 105,
      "death": 110
    },
    "killsToComplete": 2500
  },
  {
    "id": "little-corym-charlatan",
    "name": "Little Corym Charlatan",
    "imageUrl": "/images/creatures/little-corym-charlatan.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 90,
    "creatureCategory": "normal",
    "locations": ["Venore marshes", "in a cave"],
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
    "hitpoints": 3050,
    "creatureCategory": "normal",
    "locations": ["Temple of Equilibrium"],
    "elementalResistances": {
      "physical": 100,
      "fire": 90,
      "ice": 90,
      "energy": 80,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "lizard-dragon-priest",
    "name": "Lizard Dragon Priest",
    "imageUrl": "/images/creatures/lizard-dragon-priest.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1450,
    "creatureCategory": "normal",
    "locations": ["Lizard City (South mostly)"],
    "elementalResistances": {
      "physical": 100,
      "fire": 15,
      "ice": 100,
      "energy": 100,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "lizard-high-guard",
    "name": "Lizard High Guard",
    "imageUrl": "/images/creatures/lizard-high-guard.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1800,
    "creatureCategory": "normal",
    "locations": ["Lizard City"],
    "elementalResistances": {
      "physical": 100,
      "fire": 55,
      "ice": 110,
      "energy": 100,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "lizard-legionnaire",
    "name": "Lizard Legionnaire",
    "imageUrl": "/images/creatures/lizard-legionnaire.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1400,
    "creatureCategory": "normal",
    "locations": ["Lizard City"],
    "elementalResistances": {
      "physical": 100,
      "fire": 55,
      "ice": 110,
      "energy": 100,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "lizard-noble",
    "name": "Lizard Noble",
    "imageUrl": "/images/creatures/lizard-noble.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 7000,
    "creatureCategory": "normal",
    "locations": ["Razzachai"],
    "elementalResistances": {
      "physical": 100,
      "fire": 15,
      "ice": 100,
      "energy": 100,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "lizard-sentinel",
    "name": "Lizard Sentinel",
    "imageUrl": "/images/creatures/lizard-sentinel.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 265,
    "creatureCategory": "normal",
    "locations": ["Chor"],
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
    "id": "lizard-templar",
    "name": "Lizard Templar",
    "imageUrl": "/images/creatures/lizard-templar.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 410,
    "creatureCategory": "normal",
    "locations": ["Chor"],
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 90,
      "energy": 80,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "lizard-zaogun",
    "name": "Lizard Zaogun",
    "imageUrl": "/images/creatures/lizard-zaogun.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 2955,
    "creatureCategory": "normal",
    "locations": ["Lower Draken Walls"],
    "elementalResistances": {
      "physical": 95,
      "fire": 55,
      "ice": 85,
      "energy": 80,
      "earth": 0,
      "holy": 100,
      "death": 90
    },
    "killsToComplete": 1000
  },
  {
    "id": "lost-basher",
    "name": "Lost Basher",
    "imageUrl": "/images/creatures/lost-basher.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 2600,
    "creatureCategory": "normal",
    "locations": [
      "Caves of the Lost",
      "Lower Spike",
      "Forsaken Mine"
    ],
    "elementalResistances": {
      "physical": 100,
      "fire": 75,
      "ice": 100,
      "energy": 95,
      "earth": 0,
      "holy": 100,
      "death": 85
    },
    "killsToComplete": 1000
  },
  {
    "id": "lost-berserker",
    "name": "Lost Berserker",
    "imageUrl": "/images/creatures/lost-berserker.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 5900,
    "creatureCategory": "normal",
    "locations": ["Warzone 2"],
    "elementalResistances": {
      "physical": 80,
      "fire": 90,
      "ice": 90,
      "energy": 100,
      "earth": 0,
      "holy": 100,
      "death": 85
    },
    "killsToComplete": 2500
  },
  {
    "id": "lost-exile",
    "name": "Lost Exile",
    "imageUrl": "/images/creatures/lost-exile.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1600,
    "creatureCategory": "normal",
    "locations": ["South east of the Gnome Deep Hub's entrance"],
    "elementalResistances": {
      "physical": 95,
      "fire": 75,
      "ice": 85,
      "energy": 90,
      "earth": 0,
      "holy": 110,
      "death": 80
    },
    "killsToComplete": 1000
  },
  {
    "id": "lost-husher",
    "name": "Lost Husher",
    "imageUrl": "/images/creatures/lost-husher.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1600,
    "creatureCategory": "normal",
    "locations": [
      "Caves of the Lost",
      "Lower Spike",
      "Forsaken Mine"
    ],
    "elementalResistances": {
      "physical": 95,
      "fire": 75,
      "ice": 105,
      "energy": 90,
      "earth": 0,
      "holy": 110,
      "death": 80
    },
    "killsToComplete": 1000
  },
  {
    "id": "lost-soul",
    "name": "Lost Soul",
    "imageUrl": "/images/creatures/lost-soul.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 5800,
    "creatureCategory": "normal",
    "locations": [
      "Pits of Inferno",
      "Formorgar Mines",
      "Helheim",
      "Roshamuul Prison and in 'The Arcanum' (Part of the Inquisition quest)",
      "Oramond Fury Dungeon"
    ],
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 50,
      "energy": 90,
      "earth": 0,
      "holy": 125,
      "death": 0
    },
    "killsToComplete": 1000
  },
  {
    "id": "lost-thrower",
    "name": "Lost Thrower",
    "imageUrl": "/images/creatures/lost-thrower.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1700,
    "creatureCategory": "normal",
    "locations": [
      "Caves of the Lost",
      "Lower Spike",
      "Forsaken Mine"
    ],
    "elementalResistances": {
      "physical": 90,
      "fire": 85,
      "ice": 105,
      "energy": 90,
      "earth": 0,
      "holy": 100,
      "death": 90
    },
    "killsToComplete": 1000
  },
  {
    "id": "lumbering-carnivor",
    "name": "Lumbering Carnivor",
    "imageUrl": "/images/creatures/lumbering-carnivor.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 2600,
    "creatureCategory": "normal",
    "locations": ["Carnivora's Rock"],
    "elementalResistances": {
      "physical": 80,
      "fire": 140,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "mad-scientist",
    "name": "Mad Scientist",
    "imageUrl": "/images/creatures/mad-scientist.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 325,
    "creatureCategory": "normal",
    "locations": [
      "Magician Quarter",
      "Trade Quarter",
      "Factory Quarter",
      "Isle of Evil",
      "Tiquanda Laboratory"
    ],
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
    "hitpoints": 4800,
    "creatureCategory": "normal",
    "locations": ["Warzone 1-3"],
    "elementalResistances": {
      "physical": 95,
      "fire": 0,
      "ice": 100,
      "energy": 90,
      "earth": 0,
      "holy": 100,
      "death": 75
    },
    "killsToComplete": 2500
  },
  {
    "id": "makara",
    "name": "Makara",
    "imageUrl": "/images/creatures/makara.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 5050,
    "creatureCategory": "normal",
    "locations": ["Temple of the Moon Goddess"],
    "elementalResistances": {
      "physical": 110,
      "fire": 95,
      "ice": 75,
      "energy": 115,
      "earth": 115,
      "holy": 100,
      "death": 105
    },
    "killsToComplete": 2500
  },
  {
    "id": "mammoth",
    "name": "Mammoth",
    "imageUrl": "/images/creatures/mammoth.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 320,
    "creatureCategory": "normal",
    "locations": ["Svargrond Mammoth Mountain (South west from depot)"],
    "elementalResistances": {
      "physical": 90,
      "fire": 110,
      "ice": 80,
      "energy": 100,
      "earth": 80,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "manticore",
    "name": "Manticore",
    "imageUrl": "/images/creatures/manticore.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 6700,
    "creatureCategory": "normal",
    "locations": ["Kilmaresh"],
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 120,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "mantosaurus",
    "name": "Mantosaurus",
    "imageUrl": "/images/creatures/mantosaurus.gif",
    "charmPoints": 100,
    "difficulty": "CHALLENGING",
    "hitpoints": 19400,
    "creatureCategory": "normal",
    "locations": ["Crystal Enigma"],
    "elementalResistances": {
      "physical": 110,
      "fire": 100,
      "ice": 115,
      "energy": 90,
      "earth": 95,
      "holy": 115,
      "death": 95
    },
    "killsToComplete": 5000
  },
  {
    "id": "many-faces",
    "name": "Many Faces",
    "imageUrl": "/images/creatures/many-faces.gif",
    "charmPoints": 100,
    "difficulty": "CHALLENGING",
    "hitpoints": 30000,
    "creatureCategory": "normal",
    "locations": ["Mirrored Nightmare"],
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 70,
      "energy": 100,
      "earth": 100,
      "holy": 50,
      "death": 130
    },
    "killsToComplete": 5000
  },
  {
    "id": "marid",
    "name": "Marid",
    "imageUrl": "/images/creatures/marid.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 550,
    "creatureCategory": "normal",
    "locations": [
      "Kha'zeel",
      "Magician Quarter",
      "Djinn battle island through the Haunted Tomb"
    ],
    "elementalResistances": {
      "physical": 100,
      "fire": 10,
      "ice": 105,
      "energy": 40,
      "earth": 90,
      "holy": 80,
      "death": 108
    },
    "killsToComplete": 1000
  },
  {
    "id": "marsh-stalker",
    "name": "Marsh Stalker",
    "imageUrl": "/images/creatures/marsh-stalker.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 100,
    "creatureCategory": "normal",
    "locations": ["Venore Salamander Cave"],
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 95,
      "energy": 100,
      "earth": 105,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "mean-lost-soul",
    "name": "Mean Lost Soul",
    "imageUrl": "/images/creatures/mean-lost-soul.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 5000,
    "creatureCategory": "normal",
    "locations": [
      "Brain Grounds",
      "Netherworld",
      "Zarganash"
    ],
    "elementalResistances": {
      "physical": 45,
      "fire": 100,
      "ice": 100,
      "energy": 70,
      "earth": 80,
      "holy": 130,
      "death": 0
    },
    "killsToComplete": 2500
  },
  {
    "id": "meandering-mushroom",
    "name": "Meandering Mushroom",
    "imageUrl": "/images/creatures/meandering-mushroom.gif",
    "charmPoints": 100,
    "difficulty": "CHALLENGING",
    "hitpoints": 29100,
    "creatureCategory": "normal",
    "locations": ["Putrefactory"],
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 60,
      "energy": 75,
      "earth": 120,
      "holy": 115,
      "death": 50
    },
    "killsToComplete": 5000
  },
  {
    "id": "medusa",
    "name": "Medusa",
    "imageUrl": "/images/creatures/medusa.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 4500,
    "creatureCategory": "normal",
    "locations": [
      "Vandura Mountain (single spawn)",
      "Talahu (Medusa Cave)",
      "Deeper Banuta",
      "Medusa Tower"
    ],
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 80,
      "energy": 110,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "mega-dragon",
    "name": "Mega Dragon",
    "imageUrl": "/images/creatures/mega-dragon.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 7920,
    "creatureCategory": "normal",
    "locations": ["Nimmersatt's Breeding Ground"],
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 80,
      "energy": 110,
      "earth": 110,
      "holy": 110,
      "death": 80
    },
    "killsToComplete": 2500
  },
  {
    "id": "menacing-carnivor",
    "name": "Menacing Carnivor",
    "imageUrl": "/images/creatures/menancing-carnivor.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 3500,
    "creatureCategory": "normal",
    "locations": ["Carnivora's Rock"],
    "elementalResistances": {
      "physical": 50,
      "fire": 100,
      "ice": 120,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "mercurial-menace",
    "name": "Mercurial Menace",
    "imageUrl": "/images/creatures/mercurial-menace.gif",
    "charmPoints": 100,
    "difficulty": "CHALLENGING",
    "hitpoints": 18500,
    "creatureCategory": "normal",
    "locations": ["Crystal Enigma"],
    "elementalResistances": {
      "physical": 95,
      "fire": 80,
      "ice": 90,
      "energy": 120,
      "earth": 110,
      "holy": 0,
      "death": 105
    },
    "killsToComplete": 5000
  },
  {
    "id": "mercury-blob",
    "name": "Mercury Blob",
    "imageUrl": "/images/creatures/mercury-blob.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 150,
    "creatureCategory": "normal",
    "locations": ["Alchemist Quarter"],
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
    "difficulty": "EASY",
    "hitpoints": 235,
    "creatureCategory": "normal",
    "locations": ["Port Hope Ape City"],
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 115,
      "energy": 90,
      "earth": 100,
      "holy": 90,
      "death": 105
    },
    "killsToComplete": 500
  },
  {
    "id": "metal-gargoyle",
    "name": "Metal Gargoyle",
    "imageUrl": "/images/creatures/metal-gargoyle.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 2100,
    "creatureCategory": "normal",
    "locations": ["Oramond Surface, Abandoned Sewers"],
    "elementalResistances": {
      "physical": 85,
      "fire": 90,
      "ice": 105,
      "energy": 110,
      "earth": 0,
      "holy": 100,
      "death": 20
    },
    "killsToComplete": 1000
  },
  {
    "id": "midnight-asura",
    "name": "Midnight Asura",
    "imageUrl": "/images/creatures/midnight-asura.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 3100,
    "creatureCategory": "normal",
    "locations": ["Asura Palace"],
    "elementalResistances": {
      "physical": 100,
      "fire": 90,
      "ice": 90,
      "energy": 110,
      "earth": 110,
      "holy": 70,
      "death": 0
    },
    "killsToComplete": 1000
  },
  {
    "id": "minotaur",
    "name": "Minotaur",
    "imageUrl": "/images/creatures/minotaur.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 100,
    "creatureCategory": "normal",
    "locations": [
      "Mino Hell (Rookgaard)",
      "Two outside Bear Room Quest",
      "(Rookgaard) and also 2x on the premium side",
      "Mintwallin",
      "Folda",
      "Minotaur Pyramid",
      "Outlaw Camp",
      "Kazordoon minotaur cave",
      "Plains of Havoc",
      "Elven Bane",
      "Deeper Fibula Dungeon (level 50+ to open the door)",
      "Ancient Temple",
      "Maze of Lost Souls",
      "Thais Minotaur Camp",
      "Foreigner Quarter"
    ],
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
    "hitpoints": 2600,
    "creatureCategory": "normal",
    "locations": [
      "Underground Glooth Factory",
      "Oramond Minotaur Camp",
      "Oramond Dungeon"
    ],
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
    "hitpoints": 100,
    "creatureCategory": "normal",
    "locations": [
      "Ancient Temple",
      "way to Mintwallin",
      "Folda"
    ],
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
    "hitpoints": 1600,
    "creatureCategory": "normal",
    "locations": ["Mintwallin Cults"],
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 110,
      "energy": 100,
      "earth": 100,
      "holy": 90,
      "death": 110
    },
    "killsToComplete": 1000
  },
  {
    "id": "minotaur-cult-prophet",
    "name": "Minotaur Cult Prophet",
    "imageUrl": "/images/creatures/minotaur-cult-propher.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1700,
    "creatureCategory": "normal",
    "locations": ["Mintwallin Cults"],
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 110,
      "energy": 80,
      "earth": 80,
      "holy": 100,
      "death": 105
    },
    "killsToComplete": 1000
  },
  {
    "id": "minotaur-cult-zealot",
    "name": "Minotaur Cult Zealot",
    "imageUrl": "/images/creatures/minotaur-cult-zealot.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1800,
    "creatureCategory": "normal",
    "locations": ["Mintwallin Cults"],
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 110,
      "energy": 100,
      "earth": 100,
      "holy": 90,
      "death": 110
    },
    "killsToComplete": 1000
  },
  {
    "id": "minotaur-guard",
    "name": "Minotaur Guard",
    "imageUrl": "/images/creatures/minotaur-guard.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 185,
    "creatureCategory": "normal",
    "locations": [
      "Ancient Temple",
      "Mintwallin",
      "Minotaur Pyramid",
      "Maze of Lost Souls",
      "Folda",
      "Cyclopolis",
      "Deeper Fibula Dungeon (level 50+ to open the door)",
      "Hero Cave",
      "underground of Elvenbane",
      "Plains of Havoc",
      "Kazordoon"
    ],
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
    "id": "minotaur-invader",
    "name": "Minotaur Invader",
    "imageUrl": "/images/creatures/minotaur-invader.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1850,
    "creatureCategory": "normal",
    "locations": ["Underground Glooth Factory"],
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 110,
      "energy": 100,
      "earth": 100,
      "holy": 90,
      "death": 110
    },
    "killsToComplete": 1000
  },
  {
    "id": "minotaur-mage",
    "name": "Minotaur Mage",
    "imageUrl": "/images/creatures/minotaur-mage.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 155,
    "creatureCategory": "normal",
    "locations": [
      "Cyclopolis",
      "Mintwallin",
      "Maze of Lost Souls",
      "Dark Pyramid",
      "Folda",
      "Kazordoon",
      "Plains of Havoc"
    ],
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
    "hitpoints": 2000,
    "creatureCategory": "normal",
    "locations": ["Misguided Camp"],
    "elementalResistances": {
      "physical": 80,
      "fire": 100,
      "ice": 90,
      "energy": 100,
      "earth": 70,
      "holy": 130,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "misguided-thief",
    "name": "Misguided Thief",
    "imageUrl": "/images/creatures/misguided-thief.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1800,
    "creatureCategory": "normal",
    "locations": ["Misguided Camp"],
    "elementalResistances": {
      "physical": 80,
      "fire": 100,
      "ice": 90,
      "energy": 100,
      "earth": 70,
      "holy": 130,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "mitmah-scout",
    "name": "Mitmah Scout",
    "imageUrl": "/images/creatures/mitmah-scout.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 3940,
    "creatureCategory": "normal",
    "locations": [
      "Iksupan Last Stand",
      "Iksupan Occupied Sanctuary",
      "Iksupan Undercity",
      "Iksupan Waterways"
    ],
    "elementalResistances": {
      "physical": 95,
      "fire": 90,
      "ice": 85,
      "energy": 105,
      "earth": 115,
      "holy": 110,
      "death": 85
    },
    "killsToComplete": 2500
  },
  {
    "id": "mitmah-seer",
    "name": "Mitmah Seer",
    "imageUrl": "/images/creatures/mitmah-seer.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 4620,
    "creatureCategory": "normal",
    "locations": [
      "Iksupan Last Stand",
      "Iksupan Occupied Sanctuary",
      "Iksupan Undercity",
      "Iksupan Waterways"
    ],
    "elementalResistances": {
      "physical": 100,
      "fire": 85,
      "ice": 95,
      "energy": 120,
      "earth": 105,
      "holy": 100,
      "death": 85
    },
    "killsToComplete": 2500
  },
  {
    "id": "modified-gnarlhound",
    "name": "Modified Gnarlhound",
    "imageUrl": "/images/creatures/modified-gnarlhound.gif",
    "charmPoints": 1,
    "difficulty": "HARMLESS",
    "hitpoints": 1500,
    "creatureCategory": "normal",
    "locations": ["Stonehome, under Telas's house"],
    "elementalResistances": {
      "physical": 10,
      "fire": 10,
      "ice": 10,
      "energy": 10,
      "earth": 0,
      "holy": 0,
      "death": 0
    },
    "killsToComplete": 25
  },
  {
    "id": "mole",
    "name": "Mole",
    "imageUrl": "/images/creatures/mole.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 200,
    "creatureCategory": "normal",
    "locations": ["Warzone 4 and Warzone 6"],
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
    "id": "monk",
    "name": "Monk",
    "imageUrl": "/images/creatures/monk.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 240,
    "creatureCategory": "normal",
    "locations": [
      "Edron Hero Cave",
      "Triangle Tower near Thais",
      "Maze of Lost Souls",
      "Deeper Dark Cathedral",
      "Isle of the Kings",
      "Trade Quarter"
    ],
    "elementalResistances": {
      "physical": 105,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 50,
      "death": 50
    },
    "killsToComplete": 1000
  },
  {
    "id": "monks-apparition",
    "name": "Monk's Apparition",
    "imageUrl": "/images/creatures/monks-apparition.gif",
    "charmPoints": 100,
    "difficulty": "CHALLENGING",
    "hitpoints": 25000,
    "creatureCategory": "normal",
    "locations": ["The Mirrored Nightmare", "after Mirror Images are attacked"],
    "elementalResistances": {
      "physical": 80,
      "fire": 110,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 60,
      "death": 120
    },
    "killsToComplete": 5000
  },
  {
    "id": "moohtah-warrior",
    "name": "Mooh'Tah Warrior",
    "imageUrl": "/images/creatures/moohtah-warrior.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1200,
    "creatureCategory": "normal",
    "locations": [
      "Oramond/Southern Plains",
      "Minotaur Hills",
      "Oramond Dungeon (depending on Magistrate votes)",
      "Underground Glooth Factory"
    ],
    "elementalResistances": {
      "physical": 95,
      "fire": 85,
      "ice": 90,
      "energy": 95,
      "earth": 90,
      "holy": 100,
      "death": 85
    },
    "killsToComplete": 1000
  },
  {
    "id": "mould-phantom",
    "name": "Mould Phantom",
    "imageUrl": "/images/creatures/mould-phantom.gif",
    "charmPoints": 100,
    "difficulty": "CHALLENGING",
    "hitpoints": 28000,
    "creatureCategory": "normal",
    "locations": ["Rotten Wasteland"],
    "elementalResistances": {
      "physical": 110,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 50,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 5000
  },
  {
    "id": "muglex-clan-assassin",
    "name": "Muglex Clan Assassin",
    "imageUrl": "/images/creatures/muglex-clan-assassin.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "hitpoints": 45,
    "creatureCategory": "normal",
    "locations": [
      "Edron Goblin Den",
      "Edron Surroundings",
      "Newhaven"
    ],
    "elementalResistances": {
      "physical": 110,
      "fire": 95,
      "ice": 100,
      "energy": 105,
      "earth": 105,
      "holy": 80,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "muglex-clan-footman",
    "name": "Muglex Clan Footman",
    "imageUrl": "/images/creatures/muglex-clan-footman.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "hitpoints": 30,
    "creatureCategory": "normal",
    "locations": [
      "Edron Goblin Den",
      "Edron Surroundings",
      "Newhaven"
    ],
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 110,
      "holy": 80,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "mummy",
    "name": "Mummy",
    "imageUrl": "/images/creatures/mummy.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 240,
    "creatureCategory": "normal",
    "locations": ["Peninsula Tomb"],
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 80,
      "energy": 100,
      "earth": 0,
      "holy": 125,
      "death": 0
    },
    "killsToComplete": 500
  },
  {
    "id": "mushroom-sniffer",
    "name": "Mushroom Sniffer",
    "imageUrl": "/images/creatures/mushroom-sniffer.gif",
    "charmPoints": 1,
    "difficulty": "HARMLESS",
    "hitpoints": 250,
    "creatureCategory": "normal",
    "locations": ["Truffels Garden"],
    "elementalResistances": {
      "physical": 10,
      "fire": 10,
      "ice": 10,
      "energy": 10,
      "earth": 10,
      "holy": 10,
      "death": 10
    },
    "killsToComplete": 25
  },
  {
    "id": "mutated-bat",
    "name": "Mutated Bat",
    "imageUrl": "/images/creatures/mutated-bat.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 900,
    "creatureCategory": "normal",
    "locations": ["Souleater Mountains, Farmine Mutated Bat/Tiger Cave"],
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 0,
      "holy": 100,
      "death": 0
    },
    "killsToComplete": 1000
  },
  {
    "id": "mutated-human",
    "name": "Mutated Human",
    "imageUrl": "/images/creatures/mutated-human.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 240,
    "creatureCategory": "normal",
    "locations": ["Yalahar Alchemist Quarter"],
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
    "id": "mycobiontic-beetle",
    "name": "Mycobiontic Beetle",
    "imageUrl": "/images/creatures/mycobiontic-beetle.gif",
    "charmPoints": 100,
    "difficulty": "CHALLENGING",
    "hitpoints": 30200,
    "creatureCategory": "normal",
    "locations": ["Jaded Roots"],
    "elementalResistances": {
      "physical": 75,
      "fire": 65,
      "ice": 125,
      "energy": 115,
      "earth": 40,
      "holy": 105,
      "death": 100
    },
    "killsToComplete": 5000
  },
  {
    "id": "naga-archer",
    "name": "Naga Archer",
    "imageUrl": "/images/creatures/naga-archer.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 4640,
    "creatureCategory": "normal",
    "locations": ["Temple of the Moon Goddess"],
    "elementalResistances": {
      "physical": 110,
      "fire": 80,
      "ice": 80,
      "energy": 110,
      "earth": 115,
      "holy": 120,
      "death": 90
    },
    "killsToComplete": 2500
  },
  {
    "id": "naga-warrior",
    "name": "Naga Warrior",
    "imageUrl": "/images/creatures/naga-warrior.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 5530,
    "creatureCategory": "normal",
    "locations": ["Temple of the Moon Goddess"],
    "elementalResistances": {
      "physical": 80,
      "fire": 90,
      "ice": 90,
      "energy": 105,
      "earth": 105,
      "holy": 120,
      "death": 90
    },
    "killsToComplete": 2500
  },
  {
    "id": "nibblemaw",
    "name": "Nibblemaw",
    "imageUrl": "/images/creatures/nibblemaw.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 2900,
    "creatureCategory": "normal",
    "locations": ["Chocolate Mines"],
    "elementalResistances": {
      "physical": 90,
      "fire": 100,
      "ice": 100,
      "energy": 115,
      "earth": 90,
      "holy": 110,
      "death": 60
    },
    "killsToComplete": 2500
  },
  {
    "id": "night-harpy",
    "name": "Night Harpy",
    "imageUrl": "/images/creatures/night-harpy.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 14000,
    "creatureCategory": "normal",
    "locations": ["Ingol"],
    "elementalResistances": {
      "physical": 100,
      "fire": 70,
      "ice": 112,
      "energy": 100,
      "earth": 60,
      "holy": 109,
      "death": 109
    },
    "killsToComplete": 2500
  },
  {
    "id": "nighthunter",
    "name": "Nighthunter",
    "imageUrl": "/images/creatures/nighthunter.gif",
    "charmPoints": 100,
    "difficulty": "CHALLENGING",
    "hitpoints": 19200,
    "creatureCategory": "normal",
    "locations": ["Monster Graveyard"],
    "elementalResistances": {
      "physical": 110,
      "fire": 100,
      "ice": 100,
      "energy": 105,
      "earth": 85,
      "holy": 115,
      "death": 80
    },
    "killsToComplete": 5000
  },
  {
    "id": "nightmare",
    "name": "Nightmare",
    "imageUrl": "/images/creatures/nightmare.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 2700,
    "creatureCategory": "normal",
    "locations": [
      "Pits of Inferno",
      "Formorgar Mines",
      "Cemetery Quarter",
      "Edron (In multiple places during The Inquisition Quest)",
      "Alchemist Quarter",
      "Vengoth/Castle"
    ],
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 90,
      "energy": 80,
      "earth": 0,
      "holy": 125,
      "death": 0
    },
    "killsToComplete": 1000
  },
  {
    "id": "nightmare-scion",
    "name": "Nightmare Scion",
    "imageUrl": "/images/creatures/nightmare-scion.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1400,
    "creatureCategory": "normal",
    "locations": [
      "Cemetery Quarter",
      "Alchemist Quarter and in the Arena and Zoo Quarter (unreachable)",
      "Vengoth/Castle"
    ],
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 90,
      "energy": 80,
      "earth": 0,
      "holy": 125,
      "death": 0
    },
    "killsToComplete": 1000
  },
  {
    "id": "nomad-basic",
    "name": "Nomad (Basic)",
    "imageUrl": "/images/creatures/nomad-basic.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 160,
    "creatureCategory": "normal",
    "locations": [
      "Desert around Darashia and Ankrahmun",
      "Nomad Cave",
      "Foreigner Quarter"
    ],
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
    "id": "nomad-blue",
    "name": "Nomad (Blue)",
    "imageUrl": "/images/creatures/nomad-blue.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 160,
    "creatureCategory": "normal",
    "locations": ["Ankrahmun Desert"],
    "elementalResistances": {
      "physical": 110,
      "fire": 80,
      "ice": 110,
      "energy": 100,
      "earth": 100,
      "holy": 80,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "nomad-female",
    "name": "Nomad (Female)",
    "imageUrl": "/images/creatures/nomad-female.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 160,
    "creatureCategory": "normal",
    "locations": ["Ankrahmun Desert"],
    "elementalResistances": {
      "physical": 110,
      "fire": 80,
      "ice": 110,
      "energy": 100,
      "earth": 100,
      "holy": 80,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "norcferatu-heartless",
    "name": "Norcferatu Heartless",
    "imageUrl": "/images/creatures/norcferatu-heartless.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 5700,
    "creatureCategory": "normal",
    "locations": ["Norcferatu Dungeons", "Norcferatu Fortress"],
    "elementalResistances": {
      "physical": 90,
      "fire": 100,
      "ice": 100,
      "energy": 95,
      "earth": 110,
      "holy": 105,
      "death": 70
    },
    "killsToComplete": 2500
  },
  {
    "id": "norcferatu-nightweaver",
    "name": "Norcferatu Nightweaver",
    "imageUrl": "/images/creatures/norcferatu-nightweaver.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 6100,
    "creatureCategory": "normal",
    "locations": ["Norcferatu Dungeons", "Norcferatu Fortress"],
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 110,
      "energy": 90,
      "earth": 105,
      "holy": 95,
      "death": 75
    },
    "killsToComplete": 2500
  },
  {
    "id": "northern-pike",
    "name": "Northern Pike",
    "imageUrl": "/images/creatures/northern-pike.gif",
    "charmPoints": 1,
    "difficulty": "HARMLESS",
    "hitpoints": 40,
    "creatureCategory": "normal",
    "locations": ["Fiehonja"],
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
    "hitpoints": 285,
    "creatureCategory": "normal",
    "locations": ["Yalahar Cults"],
    "elementalResistances": {
      "physical": 110,
      "fire": 105,
      "ice": 90,
      "energy": 108,
      "earth": 90,
      "holy": 90,
      "death": 108
    },
    "killsToComplete": 500
  },
  {
    "id": "noxious-ripptor",
    "name": "Noxious Ripptor",
    "imageUrl": "/images/creatures/noxious-ripptor.gif",
    "charmPoints": 100,
    "difficulty": "CHALLENGING",
    "hitpoints": 22700,
    "creatureCategory": "normal",
    "locations": ["Crystal Enigma"],
    "elementalResistances": {
      "physical": 80,
      "fire": 100,
      "ice": 110,
      "energy": 90,
      "earth": 90,
      "holy": 110,
      "death": 110
    },
    "killsToComplete": 5000
  },
  {
    "id": "nymph",
    "name": "Nymph",
    "imageUrl": "/images/creatures/nymph.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 900,
    "creatureCategory": "normal",
    "locations": ["Feyrist Surface"],
    "elementalResistances": {
      "physical": 110,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 40,
      "holy": 60,
      "death": 60
    },
    "killsToComplete": 1000
  },
  {
    "id": "ogre-brute",
    "name": "Ogre Brute",
    "imageUrl": "/images/creatures/ogre-brute.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1000,
    "creatureCategory": "normal",
    "locations": ["Krailos Surface"],
    "elementalResistances": {
      "physical": 80,
      "fire": 80,
      "ice": 80,
      "energy": 110,
      "earth": 0,
      "holy": 80,
      "death": 90
    },
    "killsToComplete": 1000
  },
  {
    "id": "ogre-rowdy",
    "name": "Ogre Rowdy",
    "imageUrl": "/images/creatures/ogre-rowdy.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 4500,
    "creatureCategory": "normal",
    "locations": [
      "Kilmaresh Central Steppe",
      "Kilmaresh Southern Steppe",
      "Green Belt",
      "Kilmaresh Mountains (underground)"
    ],
    "elementalResistances": {
      "physical": 100,
      "fire": 70,
      "ice": 130,
      "energy": 110,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "ogre-ruffian",
    "name": "Ogre Ruffian",
    "imageUrl": "/images/creatures/ogre-ruffian.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 5500,
    "creatureCategory": "normal",
    "locations": [
      "Kilmaresh Central Steppe",
      "Kilmaresh Southern Steppe",
      "Green Belt",
      "Kilmaresh Mountains (underground)"
    ],
    "elementalResistances": {
      "physical": 50,
      "fire": 100,
      "ice": 120,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "ogre-sage",
    "name": "Ogre Sage",
    "imageUrl": "/images/creatures/ogre-sage.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 4800,
    "creatureCategory": "normal",
    "locations": [
      "Kilmaresh Central Steppe",
      "Kilmaresh Southern Steppe",
      "Green Belt",
      "Kilmaresh Mountains (underground)"
    ],
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 130,
      "earth": 75,
      "holy": 110,
      "death": 0
    },
    "killsToComplete": 2500
  },
  {
    "id": "ogre-savage",
    "name": "Ogre Savage",
    "imageUrl": "/images/creatures/ogre-savage.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1400,
    "creatureCategory": "normal",
    "locations": ["Krailos Surface"],
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 80,
      "energy": 110,
      "earth": 0,
      "holy": 50,
      "death": 90
    },
    "killsToComplete": 1000
  },
  {
    "id": "ogre-shaman",
    "name": "Ogre Shaman",
    "imageUrl": "/images/creatures/ogre-shaman.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 800,
    "creatureCategory": "normal",
    "locations": ["Krailos Surface"],
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 80,
      "energy": 80,
      "earth": 0,
      "holy": 110,
      "death": 0
    },
    "killsToComplete": 1000
  },
  {
    "id": "oozing-carcass",
    "name": "Oozing Carcass",
    "imageUrl": "/images/creatures/oozing-carcass.gif",
    "charmPoints": 100,
    "difficulty": "CHALLENGING",
    "hitpoints": 27500,
    "creatureCategory": "normal",
    "locations": ["Putrefactory"],
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 65,
      "energy": 75,
      "earth": 120,
      "holy": 125,
      "death": 60
    },
    "killsToComplete": 5000
  },
  {
    "id": "oozing-corpus",
    "name": "Oozing Corpus",
    "imageUrl": "/images/creatures/oozing-corpus.gif",
    "charmPoints": 100,
    "difficulty": "CHALLENGING",
    "hitpoints": 28700,
    "creatureCategory": "normal",
    "locations": ["Jaded Roots"],
    "elementalResistances": {
      "physical": 70,
      "fire": 75,
      "ice": 110,
      "energy": 125,
      "earth": 60,
      "holy": 110,
      "death": 100
    },
    "killsToComplete": 5000
  },
  {
    "id": "orc",
    "name": "Orc",
    "imageUrl": "/images/creatures/orc.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 70,
    "creatureCategory": "normal",
    "locations": [
      "Ulderek's Rock",
      "Edron Orc Cave",
      "Ancient Temple",
      "Ice Islands",
      "Venore Orc Cave",
      "Rookgaard Orc Fortress",
      "Rookgaard main cave",
      "Fibula Dungeon",
      "Elvenbane",
      "Foreigner Quarter",
      "Zao Orc Land"
    ],
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
    "id": "orc-cult-fanatic",
    "name": "Orc Cult Fanatic",
    "imageUrl": "/images/creatures/orc-cult-fanatic.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1300,
    "creatureCategory": "normal",
    "locations": ["Edron Orc Cults"],
    "elementalResistances": {
      "physical": 110,
      "fire": 0,
      "ice": 100,
      "energy": 80,
      "earth": 110,
      "holy": 80,
      "death": 110
    },
    "killsToComplete": 1000
  },
  {
    "id": "orc-cult-inquisitor",
    "name": "Orc Cult Inquisitor",
    "imageUrl": "/images/creatures/orc-cult-inquisitor.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1500,
    "creatureCategory": "normal",
    "locations": ["Edron Orc Cults"],
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 85,
      "earth": 110,
      "holy": 90,
      "death": 110
    },
    "killsToComplete": 1000
  },
  {
    "id": "orc-cult-minion",
    "name": "Orc Cult Minion",
    "imageUrl": "/images/creatures/orc-cult-minion.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1000,
    "creatureCategory": "normal",
    "locations": ["Edron Orc Cults"],
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 80,
      "earth": 110,
      "holy": 80,
      "death": 110
    },
    "killsToComplete": 1000
  },
  {
    "id": "orc-cult-priest",
    "name": "Orc Cult Priest",
    "imageUrl": "/images/creatures/orc-cult-priest.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1300,
    "creatureCategory": "normal",
    "locations": ["Edron Orc Cults"],
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 50,
      "earth": 110,
      "holy": 90,
      "death": 105
    },
    "killsToComplete": 1000
  },
  {
    "id": "orc-cultist",
    "name": "Orc Cultist",
    "imageUrl": "/images/creatures/orc-cultist.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1350,
    "creatureCategory": "normal",
    "locations": ["Edron Orc Cults"],
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 70,
      "earth": 110,
      "holy": 90,
      "death": 110
    },
    "killsToComplete": 1000
  },
  {
    "id": "orc-rider",
    "name": "Orc Rider",
    "imageUrl": "/images/creatures/orc-rider.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 180,
    "creatureCategory": "normal",
    "locations": [
      "Orc Fort",
      "Orc Peninsula",
      "near Dark Cathedral",
      "Zao Orc Land"
    ],
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
    "hitpoints": 115,
    "creatureCategory": "normal",
    "locations": [
      "Edron Orc Cave",
      "Temple of Xayepocax",
      "below Point of No Return in Outlaw Camp",
      "Venore Orc Cave",
      "Maze of Lost Souls",
      "Orc Fort",
      "north west of Thais",
      "Elvenbane",
      "Plains Of Havoc",
      "Foreigner Quarter",
      "Zao Orc Land"
    ],
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
    "hitpoints": 105,
    "creatureCategory": "normal",
    "locations": [
      "Orc Fortress",
      "Folda Dungeon",
      "Edron Orc Cave and around it",
      "Ancient Temple",
      "Venore Orc Cave",
      "below the Point of No Return in Outlaw Camp",
      "Plains of Havoc",
      "North of Thais in the Orc Peninsula",
      "Elvenbane and Orc Camp in Foreigner Quarter. Also found in Rookgaard West plains",
      "Zao Orc Land"
    ],
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
    "id": "orc-warrior",
    "name": "Orc Warrior",
    "imageUrl": "/images/creatures/orc-warrior.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 125,
    "creatureCategory": "normal",
    "locations": [
      "Ancient Temple in Thais",
      "Orc Fort",
      "below Point of No Return in Outlaw Camp and inside a mountain north of it",
      "Orc Peninsula",
      "Folda",
      "Edron Orc Cave",
      "Maze of Lost Souls",
      "Elvenbane"
    ],
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
    "hitpoints": 60,
    "creatureCategory": "normal",
    "locations": [
      "Meriana",
      "Laguna Islands",
      "and other Shattered Isles"
    ],
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
    "id": "orclops-bloodbreaker",
    "name": "Orclops Bloodbreaker",
    "imageUrl": "/images/creatures/orclops-bloodbreaker.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 10300,
    "creatureCategory": "normal",
    "locations": ["Norcferatu Dungeons", "Norcferatu Fortress"],
    "elementalResistances": {
      "physical": 95,
      "fire": 110,
      "ice": 105,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 70
    },
    "killsToComplete": 2500
  },
  {
    "id": "orclops-doomhauler",
    "name": "Orclops Doomhauler",
    "imageUrl": "/images/creatures/orclops-doomhauler.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1700,
    "creatureCategory": "normal",
    "locations": ["Desecrated Glade"],
    "elementalResistances": {
      "physical": 90,
      "fire": 85,
      "ice": 110,
      "energy": 110,
      "earth": 70,
      "holy": 100,
      "death": 90
    },
    "killsToComplete": 1000
  },
  {
    "id": "orclops-ravager",
    "name": "Orclops Ravager",
    "imageUrl": "/images/creatures/orclops-ravager.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1200,
    "creatureCategory": "normal",
    "locations": ["Desecrated Glade"],
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 80,
      "energy": 110,
      "earth": 0,
      "holy": 50,
      "death": 90
    },
    "killsToComplete": 1000
  },
  {
    "id": "orewalker",
    "name": "Orewalker",
    "imageUrl": "/images/creatures/orewalker.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 7200,
    "creatureCategory": "normal",
    "locations": ["Warzone 1-3"],
    "elementalResistances": {
      "physical": 75,
      "fire": 35,
      "ice": 95,
      "energy": 105,
      "earth": 0,
      "holy": 100,
      "death": 75
    },
    "killsToComplete": 2500
  },
  {
    "id": "paladins-apparition",
    "name": "Paladin's Apparition",
    "imageUrl": "/images/creatures/paladins-apparition.gif",
    "charmPoints": 100,
    "difficulty": "CHALLENGING",
    "hitpoints": 25000,
    "creatureCategory": "normal",
    "locations": ["The Mirrored Nightmare", "after Mirror Images are attacked"],
    "elementalResistances": {
      "physical": 80,
      "fire": 111,
      "ice": 70,
      "energy": 100,
      "earth": 100,
      "holy": 60,
      "death": 120
    },
    "killsToComplete": 5000
  },
  {
    "id": "panda",
    "name": "Panda",
    "imageUrl": "/images/creatures/panda.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 80,
    "creatureCategory": "normal",
    "locations": ["Southern Tiquanda Coast"],
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
    "id": "parder",
    "name": "Parder",
    "imageUrl": "/images/creatures/parder.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1200,
    "creatureCategory": "normal",
    "locations": [
      "All around Marapur including the Emerald Gardens",
      "Fading Isles",
      "Moonfall",
      "Murmuring Wilderness",
      "Silent Waters",
      "Sparkling Lagoon",
      "Stardance Mountains"
    ],
    "elementalResistances": {
      "physical": 90,
      "fire": 110,
      "ice": 85,
      "energy": 100,
      "earth": 85,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "parrot",
    "name": "Parrot",
    "imageUrl": "/images/creatures/parrot.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "hitpoints": 25,
    "creatureCategory": "normal",
    "locations": [
      "In the jungle of Tiquanda",
      "Liberty Bay",
      "the Shattered Isles",
      "and as a house pet in Meriana"
    ],
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
    "difficulty": "TRIVIAL",
    "hitpoints": 33,
    "creatureCategory": "normal",
    "locations": ["Svargrond"],
    "elementalResistances": {
      "physical": 100,
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
    "id": "phantasm",
    "name": "Phantasm",
    "imageUrl": "/images/creatures/phantasm.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 3950,
    "creatureCategory": "normal",
    "locations": ["Pits of Inferno"],
    "elementalResistances": {
      "physical": 0,
      "fire": 110,
      "ice": 80,
      "energy": 110,
      "earth": 80,
      "holy": 110,
      "death": 0
    },
    "killsToComplete": 2500
  },
  {
    "id": "pig",
    "name": "Pig",
    "imageUrl": "/images/creatures/pig.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "hitpoints": 25,
    "creatureCategory": "normal",
    "locations": [
      "Rookgaard",
      "Orc Fort",
      "under Femor Hills with Goblins",
      "some farms like Donald McRonald"
    ],
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
    "difficulty": "HARMLESS",
    "hitpoints": 30,
    "creatureCategory": "normal",
    "locations": ["Venore"],
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 110,
      "holy": 100,
      "death": 110
    },
    "killsToComplete": 25
  },
  {
    "id": "pirat-bombardier",
    "name": "Pirat Bombardier",
    "imageUrl": "/images/creatures/pirat-bombardier.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 2300,
    "creatureCategory": "normal",
    "locations": ["The Wreckoning"],
    "elementalResistances": {
      "physical": 110,
      "fire": 100,
      "ice": 100,
      "energy": 90,
      "earth": 120,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "pirat-cutthroat",
    "name": "Pirat Cutthroat",
    "imageUrl": "/images/creatures/pirat-cutthroat.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 2600,
    "creatureCategory": "normal",
    "locations": ["The Wreckoning"],
    "elementalResistances": {
      "physical": 90,
      "fire": 100,
      "ice": 100,
      "energy": 80,
      "earth": 120,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "pirat-mate",
    "name": "Pirat Mate",
    "imageUrl": "/images/creatures/pirat-mate.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 3200,
    "creatureCategory": "normal",
    "locations": ["The Wreckoning"],
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 70,
      "earth": 130,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "pirat-scoundrel",
    "name": "Pirat Scoundrel",
    "imageUrl": "/images/creatures/pirat-scoundrel.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 2200,
    "creatureCategory": "normal",
    "locations": ["The Wreckoning"],
    "elementalResistances": {
      "physical": 80,
      "fire": 100,
      "ice": 100,
      "energy": 74,
      "earth": 130,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "pirate-buccaneer",
    "name": "Pirate Buccaneer",
    "imageUrl": "/images/creatures/pirate-buccaneer.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 425,
    "creatureCategory": "normal",
    "locations": [
      "Nargor",
      "Tyrsung (on the ship)",
      "Yalahar (Foreign Quarter)",
      "Krailos Steppe and The Cave"
    ],
    "elementalResistances": {
      "physical": 105,
      "fire": 105,
      "ice": 105,
      "energy": 105,
      "earth": 90,
      "holy": 90,
      "death": 105
    },
    "killsToComplete": 1000
  },
  {
    "id": "pirate-cutthroat",
    "name": "Pirate Cutthroat",
    "imageUrl": "/images/creatures/pirate-cutthroat.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 325,
    "creatureCategory": "normal",
    "locations": ["Yalahar Pirates"],
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 105,
      "energy": 100,
      "earth": 90,
      "holy": 80,
      "death": 105
    },
    "killsToComplete": 1000
  },
  {
    "id": "pirate-ghost",
    "name": "Pirate Ghost",
    "imageUrl": "/images/creatures/pirate-ghost.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 275,
    "creatureCategory": "normal",
    "locations": [
      "Drefia",
      "Goroma",
      "Nargor Undead Cave",
      "hidden caves under Treasure Island",
      "Liberty Bay ruins (single spawn)",
      "The Cave (single spawn) and Chyllfroest (unreachable)"
    ],
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
    "hitpoints": 210,
    "creatureCategory": "normal",
    "locations": ["Yalahar Pirates"],
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 100,
      "energy": 103,
      "earth": 90,
      "holy": 80,
      "death": 105
    },
    "killsToComplete": 500
  },
  {
    "id": "pirate-skeleton",
    "name": "Pirate Skeleton",
    "imageUrl": "/images/creatures/pirate-skeleton.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 190,
    "creatureCategory": "normal",
    "locations": [
      "Nargor Undead Cave",
      "Goroma",
      "Treasure Island",
      "Drefia",
      "The Cave",
      "Chyllfroest"
    ],
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
    "hitpoints": 770,
    "creatureCategory": "normal",
    "locations": ["Feyrist Surface"],
    "elementalResistances": {
      "physical": 105,
      "fire": 110,
      "ice": 105,
      "energy": 100,
      "earth": 40,
      "holy": 40,
      "death": 70
    },
    "killsToComplete": 1000
  },
  {
    "id": "plaguesmith",
    "name": "Plaguesmith",
    "imageUrl": "/images/creatures/plaguesmith.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 8250,
    "creatureCategory": "normal",
    "locations": [
      "Pits of Inferno",
      "Formorgar Mines",
      "Edron Demon Forge (The Vats",
      "The Foundry)",
      "Magician Quarter",
      "Alchemist Quarter",
      "Roshamuul Prison",
      "Grounds of Plague and Halls of Ascension"
    ],
    "elementalResistances": {
      "physical": 100,
      "fire": 70,
      "ice": 80,
      "energy": 110,
      "earth": 0,
      "holy": 110,
      "death": 90
    },
    "killsToComplete": 1000
  },
  {
    "id": "poacher",
    "name": "Poacher",
    "imageUrl": "/images/creatures/poacher.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 90,
    "creatureCategory": "normal",
    "locations": ["Poacher's Cave (Hunter stage)"],
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
    "id": "poison-spider",
    "name": "Poison Spider",
    "imageUrl": "/images/creatures/poison-spider.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "hitpoints": 26,
    "creatureCategory": "normal",
    "locations": ["All over Tibia, should be completed naturally"],
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
    "id": "poisonous-carnisylvan",
    "name": "Poisonous Carnisylvan",
    "imageUrl": "/images/creatures/poisonous-carnisylvan.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 8000,
    "creatureCategory": "normal",
    "locations": ["Forest of Life"],
    "elementalResistances": {
      "physical": 100,
      "fire": 115,
      "ice": 105,
      "energy": 100,
      "earth": 75,
      "holy": 100,
      "death": 95
    },
    "killsToComplete": 2500
  },
  {
    "id": "polar-bear",
    "name": "Polar Bear",
    "imageUrl": "/images/creatures/polar-bear.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 85,
    "creatureCategory": "normal",
    "locations": ["Ice Islands"],
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
    "hitpoints": 500,
    "creatureCategory": "normal",
    "locations": ["Feyrist Surface"],
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 80,
      "energy": 110,
      "earth": 30,
      "holy": 80,
      "death": 90
    },
    "killsToComplete": 1000
  },
  {
    "id": "priestess-of-the-wild-sun",
    "name": "Priestess of the Wild Sun",
    "imageUrl": "/images/creatures/priestess-of-the-wild-sun.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 8500,
    "creatureCategory": "normal",
    "locations": [
      "Issavi Sewers",
      "Kilmaresh Mountains",
      "Kilmaresh Catacombs"
    ],
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 125,
      "energy": 85,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "putrid-mummy",
    "name": "Putrid Mummy",
    "imageUrl": "/images/creatures/putrid-mummy.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1500,
    "creatureCategory": "normal",
    "locations": ["Caverna Exanima"],
    "elementalResistances": {
      "physical": 100,
      "fire": 120,
      "ice": 80,
      "energy": 100,
      "earth": 0,
      "holy": 125,
      "death": 0
    },
    "killsToComplete": 1000
  },
  {
    "id": "quara-hydromancer",
    "name": "Quara Hydromancer",
    "imageUrl": "/images/creatures/quara-hydromancer.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1100,
    "creatureCategory": "normal",
    "locations": ["Sunken Quarter, Calassa"],
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
    "id": "quara-looter",
    "name": "Quara Looter",
    "imageUrl": "/images/creatures/quara-looter.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 11500,
    "creatureCategory": "normal",
    "locations": ["Podzilla Bottom", "Podzilla Underwater"],
    "elementalResistances": {
      "physical": 95,
      "fire": 80,
      "ice": 0,
      "energy": 115,
      "earth": 110,
      "holy": 90,
      "death": 95
    },
    "killsToComplete": 2500
  },
  {
    "id": "quara-mantassin-scout",
    "name": "Quara Mantassin Scout",
    "imageUrl": "/images/creatures/quara-mantassin-scout.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 220,
    "creatureCategory": "normal",
    "locations": ["Malada", "Tiquanda Water Elemental Cave"],
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
    "hitpoints": 1800,
    "creatureCategory": "normal",
    "locations": ["Sunken Quarter, Calassa"],
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
    "id": "quara-plunderer",
    "name": "Quara Plunderer",
    "imageUrl": "/images/creatures/quara-plunderer.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 13500,
    "creatureCategory": "normal",
    "locations": ["Podzilla Bottom", "Podzilla Underwater"],
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 0,
      "energy": 110,
      "earth": 110,
      "holy": 85,
      "death": 90
    },
    "killsToComplete": 2500
  },
  {
    "id": "quara-predator",
    "name": "Quara Predator",
    "imageUrl": "/images/creatures/quara-predator.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 2200,
    "creatureCategory": "normal",
    "locations": ["Sunken Quarter, Calassa"],
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
    "id": "quara-raider",
    "name": "Quara Raider",
    "imageUrl": "/images/creatures/quara-raider.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 12500,
    "creatureCategory": "normal",
    "locations": ["Podzilla Bottom", "Podzilla Underwater"],
    "elementalResistances": {
      "physical": 90,
      "fire": 80,
      "ice": 0,
      "energy": 110,
      "earth": 115,
      "holy": 90,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "rabbit",
    "name": "Rabbit",
    "imageUrl": "/images/creatures/rabbit.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "hitpoints": 15,
    "creatureCategory": "normal",
    "locations": ["In most grass areas of Tibia", "for example on Tutorial Island"],
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
    "id": "rabid-wolf",
    "name": "Rabid Wolf",
    "imageUrl": "/images/creatures/rabid-wolf.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 75,
    "creatureCategory": "normal",
    "locations": ["Thais Wolf Den"],
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 110,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "rage-squid",
    "name": "Rage Squid",
    "imageUrl": "/images/creatures/rage-squid.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 17000,
    "creatureCategory": "normal",
    "locations": ["Secret Library fire section"],
    "elementalResistances": {
      "physical": 100,
      "fire": 0,
      "ice": 115,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "ragged-rabid-wolf",
    "name": "Ragged Rabid Wolf",
    "imageUrl": "/images/creatures/ragged-rabid-wolf.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 120,
    "creatureCategory": "normal",
    "locations": ["Thais Wolf Den"],
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 110,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "raging-fire",
    "name": "Raging Fire",
    "imageUrl": "/images/creatures/raging-fire.gif",
    "charmPoints": 50,
    "difficulty": "MEDIUM",
    "hitpoints": 1800,
    "creatureCategory": "rare",
    "locations": ["Jaccus Maxxen's Dungeon"],
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
    "hitpoints": 20,
    "creatureCategory": "normal",
    "locations": ["Rookgaard and Mainland", "Most sewers and caves near towns"],
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
    "id": "raubritter-chastener",
    "name": "Raubritter Chastener",
    "imageUrl": "/images/creatures/raubritter-chastener.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 10000,
    "creatureCategory": "normal",
    "locations": ["Haunted Territories"],
    "elementalResistances": {
      "physical": 120,
      "fire": 106,
      "ice": 75,
      "energy": 85,
      "earth": 112,
      "holy": 85,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "raubritter-marksman",
    "name": "Raubritter Marksman",
    "imageUrl": "/images/creatures/raubritter-marksman.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 10500,
    "creatureCategory": "normal",
    "locations": ["Haunted Territories"],
    "elementalResistances": {
      "physical": 116,
      "fire": 112,
      "ice": 85,
      "energy": 88,
      "earth": 112,
      "holy": 85,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "raubritter-skirmisher",
    "name": "Raubritter Skirmisher",
    "imageUrl": "/images/creatures/raubritter-skirmisher.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 11000,
    "creatureCategory": "normal",
    "locations": ["Haunted Territories"],
    "elementalResistances": {
      "physical": 112,
      "fire": 115,
      "ice": 80,
      "energy": 91,
      "earth": 106,
      "holy": 85,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "ravenous-lava-lurker",
    "name": "Ravenous Lava Lurker",
    "imageUrl": "/images/creatures/ravenous-lava-lurker.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 5000,
    "creatureCategory": "normal",
    "locations": ["Gnome Deep Hub in the Gnomish area"],
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
    "id": "reality-reaver",
    "name": "Reality Reaver",
    "imageUrl": "/images/creatures/reality-reaver.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 3900,
    "creatureCategory": "normal",
    "locations": ["Otherworld"],
    "elementalResistances": {
      "physical": 100,
      "fire": 90,
      "ice": 80,
      "energy": 15,
      "earth": 110,
      "holy": 100,
      "death": 95
    },
    "killsToComplete": 2500
  },
  {
    "id": "redeemed-soul",
    "name": "Redeemed Soul",
    "imageUrl": "/images/creatures/redeemed-soul.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 250,
    "creatureCategory": "normal",
    "locations": ["Tainted Caves"],
    "elementalResistances": {
      "physical": 40,
      "fire": 100,
      "ice": 100,
      "energy": 80,
      "earth": 100,
      "holy": 0,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "renegade-knight",
    "name": "Renegade Knight",
    "imageUrl": "/images/creatures/renegade-knight.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1450,
    "creatureCategory": "normal",
    "locations": [
      "Old Fortress (north of Edron)",
      "Old Masonry",
      "Forbidden Temple (Carlin)"
    ],
    "elementalResistances": {
      "physical": 85,
      "fire": 80,
      "ice": 100,
      "energy": 65,
      "earth": 80,
      "holy": 50,
      "death": 110
    },
    "killsToComplete": 1000
  },
  {
    "id": "retching-horror",
    "name": "Retching Horror",
    "imageUrl": "/images/creatures/retching-horror.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 5300,
    "creatureCategory": "normal",
    "locations": ["All over the surface of Upper Roshamuul and Nightmare Isles"],
    "elementalResistances": {
      "physical": 95,
      "fire": 15,
      "ice": 85,
      "energy": 103,
      "earth": 0,
      "holy": 100,
      "death": 80
    },
    "killsToComplete": 2500
  },
  {
    "id": "rhindeer",
    "name": "Rhindeer",
    "imageUrl": "/images/creatures/rhindeer.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 8650,
    "creatureCategory": "normal",
    "locations": ["Ingol"],
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 100,
      "energy": 95,
      "earth": 80,
      "holy": 105,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "ripper-spectre",
    "name": "Ripper Spectre",
    "imageUrl": "/images/creatures/ripper-spectre.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 3800,
    "creatureCategory": "normal",
    "locations": ["Haunted Cellar", "Buried Cathedral"],
    "elementalResistances": {
      "physical": 30,
      "fire": 120,
      "ice": 100,
      "energy": 110,
      "earth": 80,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "roaming-dread",
    "name": "Roaming Dread",
    "imageUrl": "/images/creatures/roaming-dread.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 14500,
    "creatureCategory": "normal",
    "locations": ["Forsaken Crypt"],
    "elementalResistances": {
      "physical": 100,
      "fire": 109,
      "ice": 109,
      "energy": 109,
      "earth": 109,
      "holy": 100,
      "death": 118
    },
    "killsToComplete": 2500
  },
  {
    "id": "rootthing-amber-shaper",
    "name": "Rootthing Amber Shaper",
    "imageUrl": "/images/creatures/rootthing-amber-shaper.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 15000,
    "creatureCategory": "normal",
    "locations": ["Podzilla Stalk"],
    "elementalResistances": {
      "physical": 95,
      "fire": 105,
      "ice": 105,
      "energy": 75,
      "earth": 0,
      "holy": 105,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "rootthing-bug-tracker",
    "name": "Rootthing Bug Tracker",
    "imageUrl": "/images/creatures/rootthing-bug-tracker.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 12500,
    "creatureCategory": "normal",
    "locations": ["Podzilla Stalk"],
    "elementalResistances": {
      "physical": 85,
      "fire": 115,
      "ice": 105,
      "energy": 75,
      "earth": 0,
      "holy": 100,
      "death": 105
    },
    "killsToComplete": 2500
  },
  {
    "id": "rootthing-nutshell",
    "name": "Rootthing Nutshell",
    "imageUrl": "/images/creatures/rootthing-nutshell.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 13500,
    "creatureCategory": "normal",
    "locations": ["Podzilla Stalk"],
    "elementalResistances": {
      "physical": 75,
      "fire": 115,
      "ice": 105,
      "energy": 85,
      "earth": 0,
      "holy": 95,
      "death": 110
    },
    "killsToComplete": 2500
  },
  {
    "id": "rorc",
    "name": "Rorc",
    "imageUrl": "/images/creatures/rorc.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 260,
    "creatureCategory": "normal",
    "locations": ["Rorc Plains and in the Forsaken Mine"],
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
    "hitpoints": 850,
    "creatureCategory": "normal",
    "locations": ["Oramond West"],
    "elementalResistances": {
      "physical": 90,
      "fire": 100,
      "ice": 70,
      "energy": 105,
      "earth": 0,
      "holy": 80,
      "death": 80
    },
    "killsToComplete": 1000
  },
  {
    "id": "rotten-golem",
    "name": "Rotten Golem",
    "imageUrl": "/images/creatures/rotten-golem.gif",
    "charmPoints": 100,
    "difficulty": "CHALLENGING",
    "hitpoints": 28000,
    "creatureCategory": "normal",
    "locations": ["Rotten Wasteland"],
    "elementalResistances": {
      "physical": 80,
      "fire": 125,
      "ice": 100,
      "energy": 115,
      "earth": 60,
      "holy": 50,
      "death": 120
    },
    "killsToComplete": 5000
  },
  {
    "id": "rotten-man-maggot",
    "name": "Rotten Man-Maggot",
    "imageUrl": "/images/creatures/rotten-man-maggot.gif",
    "charmPoints": 100,
    "difficulty": "CHALLENGING",
    "hitpoints": 31100,
    "creatureCategory": "normal",
    "locations": ["Putrefactory"],
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 60,
      "energy": 45,
      "earth": 115,
      "holy": 115,
      "death": 70
    },
    "killsToComplete": 5000
  },
  {
    "id": "rotworm",
    "name": "Rotworm",
    "imageUrl": "/images/creatures/rotworm.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 65,
    "creatureCategory": "normal",
    "locations": ["Darashia Rotworms, Liberty Bay Rotworms"],
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
    "id": "rustheap-golem",
    "name": "Rustheap Golem",
    "imageUrl": "/images/creatures/rustheap-golem.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 2800,
    "creatureCategory": "normal",
    "locations": [
      "Workshop Quarter",
      "Glooth Factory",
      "Underground Glooth Factory",
      "Oramond Dungeon (depending on Magistrate votes)",
      "Jaccus Maxxen's Dungeon"
    ],
    "elementalResistances": {
      "physical": 105,
      "fire": 30,
      "ice": 100,
      "energy": 105,
      "earth": 100,
      "holy": 100,
      "death": 90
    },
    "killsToComplete": 1000
  },
  {
    "id": "sabretooth",
    "name": "Sabretooth",
    "imageUrl": "/images/creatures/sabretooth.gif",
    "charmPoints": 100,
    "difficulty": "CHALLENGING",
    "hitpoints": 17300,
    "creatureCategory": "normal",
    "locations": ["Sparkling Pools"],
    "elementalResistances": {
      "physical": 110,
      "fire": 110,
      "ice": 110,
      "energy": 90,
      "earth": 110,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 5000
  },
  {
    "id": "salamander",
    "name": "Salamander",
    "imageUrl": "/images/creatures/salamander.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 70,
    "creatureCategory": "normal",
    "locations": ["Venore Salamander Cave"],
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 90,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "sandcrawler",
    "name": "Sandcrawler",
    "imageUrl": "/images/creatures/sandcrawler.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "hitpoints": 30,
    "creatureCategory": "normal",
    "locations": ["All over Zao Steppe"],
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
    "id": "scarab",
    "name": "Scarab",
    "imageUrl": "/images/creatures/scarab.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 320,
    "creatureCategory": "normal",
    "locations": ["Ankrahmun Larva Caves, Mother of Scarabs Lair -4/-5"],
    "elementalResistances": {
      "physical": 95,
      "fire": 118,
      "ice": 80,
      "energy": 90,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "scorpion",
    "name": "Scorpion",
    "imageUrl": "/images/creatures/scorpion.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 45,
    "creatureCategory": "normal",
    "locations": [
      "Near Thais Troll Cave",
      "Plague Spike",
      "Drefia",
      "Jakundaf Desert",
      "Green Claw Swamp",
      "beneath Folda",
      "Maze of Lost Souls",
      "Plains of Havoc",
      "Venore Dragon Lair"
    ],
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
    "hitpoints": 1950,
    "creatureCategory": "normal",
    "locations": ["Svargrond Sea Serpent Area"],
    "elementalResistances": {
      "physical": 110,
      "fire": 70,
      "ice": 0,
      "energy": 105,
      "earth": 100,
      "holy": 100,
      "death": 90
    },
    "killsToComplete": 1000
  },
  {
    "id": "seacrest-serpent",
    "name": "Seacrest Serpent",
    "imageUrl": "/images/creatures/seacrest-serpent.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 3000,
    "creatureCategory": "normal",
    "locations": ["Oramond Seacrest Grounds"],
    "elementalResistances": {
      "physical": 90,
      "fire": 80,
      "ice": 0,
      "energy": 100,
      "earth": 95,
      "holy": 100,
      "death": 90
    },
    "killsToComplete": 2500
  },
  {
    "id": "seagull",
    "name": "Seagull",
    "imageUrl": "/images/creatures/seagull.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "hitpoints": 25,
    "creatureCategory": "normal",
    "locations": ["Laguna Islands"],
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
    "id": "serpent-spawn",
    "name": "Serpent Spawn",
    "imageUrl": "/images/creatures/serpent-spawn.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 3000,
    "creatureCategory": "normal",
    "locations": [
      "Deeper Banuta",
      "Forbidden Islands: Talahu (Medusa Cave) and Kharos (at level -1)",
      "Razachai",
      "Deep below the Crystal Lakes in Foreigner Quarter",
      "Cult's cave in the Magician Quarter",
      "Medusa Tower"
    ],
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
    "id": "sheep",
    "name": "Sheep",
    "imageUrl": "/images/creatures/sheep.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "hitpoints": 20,
    "creatureCategory": "normal",
    "locations": [
      "In Rookgaard Sheep field",
      "Greenshore and other farms like the one in Thais",
      "east of Carlin. They can also be found wandering the fields of Edron",
      "and some can be found along with a Black Sheep with the Hunter in Femor Hills"
    ],
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
    "id": "shell-drake",
    "name": "Shell Drake",
    "imageUrl": "/images/creatures/shell-drake.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 2800,
    "creatureCategory": "normal",
    "locations": ["Crumbling Caverns"],
    "elementalResistances": {
      "physical": 95,
      "fire": 80,
      "ice": 105,
      "energy": 100,
      "earth": 105,
      "holy": 105,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "shock-head",
    "name": "Shock Head",
    "imageUrl": "/images/creatures/shock-head.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 4200,
    "creatureCategory": "normal",
    "locations": ["Lower Roshamuul"],
    "elementalResistances": {
      "physical": 90,
      "fire": 0,
      "ice": 75,
      "energy": 90,
      "earth": 0,
      "holy": 100,
      "death": 80
    },
    "killsToComplete": 2500
  },
  {
    "id": "shrieking-cry-stal",
    "name": "Shrieking Cry-Stal",
    "imageUrl": "/images/creatures/shrieking-cry-stal.gif",
    "charmPoints": 100,
    "difficulty": "CHALLENGING",
    "hitpoints": 20650,
    "creatureCategory": "normal",
    "locations": ["Crystal Enigma"],
    "elementalResistances": {
      "physical": 80,
      "fire": 95,
      "ice": 95,
      "energy": 90,
      "earth": 105,
      "holy": 0,
      "death": 100
    },
    "killsToComplete": 5000
  },
  {
    "id": "sibang",
    "name": "Sibang",
    "imageUrl": "/images/creatures/sibang.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 225,
    "creatureCategory": "normal",
    "locations": ["Port Hope Ape City"],
    "elementalResistances": {
      "physical": 100,
      "fire": 75,
      "ice": 115,
      "energy": 100,
      "earth": 100,
      "holy": 90,
      "death": 105
    },
    "killsToComplete": 500
  },
  {
    "id": "sight-of-surrender",
    "name": "Sight of Surrender",
    "imageUrl": "/images/creatures/sight-of-surrender.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 28000,
    "creatureCategory": "normal",
    "locations": ["Dark Grounds", "Guzzlemaw Valley"],
    "elementalResistances": {
      "physical": 70,
      "fire": 65,
      "ice": 60,
      "energy": 90,
      "earth": 80,
      "holy": 105,
      "death": 80
    },
    "killsToComplete": 2500
  },
  {
    "id": "silencer",
    "name": "Silencer",
    "imageUrl": "/images/creatures/silencer.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 5400,
    "creatureCategory": "normal",
    "locations": ["All over the Roshamuul surface and Nightmare Isles"],
    "elementalResistances": {
      "physical": 95,
      "fire": 70,
      "ice": 85,
      "energy": 85,
      "earth": 0,
      "holy": 125,
      "death": 35
    },
    "killsToComplete": 1000
  },
  {
    "id": "silver-rabbit",
    "name": "Silver Rabbit",
    "imageUrl": "/images/creatures/silver-rabbit.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "hitpoints": 15,
    "creatureCategory": "normal",
    "locations": ["Svargrond Mammoth Mountain (South west from depot)"],
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
    "id": "sineater-inferniarch",
    "name": "Sineater Inferniarch",
    "imageUrl": "/images/creatures/sineater-inferniarch.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 9150,
    "creatureCategory": "normal",
    "locations": ["Azzilon Castle"],
    "elementalResistances": {
      "physical": 105,
      "fire": 0,
      "ice": 105,
      "energy": 110,
      "earth": 100,
      "holy": 105,
      "death": 90
    },
    "killsToComplete": 2500
  },
  {
    "id": "skeleton",
    "name": "Skeleton",
    "imageUrl": "/images/creatures/skeleton.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 50,
    "creatureCategory": "normal",
    "locations": ["Yalahar Cemetery, Mount Sternum, Edron Vampire Crypt -1/-2"],
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
    "id": "skeleton-elite-warrior",
    "name": "Skeleton Elite Warrior",
    "imageUrl": "/images/creatures/skeleton-elite-warrior.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 7800,
    "creatureCategory": "normal",
    "locations": ["Deep Desert"],
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 100,
      "energy": 105,
      "earth": 95,
      "holy": 125,
      "death": 0
    },
    "killsToComplete": 2500
  },
  {
    "id": "skeleton-warrior",
    "name": "Skeleton Warrior",
    "imageUrl": "/images/creatures/skeleton-warrior.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 65,
    "creatureCategory": "normal",
    "locations": [
      "Island of Destiny",
      "Drefia",
      "Ghostland and beneath Fenrock"
    ],
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
    "hitpoints": 20,
    "creatureCategory": "normal",
    "locations": [
      "Unannounced raid in Edron outside the depot",
      "Tiquanda",
      "Shattered Isles",
      "Liberty Bay",
      "south gate of Thais"
    ],
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
    "hitpoints": 150,
    "creatureCategory": "normal",
    "locations": ["Vengoth Surface"],
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
    "id": "slug",
    "name": "Slug",
    "imageUrl": "/images/creatures/slug.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 255,
    "creatureCategory": "normal",
    "locations": ["South-east of Venore"],
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
    "hitpoints": 130,
    "creatureCategory": "normal",
    "locations": ["Dark Cathedral"],
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
    "id": "snake",
    "name": "Snake",
    "imageUrl": "/images/creatures/snake.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "hitpoints": 15,
    "creatureCategory": "normal",
    "locations": ["All over Tibia, Edron Vampire Crypt"],
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 110,
      "energy": 80,
      "earth": 60,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 250
  },
  {
    "id": "son-of-verminor",
    "name": "Son of Verminor",
    "imageUrl": "/images/creatures/son-of-verminor.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 8500,
    "creatureCategory": "normal",
    "locations": ["Pits of Inferno", "Demon Forge"],
    "elementalResistances": {
      "physical": 100,
      "fire": 90,
      "ice": 100,
      "energy": 80,
      "earth": 0,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "sopping-carcass",
    "name": "Sopping Carcass",
    "imageUrl": "/images/creatures/sopping-carcass.gif",
    "charmPoints": 100,
    "difficulty": "CHALLENGING",
    "hitpoints": 32700,
    "creatureCategory": "normal",
    "locations": ["Putrefactory"],
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 50,
      "energy": 65,
      "earth": 115,
      "holy": 120,
      "death": 40
    },
    "killsToComplete": 5000
  },
  {
    "id": "sopping-corpus",
    "name": "Sopping Corpus",
    "imageUrl": "/images/creatures/sopping-corpus.gif",
    "charmPoints": 100,
    "difficulty": "CHALLENGING",
    "hitpoints": 33400,
    "creatureCategory": "normal",
    "locations": ["Jaded Roots"],
    "elementalResistances": {
      "physical": 60,
      "fire": 70,
      "ice": 110,
      "energy": 120,
      "earth": 50,
      "holy": 105,
      "death": 90
    },
    "killsToComplete": 5000
  },
  {
    "id": "sorcerers-apparition",
    "name": "Sorcerer's Apparition",
    "imageUrl": "/images/creatures/sorcerers-apparition.gif",
    "charmPoints": 100,
    "difficulty": "CHALLENGING",
    "hitpoints": 25000,
    "creatureCategory": "normal",
    "locations": ["The Mirrored Nightmare", "after Mirror Images are attacked"],
    "elementalResistances": {
      "physical": 120,
      "fire": 120,
      "ice": 70,
      "energy": 100,
      "earth": 100,
      "holy": 60,
      "death": 120
    },
    "killsToComplete": 5000
  },
  {
    "id": "soul-broken-harbinger",
    "name": "Soul-Broken Harbinger",
    "imageUrl": "/images/creatures/soul-broken-harbinger.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 6300,
    "creatureCategory": "normal",
    "locations": ["Court of Winter"],
    "elementalResistances": {
      "physical": 100,
      "fire": 130,
      "ice": 45,
      "energy": 105,
      "earth": 100,
      "holy": 100,
      "death": 80
    },
    "killsToComplete": 2500
  },
  {
    "id": "souleater",
    "name": "Souleater",
    "imageUrl": "/images/creatures/souleater.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1100,
    "creatureCategory": "normal",
    "locations": ["Souleater Mountains, Deeper Banuta"],
    "elementalResistances": {
      "physical": 40,
      "fire": 110,
      "ice": 50,
      "energy": 110,
      "earth": 100,
      "holy": 110,
      "death": 0
    },
    "killsToComplete": 1000
  },
  {
    "id": "sparkion",
    "name": "Sparkion",
    "imageUrl": "/images/creatures/sparkion.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 2700,
    "creatureCategory": "normal",
    "locations": ["Otherworld"],
    "elementalResistances": {
      "physical": 95,
      "fire": 85,
      "ice": 30,
      "energy": 10,
      "earth": 115,
      "holy": 95,
      "death": 95
    },
    "killsToComplete": 2500
  },
  {
    "id": "spectre",
    "name": "Spectre",
    "imageUrl": "/images/creatures/spectre.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1350,
    "creatureCategory": "normal",
    "locations": [
      "Pits of Inferno",
      "The Crystal Caves and The Soul Wells in The Inquisition Quest",
      "Drefia Grim Reaper Dungeons",
      "Vengoth Castle and Grounds of Despair"
    ],
    "elementalResistances": {
      "physical": 10,
      "fire": 108,
      "ice": 99,
      "energy": 108,
      "earth": 0,
      "holy": 100,
      "death": 0
    },
    "killsToComplete": 1000
  },
  {
    "id": "spellreaper-inferniarch",
    "name": "Spellreaper Inferniarch",
    "imageUrl": "/images/creatures/spellreaper-inferniarch.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 11800,
    "creatureCategory": "normal",
    "locations": ["Azzilon Castle"],
    "elementalResistances": {
      "physical": 90,
      "fire": 100,
      "ice": 90,
      "energy": 0,
      "earth": 115,
      "holy": 100,
      "death": 115
    },
    "killsToComplete": 2500
  },
  {
    "id": "sphinx",
    "name": "Sphinx",
    "imageUrl": "/images/creatures/sphinx.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 8500,
    "creatureCategory": "normal",
    "locations": [
      "Nykri Delta",
      "Kilmaresh Central Steppe",
      "Kilmaresh Southern Steppe",
      "Kilmaresh Catacombs"
    ],
    "elementalResistances": {
      "physical": 100,
      "fire": 90,
      "ice": 115,
      "energy": 100,
      "earth": 100,
      "holy": 85,
      "death": 112
    },
    "killsToComplete": 2500
  },
  {
    "id": "spider",
    "name": "Spider",
    "imageUrl": "/images/creatures/spider.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "hitpoints": 20,
    "creatureCategory": "normal",
    "locations": ["All over Tibia, should be completed naturally"],
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
    "id": "spidris",
    "name": "Spidris",
    "imageUrl": "/images/creatures/spidris.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 3700,
    "creatureCategory": "normal",
    "locations": ["Inner Hive"],
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
    "imageUrl": "/images/creatures/spiky-carnivor.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 2800,
    "creatureCategory": "normal",
    "locations": ["Carnivora's Rock"],
    "elementalResistances": {
      "physical": 60,
      "fire": 130,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "spit-nettle",
    "name": "Spit Nettle",
    "imageUrl": "/images/creatures/spit-nettle.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 150,
    "creatureCategory": "normal",
    "locations": [
      "Tiquanda",
      "Trapwood",
      "the outskirts of Chor and Forbidden Lands",
      "Alchemist Quarter in Yalahar",
      "Tiquanda Laboratory"
    ],
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
    "hitpoints": 1500,
    "creatureCategory": "normal",
    "locations": ["Inner Hive"],
    "elementalResistances": {
      "physical": 100,
      "fire": 95,
      "ice": 105,
      "energy": 111,
      "earth": 0,
      "holy": 100,
      "death": 85
    },
    "killsToComplete": 1000
  },
  {
    "id": "squid-warden",
    "name": "Squid Warden",
    "imageUrl": "/images/creatures/squid-warden.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 16500,
    "creatureCategory": "normal",
    "locations": ["Secret Library ice section"],
    "elementalResistances": {
      "physical": 100,
      "fire": 115,
      "ice": 0,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "squidgy-slime",
    "name": "Squidgy Slime",
    "imageUrl": "/images/creatures/squidgy-slime.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 150,
    "creatureCategory": "normal",
    "locations": ["Horestis Tomb"],
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
    "hitpoints": 20,
    "creatureCategory": "normal",
    "locations": [
      "North of Carlin",
      "Northwest of Thais",
      "East of Kazordoon",
      "Yalahar",
      "Dawnport",
      "Edron Hunters Camp",
      "Plains of Havoc and other Tibian woods"
    ],
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
    "id": "stabilizing-dread-intruder",
    "name": "Stabilizing Dread Intruder",
    "imageUrl": "/images/creatures/stabilizing-dread-intruder.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 2800,
    "creatureCategory": "normal",
    "locations": ["Otherworld (Edron)"],
    "elementalResistances": {
      "physical": 105,
      "fire": 80,
      "ice": 95,
      "energy": 20,
      "earth": 100,
      "holy": 105,
      "death": 30
    },
    "killsToComplete": 1000
  },
  {
    "id": "stabilizing-reality-reaver",
    "name": "Stabilizing Reality Reaver",
    "imageUrl": "/images/creatures/stabilizing-reality-reaver.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 2500,
    "creatureCategory": "normal",
    "locations": ["Otherworld (Edron)"],
    "elementalResistances": {
      "physical": 100,
      "fire": 85,
      "ice": 80,
      "energy": 30,
      "earth": 110,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "stag",
    "name": "Stag",
    "imageUrl": "/images/creatures/stag.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "hitpoints": 50,
    "creatureCategory": "normal",
    "locations": ["Isle of Ada"],
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
    "imageUrl": "/images/creatures/stalker.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 120,
    "creatureCategory": "normal",
    "locations": ["Peninsula Tomb"],
    "elementalResistances": {
      "physical": 110,
      "fire": 100,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 110,
      "death": 90
    },
    "killsToComplete": 500
  },
  {
    "id": "stalking-stalk",
    "name": "Stalking Stalk",
    "imageUrl": "/images/creatures/stalking-stalk.gif",
    "charmPoints": 100,
    "difficulty": "CHALLENGING",
    "hitpoints": 17100,
    "creatureCategory": "normal",
    "locations": ["Monster Graveyard"],
    "elementalResistances": {
      "physical": 110,
      "fire": 75,
      "ice": 110,
      "energy": 115,
      "earth": 75,
      "holy": 100,
      "death": 90
    },
    "killsToComplete": 5000
  },
  {
    "id": "stampor",
    "name": "Stampor",
    "imageUrl": "/images/creatures/stampor.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1200,
    "creatureCategory": "normal",
    "locations": ["Stampor Cave Muggy Plains"],
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 90,
      "energy": 70,
      "earth": 100,
      "holy": 50,
      "death": 90
    },
    "killsToComplete": 1000
  },
  {
    "id": "starving-wolf",
    "name": "Starving Wolf",
    "imageUrl": "/images/creatures/starving-wolf.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 85,
    "creatureCategory": "normal",
    "locations": ["Ab'Dendriel Surroundings"],
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 110,
      "energy": 100,
      "earth": 100,
      "holy": 70,
      "death": 105
    },
    "killsToComplete": 500
  },
  {
    "id": "stone-devourer",
    "name": "Stone Devourer",
    "imageUrl": "/images/creatures/stone-devourer.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 4200,
    "creatureCategory": "normal",
    "locations": ["Warzone 1-3"],
    "elementalResistances": {
      "physical": 90,
      "fire": 95,
      "ice": 70,
      "energy": 70,
      "earth": 0,
      "holy": 70,
      "death": 70
    },
    "killsToComplete": 2500
  },
  {
    "id": "stone-golem",
    "name": "Stone Golem",
    "imageUrl": "/images/creatures/stone-golem.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 270,
    "creatureCategory": "normal",
    "locations": [
      "Maze of Lost Souls",
      "in and around Ashta'daramai",
      "Formorgar Mines",
      "Mad Technomancer room",
      "Dark Cathedral",
      "Demona",
      "Goroma",
      "Tarpit Tomb",
      "Peninsula Tomb",
      "Deeper Banuta",
      "Forbidden Lands",
      "Beregar Mines",
      "Farmine Mines",
      "Drillworm Caves",
      "2 caves on Hrodmir"
    ],
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
    "id": "stonerefiner",
    "name": "Stonerefiner",
    "imageUrl": "/images/creatures/stonerefiner.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 800,
    "creatureCategory": "normal",
    "locations": ["Corym Mines Venore"],
    "elementalResistances": {
      "physical": 120,
      "fire": 110,
      "ice": 120,
      "energy": 100,
      "earth": 80,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "streaked-devourer",
    "name": "Streaked Devourer",
    "imageUrl": "/images/creatures/streaked-devourer.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 7000,
    "creatureCategory": "normal",
    "locations": ["Grotto of the Lost"],
    "elementalResistances": {
      "physical": 100,
      "fire": 90,
      "ice": 115,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "sugar-cube",
    "name": "Sugar Cube",
    "imageUrl": "/images/creatures/sugar-cube.gif",
    "charmPoints": 1,
    "difficulty": "HARMLESS",
    "hitpoints": 28,
    "creatureCategory": "normal",
    "locations": ["Candia"],
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
    "id": "sugar-cube-worker",
    "name": "Sugar Cube Worker",
    "imageUrl": "/images/creatures/sugar-cube-worker.gif",
    "charmPoints": 1,
    "difficulty": "HARMLESS",
    "hitpoints": 65,
    "creatureCategory": "normal",
    "locations": ["Candia", "Chocolate Mines"],
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 90,
      "energy": 105,
      "earth": 70,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 250
  },
  {
    "id": "sulphider",
    "name": "Sulphider",
    "imageUrl": "/images/creatures/sulphider.gif",
    "charmPoints": 100,
    "difficulty": "CHALLENGING",
    "hitpoints": 21000,
    "creatureCategory": "normal",
    "locations": ["Monster Graveyard"],
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 120,
      "energy": 100,
      "earth": 100,
      "holy": 110,
      "death": 80
    },
    "killsToComplete": 5000
  },
  {
    "id": "sulphur-spouter",
    "name": "Sulphur Spouter",
    "imageUrl": "/images/creatures/sulphur-spouter.gif",
    "charmPoints": 100,
    "difficulty": "CHALLENGING",
    "hitpoints": 19000,
    "creatureCategory": "normal",
    "locations": ["Monster Graveyard"],
    "elementalResistances": {
      "physical": 100,
      "fire": 75,
      "ice": 100,
      "energy": 100,
      "earth": 100,
      "holy": 120,
      "death": 100
    },
    "killsToComplete": 5000
  },
  {
    "id": "swamp-troll",
    "name": "Swamp Troll",
    "imageUrl": "/images/creatures/swamp-troll.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 55,
    "creatureCategory": "normal",
    "locations": ["Port Hope Swamp Trolls Cave"],
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 100,
      "energy": 100,
      "earth": 85,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "swampling",
    "name": "Swampling",
    "imageUrl": "/images/creatures/swampling.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 80,
    "creatureCategory": "normal",
    "locations": [
      "Lair of the Treeling Witch",
      "Venore swamp area",
      "Venore Salamander Cave",
      "Tiquanda Laboratory"
    ],
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
    "hitpoints": 800,
    "creatureCategory": "normal",
    "locations": ["Feyrist Surface"],
    "elementalResistances": {
      "physical": 110,
      "fire": 110,
      "ice": 100,
      "energy": 100,
      "earth": 70,
      "holy": 70,
      "death": 50
    },
    "killsToComplete": 1000
  },
  {
    "id": "tainted-soul",
    "name": "Tainted Soul",
    "imageUrl": "/images/creatures/tainted-soul.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 250,
    "creatureCategory": "normal",
    "locations": ["Tainted Caves"],
    "elementalResistances": {
      "physical": 50,
      "fire": 100,
      "ice": 100,
      "energy": 80,
      "earth": 100,
      "holy": 110,
      "death": 0
    },
    "killsToComplete": 500
  },
  {
    "id": "tarantula",
    "name": "Tarantula",
    "imageUrl": "/images/creatures/tarantula.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 225,
    "creatureCategory": "normal",
    "locations": [
      "Tiquanda Tarantula Caves",
      "Spider Caves",
      "Corym Mines",
      "Trapwood ground level and underground",
      "in 2 small caves South of Thais",
      "Dark Cathedral",
      "single spawn on top of Crocodile den north of Port Hope"
    ],
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
    "id": "tarnished-spirit",
    "name": "Tarnished Spirit",
    "imageUrl": "/images/creatures/tarnished-spirit.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 150,
    "creatureCategory": "normal",
    "locations": ["Drefia"],
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
    "hitpoints": 365,
    "creatureCategory": "normal",
    "locations": ["Darashia Terramite Cave"],
    "elementalResistances": {
      "physical": 95,
      "fire": 110,
      "ice": 100,
      "energy": 105,
      "earth": 80,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "terrified-elephant",
    "name": "Terrified Elephant",
    "imageUrl": "/images/creatures/terrified-elephant.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 320,
    "creatureCategory": "normal",
    "locations": ["East of Port Hope", "close to the Deeper Banuta shortcut"],
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
    "difficulty": "EASY",
    "hitpoints": 300,
    "creatureCategory": "normal",
    "locations": ["Southern Tiquanda Coast"],
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 80,
      "energy": 80,
      "earth": 110,
      "holy": 100,
      "death": 105
    },
    "killsToComplete": 500
  },
  {
    "id": "terrorsleep",
    "name": "Terrorsleep",
    "imageUrl": "/images/creatures/terrorsleep.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 7200,
    "creatureCategory": "normal",
    "locations": ["Roshamuul Mines"],
    "elementalResistances": {
      "physical": 85,
      "fire": 65,
      "ice": 95,
      "energy": 105,
      "earth": 0,
      "holy": 110,
      "death": 45
    },
    "killsToComplete": 2500
  },
  {
    "id": "thanatursus",
    "name": "Thanatursus",
    "imageUrl": "/images/creatures/thanatursus.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 7200,
    "creatureCategory": "normal",
    "locations": [
      "Haunted Temple",
      "Court of Winter",
      "Court of Summer",
      "Dream Labyrinth"
    ],
    "elementalResistances": {
      "physical": 70,
      "fire": 100,
      "ice": 100,
      "energy": 50,
      "earth": 100,
      "holy": 80,
      "death": 120
    },
    "killsToComplete": 2500
  },
  {
    "id": "thornback-tortoise",
    "name": "Thornback Tortoise",
    "imageUrl": "/images/creatures/thornback-tortoise.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 300,
    "creatureCategory": "normal",
    "locations": ["Laguna Islands Tortoise Caves"],
    "elementalResistances": {
      "physical": 70,
      "fire": 110,
      "ice": 80,
      "energy": 100,
      "earth": 80,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "tiger",
    "name": "Tiger",
    "imageUrl": "/images/creatures/tiger.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 75,
    "creatureCategory": "normal",
    "locations": [
      "Tiquanda",
      "Meriana",
      "Arena and Zoo Quarter. Three unreachable ones are found in the Rookgaard Academy",
      "below Ankrahmun (during the Nomads Land Quest)",
      "and on Charles's ship"
    ],
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
    "hitpoints": 135,
    "creatureCategory": "normal",
    "locations": ["Laguna Islands, Tainted Soul Cave"],
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 80,
      "energy": 100,
      "earth": 80,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "tortoise",
    "name": "Tortoise",
    "imageUrl": "/images/creatures/tortoise.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 185,
    "creatureCategory": "normal",
    "locations": ["Laguna Islands Tortoise Caves"],
    "elementalResistances": {
      "physical": 80,
      "fire": 110,
      "ice": 80,
      "energy": 100,
      "earth": 80,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 500
  },
  {
    "id": "tremendous-tyrant",
    "name": "Tremendous Tyrant",
    "imageUrl": "/images/creatures/tremendous-tyrant.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 11500,
    "creatureCategory": "normal",
    "locations": ["Dwelling of the Forgotten"],
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 85,
      "energy": 80,
      "earth": 120,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "troll",
    "name": "Troll",
    "imageUrl": "/images/creatures/troll.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "hitpoints": 50,
    "creatureCategory": "normal",
    "locations": ["Edron Troll Cave"],
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
    "id": "troll-champion",
    "name": "Troll Champion",
    "imageUrl": "/images/creatures/troll-champion.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 75,
    "creatureCategory": "normal",
    "locations": [
      "Edron Troll-Goblin Peninsula",
      "Ab'dendriel Shadow Caves",
      "Thais South-East Troll Caves",
      "Dusalk's Troll Clan Cave",
      "Island of Destiny in Paladin's guild"
    ],
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
    "charmPoints": 30,
    "difficulty": "EASY",
    "hitpoints": 60,
    "creatureCategory": "rare",
    "locations": ["Rookgaard"],
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
    "id": "true-dawnfire-asura",
    "name": "True Dawnfire Asura",
    "imageUrl": "/images/creatures/true-dawnfire-asura.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 8500,
    "creatureCategory": "normal",
    "locations": ["Asura Palace", "Asura Vaults"],
    "elementalResistances": {
      "physical": 110,
      "fire": 0,
      "ice": 105,
      "energy": 110,
      "earth": 100,
      "holy": 110,
      "death": 80
    },
    "killsToComplete": 2500
  },
  {
    "id": "true-frost-flower-asura",
    "name": "True Frost Flower Asura",
    "imageUrl": "/images/creatures/true-frost-flower-asura.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 4000,
    "creatureCategory": "normal",
    "locations": ["Asura Palace", "Asura Vaults"],
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 0,
      "energy": 110,
      "earth": 110,
      "holy": 70,
      "death": 80
    },
    "killsToComplete": 2500
  },
  {
    "id": "true-midnight-asura",
    "name": "True Midnight Asura",
    "imageUrl": "/images/creatures/true-midnight-asura.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 9000,
    "creatureCategory": "normal",
    "locations": ["Asura Palace", "Asura Vaults"],
    "elementalResistances": {
      "physical": 100,
      "fire": 90,
      "ice": 90,
      "energy": 110,
      "earth": 110,
      "holy": 70,
      "death": 0
    },
    "killsToComplete": 2500
  },
  {
    "id": "truffle",
    "name": "Truffle",
    "imageUrl": "/images/creatures/truffle.gif",
    "charmPoints": 1,
    "difficulty": "HARMLESS",
    "hitpoints": 70,
    "creatureCategory": "normal",
    "locations": [
      "Candia",
      "Carlin",
      "Dessert Dungeons"
    ],
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 105,
      "energy": 100,
      "earth": 70,
      "holy": 105,
      "death": 90
    },
    "killsToComplete": 250
  },
  {
    "id": "truffle-cook",
    "name": "Truffle Cook",
    "imageUrl": "/images/creatures/truffle-cook.gif",
    "charmPoints": 1,
    "difficulty": "HARMLESS",
    "hitpoints": 54,
    "creatureCategory": "normal",
    "locations": ["Candia", "Dessert Dungeons"],
    "elementalResistances": {
      "physical": 100,
      "fire": 95,
      "ice": 105,
      "energy": 100,
      "earth": 75,
      "holy": 105,
      "death": 95
    },
    "killsToComplete": 250
  },
  {
    "id": "tunnel-tyrant",
    "name": "Tunnel Tyrant",
    "imageUrl": "/images/creatures/tunnel-tyrant.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 5200,
    "creatureCategory": "normal",
    "locations": ["Warzone 5"],
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 130,
      "energy": 80,
      "earth": 100,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "turbulent-elemental",
    "name": "Turbulent Elemental",
    "imageUrl": "/images/creatures/turbulent-elemental.gif",
    "charmPoints": 100,
    "difficulty": "CHALLENGING",
    "hitpoints": 28000,
    "creatureCategory": "normal",
    "locations": ["Ebb and Flow"],
    "elementalResistances": {
      "physical": 90,
      "fire": 120,
      "ice": 70,
      "energy": 110,
      "earth": 60,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 5000
  },
  {
    "id": "twisted-pooka",
    "name": "Twisted Pooka",
    "imageUrl": "/images/creatures/twisted-pooka.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 700,
    "creatureCategory": "normal",
    "locations": ["Dark Faun Cave"],
    "elementalResistances": {
      "physical": 80,
      "fire": 80,
      "ice": 80,
      "energy": 110,
      "earth": 60,
      "holy": 120,
      "death": 70
    },
    "killsToComplete": 1000
  },
  {
    "id": "two-headed-turtle",
    "name": "Two-Headed Turtle",
    "imageUrl": "/images/creatures/two-headed-turtle.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 5010,
    "creatureCategory": "normal",
    "locations": ["Great Pearl Fan Reef"],
    "elementalResistances": {
      "physical": 100,
      "fire": 50,
      "ice": 50,
      "energy": 90,
      "earth": 120,
      "holy": 100,
      "death": 110
    },
    "killsToComplete": 2500
  },
  {
    "id": "undead-dragon",
    "name": "Undead Dragon",
    "imageUrl": "/images/creatures/undead-dragon.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 8350,
    "creatureCategory": "normal",
    "locations": [
      "Helheim (single",
      "isolated spawn)",
      "Pits of Inferno (Ashfalor's throneroom)",
      "Demon Forge (The Shadow Nexus and The Arcanum)",
      "under Razachai (including the Inner Sanctum)",
      "Chyllfroest",
      "Oramond Fury Dungeon and Grounds of Undeath"
    ],
    "elementalResistances": {
      "physical": 95,
      "fire": 0,
      "ice": 90,
      "energy": 100,
      "earth": 0,
      "holy": 125,
      "death": 0
    },
    "killsToComplete": 2500
  },
  {
    "id": "undead-elite-gladiator",
    "name": "Undead Elite Gladiator",
    "imageUrl": "/images/creatures/undead-elite-gladiator.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 8000,
    "creatureCategory": "normal",
    "locations": ["Deep Desert"],
    "elementalResistances": {
      "physical": 100,
      "fire": 20,
      "ice": 100,
      "energy": 80,
      "earth": 110,
      "holy": 90,
      "death": 105
    },
    "killsToComplete": 2500
  },
  {
    "id": "undead-gladiator",
    "name": "Undead Gladiator",
    "imageUrl": "/images/creatures/undead-gladiator.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1000,
    "creatureCategory": "normal",
    "locations": ["Krailos Nightmare Cave"],
    "elementalResistances": {
      "physical": 100,
      "fire": 20,
      "ice": 100,
      "energy": 80,
      "earth": 110,
      "holy": 90,
      "death": 105
    },
    "killsToComplete": 1000
  },
  {
    "id": "undead-jester",
    "name": "Undead Jester",
    "imageUrl": "/images/creatures/undead-jester.gif",
    "charmPoints": 10,
    "difficulty": "TRIVIAL",
    "hitpoints": 355,
    "creatureCategory": "rare",
    "locations": [
      "Ab'Dendriel",
      "Ankrahmun",
      "Carlin",
      "Darashia",
      "Edron",
      "Kazordoon (floor -3",
      "between entrance and depot)",
      "Liberty Bay",
      "Port Hope (west",
      "east and south across river from Depot)",
      "Svargrond",
      "Thais",
      "Venore",
      "Yalahar"
    ],
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
    "hitpoints": 65,
    "creatureCategory": "normal",
    "locations": ["West of Edron in the Lost Mines"],
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
    "hitpoints": 100,
    "creatureCategory": "normal",
    "locations": ["West of Edron", "in a some Lost Mines"],
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
    "id": "undertaker",
    "name": "Undertaker",
    "imageUrl": "/images/creatures/undertaker.gif",
    "charmPoints": 100,
    "difficulty": "CHALLENGING",
    "hitpoints": 20100,
    "creatureCategory": "normal",
    "locations": ["Monster Graveyard"],
    "elementalResistances": {
      "physical": 115,
      "fire": 100,
      "ice": 100,
      "energy": 110,
      "earth": 90,
      "holy": 105,
      "death": 60
    },
    "killsToComplete": 5000
  },
  {
    "id": "usurper-archer",
    "name": "Usurper Archer",
    "imageUrl": "/images/creatures/usurper-archer.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 7300,
    "creatureCategory": "normal",
    "locations": ["Bounac", "the Order of the Lion settlement"],
    "elementalResistances": {
      "physical": 90,
      "fire": 90,
      "ice": 80,
      "energy": 100,
      "earth": 100,
      "holy": 90,
      "death": 120
    },
    "killsToComplete": 2500
  },
  {
    "id": "usurper-knight",
    "name": "Usurper Knight",
    "imageUrl": "/images/creatures/usurper-knight.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 8200,
    "creatureCategory": "normal",
    "locations": ["Bounac", "the Order of the Lion settlement"],
    "elementalResistances": {
      "physical": 85,
      "fire": 90,
      "ice": 80,
      "energy": 100,
      "earth": 100,
      "holy": 85,
      "death": 115
    },
    "killsToComplete": 2500
  },
  {
    "id": "usurper-warlock",
    "name": "Usurper Warlock",
    "imageUrl": "/images/creatures/usurper-warlock.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 7500,
    "creatureCategory": "normal",
    "locations": ["Bounac", "the Order of the Lion settlement"],
    "elementalResistances": {
      "physical": 90,
      "fire": 95,
      "ice": 70,
      "energy": 100,
      "earth": 100,
      "holy": 68,
      "death": 110
    },
    "killsToComplete": 2500
  },
  {
    "id": "valkyrie",
    "name": "Valkyrie",
    "imageUrl": "/images/creatures/valkyrie.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 190,
    "creatureCategory": "normal",
    "locations": [
      "Amazon Camp (Venore)",
      "Amazon Camp (Carlin)",
      "Amazonia",
      "single respawn to the north west of Thais",
      "Foreigner Quarter in Yalahar"
    ],
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
    "hitpoints": 475,
    "creatureCategory": "normal",
    "locations": ["Edron Vampire Crypt, Peninsula Tomb"],
    "elementalResistances": {
      "physical": 75,
      "fire": 110,
      "ice": 100,
      "energy": 100,
      "earth": 0,
      "holy": 125,
      "death": 0
    },
    "killsToComplete": 1000
  },
  {
    "id": "vampire-bride",
    "name": "Vampire Bride",
    "imageUrl": "/images/creatures/vampire-bride.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1200,
    "creatureCategory": "normal",
    "locations": ["Edron Vampire Crypt"],
    "elementalResistances": {
      "physical": 100,
      "fire": 110,
      "ice": 80,
      "energy": 90,
      "earth": 80,
      "holy": 110,
      "death": 0
    },
    "killsToComplete": 1000
  },
  {
    "id": "vampire-pig",
    "name": "Vampire Pig",
    "imageUrl": "/images/creatures/vampire-pig.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 305,
    "creatureCategory": "normal",
    "locations": ["Isle of Evil on the surface"],
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
    "id": "vampire-viscount",
    "name": "Vampire Viscount",
    "imageUrl": "/images/creatures/vampire-viscount.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1200,
    "creatureCategory": "normal",
    "locations": ["Edron Vampire Crypt"],
    "elementalResistances": {
      "physical": 90,
      "fire": 105,
      "ice": 90,
      "energy": 100,
      "earth": 0,
      "holy": 125,
      "death": 0
    },
    "killsToComplete": 1000
  },
  {
    "id": "varg",
    "name": "Varg",
    "imageUrl": "/images/creatures/varg.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 5400,
    "creatureCategory": "normal",
    "locations": ["Norcferatu Dungeons", "Norcferatu Fortress"],
    "elementalResistances": {
      "physical": 95,
      "fire": 105,
      "ice": 105,
      "energy": 90,
      "earth": 100,
      "holy": 95,
      "death": 75
    },
    "killsToComplete": 2500
  },
  {
    "id": "varnished-diremaw",
    "name": "Varnished Diremaw",
    "imageUrl": "/images/creatures/varnished-diremaw.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 9000,
    "creatureCategory": "normal",
    "locations": ["Dwelling of the Forgotten"],
    "elementalResistances": {
      "physical": 105,
      "fire": 100,
      "ice": 95,
      "energy": 85,
      "earth": 105,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "venerable-girtablilu",
    "name": "Venerable Girtablilu",
    "imageUrl": "/images/creatures/venerable-girtablilu.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 8500,
    "creatureCategory": "normal",
    "locations": ["Ruins of Nuur"],
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 110,
      "earth": 80,
      "holy": 120,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "vexclaw",
    "name": "Vexclaw",
    "imageUrl": "/images/creatures/vexclaw.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 8500,
    "creatureCategory": "normal",
    "locations": [
      "Grounds of Damnation",
      "Grounds of Deceit",
      "Grounds of Despair",
      "Grounds of Destruction",
      "Grounds of Fire",
      "Grounds of Undeath",
      "Halls of Ascension and Hell Hub"
    ],
    "elementalResistances": {
      "physical": 95,
      "fire": 25,
      "ice": 105,
      "energy": 90,
      "earth": 60,
      "holy": 110,
      "death": 80
    },
    "killsToComplete": 2500
  },
  {
    "id": "vibrant-phantom",
    "name": "Vibrant Phantom",
    "imageUrl": "/images/creatures/vibrant-phantom.gif",
    "charmPoints": 100,
    "difficulty": "CHALLENGING",
    "hitpoints": 27000,
    "creatureCategory": "normal",
    "locations": ["Furious Crater"],
    "elementalResistances": {
      "physical": 110,
      "fire": 100,
      "ice": 100,
      "energy": 80,
      "earth": 110,
      "holy": 90,
      "death": 110
    },
    "killsToComplete": 5000
  },
  {
    "id": "vicious-squire",
    "name": "Vicious Squire",
    "imageUrl": "/images/creatures/vicious-squire.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1000,
    "creatureCategory": "normal",
    "locations": [
      "Old Fortress (north of Edron)",
      "Old Masonry",
      "Forbidden Temple (Carlin)"
    ],
    "elementalResistances": {
      "physical": 90,
      "fire": 70,
      "ice": 90,
      "energy": 60,
      "earth": 50,
      "holy": 50,
      "death": 120
    },
    "killsToComplete": 1000
  },
  {
    "id": "vile-grandmaster",
    "name": "Vile Grandmaster",
    "imageUrl": "/images/creatures/vile-grandmaster.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1700,
    "creatureCategory": "normal",
    "locations": [
      "Old Fortress (north of Edron)",
      "Old Masonry",
      "Forbidden Temple (Carlin)"
    ],
    "elementalResistances": {
      "physical": 80,
      "fire": 75,
      "ice": 90,
      "energy": 75,
      "earth": 75,
      "holy": 50,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "vulcongra",
    "name": "Vulcongra",
    "imageUrl": "/images/creatures/vulcongra.gif",
    "charmPoints": 5,
    "difficulty": "HARD",
    "hitpoints": 1600,
    "creatureCategory": "normal",
    "locations": ["Hot Spot (in Gnomebase Alpha)", "Jaccus Maxxen's Dungeon"],
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
    "id": "wafer-paper-butterfly",
    "name": "Wafer Paper Butterfly",
    "imageUrl": "/images/creatures/wafer-paper-butterfly.gif",
    "charmPoints": 1,
    "difficulty": "HARMLESS",
    "hitpoints": 2,
    "creatureCategory": "normal",
    "locations": [
      "Candia",
      "Carlin",
      "Edron Surroundings",
      "Thais"
    ],
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
    "id": "walker",
    "name": "Walker",
    "imageUrl": "/images/creatures/walker.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 3000,
    "creatureCategory": "normal",
    "locations": ["Underground Glooth Factory, Rathleton Sewers"],
    "elementalResistances": {
      "physical": 95,
      "fire": 65,
      "ice": 95,
      "energy": 100,
      "earth": 50,
      "holy": 60,
      "death": 85
    },
    "killsToComplete": 1000
  },
  {
    "id": "walking-dread",
    "name": "Walking Dread",
    "imageUrl": "/images/creatures/walking-dread.gif",
    "charmPoints": 100,
    "difficulty": "CHALLENGING",
    "hitpoints": 25000,
    "creatureCategory": "normal",
    "locations": ["Forgotten Crypt"],
    "elementalResistances": {
      "physical": 109,
      "fire": 88,
      "ice": 112,
      "energy": 109,
      "earth": 91,
      "holy": 100,
      "death": 103
    },
    "killsToComplete": 5000
  },
  {
    "id": "walking-pillar",
    "name": "Walking Pillar",
    "imageUrl": "/images/creatures/walking-pillar.gif",
    "charmPoints": 100,
    "difficulty": "CHALLENGING",
    "hitpoints": 38000,
    "creatureCategory": "normal",
    "locations": ["Darklight Core"],
    "elementalResistances": {
      "physical": 110,
      "fire": 115,
      "ice": 55,
      "energy": 40,
      "earth": 115,
      "holy": 100,
      "death": 90
    },
    "killsToComplete": 5000
  },
  {
    "id": "wandering-pillar",
    "name": "Wandering Pillar",
    "imageUrl": "/images/creatures/wandering-pillar.gif",
    "charmPoints": 100,
    "difficulty": "CHALLENGING",
    "hitpoints": 37000,
    "creatureCategory": "normal",
    "locations": ["Gloom Pillars"],
    "elementalResistances": {
      "physical": 115,
      "fire": 40,
      "ice": 100,
      "energy": 110,
      "earth": 100,
      "holy": 50,
      "death": 115
    },
    "killsToComplete": 5000
  },
  {
    "id": "war-golem",
    "name": "War Golem",
    "imageUrl": "/images/creatures/war-golem.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 4300,
    "creatureCategory": "normal",
    "locations": ["Oramond Catacombs - Golem stage"],
    "elementalResistances": {
      "physical": 90,
      "fire": 85,
      "ice": 70,
      "energy": 95,
      "earth": 50,
      "holy": 50,
      "death": 80
    },
    "killsToComplete": 1000
  },
  {
    "id": "war-wolf",
    "name": "War Wolf",
    "imageUrl": "/images/creatures/war-wolf.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 140,
    "creatureCategory": "normal",
    "locations": [
      "Orc Fort",
      "the Orc Peninsula",
      "Magician Tower and northwest (tower) or south (underground) of Thais",
      "Zao steppe (encaged)",
      "Vengoth"
    ],
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
    "id": "wardragon",
    "name": "Wardragon",
    "imageUrl": "/images/creatures/wardragon.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 6960,
    "creatureCategory": "normal",
    "locations": ["Nimmersatt's Breeding Ground"],
    "elementalResistances": {
      "physical": 100,
      "fire": 60,
      "ice": 110,
      "energy": 105,
      "earth": 110,
      "holy": 105,
      "death": 85
    },
    "killsToComplete": 2500
  },
  {
    "id": "warlock",
    "name": "Warlock",
    "imageUrl": "/images/creatures/warlock.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 3500,
    "creatureCategory": "normal",
    "locations": ["Demona"],
    "elementalResistances": {
      "physical": 105,
      "fire": 0,
      "ice": 0,
      "energy": 0,
      "earth": 5,
      "holy": 108,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "wasp",
    "name": "Wasp",
    "imageUrl": "/images/creatures/wasp.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "hitpoints": 35,
    "creatureCategory": "normal",
    "locations": [
      "South of Thais",
      "west of Ab'Dendriel",
      "northeastern Cormaya",
      "Green Claw Swamp between Kazordoon and Venore",
      "Wasp Tower in Rookgaard",
      "Wasp Towers in Darashia",
      "all over Tiquanda",
      "and all over Vandura",
      "roaming around Marapur"
    ],
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
    "hitpoints": 1100,
    "creatureCategory": "normal",
    "locations": ["Inner Hive"],
    "elementalResistances": {
      "physical": 102,
      "fire": 110,
      "ice": 100,
      "energy": 75,
      "earth": 0,
      "holy": 107,
      "death": 95
    },
    "killsToComplete": 1000
  },
  {
    "id": "water-buffalo",
    "name": "Water Buffalo",
    "imageUrl": "/images/creatures/water-buffalo.gif",
    "charmPoints": 30,
    "difficulty": "EASY",
    "hitpoints": 390,
    "creatureCategory": "rare",
    "locations": ["Marshland"],
    "elementalResistances": {
      "physical": 80,
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
    "id": "weakened-frazzlemaw",
    "name": "Weakened Frazzlemaw",
    "imageUrl": "/images/creatures/weakened-frazzlemaw.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1200,
    "creatureCategory": "normal",
    "locations": ["Feyrist Mini Rosha"],
    "elementalResistances": {
      "physical": 95,
      "fire": 90,
      "ice": 95,
      "energy": 85,
      "earth": 80,
      "holy": 105,
      "death": 90
    },
    "killsToComplete": 1000
  },
  {
    "id": "weeper",
    "name": "Weeper",
    "imageUrl": "/images/creatures/weeper.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 6800,
    "creatureCategory": "normal",
    "locations": ["Warzone 1-3"],
    "elementalResistances": {
      "physical": 105,
      "fire": 0,
      "ice": 105,
      "energy": 100,
      "earth": 0,
      "holy": 100,
      "death": 70
    },
    "killsToComplete": 2500
  },
  {
    "id": "werebadger",
    "name": "Werebadger",
    "imageUrl": "/images/creatures/werebadger.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1700,
    "creatureCategory": "normal",
    "locations": ["Grimvale", "Edron Lycanthropes Cave"],
    "elementalResistances": {
      "physical": 95,
      "fire": 105,
      "ice": 105,
      "energy": 90,
      "earth": 50,
      "holy": 105,
      "death": 60
    },
    "killsToComplete": 1000
  },
  {
    "id": "werebear",
    "name": "Werebear",
    "imageUrl": "/images/creatures/werebear.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 2400,
    "creatureCategory": "normal",
    "locations": [
      "Grimvale underground",
      "Edron Lycanthropes Cave",
      "in the Last Sanctum east of Cormaya"
    ],
    "elementalResistances": {
      "physical": 95,
      "fire": 105,
      "ice": 90,
      "energy": 85,
      "earth": 50,
      "holy": 105,
      "death": 55
    },
    "killsToComplete": 1000
  },
  {
    "id": "wereboar",
    "name": "Wereboar",
    "imageUrl": "/images/creatures/wereboar.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 2200,
    "creatureCategory": "normal",
    "locations": ["Grimvale", "Edron Lycanthropes Cave"],
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 95,
      "energy": 85,
      "earth": 50,
      "holy": 105,
      "death": 50
    },
    "killsToComplete": 1000
  },
  {
    "id": "werecrocodile",
    "name": "Werecrocodile",
    "imageUrl": "/images/creatures/werecrocodile.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 5280,
    "creatureCategory": "normal",
    "locations": ["Murky Caverns"],
    "elementalResistances": {
      "physical": 90,
      "fire": 75,
      "ice": 125,
      "energy": 105,
      "earth": 95,
      "holy": 115,
      "death": 75
    },
    "killsToComplete": 2500
  },
  {
    "id": "werefox",
    "name": "Werefox",
    "imageUrl": "/images/creatures/werefox.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1500,
    "creatureCategory": "normal",
    "locations": ["Edron Lycanthropes Cave"],
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
    "id": "werehyaena",
    "name": "Werehyaena",
    "imageUrl": "/images/creatures/werehyaena.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 2700,
    "creatureCategory": "normal",
    "locations": ["Darashia Wyrm Hills (only during night)", "Hyaena Lairs"],
    "elementalResistances": {
      "physical": 100,
      "fire": 50,
      "ice": 120,
      "energy": 100,
      "earth": 60,
      "holy": 125,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "werehyaena-shaman",
    "name": "Werehyaena Shaman",
    "imageUrl": "/images/creatures/werehyaena-shaman.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 2500,
    "creatureCategory": "normal",
    "locations": ["Darashia Wyrm Hills (only during night)", "Hyaena Lairs"],
    "elementalResistances": {
      "physical": 100,
      "fire": 75,
      "ice": 120,
      "energy": 100,
      "earth": 60,
      "holy": 95,
      "death": 105
    },
    "killsToComplete": 1000
  },
  {
    "id": "werelion",
    "name": "Werelion",
    "imageUrl": "/images/creatures/werelion.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 2800,
    "creatureCategory": "normal",
    "locations": ["Lion Sanctum"],
    "elementalResistances": {
      "physical": 100,
      "fire": 75,
      "ice": 125,
      "energy": 100,
      "earth": 50,
      "holy": 100,
      "death": 55
    },
    "killsToComplete": 2500
  },
  {
    "id": "werelioness",
    "name": "Werelioness",
    "imageUrl": "/images/creatures/werelioness.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 3000,
    "creatureCategory": "normal",
    "locations": ["Lion Sanctum"],
    "elementalResistances": {
      "physical": 100,
      "fire": 65,
      "ice": 125,
      "energy": 100,
      "earth": 60,
      "holy": 105,
      "death": 50
    },
    "killsToComplete": 2500
  },
  {
    "id": "werepanther",
    "name": "Werepanther",
    "imageUrl": "/images/creatures/werepanther.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 4200,
    "creatureCategory": "normal",
    "locations": ["Murky Caverns", "Oskayaat"],
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 115,
      "energy": 110,
      "earth": 90,
      "holy": 125,
      "death": 80
    },
    "killsToComplete": 2500
  },
  {
    "id": "weretiger",
    "name": "Weretiger",
    "imageUrl": "/images/creatures/weretiger.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 5000,
    "creatureCategory": "normal",
    "locations": ["Oskayaat", "Oskayaat Undercity"],
    "elementalResistances": {
      "physical": 105,
      "fire": 125,
      "ice": 70,
      "energy": 75,
      "earth": 115,
      "holy": 90,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "werewolf",
    "name": "Werewolf",
    "imageUrl": "/images/creatures/werewolf.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1955,
    "creatureCategory": "normal",
    "locations": [
      "Vengoth Castle",
      "Vengoth Werewolf Cave",
      "Grimvale",
      "Edron Lycanthropes Cave"
    ],
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 105,
      "energy": 85,
      "earth": 25,
      "holy": 105,
      "death": 45
    },
    "killsToComplete": 1000
  },
  {
    "id": "white-deer",
    "name": "White Deer",
    "imageUrl": "/images/creatures/white-deer.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "hitpoints": 195,
    "creatureCategory": "normal",
    "locations": [
      "Ab'Dendriel",
      "Carlin",
      "Femor Hills",
      "Ferngrims Gate"
    ],
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
    "id": "white-lion",
    "name": "White Lion",
    "imageUrl": "/images/creatures/white-lion.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 2700,
    "creatureCategory": "normal",
    "locations": ["Lion Sanctum"],
    "elementalResistances": {
      "physical": 100,
      "fire": 75,
      "ice": 120,
      "energy": 100,
      "earth": 70,
      "holy": 100,
      "death": 60
    },
    "killsToComplete": 2500
  },
  {
    "id": "white-shade",
    "name": "White Shade",
    "imageUrl": "/images/creatures/white-shade.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 260,
    "creatureCategory": "normal",
    "locations": ["Drefia"],
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
    "id": "white-tiger",
    "name": "White Tiger",
    "imageUrl": "/images/creatures/white-tiger.gif",
    "charmPoints": 15,
    "difficulty": "EASY",
    "hitpoints": 75,
    "creatureCategory": "normal",
    "locations": ["Oskayaat"],
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 110,
      "energy": 100,
      "earth": 100,
      "holy": 100,
      "death": 110
    },
    "killsToComplete": 1000
  },
  {
    "id": "white-weretiger",
    "name": "White Weretiger",
    "imageUrl": "/images/creatures/white-weretiger.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 6100,
    "creatureCategory": "normal",
    "locations": ["Oskayaat", "Oskayaat Undercity"],
    "elementalResistances": {
      "physical": 105,
      "fire": 115,
      "ice": 60,
      "energy": 40,
      "earth": 120,
      "holy": 75,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "wild-horse",
    "name": "Wild Horse",
    "imageUrl": "/images/creatures/wild-horse.gif",
    "charmPoints": 10,
    "difficulty": "TRIVIAL",
    "hitpoints": 75,
    "creatureCategory": "rare",
    "locations": ["Near the Thais Troll Cave entrance"],
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
    "hitpoints": 135,
    "creatureCategory": "normal",
    "locations": ["Dark Cathedral"],
    "elementalResistances": {
      "physical": 105,
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
    "id": "wilting-leaf-golem",
    "name": "Wilting Leaf Golem",
    "imageUrl": "/images/creatures/wilting-leaf-golem.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 380,
    "creatureCategory": "normal",
    "locations": ["Dryad Gardens"],
    "elementalResistances": {
      "physical": 100,
      "fire": 105,
      "ice": 105,
      "energy": 100,
      "earth": 60,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 1000
  },
  {
    "id": "winter-wolf",
    "name": "Winter Wolf",
    "imageUrl": "/images/creatures/winter-wolf.gif",
    "charmPoints": 15,
    "difficulty": "TRIVIAL",
    "hitpoints": 30,
    "creatureCategory": "normal",
    "locations": ["Svargrond Mammoth Mountain (South west from depot)"],
    "elementalResistances": {
      "physical": 100,
      "fire": 90,
      "ice": 80,
      "energy": 105,
      "earth": 100,
      "holy": 90,
      "death": 110
    },
    "killsToComplete": 500
  },
  {
    "id": "wisp",
    "name": "Wisp",
    "imageUrl": "/images/creatures/wisp.gif",
    "charmPoints": 5,
    "difficulty": "TRIVIAL",
    "hitpoints": 115,
    "creatureCategory": "normal",
    "locations": [
      "Tiquanda",
      "Feyrist",
      "North of Edron"
    ],
    "elementalResistances": {
      "physical": 40,
      "fire": 100,
      "ice": 100,
      "energy": 60,
      "earth": 10,
      "holy": 100,
      "death": 0
    },
    "killsToComplete": 500
  },
  {
    "id": "witch",
    "name": "Witch",
    "imageUrl": "/images/creatures/witch.gif",
    "charmPoints": 5,
    "difficulty": "EASY",
    "hitpoints": 300,
    "creatureCategory": "normal",
    "locations": ["Vandura", "west of the Dwarf Mines in a small house"],
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
    "difficulty": "TRIVIAL",
    "hitpoints": 25,
    "creatureCategory": "normal",
    "locations": ["All over Tibia, should be completed naturally"],
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 110,
      "energy": 100,
      "earth": 100,
      "holy": 70,
      "death": 105
    },
    "killsToComplete": 250
  },
  {
    "id": "worker-golem",
    "name": "Worker Golem",
    "imageUrl": "/images/creatures/worker-golem.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1470,
    "creatureCategory": "normal",
    "locations": ["Oramond Catacombs - Golem stage"],
    "elementalResistances": {
      "physical": 90,
      "fire": 100,
      "ice": 90,
      "energy": 105,
      "earth": 50,
      "holy": 50,
      "death": 90
    },
    "killsToComplete": 1000
  },
  {
    "id": "wyrm",
    "name": "Wyrm",
    "imageUrl": "/images/creatures/wyrm.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1825,
    "creatureCategory": "normal",
    "locations": [
      "Drefia Wyrm Lair",
      "Vandura Wyrm Cave",
      "Liberty Bay Wyrm Lair"
    ],
    "elementalResistances": {
      "physical": 100,
      "fire": 80,
      "ice": 105,
      "energy": 0,
      "earth": 25,
      "holy": 100,
      "death": 105
    },
    "killsToComplete": 1000
  },
  {
    "id": "yielothax",
    "name": "Yielothax",
    "imageUrl": "/images/creatures/yielothax.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1500,
    "creatureCategory": "normal",
    "locations": ["Yielothax Dimension"],
    "elementalResistances": {
      "physical": 110,
      "fire": 75,
      "ice": 105,
      "energy": 105,
      "earth": 0,
      "holy": 100,
      "death": 50
    },
    "killsToComplete": 1000
  },
  {
    "id": "young-goanna",
    "name": "Young Goanna",
    "imageUrl": "/images/creatures/young-goanna.gif",
    "charmPoints": 50,
    "difficulty": "HARD",
    "hitpoints": 6950,
    "creatureCategory": "normal",
    "locations": [
      "Kilmaresh Central Steppe",
      "Kilmaresh Southern Steppe",
      "Green Belt"
    ],
    "elementalResistances": {
      "physical": 100,
      "fire": 100,
      "ice": 100,
      "energy": 120,
      "earth": 80,
      "holy": 100,
      "death": 100
    },
    "killsToComplete": 2500
  },
  {
    "id": "young-sea-serpent",
    "name": "Young Sea Serpent",
    "imageUrl": "/images/creatures/young-sea-serpent.gif",
    "charmPoints": 25,
    "difficulty": "MEDIUM",
    "hitpoints": 1050,
    "creatureCategory": "normal",
    "locations": ["Svargrond Sea Serpent Area"],
    "elementalResistances": {
      "physical": 120,
      "fire": 70,
      "ice": 0,
      "energy": 110,
      "earth": 105,
      "holy": 100,
      "death": 115
    },
    "killsToComplete": 1000
  }
];

/**
 * Filtered bestiary data - excludes creatures that are not part of the official bestiary
 * Use this for the Bestiary Planner to ensure accurate tracking
 */
export const VALID_BESTIARY_DATA = filterValidBestiaryCreatures(BESTIARY_DATA);
