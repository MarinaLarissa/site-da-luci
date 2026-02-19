/**
 * useWheelPlanner hook
 * Manages wheel planner state and build management.
 *
 * Key change from v1: `selectedPerks[]` replaced by `slicePoints: { [sliceId]: number }`.
 * Points are allocated per slice (0 to slice.maxPoints).
 * Adjacency rule: a slice can only be invested in if at least one of its
 * required predecessor slices is fully maxed (at maxPoints).
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  getWheelBuilds,
  saveWheelBuild,
  deleteWheelBuild,
  duplicateWheelBuild,
  getStorageStats,
} from '../services/wheelStorage';
import { getDefaultBuild, VOCATIONS } from '../data/wheelData';
import {
  WHEEL_SLICES,
  getSliceById,
  calcTotalUsed,
  isSliceUnlockable,
  calculateBuildStats,
} from '../data/wheelNodes';

// ─── Main hook ────────────────────────────────────────────────────────────────

export const useWheelPlanner = (characterId) => {
  const [currentBuild, setCurrentBuild]   = useState(null);
  const [savedBuilds,  setSavedBuilds]    = useState([]);
  const [isLoading,    setIsLoading]      = useState(false);
  const [error,        setError]          = useState(null);

  // Load saved builds when characterId changes
  useEffect(() => {
    if (!characterId) {
      setSavedBuilds([]);
      setCurrentBuild(null);
      return;
    }
    try {
      const builds = getWheelBuilds(characterId);
      setSavedBuilds(builds);
      if (!currentBuild) {
        setCurrentBuild(getDefaultBuild(VOCATIONS.KNIGHT, 'New Build'));
      }
    } catch (err) {
      console.error('Error loading builds:', err);
      setError('Failed to load builds');
    }
    // currentBuild omitido intencionalmente: só inicializa o build padrão na montagem
    // do characterId, não em toda atualização de currentBuild (evita loop).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterId]);

  // ─── Actions ──────────────────────────────────────────────────────────────

  const createNewBuild = useCallback((vocation = VOCATIONS.KNIGHT, name = 'New Build') => {
    setCurrentBuild(getDefaultBuild(vocation, name));
    setError(null);
  }, []);

  const loadBuild = useCallback((buildId) => {
    const build = savedBuilds.find((b) => b.id === buildId);
    if (build) {
      setCurrentBuild({ ...build });
      setError(null);
    } else {
      setError('Build not found');
    }
  }, [savedBuilds]);

  const updateVocation = useCallback((vocation) => {
    if (!currentBuild) return;
    setCurrentBuild((prev) => ({
      ...prev,
      vocation,
      slicePoints: {},
      stats: calculateBuildStats({}, vocation),
      points: { ...prev.points, used: 0 },
    }));
  }, [currentBuild]);

  const updateName = useCallback((name) => {
    if (!currentBuild) return;
    setCurrentBuild((prev) => ({ ...prev, name }));
  }, [currentBuild]);

  const updatePoints = useCallback((points) => {
    if (!currentBuild) return;
    setCurrentBuild((prev) => ({ ...prev, points: { ...prev.points, ...points } }));
  }, [currentBuild]);

  /**
   * Allocate `delta` points to a slice (positive = add, negative = remove).
   * Rules:
   *  - Adding: slice must be unlockable (predecessor maxed), enough available points.
   *  - Removing: slice cannot go below 0. If removing would make the slice no longer maxed,
   *    and a dependent slice currently has points (and no other maxed predecessor), block it.
   */
  const allocatePoints = useCallback((sliceId, delta) => {
    if (!currentBuild) return;

    setCurrentBuild((prev) => {
      const slice = getSliceById(sliceId);
      if (!slice) return prev;

      const slicePoints = prev.slicePoints || {};
      const current     = slicePoints[sliceId] || 0;
      const available   = prev.points.total - prev.points.used;

      if (delta > 0) {
        // Must be unlockable
        if (!isSliceUnlockable(slice, slicePoints)) return prev;
        const add = Math.min(delta, available, slice.maxPoints - current);
        if (add <= 0) return prev;
        const newVal = current + add;
        const newSP  = { ...slicePoints, [sliceId]: newVal };
        return {
          ...prev,
          slicePoints: newSP,
          points: { ...prev.points, used: calcTotalUsed(newSP) },
          stats:  calculateBuildStats(newSP, prev.vocation),
        };
      }

      if (delta < 0) {
        if (current === 0) return prev;

        // If removing would un-max the slice, check for orphaned dependents
        const willUnmax = current === slice.maxPoints && current + delta < slice.maxPoints;
        if (willUnmax) {
          const dependents = WHEEL_SLICES.filter((s) => s.requires.includes(sliceId));
          const wouldOrphan = dependents.some((dep) => {
            const depPoints = slicePoints[dep.id] || 0;
            if (!depPoints) return false;
            const otherMaxed = dep.requires
              .filter((rid) => rid !== sliceId)
              .some((rid) => {
                const r = getSliceById(rid);
                return r && (slicePoints[rid] || 0) >= r.maxPoints;
              });
            return !otherMaxed;
          });
          if (wouldOrphan) return prev;
        }

        const newVal = Math.max(0, current + delta);
        const newSP  = { ...slicePoints };
        if (newVal === 0) delete newSP[sliceId];
        else newSP[sliceId] = newVal;
        return {
          ...prev,
          slicePoints: newSP,
          points: { ...prev.points, used: calcTotalUsed(newSP) },
          stats:  calculateBuildStats(newSP, prev.vocation),
        };
      }

      return prev;
    });
  }, [currentBuild]);

  const resetBuild = useCallback(() => {
    if (!currentBuild) return;
    setCurrentBuild((prev) => ({
      ...prev,
      slicePoints: {},
      stats: calculateBuildStats({}, prev.vocation),
      points: { ...prev.points, used: 0 },
    }));
  }, [currentBuild]);

  // ─── Persistence ──────────────────────────────────────────────────────────

  const saveBuild = useCallback(() => {
    if (!characterId || !currentBuild) {
      setError('No character or build to save');
      return { success: false };
    }
    setIsLoading(true);
    setError(null);
    try {
      const result = saveWheelBuild(characterId, currentBuild);
      if (result.success) {
        const builds = getWheelBuilds(characterId);
        setSavedBuilds(builds);
        if (!currentBuild.id) {
          setCurrentBuild((prev) => ({ ...prev, id: result.buildId }));
        }
      } else {
        setError(result.error);
      }
      setIsLoading(false);
      return result;
    } catch (err) {
      console.error('Error saving build:', err);
      setError('Failed to save build');
      setIsLoading(false);
      return { success: false, error: err.message };
    }
  }, [characterId, currentBuild]);

  const deleteBuild = useCallback((buildId) => {
    if (!characterId) return false;
    setIsLoading(true);
    setError(null);
    try {
      const success = deleteWheelBuild(characterId, buildId);
      if (success) {
        const builds = getWheelBuilds(characterId);
        setSavedBuilds(builds);
        if (currentBuild?.id === buildId) createNewBuild();
      } else {
        setError('Failed to delete build');
      }
      setIsLoading(false);
      return success;
    } catch (err) {
      console.error('Error deleting build:', err);
      setError('Failed to delete build');
      setIsLoading(false);
      return false;
    }
  }, [characterId, currentBuild, createNewBuild]);

  const duplicateBuild = useCallback((buildId) => {
    if (!characterId) { setError('No character selected'); return { success: false }; }
    setIsLoading(true);
    setError(null);
    try {
      const result = duplicateWheelBuild(characterId, buildId);
      if (result.success) {
        const builds = getWheelBuilds(characterId);
        setSavedBuilds(builds);
        const dup = builds.find((b) => b.id === result.buildId);
        if (dup) setCurrentBuild({ ...dup });
      } else {
        setError(result.error);
      }
      setIsLoading(false);
      return result;
    } catch (err) {
      console.error('Error duplicating build:', err);
      setError('Failed to duplicate build');
      setIsLoading(false);
      return { success: false, error: err.message };
    }
  }, [characterId]);

  // ─── Derived state ─────────────────────────────────────────────────────────

  const storageStats = useMemo(() => {
    if (!characterId) return { total: 0, limit: 10, remaining: 10 };
    return getStorageStats(characterId);
  }, [characterId]);

  const hasUnsavedChanges = useMemo(() => {
    if (!currentBuild || !currentBuild.id) return true;
    const saved = savedBuilds.find((b) => b.id === currentBuild.id);
    if (!saved) return true;
    return (
      currentBuild.name !== saved.name ||
      currentBuild.vocation !== saved.vocation ||
      currentBuild.points.total !== saved.points.total ||
      currentBuild.points.promotion !== saved.points.promotion ||
      JSON.stringify(currentBuild.slicePoints) !== JSON.stringify(saved.slicePoints)
    );
  }, [currentBuild, savedBuilds]);

  return {
    currentBuild, savedBuilds, isLoading, error,
    storageStats, hasUnsavedChanges,
    createNewBuild, loadBuild, updateVocation, updateName, updatePoints,
    allocatePoints, saveBuild, deleteBuild, duplicateBuild, resetBuild,
    setCurrentBuild,
  };
};
