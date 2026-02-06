/**
 * Export Utils
 * Utilities for exporting bestiary progress data to CSV and JSON
 *
 * Feature 4: Progress History
 */

/**
 * Generate CSV content with UTF-8 BOM (Excel compatible)
 * @param {Array} data - Array of objects
 * @param {Array} columns - Array of { key, label }
 * @returns {string} - CSV content
 */
export const generateCSV = (data, columns) => {
  if (!data || data.length === 0) {
    return '';
  }

  // UTF-8 BOM for Excel compatibility
  const BOM = '\uFEFF';

  // Header row
  const header = columns.map((col) => col.label).join(',');

  // Data rows
  const rows = data.map((row) => {
    return columns
      .map((col) => {
        const value = row[col.key];
        // Escape quotes and wrap in quotes if contains comma
        if (value === null || value === undefined) return '';
        const stringValue = String(value);
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      })
      .join(',');
  });

  return BOM + header + '\n' + rows.join('\n');
};

/**
 * Format completions data for export
 * @param {Array} completions - Array of completion objects
 * @param {string} format - 'csv' or 'json'
 * @returns {string} - Formatted data
 */
export const formatDataForExport = (completions, format = 'csv') => {
  if (format === 'csv') {
    const columns = [
      { key: 'date', label: 'Date' },
      { key: 'name', label: 'Creature Name' },
      { key: 'charmPoints', label: 'Charm Points' },
      { key: 'completedAt', label: 'Completed At' },
    ];

    const formattedData = completions.map((c) => ({
      date: c.completedAt.split('T')[0],
      name: c.name,
      charmPoints: c.charmPoints,
      completedAt: new Date(c.completedAt).toLocaleString(),
    }));

    return generateCSV(formattedData, columns);
  }

  if (format === 'json') {
    const exportData = {
      exportedAt: new Date().toISOString(),
      totalCompletions: completions.length,
      totalCharmPoints: completions.reduce((sum, c) => sum + c.charmPoints, 0),
      completions: completions.map((c) => ({
        date: c.completedAt.split('T')[0],
        creature: {
          id: c.id,
          name: c.name,
          charmPoints: c.charmPoints,
        },
        completedAt: c.completedAt,
      })),
    };

    return JSON.stringify(exportData, null, 2);
  }

  return '';
};

/**
 * Download file
 * @param {string} content - File content
 * @param {string} filename - Filename
 * @param {string} mimeType - MIME type
 */
export const downloadFile = (content, filename, mimeType) => {
  try {
    const blob = new Blob([content], { type: `${mimeType};charset=utf-8;` });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();

    // Clean up
    setTimeout(() => URL.revokeObjectURL(link.href), 100);

    return true;
  } catch (error) {
    console.error('Error downloading file:', error);
    return false;
  }
};

/**
 * Generate filename with timestamp
 * @param {string} prefix - Filename prefix
 * @param {string} extension - File extension (with dot, e.g., '.csv')
 * @returns {string} - Filename with timestamp
 */
export const generateFilename = (prefix, extension) => {
  const timestamp = new Date().toISOString().split('T')[0];
  return `${prefix}-${timestamp}${extension}`;
};

/**
 * Export completions to CSV
 * @param {Array} completions - Array of completions
 * @returns {boolean} - Success status
 */
export const exportToCSV = (completions) => {
  const csvContent = formatDataForExport(completions, 'csv');
  const filename = generateFilename('bestiary-history', '.csv');
  return downloadFile(csvContent, filename, 'text/csv');
};

/**
 * Export completions to JSON
 * @param {Array} completions - Array of completions
 * @returns {boolean} - Success status
 */
export const exportToJSON = (completions) => {
  const jsonContent = formatDataForExport(completions, 'json');
  const filename = generateFilename('bestiary-history', '.json');
  return downloadFile(jsonContent, filename, 'application/json');
};

export default {
  generateCSV,
  formatDataForExport,
  downloadFile,
  generateFilename,
  exportToCSV,
  exportToJSON,
};
