/**
 * Chart Data Utils
 * Pure functions for transforming bestiary completion data into chart-ready format
 *
 * Feature 4: Progress History
 */

/**
 * Aggregate completions by day
 * @param {Array} completions - Array of completion objects
 * @returns {Array} - Array of { date, count, charmPoints }
 */
export const aggregateByDay = (completions) => {
  const byDate = {};

  completions.forEach((c) => {
    const dateKey = c.completedAt.split('T')[0];
    if (!byDate[dateKey]) {
      byDate[dateKey] = { date: dateKey, count: 0, charmPoints: 0 };
    }
    byDate[dateKey].count++;
    byDate[dateKey].charmPoints += c.charmPoints;
  });

  return Object.values(byDate).sort((a, b) => new Date(a.date) - new Date(b.date));
};

/**
 * Fill missing dates with zero values
 * @param {Array} data - Array of { date, count, charmPoints }
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {Array} - Array with all dates filled
 */
export const fillMissingDates = (data, startDate, endDate) => {
  const filled = [];
  const dataMap = {};

  // Create map for quick lookup
  data.forEach((d) => {
    dataMap[d.date] = d;
  });

  // Fill all dates in range
  const current = new Date(startDate);
  while (current <= endDate) {
    const dateKey = current.toISOString().split('T')[0];
    filled.push(dataMap[dateKey] || { date: dateKey, count: 0, charmPoints: 0 });
    current.setDate(current.getDate() + 1);
  }

  return filled;
};

/**
 * Calculate moving average
 * @param {Array} data - Array of { date, value }
 * @param {number} windowSize - Window size for moving average (default: 7)
 * @returns {Array} - Array of { date, value, movingAverage }
 */
export const calculateMovingAverage = (data, windowSize = 7) => {
  return data.map((d, i) => {
    const start = Math.max(0, i - windowSize + 1);
    const window = data.slice(start, i + 1);
    const sum = window.reduce((acc, item) => acc + (item.charmPoints || 0), 0);
    const movingAverage = sum / window.length;

    return {
      ...d,
      movingAverage: parseFloat(movingAverage.toFixed(2)),
    };
  });
};

/**
 * Calculate trend line (simple linear regression)
 * @param {Array} data - Array of { date, charmPoints }
 * @returns {Object} - { slope, intercept, points }
 */
export const calculateTrend = (data) => {
  if (data.length < 2) {
    return { slope: 0, intercept: 0, points: [] };
  }

  // Convert dates to x-axis (days from first date)
  const firstDate = new Date(data[0].date);
  const points = data.map((d) => {
    const date = new Date(d.date);
    const x = Math.floor((date - firstDate) / (1000 * 60 * 60 * 24));
    return { x, y: d.charmPoints };
  });

  // Calculate means
  const n = points.length;
  const meanX = points.reduce((sum, p) => sum + p.x, 0) / n;
  const meanY = points.reduce((sum, p) => sum + p.y, 0) / n;

  // Calculate slope and intercept
  let numerator = 0;
  let denominator = 0;
  points.forEach((p) => {
    numerator += (p.x - meanX) * (p.y - meanY);
    denominator += Math.pow(p.x - meanX, 2);
  });

  const slope = denominator !== 0 ? numerator / denominator : 0;
  const intercept = meanY - slope * meanX;

  // Generate trend points
  const trendPoints = points.map((p) => ({
    date: data[p.x].date,
    value: slope * p.x + intercept,
  }));

  return {
    slope: parseFloat(slope.toFixed(2)),
    intercept: parseFloat(intercept.toFixed(2)),
    points: trendPoints,
  };
};

/**
 * Get period dates based on period string
 * @param {string} period - '7d', '30d', '3m', 'all'
 * @returns {Object} - { startDate, endDate }
 */
export const getPeriodDates = (period) => {
  const endDate = new Date();
  const startDate = new Date();

  switch (period) {
    case '7d':
      startDate.setDate(startDate.getDate() - 7);
      break;
    case '30d':
      startDate.setDate(startDate.getDate() - 30);
      break;
    case '3m':
      startDate.setMonth(startDate.getMonth() - 3);
      break;
    case 'all':
      startDate.setFullYear(startDate.getFullYear() - 1); // Max 1 year
      break;
    default:
      startDate.setDate(startDate.getDate() - 30);
  }

  return { startDate, endDate };
};

export default {
  aggregateByDay,
  fillMissingDates,
  calculateMovingAverage,
  calculateTrend,
  getPeriodDates,
};
