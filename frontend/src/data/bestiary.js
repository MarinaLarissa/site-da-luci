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
export const BESTIARY_DATA = [
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
  }
];