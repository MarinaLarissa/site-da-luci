/**
 * Bestiary OCR Parser
 * Parses OCR text from bestiary screenshots and matches creatures
 */

import { BESTIARY_DATA } from '../data/bestiary';

/**
 * Calculate Levenshtein distance for fuzzy matching
 * @param {string} a - First string
 * @param {string} b - Second string
 * @returns {number} - Edit distance
 */
const levenshteinDistance = (a, b) => {
  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
};

/**
 * Calculate similarity score (0-1) between two strings
 * @param {string} a - First string
 * @param {string} b - Second string
 * @returns {number} - Similarity score (0-1, where 1 is identical)
 */
const calculateSimilarity = (a, b) => {
  const distance = levenshteinDistance(a.toLowerCase(), b.toLowerCase());
  const maxLength = Math.max(a.length, b.length);

  if (maxLength === 0) return 1.0;

  return 1 - distance / maxLength;
};

/**
 * Find best matching creature from database
 * @param {string} name - Creature name from OCR
 * @param {number} minSimilarity - Minimum similarity threshold (default 0.7)
 * @returns {{creature: Object|null, similarity: number}}
 */
export const findMatchingCreature = (name, minSimilarity = 0.7) => {
  if (!name || name.trim().length === 0) {
    return { creature: null, similarity: 0 };
  }

  const cleanName = name.trim();
  let bestMatch = null;
  let bestSimilarity = 0;

  for (const creature of BESTIARY_DATA) {
    const similarity = calculateSimilarity(cleanName, creature.name);

    if (similarity > bestSimilarity) {
      bestSimilarity = similarity;
      bestMatch = creature;
    }
  }

  if (bestSimilarity >= minSimilarity) {
    return { creature: bestMatch, similarity: bestSimilarity };
  }

  return { creature: null, similarity: bestSimilarity };
};

/**
 * Extract creature names from OCR text
 * Looks for patterns like:
 * - "Creature Name" followed by numbers (kills)
 * - Lines with capitalized words
 * @param {string} text - Raw OCR text
 * @returns {string[]} - Array of potential creature names
 */
const extractCreatureNames = (text) => {
  if (!text) return [];

  const lines = text.split('\n').map((line) => line.trim()).filter(Boolean);
  const potentialNames = [];

  for (const line of lines) {
    // Skip lines that are clearly not creature names
    if (line.length < 3) continue;
    if (/^\d+$/.test(line)) continue; // Skip pure numbers
    if (/^[^a-zA-Z]+$/.test(line)) continue; // Skip lines without letters

    // Extract creature name (before numbers/progress indicators)
    const match = line.match(/^([A-Za-z][A-Za-z\s'-]+?)(?:\s+\d+|\s+\(|\s*$)/);

    if (match) {
      const name = match[1].trim();
      if (name.length >= 3) {
        potentialNames.push(name);
      }
    } else {
      // Fallback: if line starts with capital letter, consider it
      if (/^[A-Z]/.test(line)) {
        const cleaned = line.replace(/[^\w\s'-]/g, '').trim();
        if (cleaned.length >= 3) {
          potentialNames.push(cleaned);
        }
      }
    }
  }

  return potentialNames;
};

/**
 * Parse OCR text and match creatures with database
 * @param {string} text - OCR extracted text
 * @param {number} minSimilarity - Minimum similarity for matching (default 0.7)
 * @returns {{
 *   matched: Array<{creature: Object, similarity: number, originalText: string}>,
 *   unmatched: Array<string>,
 *   totalFound: number
 * }}
 */
export const parseOcrText = (text, minSimilarity = 0.7) => {
  const potentialNames = extractCreatureNames(text);
  const matched = [];
  const unmatched = [];

  for (const name of potentialNames) {
    const { creature, similarity } = findMatchingCreature(name, minSimilarity);

    if (creature) {
      // Avoid duplicates
      const alreadyMatched = matched.some((m) => m.creature.id === creature.id);

      if (!alreadyMatched) {
        matched.push({
          creature,
          similarity,
          originalText: name,
        });
      }
    } else {
      unmatched.push(name);
    }
  }

  return {
    matched,
    unmatched,
    totalFound: potentialNames.length,
  };
};

/**
 * Extract kill count for a creature (if present in text)
 * @param {string} text - OCR text
 * @param {string} creatureName - Creature name to search for
 * @returns {number|null} - Kill count or null if not found
 */
export const extractKillCount = (text, creatureName) => {
  const lines = text.split('\n');

  for (const line of lines) {
    if (line.toLowerCase().includes(creatureName.toLowerCase())) {
      // Look for numbers after creature name
      const match = line.match(/(\d+)\s*\/\s*(\d+)/); // Format: "123 / 1000"

      if (match) {
        return parseInt(match[1], 10);
      }

      // Fallback: just look for any number
      const numberMatch = line.match(/\d+/);
      if (numberMatch) {
        return parseInt(numberMatch[0], 10);
      }
    }
  }

  return null;
};
