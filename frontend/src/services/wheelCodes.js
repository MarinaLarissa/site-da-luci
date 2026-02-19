/**
 * Wheel of Destiny Build Code Encoder/Decoder
 *
 * Format: <VocationPrefix><Base64url(36 bytes)>
 *   - Prefix: K=knight, D=druid, S=sorcerer, P=paladin, M=monk
 *   - 36 bytes: one byte per slice (index 0-35), value = points allocated (0-255)
 *   - Encoded as base64url (URL-safe, no padding) → 48 chars + 1 prefix = 49 chars
 *
 * Example: "K..." = a Knight build
 */

const VOCATION_PREFIX = {
  knight:   'K',
  druid:    'D',
  sorcerer: 'S',
  paladin:  'P',
  monk:     'M',
};

const PREFIX_VOCATION = Object.fromEntries(
  Object.entries(VOCATION_PREFIX).map(([v, p]) => [p, v])
);

/**
 * Encode slicePoints + vocation into a shareable code string.
 * @param {Object} slicePoints  - { [sliceId]: number }
 * @param {string} vocation     - 'knight' | 'druid' | 'sorcerer' | 'paladin' | 'monk'
 * @returns {string} build code
 */
export function encodeBuild(slicePoints, vocation) {
  const prefix = VOCATION_PREFIX[vocation] ?? 'K';
  const bytes = new Uint8Array(36);
  for (let i = 0; i < 36; i++) {
    bytes[i] = Math.min(255, Math.max(0, Math.round(slicePoints[i] || 0)));
  }
  // Convert to binary string then base64
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  // Base64url: replace + with -, / with _, strip padding
  const b64 = btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  return prefix + b64;
}

/**
 * Decode a build code into { vocation, slicePoints }.
 * Returns null if the code is invalid.
 * @param {string} code
 * @returns {{ vocation: string, slicePoints: Object } | null}
 */
export function decodeBuild(code) {
  if (!code || typeof code !== 'string' || code.length < 2) return null;

  const prefix = code[0].toUpperCase();
  const vocation = PREFIX_VOCATION[prefix];
  if (!vocation) return null;

  const b64 = code.slice(1).replace(/-/g, '+').replace(/_/g, '/');
  try {
    const binary = atob(b64);
    const slicePoints = {};
    const len = Math.min(binary.length, 36);
    for (let i = 0; i < len; i++) {
      const val = binary.charCodeAt(i);
      if (val > 0) slicePoints[i] = val;
    }
    return { vocation, slicePoints };
  } catch {
    return null;
  }
}
