/**
 * Bestiary OCR Parser
 * Parses OCR text from bestiary screenshots and matches creatures
 */

import { BESTIARY_DATA } from '../data/bestiary';
import { calculateMinimumKills } from './bestiaryStages';

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
 * Detect bestiary stage from text
 * @param {string} line - Line of text that may contain stage info
 * @returns {{stage: number|null, isComplete: boolean}} - Stage info (1, 2, 3) or complete
 */
const detectBestiaryStage = (line) => {
  // Look for stage patterns: "1/3", "2/3", "3/3"
  const stageMatch = line.match(/(\d)\s*\/\s*3/);
  if (stageMatch) {
    const stage = parseInt(stageMatch[1], 10);
    return { stage, isComplete: stage === 3 };
  }

  // Look for complete indicators: checkmark, "complete", "✓", "✔"
  if (/[✓✔]/u.test(line) || /complete/i.test(line)) {
    return { stage: 3, isComplete: true };
  }

  return { stage: null, isComplete: false };
};

/**
 * Extract creature names with stage information from OCR text
 * Looks for patterns like:
 * - "Creature Name 1/3" or "Creature Name 2/3"
 * - "Creature Name ✓" (complete)
 * - Lines with capitalized words
 * @param {string} text - Raw OCR text
 * @returns {Array<{name: string, stage: number|null, isComplete: boolean}>} - Array of creatures with stage info
 */
const extractCreatureNames = (text) => {
  if (!text) return [];

  const lines = text.split('\n').map((line) => line.trim()).filter(Boolean);
  const potentialCreatures = [];

  for (const line of lines) {
    // Skip lines that are clearly not creature names
    if (line.length < 3) continue;
    if (/^\d+$/.test(line)) continue; // Skip pure numbers
    if (/^[^a-zA-Z]+$/.test(line)) continue; // Skip lines without letters

    // Detect stage information
    const stageInfo = detectBestiaryStage(line);

    // Extract creature name (before numbers/progress indicators/checkmarks)
    const match = line.match(/^([A-Za-z][A-Za-z\s'-]+?)(?:\s+\d+|\s+\(|\s*[✓✔]|\s*$)/u);

    if (match) {
      const name = match[1].trim();
      if (name.length >= 3) {
        potentialCreatures.push({
          name,
          ...stageInfo,
        });
      }
    } else {
      // Fallback: if line starts with capital letter, consider it
      if (/^[A-Z]/.test(line)) {
        const cleaned = line.replace(/[^\w\s'-]/g, '').trim();
        if (cleaned.length >= 3) {
          potentialCreatures.push({
            name: cleaned,
            ...stageInfo,
          });
        }
      }
    }
  }

  return potentialCreatures;
};

/**
 * Parse OCR text and match creatures with database
 * @param {string} text - OCR extracted text
 * @param {number} minSimilarity - Minimum similarity for matching (default 0.7)
 * @returns {{
 *   matched: Array<{creature: Object, similarity: number, originalText: string, stage: number|null, isComplete: boolean, minimumKills: number|null}>,
 *   unmatched: Array<{name: string, stage: number|null, isComplete: boolean}>,
 *   totalFound: number
 * }}
 */
export const parseOcrText = (text, minSimilarity = 0.7) => {
  const potentialCreatures = extractCreatureNames(text);
  const matched = [];
  const unmatched = [];

  for (const creatureData of potentialCreatures) {
    const { creature, similarity } = findMatchingCreature(creatureData.name, minSimilarity);

    if (creature) {
      // Avoid duplicates
      const alreadyMatched = matched.some((m) => m.creature.id === creature.id);

      if (!alreadyMatched) {
        // Calculate minimum kills if stage is detected
        const minimumKills = creatureData.stage
          ? calculateMinimumKills(creatureData.stage, creature.occurrence)
          : null;

        matched.push({
          creature,
          similarity,
          originalText: creatureData.name,
          stage: creatureData.stage,
          isComplete: creatureData.isComplete,
          minimumKills,
        });
      }
    } else {
      unmatched.push({
        name: creatureData.name,
        stage: creatureData.stage,
        isComplete: creatureData.isComplete,
      });
    }
  }

  return {
    matched,
    unmatched,
    totalFound: potentialCreatures.length,
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
