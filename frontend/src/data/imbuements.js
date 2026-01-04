/**
 * Imbuement presets data for Tibia
 * Contains all imbuement types with their required materials
 */

export const IMBUEMENT_CATEGORIES = {
  SKILL_BOOST: 'Aumento de Skill',
  ELEMENTAL_DAMAGE: 'Dano Elemental',
  ELEMENTAL_PROTECTION: 'Proteção Elemental',
  SUPPORT: 'Suporte',
};

export const IMBUEMENTS = [
  // ===================
  // AUMENTO DE SKILL
  // ===================
  {
    id: 'blockade',
    category: IMBUEMENT_CATEGORIES.SKILL_BOOST,
    name: 'Blockade',
    description: 'Skillboost de Escudo',
    tiers: {
      basic: {
        items: [{ name: 'Piece of Scarab Shell', quantity: 20 }]
      },
      intricate: {
        items: [{ name: 'Brimstone Shell', quantity: 25 }]
      },
      powerful: {
        items: [{ name: 'Frazzle Skin', quantity: 25 }]
      },
    },
  },
  {
    id: 'chop',
    category: IMBUEMENT_CATEGORIES.SKILL_BOOST,
    name: 'Chop',
    description: 'Skillboost de Machado',
    tiers: {
      basic: {
        items: [{ name: 'Orc Tooth', quantity: 20 }]
      },
      intricate: {
        items: [{ name: 'Battle Stone', quantity: 25 }]
      },
      powerful: {
        items: [{ name: 'Moohtant Horn', quantity: 20 }]
      },
    },
  },
  {
    id: 'epiphany',
    category: IMBUEMENT_CATEGORIES.SKILL_BOOST,
    name: 'Epiphany',
    description: 'Skillboost de Nível Mágico',
    tiers: {
      basic: {
        items: [{ name: 'Elvish Talisman', quantity: 25 }]
      },
      intricate: {
        items: [{ name: 'Broken Shamanic Staff', quantity: 15 }]
      },
      powerful: {
        items: [{ name: 'Strand of Medusa Hair', quantity: 15 }]
      },
    },
  },
  {
    id: 'precision',
    category: IMBUEMENT_CATEGORIES.SKILL_BOOST,
    name: 'Precision',
    description: 'Skillboost de Distância',
    tiers: {
      basic: {
        items: [{ name: 'Elven Scouting Glass', quantity: 25 }]
      },
      intricate: {
        items: [{ name: 'Elven Hoof', quantity: 20 }]
      },
      powerful: {
        items: [{ name: 'Metal Spike', quantity: 10 }]
      },
    },
  },
  {
    id: 'slash',
    category: IMBUEMENT_CATEGORIES.SKILL_BOOST,
    name: 'Slash',
    description: 'Skillboost de Espada',
    tiers: {
      basic: {
        items: [{ name: "Lion's Mane", quantity: 25 }]
      },
      intricate: {
        items: [{ name: "Mooh'tah Shell", quantity: 25 }]
      },
      powerful: {
        items: [{ name: 'War Crystal', quantity: 5 }]
      },
    },
  },
  {
    id: 'bash',
    category: IMBUEMENT_CATEGORIES.SKILL_BOOST,
    name: 'Bash',
    description: 'Skillboost de Clava',
    tiers: {
      basic: {
        items: [{ name: 'Cyclops Toe', quantity: 20 }]
      },
      intricate: {
        items: [{ name: 'Ogre Nose Ring', quantity: 15 }]
      },
      powerful: {
        items: [{ name: "Warmaster's Wristguards", quantity: 10 }]
      },
    },
  },
  {
    id: 'punch',
    category: IMBUEMENT_CATEGORIES.SKILL_BOOST,
    name: 'Punch',
    description: 'Skillboost de Punhos',
    tiers: {
      basic: {
        items: [{ name: 'Tarantula Egg', quantity: 25 }]
      },
      intricate: {
        items: [{ name: 'Mantassin Tail', quantity: 20 }]
      },
      powerful: {
        items: [{ name: 'Gold-Brocaded Cloth', quantity: 15 }]
      },
    },
  },

  // ===================
  // DANO ELEMENTAL
  // ===================
  {
    id: 'reap',
    category: IMBUEMENT_CATEGORIES.ELEMENTAL_DAMAGE,
    name: 'Reap',
    description: 'Dano de Morte',
    tiers: {
      basic: {
        items: [{ name: 'Pile of Grave Earth', quantity: 25 }]
      },
      intricate: {
        items: [{ name: 'Demonic Skeletal Hand', quantity: 20 }]
      },
      powerful: {
        items: [{ name: 'Petrified Scream', quantity: 5 }]
      },
    },
  },
  {
    id: 'electrify',
    category: IMBUEMENT_CATEGORIES.ELEMENTAL_DAMAGE,
    name: 'Electrify',
    description: 'Dano de Energia',
    tiers: {
      basic: {
        items: [{ name: 'Rorc Feather', quantity: 25 }]
      },
      intricate: {
        items: [{ name: 'Peacock Feather Fan', quantity: 5 }]
      },
      powerful: {
        items: [{ name: 'Energy Vein', quantity: 1 }]
      },
    },
  },
  {
    id: 'venom',
    category: IMBUEMENT_CATEGORIES.ELEMENTAL_DAMAGE,
    name: 'Venom',
    description: 'Dano de Terra',
    tiers: {
      basic: {
        items: [{ name: 'Swamp Grass', quantity: 25 }]
      },
      intricate: {
        items: [{ name: 'Poisonous Slime', quantity: 20 }]
      },
      powerful: {
        items: [{ name: 'Slime Heart', quantity: 2 }]
      },
    },
  },
  {
    id: 'frost',
    category: IMBUEMENT_CATEGORIES.ELEMENTAL_DAMAGE,
    name: 'Frost',
    description: 'Dano de Gelo',
    tiers: {
      basic: {
        items: [{ name: 'Frosty Heart', quantity: 25 }]
      },
      intricate: {
        items: [{ name: 'Seacrest Hair', quantity: 10 }]
      },
      powerful: {
        items: [{ name: 'Polar Bear Paw', quantity: 5 }]
      },
    },
  },
  {
    id: 'scorch',
    category: IMBUEMENT_CATEGORIES.ELEMENTAL_DAMAGE,
    name: 'Scorch',
    description: 'Dano de Fogo',
    tiers: {
      basic: {
        items: [{ name: 'Fiery Heart', quantity: 25 }]
      },
      intricate: {
        items: [{ name: 'Green Dragon Scale', quantity: 5 }]
      },
      powerful: {
        items: [{ name: 'Demon Horn', quantity: 5 }]
      },
    },
  },

  // ===================
  // PROTEÇÃO ELEMENTAL
  // ===================
  {
    id: 'cloud_fabric',
    category: IMBUEMENT_CATEGORIES.ELEMENTAL_PROTECTION,
    name: 'Cloud Fabric',
    description: 'Proteção de Energia',
    tiers: {
      basic: {
        items: [{ name: 'Wyvern Talisman', quantity: 20 }]
      },
      intricate: {
        items: [{ name: 'Crawler Head Plating', quantity: 15 }]
      },
      powerful: {
        items: [{ name: 'Wyrm Scale', quantity: 10 }]
      },
    },
  },
  {
    id: 'demon_presence',
    category: IMBUEMENT_CATEGORIES.ELEMENTAL_PROTECTION,
    name: 'Demon Presence',
    description: 'Proteção de Sagrado',
    tiers: {
      basic: {
        items: [{ name: 'Cultish Robe', quantity: 25 }]
      },
      intricate: {
        items: [{ name: 'Cultish Mask', quantity: 25 }]
      },
      powerful: {
        items: [{ name: 'Hellspawn Tail', quantity: 20 }]
      },
    },
  },
  {
    id: 'dragon_hide',
    category: IMBUEMENT_CATEGORIES.ELEMENTAL_PROTECTION,
    name: 'Dragon Hide',
    description: 'Proteção de Fogo',
    tiers: {
      basic: {
        items: [{ name: 'Green Dragon Leather', quantity: 20 }]
      },
      intricate: {
        items: [{ name: 'Blazing Bone', quantity: 10 }]
      },
      powerful: {
        items: [{ name: 'Draken Sulphur', quantity: 5 }]
      },
    },
  },
  {
    id: 'lich_shroud',
    category: IMBUEMENT_CATEGORIES.ELEMENTAL_PROTECTION,
    name: 'Lich Shroud',
    description: 'Proteção de Morte',
    tiers: {
      basic: {
        items: [{ name: 'Flask of Embalming Fluid', quantity: 25 }]
      },
      intricate: {
        items: [{ name: 'Gloom Wolf Fur', quantity: 20 }]
      },
      powerful: {
        items: [{ name: 'Mystical Hourglass', quantity: 5 }]
      },
    },
  },
  {
    id: 'quara_scale',
    category: IMBUEMENT_CATEGORIES.ELEMENTAL_PROTECTION,
    name: 'Quara Scale',
    description: 'Proteção de Gelo',
    tiers: {
      basic: {
        items: [{ name: 'Winter Wolf Fur', quantity: 25 }]
      },
      intricate: {
        items: [{ name: 'Thick Fur', quantity: 15 }]
      },
      powerful: {
        items: [{ name: 'Deepling Warts', quantity: 10 }]
      },
    },
  },
  {
    id: 'snake_skin',
    category: IMBUEMENT_CATEGORIES.ELEMENTAL_PROTECTION,
    name: 'Snake Skin',
    description: 'Proteção de Terra',
    tiers: {
      basic: {
        items: [{ name: 'Piece of Swampling Wood', quantity: 25 }]
      },
      intricate: {
        items: [{ name: 'Snake Skin', quantity: 20 }]
      },
      powerful: {
        items: [{ name: 'Brimstone Fangs', quantity: 10 }]
      },
    },
  },

  // ===================
  // SUPORTE
  // ===================
  {
    id: 'featherweight',
    category: IMBUEMENT_CATEGORIES.SUPPORT,
    name: 'Featherweight',
    description: 'Aumento de Capacidade',
    tiers: {
      basic: {
        items: [{ name: 'Fairy Wings', quantity: 20 }]
      },
      intricate: {
        items: [{ name: 'Little Bowl of Myrrh', quantity: 10 }]
      },
      powerful: {
        items: [{ name: 'Goosebump Leather', quantity: 5 }]
      },
    },
  },
  {
    id: 'strike',
    category: IMBUEMENT_CATEGORIES.SUPPORT,
    name: 'Strike',
    description: 'Dano Crítico',
    tiers: {
      basic: {
        items: [{ name: 'Protective Charm', quantity: 20 }]
      },
      intricate: {
        items: [{ name: 'Sabretooth', quantity: 25 }]
      },
      powerful: {
        items: [{ name: 'Vexclaw Talon', quantity: 5 }]
      },
    },
  },
  {
    id: 'swiftness',
    category: IMBUEMENT_CATEGORIES.SUPPORT,
    name: 'Swiftness',
    description: 'Skillboost de Velocidade',
    tiers: {
      basic: {
        items: [{ name: 'Damselfly Wing', quantity: 15 }]
      },
      intricate: {
        items: [{ name: 'Compass', quantity: 25 }]
      },
      powerful: {
        items: [{ name: 'Waspoid Wing', quantity: 20 }]
      },
    },
  },
  {
    id: 'vampirism',
    category: IMBUEMENT_CATEGORIES.SUPPORT,
    name: 'Vampirism',
    description: 'Roubo de Vida',
    tiers: {
      basic: {
        items: [{ name: 'Vampire Teeth', quantity: 25 }]
      },
      intricate: {
        items: [{ name: 'Bloody Pincers', quantity: 15 }]
      },
      powerful: {
        items: [{ name: 'Piece of Dead Brain', quantity: 5 }]
      },
    },
  },
  {
    id: 'vibrancy',
    category: IMBUEMENT_CATEGORIES.SUPPORT,
    name: 'Vibrancy',
    description: 'Remoção de Paralisia',
    tiers: {
      basic: {
        items: [{ name: 'Wereboar Hooves', quantity: 20 }]
      },
      intricate: {
        items: [{ name: 'Crystallized Anger', quantity: 15 }]
      },
      powerful: {
        items: [{ name: 'Quill', quantity: 5 }]
      },
    },
  },
  {
    id: 'void',
    category: IMBUEMENT_CATEGORIES.SUPPORT,
    name: 'Void',
    description: 'Roubo de Mana',
    tiers: {
      basic: {
        items: [{ name: 'Rope Belt', quantity: 25 }]
      },
      intricate: {
        items: [{ name: 'Silencer Claws', quantity: 25 }]
      },
      powerful: {
        items: [{ name: 'Some Grimeleech Wings', quantity: 5 }]
      },
    },
  },
];

/**
 * Get imbuement by ID
 */
export function getImbuementById(id) {
  return IMBUEMENTS.find(imb => imb.id === id);
}

/**
 * Get all imbuements by category
 */
export function getImbuementsByCategory(category) {
  return IMBUEMENTS.filter(imb => imb.category === category);
}

/**
 * Get all categories
 */
export function getAllCategories() {
  return Object.values(IMBUEMENT_CATEGORIES);
}
