import { useState, useEffect, useMemo } from 'react';
import {
  getCompletionsByPeriod,
  getStatistics,
} from '../services/progressHistoryStorage';
import {
  aggregateByDay,
  fillMissingDates,
  getPeriodDates,
} from '../utils/chartDataUtils';

/**
 * Hook for consuming progress history data with caching
 * Feature 4: Progress History
 *
 * @param {string} characterId - Character UUID
 * @param {string} period - '7d', '30d', '3m', 'all'
 * @returns {Object} - { chartData, statistics, timeline, isLoading, error, refetch }
 */
export const useProgressData = (characterId, period = '30d') => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rawData, setRawData] = useState([]);

  // Load data from storage
  useEffect(() => {
    if (!characterId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { startDate, endDate } = getPeriodDates(period);
      const completions = getCompletionsByPeriod(characterId, startDate, endDate);
      setRawData(completions);
    } catch (err) {
      console.error('Error loading progress data:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [characterId, period]);

  // Transform data for charts (memoized)
  const chartData = useMemo(() => {
    if (rawData.length === 0) return [];

    const aggregated = aggregateByDay(rawData);
    const { startDate, endDate } = getPeriodDates(period);
    const filled = fillMissingDates(aggregated, startDate, endDate);

    return filled;
  }, [rawData, period]);

  // Timeline data (grouped by date)
  const timeline = useMemo(() => {
    if (rawData.length === 0) return [];

    const grouped = {};
    rawData.forEach((completion) => {
      const dateKey = completion.completedAt.split('T')[0];
      if (!grouped[dateKey]) {
        grouped[dateKey] = {
          date: dateKey,
          completions: [],
        };
      }
      grouped[dateKey].completions.push(completion);
    });

    return Object.values(grouped).sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }, [rawData]);

  // Statistics (memoized)
  const statistics = useMemo(() => {
    if (!characterId) return null;

    const daysPeriod = period === '7d' ? 7 : period === '30d' ? 30 : period === '3m' ? 90 : 365;
    return getStatistics(characterId, daysPeriod);
  }, [characterId, period]);

  // Refetch function
  const refetch = () => {
    if (!characterId) return;

    setIsLoading(true);
    try {
      const { startDate, endDate } = getPeriodDates(period);
      const completions = getCompletionsByPeriod(characterId, startDate, endDate);
      setRawData(completions);
    } catch (err) {
      console.error('Error refetching progress data:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    chartData,
    statistics,
    timeline,
    isLoading,
    error,
    refetch,
  };
};

export default useProgressData;
