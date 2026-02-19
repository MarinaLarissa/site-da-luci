/**
 * Wheel of Destiny Storage Service
 * Handles localStorage persistence for wheel builds per character.
 *
 * Storage structure:
 * {
 *   version: '2.0',
 *   lastUpdated: 'ISO-date',
 *   builds: {
 *     'char-uuid-1': [
 *       {
 *         id: 'build-uuid-1',
 *         name: 'Full Tank Build',
 *         vocation: 'knight',
 *         createdAt: 'ISO-date',
 *         points: { total: 1200, used: 850, promotion: 50 },
 *         slicePoints: { 2: 50, 8: 30, ... },
 *         stats: { hp: 0, mana: 0, capacity: 0, ... }
 *       }
 *     ]
 *   }
 * }
 */

import Joi from 'joi';
import { generateUUID } from '../utils/uuid';
import { validateBuild } from '../data/wheelData';
import { calcTotalUsed, calculateBuildStats } from '../data/wheelNodes';

const STORAGE_KEY = 'luci_wheel_builds';
const CURRENT_VERSION = '2.0';
const MAX_BUILDS_PER_CHARACTER = 10;

// ─── Joi schemas ──────────────────────────────────────────────────────────────

const pointsSchema = Joi.object({
  total:     Joi.number().integer().min(0).required(),
  used:      Joi.number().integer().min(0).required(),
  promotion: Joi.number().integer().min(0).max(100).required(),
});

const buildSchema = Joi.object({
  id:          Joi.string().required(),
  name:        Joi.string().min(1).max(100).required(),
  vocation:    Joi.string().valid('knight', 'paladin', 'sorcerer', 'druid', 'monk').required(),
  createdAt:   Joi.string().isoDate().required(),
  points:      pointsSchema.required(),
  slicePoints: Joi.object().pattern(Joi.number(), Joi.number().integer().min(0)).required(),
  stats:       Joi.object().optional(),
});

const wheelDataSchema = Joi.object({
  version:     Joi.string().required(),
  lastUpdated: Joi.string().isoDate().required(),
  builds:      Joi.object().pattern(
    Joi.string(),
    Joi.array().items(buildSchema).max(MAX_BUILDS_PER_CHARACTER)
  ).required(),
});

// ─── Helpers ──────────────────────────────────────────────────────────────────


const getDefaultStorage = () => ({
  version: CURRENT_VERSION,
  lastUpdated: new Date().toISOString(),
  builds: {},
});

/** Migrate a build from v1 (selectedPerks[]) to v2 (slicePoints{}) if needed */
const migrateBuild = (build) => {
  if (build.slicePoints) return build; // already v2
  return {
    ...build,
    slicePoints: {},
    stats: { hp: 0, mana: 0, capacity: 0, hpRegen: 0, manaRegen: 0, mitigation: 0 },
    points: { ...build.points, used: 0 },
    // drop legacy selectedPerks
  };
};

const loadData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultStorage();

    const parsed = JSON.parse(raw);

    // Attempt schema validation; on failure reset
    const { error } = wheelDataSchema.validate(parsed);
    if (error) {
      // Try to migrate from v1 if version mismatch
      if (parsed.builds) {
        try {
          const migrated = {
            ...parsed,
            version: CURRENT_VERSION,
            builds: Object.fromEntries(
              Object.entries(parsed.builds).map(([charId, builds]) => [
                charId,
                (builds || []).map(migrateBuild),
              ])
            ),
          };
          // Validate migrated data
          const { error: err2 } = wheelDataSchema.validate(migrated);
          if (!err2) return migrated;
        } catch (_) { /* fall through */ }
      }
      console.warn('Invalid wheel storage schema, resetting:', error.message);
      return getDefaultStorage();
    }

    return parsed;
  } catch (err) {
    console.error('Error loading wheel data:', err);
    return getDefaultStorage();
  }
};

const saveData = (data) => {
  try {
    data.lastUpdated = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (err) {
    console.error('Error saving wheel data:', err);
    return false;
  }
};

// ─── Public API ───────────────────────────────────────────────────────────────

export const getWheelBuilds = (characterId) => {
  if (!characterId) return [];
  const data = loadData();
  return data.builds[characterId] || [];
};

export const getWheelBuild = (characterId, buildId) => {
  if (!characterId || !buildId) return null;
  return getWheelBuilds(characterId).find((b) => b.id === buildId) || null;
};

export const saveWheelBuild = (characterId, build) => {
  if (!characterId) return { success: false, error: 'Character ID is required' };

  const data = loadData();
  const characterBuilds = data.builds[characterId] || [];

  const validation = validateBuild(build, build.points.total);
  if (!validation.isValid) {
    return { success: false, error: validation.errors.join(', ') };
  }

  const sp   = build.slicePoints || {};
  const used = calcTotalUsed(sp);

  const existingIndex = build.id
    ? characterBuilds.findIndex((b) => b.id === build.id)
    : -1;

  if (existingIndex >= 0) {
    const buildId = build.id;
    characterBuilds[existingIndex] = {
      ...build,
      id: buildId,
      updatedAt: new Date().toISOString(),
      slicePoints: sp,
      stats: calculateBuildStats(sp, build.vocation),
      points: { ...build.points, used },
    };
    data.builds[characterId] = characterBuilds;
    const saved = saveData(data);
    return { success: saved, buildId, error: saved ? null : 'Failed to save to localStorage' };
  }

  // New build
  if (characterBuilds.length >= MAX_BUILDS_PER_CHARACTER) {
    return { success: false, error: `Maximum of ${MAX_BUILDS_PER_CHARACTER} builds per character reached` };
  }

  const buildId = generateUUID();
  const newBuild = {
    ...build,
    id: buildId,
    createdAt: new Date().toISOString(),
    slicePoints: sp,
    stats: calculateBuildStats(sp, build.vocation),
    points: { ...build.points, used },
  };

  characterBuilds.push(newBuild);
  data.builds[characterId] = characterBuilds;
  const saved = saveData(data);
  return { success: saved, buildId, error: saved ? null : 'Failed to save to localStorage' };
};

export const deleteWheelBuild = (characterId, buildId) => {
  if (!characterId || !buildId) return false;
  const data = loadData();
  const builds = data.builds[characterId] || [];
  const updated = builds.filter((b) => b.id !== buildId);
  if (updated.length === builds.length) return false;
  data.builds[characterId] = updated;
  return saveData(data);
};

export const duplicateWheelBuild = (characterId, buildId) => {
  if (!characterId || !buildId) {
    return { success: false, error: 'Character ID and Build ID are required' };
  }
  const original = getWheelBuild(characterId, buildId);
  if (!original) return { success: false, error: 'Build not found' };

  const data = loadData();
  const builds = data.builds[characterId] || [];
  if (builds.length >= MAX_BUILDS_PER_CHARACTER) {
    return { success: false, error: `Maximum of ${MAX_BUILDS_PER_CHARACTER} builds per character reached` };
  }

  return saveWheelBuild(characterId, { ...original, id: null, name: `${original.name} (Copy)` });
};

export const clearAllBuilds = (characterId) => {
  if (!characterId) return false;
  const data = loadData();
  data.builds[characterId] = [];
  return saveData(data);
};

export const exportBuilds = (characterId) => {
  return JSON.stringify(getWheelBuilds(characterId), null, 2);
};

export const importBuilds = (characterId, jsonString) => {
  if (!characterId) return { success: false, imported: 0, error: 'Character ID is required' };

  try {
    const builds = JSON.parse(jsonString);
    if (!Array.isArray(builds)) {
      return { success: false, imported: 0, error: 'Invalid format: expected an array of builds' };
    }

    const data = loadData();
    const characterBuilds = data.builds[characterId] || [];
    let imported = 0;
    const errors = [];

    builds.forEach((build) => {
      if (characterBuilds.length + imported >= MAX_BUILDS_PER_CHARACTER) {
        errors.push(`Limit of ${MAX_BUILDS_PER_CHARACTER} builds reached`);
        return;
      }
      const migrated   = migrateBuild(build);
      const validation = validateBuild(migrated, migrated.points?.total || 0);
      if (!validation.isValid) {
        errors.push(`Invalid build "${build.name}": ${validation.errors.join(', ')}`);
        return;
      }
      const sp = migrated.slicePoints || {};
      characterBuilds.push({
        ...migrated,
        id: generateUUID(),
        createdAt: new Date().toISOString(),
        slicePoints: sp,
        stats: calculateBuildStats(sp, migrated.vocation),
        points: { ...migrated.points, used: calcTotalUsed(sp) },
      });
      imported++;
    });

    data.builds[characterId] = characterBuilds;
    const saved = saveData(data);
    return { success: saved && imported > 0, imported, error: errors.length > 0 ? errors.join('; ') : null };
  } catch (err) {
    return { success: false, imported: 0, error: `Failed to parse JSON: ${err.message}` };
  }
};

export const getStorageStats = (characterId) => {
  const builds = getWheelBuilds(characterId);
  return { total: builds.length, limit: MAX_BUILDS_PER_CHARACTER, remaining: MAX_BUILDS_PER_CHARACTER - builds.length };
};
