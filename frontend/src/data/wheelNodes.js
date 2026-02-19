/**
 * Tibia Wheel of Destiny — Slice Data
 *
 * Structure: 4 quadrants × 9 slices = 36 slices total
 * Each slice has a point bar (1–maxPoints). Each point spent gives a Dedication Perk.
 * Completing the bar (maxPoints) gives a Conviction Perk.
 *
 * Quadrant order in flat arrays: [bottomRight, bottomLeft, topLeft, topRight]
 *   bottomRight → purple/SE (90°–180°)
 *   bottomLeft  → blue/SW   (180°–270°)
 *   topLeft     → green/NW  (270°–360°)
 *   topRight    → yellow/NE (0°–90°)
 *
 * Circle structure per quadrant: 1×50 → 2×75 → 3×100 → 2×150 → 1×200
 *
 * Data source: https://gitlab.com/klhio/tibia-wheel (CC BY-SA 3.0, 2022)
 * Monk data: pending
 */

// ─── Dedication Perks ─────────────────────────────────────────────────────────
// Per-point bonus received for each point spent in a slice.

export const DEDICATION_PERKS = [
  { id: 0, name: 'hp',                    template: '+%1 HP',                          effects: { knight: [3], paladin: [2], druid: [1], sorcerer: [1] } },
  { id: 1, name: 'mana',                  template: '+%1 MP',                          effects: { knight: [1], paladin: [3], druid: [6], sorcerer: [6] } },
  { id: 2, name: 'hp_mana',               template: '+%1 HP / +%2 MP',                 effects: { knight: [3, 1], paladin: [2, 3], druid: [1, 6], sorcerer: [1, 6] } },
  { id: 3, name: 'capacity',              template: '+%1 Capacity',                    effects: { knight: [5], paladin: [4], druid: [2], sorcerer: [2] } },
  { id: 4, name: 'hp_regen_boost_chance', template: '+%1% HP regen burst chance',      effects: { all: [0.2] } },
  { id: 5, name: 'mana_regen_boost_chance', template: '+%1% MP regen burst chance',    effects: { all: [0.2] } },
  { id: 6, name: 'familiar_expertise',    template: '+%1% / +%2% familiar health/dmg', effects: { all: [0.3, 0.1] } },
  { id: 7, name: 'familiar_cooldown',     template: '-%1s familiar cooldown',          effects: { all: [1] } },
  { id: 8, name: 'mitigation',            template: '+%1% mitigation multiplier',      effects: { all: [0.03] } },
];

/** Format a dedication perk description for a given vocation */
export function formatDedicationPerk(perkId, vocation) {
  const perk = DEDICATION_PERKS[perkId];
  if (!perk) return '';
  const vals = perk.effects[vocation] || perk.effects.all || [];
  return perk.template.replace(/%(\d+)/g, (_, i) => vals[parseInt(i) - 1] ?? '?');
}

// ─── Conviction Perks ─────────────────────────────────────────────────────────
// Bonus received upon completing (fully maxing) a slice.

export const CONVICTION_PERKS = [
  { id: 0,  name: 'Fire Resistance',                  description: '+2% fire resistance' },
  { id: 1,  name: 'Energy Resistance',                description: '+2% energy resistance' },
  { id: 2,  name: 'Ice Resistance',                   description: '+2% ice resistance' },
  { id: 3,  name: 'Earth Resistance',                 description: '+2% earth resistance' },
  { id: 4,  name: 'Holy/Death Resistance',            description: '+1% holy and death resistance' },
  { id: 5,  name: 'Mana Leech',                       description: '+0.25% mana leech' },
  { id: 6,  name: 'Life Leech',                       description: '+0.75% life leech' },
  { id: 7,  name: 'Sword/Axe/Club Fighting',          description: '+1 sword/axe/club fighting' },
  { id: 8,  name: 'Battle Instinct',                  description: 'Gain +6 shielding and +1 sword/axe/club fighting when 5 creatures are on adjacent squares. For each additional creature (up to 8), gain +6 shielding and +1 fighting more.' },
  { id: 9,  name: 'Battle Healing',                   description: 'For each creature challenged, heal yourself for a small amount. Doubles below 60% HP, triples below 30% HP.' },
  { id: 10, name: 'Augmented Fierce Berserk',         description: 'Tier 1: -30 mana cost. Tier 2: increased damage.' },
  { id: 11, name: 'Augmented Intense Wound Cleansing',description: 'Tier 1: increased healing. Tier 2: -300s cooldown.' },
  { id: 12, name: 'Augmented Front Sweep',            description: 'Tier 1: +5% life leech. Tier 2: increased damage.' },
  { id: 13, name: 'Augmented Groundshaker',           description: 'Tier 1: increased damage. Tier 2: -2s cooldown.' },
  { id: 14, name: 'Augmented Chivalrous Challenge',   description: 'Tier 1: -20 mana cost. Tier 2: jumps to 1 additional target.' },
  { id: 15, name: 'Distance Fighting',                description: '+1 distance fighting' },
  { id: 16, name: 'Ballistic Mastery',                description: '+10% critical extra damage with crossbow. With bow, attacks treat physical/holy sensitivity as 2% higher.' },
  { id: 17, name: 'Positional Tactics',               description: '+3 distance fighting when no monster within 1 square; otherwise +3 holy and +3 healing magic level.' },
  { id: 18, name: 'Augmented Divine Caldera',         description: 'Tier 1: -20 mana cost. Tier 2: increased damage.' },
  { id: 19, name: 'Augmented Swift Foot',             description: 'Tier 1: -8s secondary cooldown, attacks/spells with 50% less damage. Tier 2: -6s cooldown, damage no longer reduced.' },
  { id: 20, name: 'Augmented Divine Dazzle',          description: 'Tier 1: jumps to +1 target. Tier 2: +4s duration, -4s cooldown.' },
  { id: 21, name: 'Augmented Strong Ethereal Spear',  description: 'Tier 1: -2s cooldown. Tier 2: increased damage.' },
  { id: 22, name: 'Augmented Sharpshooter',           description: 'Tier 1: enables support spells, -8s secondary cooldown. Tier 2: -6s cooldown, distance skill 40%→45%.' },
  { id: 23, name: 'Focus Mastery',                    description: 'Increases damage of your next spell by 35% within 11s after casting a focus spell.' },
  { id: 24, name: 'Augmented Great Fire Wave',        description: 'Tier 1: 15% critical extra damage, 10% critical chance (not cumulative). Tier 2: increased damage.' },
  { id: 25, name: 'Augmented Energy Wave',            description: 'Tier 1: increased damage. Tier 2: increased area.' },
  { id: 26, name: 'Augmented Sap Strength',           description: 'Tier 1: increased area. Tier 2: increased damage reduction.' },
  { id: 27, name: 'Augmented Focus Spells',           description: 'Tier 1: increased damage. Tier 2: -4s cooldown.' },
  { id: 28, name: 'Healing Link',                     description: "Healing someone with Nature's Embrace or Heal Friend also heals yourself for 10% of the applied healing." },
  { id: 29, name: 'Augmented Heal Friend',            description: 'Tier 1: -10 mana cost. Tier 2: increased heal.' },
  { id: 30, name: 'Augmented Terra Wave',             description: 'Tier 1: increased damage. Tier 2: +5% life leech.' },
  { id: 31, name: 'Augmented Strong Ice Wave',        description: 'Tier 1: +3% mana leech. Tier 2: increased damage.' },
  { id: 32, name: 'Augmented Mass Healing',           description: 'Tier 1: increased heal. Tier 2: increased area.' },
  { id: 33, name: "Augmented Nature's Embrace",       description: 'Tier 1: increased heal. Tier 2: -10s cooldown.' },
  { id: 34, name: 'Magic Level',                      description: '+1 magic level' },
  { id: 35, name: 'Runic Mastery',                    description: '25% chance to increase magic level by 10% when using a rune (20% for vocation runes).' },
  { id: 36, name: 'Augmented Magic Shield',           description: 'Tier 1: enhanced effect. Tier 2: -6s cooldown.' },
];

// ─── Revelation Perks ─────────────────────────────────────────────────────────
// One per quadrant per vocation. Auto-unlocked at 250 / 500 / 1000 points spent
// in that quadrant (any combination of slices).

export const REVELATION_PERKS = [
  {
    id: 0, name: 'Gift of Life',
    tiers: [
      { points: 250,  description: 'If an attack would kill you but overkill < 20% max HP, heal 20% max HP. All cooldowns reduced by 60s. Cooldown: 30 hours.' },
      { points: 500,  description: 'If an attack would kill you but overkill < 25% max HP, heal 25% max HP. All cooldowns reduced by 60s. Cooldown: 20 hours.' },
      { points: 1000, description: 'If an attack would kill you but overkill < 30% max HP, heal 30% max HP. All cooldowns reduced by 60s. Cooldown: 10 hours.' },
    ],
  },
  {
    id: 1, name: "Executioner's Throw",
    tiers: [
      { points: 250,  description: 'Throw weapon at target, bounce to 2 nearby enemies. +100 dmg to targets below 30% HP. Cooldown: 18s. Mana: 225.' },
      { points: 500,  description: 'Throw weapon at target, bounce to 3 nearby enemies. +125 dmg to targets below 30% HP. Cooldown: 14s. Mana: 225.' },
      { points: 1000, description: 'Throw weapon at target, bounce to 4 nearby enemies. +150 dmg to targets below 30% HP. Cooldown: 10s. Mana: 225.' },
    ],
  },
  {
    id: 2, name: 'Combat Mastery',
    tiers: [
      { points: 250,  description: '+10 shield defence value. +4 critical extra damage while wielding a two-handed weapon.' },
      { points: 500,  description: '+20 shield defence value. +8 critical extra damage while wielding a two-handed weapon.' },
      { points: 1000, description: '+30 shield defence value. +12 critical extra damage while wielding a two-handed weapon.' },
    ],
  },
  {
    id: 3, name: 'Avatar of Steel',
    tiers: [
      { points: 250,  description: 'Transform into a powerful avatar for 15s. 5 damage reduction, all attacks are critical hits with 5 extra damage. Cooldown: 120 min.' },
      { points: 500,  description: 'Transform into a powerful avatar for 15s. 10 damage reduction, all attacks are critical hits with 10 extra damage. Cooldown: 90 min.' },
      { points: 1000, description: 'Transform into a powerful avatar for 15s. 15 damage reduction, all attacks are critical hits with 15 extra damage. Cooldown: 60 min.' },
    ],
  },
  {
    id: 4, name: 'Divine Grenade',
    tiers: [
      { points: 250,  description: 'Plant a marker at target\'s feet that explodes after 3s dealing holy damage. Cooldown: 26s. Mana: 160.' },
      { points: 500,  description: 'Plant a marker at target\'s feet that explodes after 3s dealing more holy damage. Cooldown: 20s. Mana: 160.' },
      { points: 1000, description: 'Plant a marker at target\'s feet that explodes after 3s dealing even more holy damage. Cooldown: 14s. Mana: 160.' },
    ],
  },
  {
    id: 5, name: 'Divine Empowerment',
    tiers: [
      { points: 250,  description: 'Deploy a 3×3 field of holy energy for 5s. Damage dealt increased by 8%. Cooldown: 32s. Mana: 500.' },
      { points: 500,  description: 'Deploy a 3×3 field of holy energy for 5s. Damage dealt increased by 10%. Cooldown: 28s. Mana: 500.' },
      { points: 1000, description: 'Deploy a 3×3 field of holy energy for 5s. Damage dealt increased by 12%. Cooldown: 14s. Mana: 500.' },
    ],
  },
  {
    id: 6, name: 'Avatar of Light',
    tiers: [
      { points: 250,  description: 'Transform into a powerful avatar for 15s. 5 damage reduction, all attacks are critical hits with 5 extra damage. Cooldown: 120 min.' },
      { points: 500,  description: 'Transform into a powerful avatar for 15s. 10 damage reduction, all attacks are critical hits with 10 extra damage. Cooldown: 90 min.' },
      { points: 1000, description: 'Transform into a powerful avatar for 15s. 15 damage reduction, all attacks are critical hits with 15 extra damage. Cooldown: 60 min.' },
    ],
  },
  {
    id: 7, name: 'Beam Mastery',
    tiers: [
      { points: 250,  description: 'Unlocks a death damage beam spell. Each target hit (up to 3): -10s all cooldowns, +140% beam damage. Cooldown: 10s. Mana: 140.' },
      { points: 500,  description: 'Beam Mastery Stage 2. Each target hit (up to 3): -12s all cooldowns, +140% beam damage. Cooldown: 8s. Mana: 140.' },
      { points: 1000, description: 'Beam Mastery Stage 3. Each target hit (up to 3): -14s all cooldowns, +140% beam damage. Cooldown: 6s. Mana: 140.' },
    ],
  },
  {
    id: 8, name: 'Drain Body',
    tiers: [
      { points: 250,  description: '+1% mana leech to creatures affected by Expose Weakness. +3% life leech to creatures affected by Sap Strength.' },
      { points: 500,  description: '+2% mana leech to creatures affected by Expose Weakness. +4% life leech to creatures affected by Sap Strength.' },
      { points: 1000, description: '+3% mana leech to creatures affected by Expose Weakness. +5% life leech to creatures affected by Sap Strength.' },
    ],
  },
  {
    id: 9, name: 'Avatar of Storm',
    tiers: [
      { points: 250,  description: 'Transform into a powerful avatar for 15s. 5 damage reduction, all attacks are critical hits with 5 extra damage. Cooldown: 120 min.' },
      { points: 500,  description: 'Transform into a powerful avatar for 15s. 10 damage reduction, all attacks are critical hits with 10 extra damage. Cooldown: 90 min.' },
      { points: 1000, description: 'Transform into a powerful avatar for 15s. 15 damage reduction, all attacks are critical hits with 15 extra damage. Cooldown: 60 min.' },
    ],
  },
  {
    id: 10, name: 'Twin Bursts',
    tiers: [
      { points: 250,  description: 'Ring spells deal ice or earth damage. +20% damage to targets above 60% HP. Cooldown: 22s. Mana: 230.' },
      { points: 500,  description: 'Ring spells deal ice or earth damage. +40% damage to targets above 60% HP. Cooldown: 18s. Mana: 230.' },
      { points: 1000, description: 'Ring spells deal ice or earth damage. +60% damage to targets above 60% HP. Cooldown: 14s. Mana: 230.' },
    ],
  },
  {
    id: 11, name: 'Blessing of the Grove',
    tiers: [
      { points: 250,  description: "Healing increased based on target's HP: +6% at 30–60%, +12% below 30%." },
      { points: 500,  description: "Healing increased based on target's HP: +9% at 30–60%, +18% below 30%." },
      { points: 1000, description: "Healing increased based on target's HP: +12% at 30–60%, +24% below 30%." },
    ],
  },
  {
    id: 12, name: 'Avatar of Nature',
    tiers: [
      { points: 250,  description: 'Transform into a powerful avatar for 15s. 5 damage reduction, all attacks are critical hits with 5 extra damage. Cooldown: 120 min.' },
      { points: 500,  description: 'Transform into a powerful avatar for 15s. 10 damage reduction, all attacks are critical hits with 10 extra damage. Cooldown: 90 min.' },
      { points: 1000, description: 'Transform into a powerful avatar for 15s. 15 damage reduction, all attacks are critical hits with 15 extra damage. Cooldown: 60 min.' },
    ],
  },
];

// ─── Flat data arrays (from data.yaml) ────────────────────────────────────────
// Flat index ordering: for each circle, slices go [all BR slices, all BL slices, all TL slices, all TR slices]

const DEDICATION_FLAT = [
  // circle 1 (4 slices — 1 per quadrant)
  0, 1, 3, 8,
  // circle 2 (8 slices — 2 per quadrant)
  8, 8,  0, 0,  1, 1,  3, 3,
  // circle 3 (12 slices — 3 per quadrant)
  3, 3, 3,  8, 8, 8,  0, 0, 0,  1, 1, 1,
  // circle 4 (8 slices — 2 per quadrant)
  1, 1,  3, 3,  8, 8,  0, 0,
  // circle 5 (4 slices — 1 per quadrant)
  2, 2, 2, 2,
];

const CONVICTION_FLAT = {
  knight: [
    2, 12, 3, 10,
    7, 4,  0, 5,  7, 4,  1, 6,
    13, 11, 5,  7, 14, 1,  11, 13, 6,  7, 14, 0,
    6, 3,  6, 4,  5, 2,  5, 4,
    9, 10, 8, 12,
  ],
  druid: [
    2, 31, 3, 29,
    34, 4,  0, 5,  34, 4,  1, 6,
    32, 30, 5,  34, 33, 1,  30, 32, 6,  34, 33, 0,
    6, 3,  6, 4,  5, 2,  5, 4,
    35, 29, 28, 31,
  ],
  paladin: [
    2, 22, 3, 18,
    15, 4,  0, 5,  15, 4,  1, 6,
    21, 19, 5,  15, 20, 1,  19, 21, 6,  15, 20, 0,
    6, 3,  6, 4,  5, 2,  5, 4,
    16, 18, 17, 22,
  ],
  sorcerer: [
    2, 27, 3, 24,
    34, 4,  0, 5,  34, 4,  1, 6,
    36, 25, 5,  34, 26, 1,  25, 36, 6,  34, 26, 0,
    6, 3,  6, 4,  5, 2,  5, 4,
    23, 24, 35, 27,
  ],
  monk: null, // data pending
};

// Revelation perk index per quadrant [BR, BL, TL, TR]
const REVELATION_FLAT = {
  knight:   [3, 2, 0, 1],
  druid:    [12, 10, 0, 11],
  paladin:  [6, 5, 0, 4],
  sorcerer: [9, 8, 0, 7],
  monk:     null, // data pending
};

// ─── Circle structure ─────────────────────────────────────────────────────────

const CIRCLE_STRUCTURE = [
  { circle: 1, maxPoints: 50,  countPerQuadrant: 1 },
  { circle: 2, maxPoints: 75,  countPerQuadrant: 2 },
  { circle: 3, maxPoints: 100, countPerQuadrant: 3 },
  { circle: 4, maxPoints: 150, countPerQuadrant: 2 },
  { circle: 5, maxPoints: 200, countPerQuadrant: 1 },
];

const QUADRANT_ORDER = ['bottomRight', 'bottomLeft', 'topLeft', 'topRight'];

/** Compute required predecessor slice IDs for adjacency validation.
 * Cross-quadrant adjacency: boundary slices can be unlocked by adjacent
 * slices in the neighboring quadrant (same circle level, 6° gap). */
function buildRequires(circle, qi, pos) {
  if (circle === 1) return [];

  const prevQi = (qi - 1 + 4) % 4;
  const nextQi = (qi + 1) % 4;

  // c2: needs c1 of same quadrant (flatIdx = qi)
  if (circle === 2) return [qi];

  // c3: needs adjacent c2 slices, including cross-quadrant at boundaries
  // c2 flat indices: 4 + qi*2 + pos
  if (circle === 3) {
    if (pos === 0) return [
      4 + qi * 2,             // same-quad c2 pos=0
      4 + prevQi * 2 + 1,    // prev-quad c2 pos=1 (cross-quadrant left edge)
    ];
    if (pos === 1) return [
      4 + qi * 2,             // same-quad c2 pos=0
      4 + qi * 2 + 1,        // same-quad c2 pos=1
    ];
    if (pos === 2) return [
      4 + qi * 2 + 1,        // same-quad c2 pos=1
      4 + nextQi * 2,        // next-quad c2 pos=0 (cross-quadrant right edge)
    ];
  }

  // c4: needs adjacent c3 slices, including cross-quadrant at boundaries
  // c3 flat indices: 12 + qi*3 + pos
  if (circle === 4) {
    if (pos === 0) return [
      12 + qi * 3,            // same-quad c3 pos=0
      12 + qi * 3 + 1,       // same-quad c3 pos=1
      12 + prevQi * 3 + 2,   // prev-quad c3 pos=2 (cross-quadrant left edge)
    ];
    if (pos === 1) return [
      12 + qi * 3 + 1,       // same-quad c3 pos=1
      12 + qi * 3 + 2,       // same-quad c3 pos=2
      12 + nextQi * 3,       // next-quad c3 pos=0 (cross-quadrant right edge)
    ];
  }

  // c5: needs either c4 slice of same quadrant (flatIdx = 24 + qi*2 + p)
  if (circle === 5) return [24 + qi * 2, 24 + qi * 2 + 1];
  return [];
}

function buildWheelSlices() {
  const slices = [];
  let flatIdx = 0;

  for (const { circle, maxPoints, countPerQuadrant } of CIRCLE_STRUCTURE) {
    for (let qi = 0; qi < 4; qi++) {
      for (let pos = 0; pos < countPerQuadrant; pos++) {
        const quadrant = QUADRANT_ORDER[qi];

        const convictionByVocation = {};
        for (const [voc, arr] of Object.entries(CONVICTION_FLAT)) {
          if (arr) convictionByVocation[voc] = arr[flatIdx];
        }

        slices.push({
          id: flatIdx,
          quadrant,
          circle,
          maxPoints,
          slicePosition: pos,
          dedicationPerkId: DEDICATION_FLAT[flatIdx],
          convictionByVocation,
          requires: buildRequires(circle, qi, pos),
        });

        flatIdx++;
      }
    }
  }

  return slices;
}

export const WHEEL_SLICES = buildWheelSlices();

// ─── Revelation config per vocation ──────────────────────────────────────────

/** Returns the revelation perk ID for a given vocation + quadrant */
export function getRevelationPerkId(vocation, quadrant) {
  const arr = REVELATION_FLAT[vocation];
  if (!arr) return null;
  const qi = QUADRANT_ORDER.indexOf(quadrant);
  return qi >= 0 ? arr[qi] : null;
}

// ─── Quadrant visual config ───────────────────────────────────────────────────

export const QUADRANT_CONFIG = {
  topLeft: {
    label: 'Combat',
    startAngle: 270,
    endAngle:   360,
    colors: { bg: '#0d2009', mid: '#1e4d12', bright: '#3d8b2f', node: '#52c23c', glow: '#7aff5e' },
  },
  topRight: {
    label: 'Storm',
    startAngle: 0,
    endAngle:   90,
    colors: { bg: '#1e1504', mid: '#4a3800', bright: '#c8a020', node: '#e8c030', glow: '#ffe060' },
  },
  bottomRight: {
    label: 'Mystic',
    startAngle: 90,
    endAngle:   180,
    colors: { bg: '#130820', mid: '#2d0d40', bright: '#7a30aa', node: '#a848d0', glow: '#d070ff' },
  },
  bottomLeft: {
    label: 'Support',
    startAngle: 180,
    endAngle:   270,
    colors: { bg: '#050d1e', mid: '#0a1835', bright: '#2a4a9a', node: '#3868c8', glow: '#60a0ff' },
  },
};

// ─── Circle radii ─────────────────────────────────────────────────────────────
// SVG coordinates (viewBox 500×500, center 250,250)

export const CIRCLE_RADII = {
  1: { innerR: 52,  outerR: 88  },
  2: { innerR: 91,  outerR: 127 },
  3: { innerR: 130, outerR: 165 },
  4: { innerR: 168, outerR: 203 },
  5: { innerR: 206, outerR: 241 },
};

/** Angular bounds for a slice given its quadrant, circle, and position within quadrant */
export function getSliceAngles(quadrant, circle, slicePosition) {
  const QUADRANT_BOUNDS = {
    bottomRight: { start: 93,  end: 177 },
    bottomLeft:  { start: 183, end: 267 },
    topLeft:     { start: 273, end: 357 },
    topRight:    { start: 3,   end: 87  },
  };
  const SLICE_COUNTS = { 1: 1, 2: 2, 3: 3, 4: 2, 5: 1 };

  const { start, end } = QUADRANT_BOUNDS[quadrant];
  const count = SLICE_COUNTS[circle];
  const GAP = 1.5; // degrees between adjacent slices within quadrant
  const span = end - start;
  const sliceSpan = (span - (count - 1) * GAP) / count;

  const sliceStart = start + slicePosition * (sliceSpan + GAP);
  const sliceEnd   = sliceStart + sliceSpan;
  return { startAngle: sliceStart, endAngle: sliceEnd };
}

// ─── Helper functions ─────────────────────────────────────────────────────────

export const getSliceById = (id) => WHEEL_SLICES.find((s) => s.id === id) ?? null;

/** Total points spent across all slices */
export const calcTotalUsed = (slicePoints) =>
  Object.values(slicePoints || {}).reduce((s, v) => s + v, 0);

/** Total points spent within a specific quadrant */
export const calcQuadrantTotal = (slicePoints, quadrant) =>
  WHEEL_SLICES
    .filter((s) => s.quadrant === quadrant)
    .reduce((sum, s) => sum + ((slicePoints || {})[s.id] || 0), 0);

/** Returns true if a slice can receive more points (adjacency + points available) */
export function isSliceUnlockable(slice, slicePoints) {
  if (slice.requires.length === 0) return true;
  return slice.requires.some((reqId) => {
    const req = getSliceById(reqId);
    return req && ((slicePoints || {})[reqId] || 0) >= req.maxPoints;
  });
}

/** Revelation stages unlocked for a given vocation + quadrant */
export function getRevealedStages(slicePoints, vocation, quadrant) {
  const perkId = getRevelationPerkId(vocation, quadrant);
  if (perkId === null) return [];
  const perk = REVELATION_PERKS[perkId];
  if (!perk) return [];
  const total = calcQuadrantTotal(slicePoints, quadrant);
  return perk.tiers.filter((t) => total >= t.points);
}

/**
 * Calculate aggregate stats from slicePoints + vocation.
 * Returns HP/Mana/Capacity gained from Dedication Perks only
 * (Conviction and Revelation perks are descriptive, not aggregated here).
 */
export const calculateBuildStats = (slicePoints, vocation) => {
  const stats = { hp: 0, mana: 0, capacity: 0, hpRegen: 0, manaRegen: 0, mitigation: 0 };

  Object.entries(slicePoints || {}).forEach(([idStr, points]) => {
    if (!points) return;
    const slice = getSliceById(parseInt(idStr, 10));
    if (!slice) return;

    const ded = DEDICATION_PERKS[slice.dedicationPerkId];
    if (!ded) return;

    const vals = ded.effects[vocation] ?? ded.effects.all ?? [];

    switch (ded.name) {
      case 'hp':                    stats.hp        += vals[0] * points; break;
      case 'mana':                  stats.mana      += vals[0] * points; break;
      case 'hp_mana':               stats.hp        += vals[0] * points; stats.mana += vals[1] * points; break;
      case 'capacity':              stats.capacity  += vals[0] * points; break;
      case 'hp_regen_boost_chance': stats.hpRegen   += vals[0] * points; break;
      case 'mana_regen_boost_chance': stats.manaRegen += vals[0] * points; break;
      case 'mitigation':            stats.mitigation += vals[0] * points; break;
      default: break;
    }
  });

  return stats;
};

// ─── Gem Atelier data (unchanged) ─────────────────────────────────────────────

export const GEM_TYPES = { LESSER: 'lesser', REGULAR: 'regular', GREATER: 'greater' };

export const GEM_CONFIG = {
  lesser:  { label: 'Lesser Gem',  slots: 1, color: '#5a7a9a', icon: '◆' },
  regular: { label: 'Regular Gem', slots: 2, color: '#9a6a2a', icon: '◆' },
  greater: { label: 'Greater Gem', slots: 3, color: '#8B6914', icon: '◆' },
};

export const GEM_MODS = [
  { id: 'hp',          label: '+HP',              grades: [50, 75, 100, 125] },
  { id: 'mana',        label: '+Mana',             grades: [50, 75, 100, 125] },
  { id: 'damage',      label: '+% Damage',         grades: [1, 2, 3, 4] },
  { id: 'healing',     label: '+% Healing',        grades: [1, 2, 3, 4] },
  { id: 'crit_chance', label: '+% Crit Chance',    grades: [1, 2, 3, 4] },
  { id: 'phys_res',    label: '+% Physical Res',   grades: [1, 2, 3, 4] },
  { id: 'fire_res',    label: '+% Fire Res',       grades: [2, 3, 4, 5] },
  { id: 'ice_res',     label: '+% Ice Res',        grades: [2, 3, 4, 5] },
  { id: 'energy_res',  label: '+% Energy Res',     grades: [2, 3, 4, 5] },
  { id: 'earth_res',   label: '+% Earth Res',      grades: [2, 3, 4, 5] },
  { id: 'death_res',   label: '+% Death Res',      grades: [2, 3, 4, 5] },
  { id: 'holy_res',    label: '+% Holy Res',       grades: [2, 3, 4, 5] },
  { id: 'life_leech',  label: '+% Life Leech',     grades: [1, 2, 3, 4] },
  { id: 'mana_leech',  label: '+% Mana Leech',     grades: [1, 2, 3, 4] },
  { id: 'dmg_heal_1',  label: '+1 Damage/Healing', grades: [1, 1, 1, 1], supreme: true },
  { id: 'dmg_heal_2',  label: '+2 Damage/Healing', grades: [1, 1, 1, 1], supreme: true },
];

export const VESSEL_NAMES = {
  topLeft:     'Dormant Vessel (Combat)',
  topRight:    'Dormant Vessel (Storm)',
  bottomRight: 'Dormant Vessel (Mystic)',
  bottomLeft:  'Dormant Vessel (Support)',
};
