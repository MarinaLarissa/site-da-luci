/**
 * Voice Input Parser Utilities
 * Parses voice transcript and matches creature names using fuzzy matching
 *
 * Features:
 * - Levenshtein distance algorithm for fuzzy matching
 * - Normalize text (lowercase, remove accents)
 * - Pattern detection (complete vs update kills)
 * - Multi-creature extraction
 */

/**
 * Calculate Levenshtein distance between two strings
 * @param {string} a - First string
 * @param {string} b - Second string
 * @returns {number} - Distance (lower is better)
 */
const levenshteinDistance = (a, b) => {
  const matrix = [];

  // Initialize matrix
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill matrix
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
 * Normalize text for comparison
 * @param {string} text - Input text
 * @returns {string} - Normalized text
 */
export const normalizeText = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .trim();
};

/**
 * Calculate similarity score between two strings
 * @param {string} a - First string
 * @param {string} b - Second string
 * @returns {number} - Similarity (0-1, higher is better)
 */
export const calculateSimilarity = (a, b) => {
  const normalizedA = normalizeText(a);
  const normalizedB = normalizeText(b);

  const distance = levenshteinDistance(normalizedA, normalizedB);
  const maxLength = Math.max(normalizedA.length, normalizedB.length);

  if (maxLength === 0) return 1;

  return 1 - distance / maxLength;
};

/**
 * Find best matching creature from bestiary data
 * @param {string} spokenWord - Word spoken by user
 * @param {Array} bestiaryData - Array of creature objects
 * @param {number} threshold - Minimum confidence threshold (0-1)
 * @returns {Object|null} - { creature, confidence } or null
 */
export const findBestMatch = (spokenWord, bestiaryData, threshold = 0.75) => {
  const normalizedSpoken = normalizeText(spokenWord);

  // Special case: exact match (case-insensitive)
  const exactMatch = bestiaryData.find(
    (c) => normalizeText(c.name) === normalizedSpoken
  );

  if (exactMatch) {
    return { creature: exactMatch, confidence: 1.0 };
  }

  // Fuzzy matching
  const candidates = bestiaryData
    .map((creature) => {
      const similarity = calculateSimilarity(spokenWord, creature.name);
      return { creature, confidence: similarity };
    })
    .filter((match) => match.confidence >= threshold)
    .sort((a, b) => b.confidence - a.confidence);

  return candidates.length > 0 ? candidates[0] : null;
};

/**
 * Extract creature names from transcript
 * @param {string} transcript - Voice transcript
 * @param {Array} bestiaryData - Array of creature objects
 * @param {number} threshold - Minimum confidence threshold
 * @returns {Array} - Array of { creature, confidence, alternatives }
 */
export const extractCreatureNames = (transcript, bestiaryData, threshold = 0.75) => {
  const normalized = normalizeText(transcript);

  // Split by common separators (comma, "and", "e")
  const words = normalized
    .split(/[,\s]+(?:e|and|,)\s+|[,\s]+/)
    .filter((w) => w.length > 2); // Ignore very short words

  const matches = [];
  const seen = new Set();

  words.forEach((word) => {
    const match = findBestMatch(word, bestiaryData, threshold);

    if (match && !seen.has(match.creature.id)) {
      seen.add(match.creature.id);
      matches.push(match);
    }
  });

  return matches;
};

/**
 * Pattern detection for voice commands
 */
export const VOICE_PATTERNS = {
  // Complete pattern: "completei X, Y, Z" or "finalizar X"
  COMPLETE: /completei|finaliz(ei|ar)|complete(i|d)|conclu(i|ido)|termin(ei|ar)/i,

  // Update kills pattern: "X 250 kills" or "dragon lord 180 mortes"
  KILL_COUNT: /(\d+)\s*(kills?|mortes?|mobs?)/i,

  // Remove/reset pattern: "remover X" or "resetar Y"
  REMOVE: /remov(er|i)|reset(ar|ei)|delet(ar|ei)/i,
};

/**
 * Parse transcript and determine action + creatures
 * @param {string} transcript - Voice transcript
 * @param {Array} bestiaryData - Array of creature objects
 * @returns {Object} - { action, matches, rawTranscript }
 */
export const parseVoiceCommand = (transcript, bestiaryData) => {
  const normalized = normalizeText(transcript);

  // Detect action type
  let action = 'complete'; // Default action

  if (VOICE_PATTERNS.REMOVE.test(normalized)) {
    action = 'remove';
  } else if (VOICE_PATTERNS.KILL_COUNT.test(normalized)) {
    action = 'updateKills';
  } else if (VOICE_PATTERNS.COMPLETE.test(normalized)) {
    action = 'complete';
  }

  // Extract creatures
  let matches = [];

  if (action === 'updateKills') {
    // Parse kill count updates
    matches = parseKillCountUpdates(transcript, bestiaryData);
  } else {
    // Extract creature names
    matches = extractCreatureNames(transcript, bestiaryData);
  }

  return {
    action,
    matches,
    rawTranscript: transcript,
  };
};

/**
 * Parse kill count updates from transcript
 * Example: "Dragon 250 kills, Dragon Lord 180 mortes"
 * @param {string} transcript - Voice transcript
 * @param {Array} bestiaryData - Array of creature objects
 * @returns {Array} - Array of { creature, confidence, killCount }
 */
export const parseKillCountUpdates = (transcript, bestiaryData) => {
  const normalized = normalizeText(transcript);

  // Pattern: [creature name] [number] [kills/mortes]
  const pattern = /([a-z\s]+?)\s+(\d+)\s*(?:kills?|mortes?)/gi;
  const matches = [];
  const seen = new Set();

  let match;
  while ((match = pattern.exec(normalized)) !== null) {
    const creatureName = match[1].trim();
    const killCount = parseInt(match[2], 10);

    if (creatureName && killCount > 0) {
      const creatureMatch = findBestMatch(creatureName, bestiaryData, 0.7);

      if (creatureMatch && !seen.has(creatureMatch.creature.id)) {
        seen.add(creatureMatch.creature.id);
        matches.push({
          ...creatureMatch,
          killCount,
        });
      }
    }
  }

  return matches;
};
