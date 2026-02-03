/**
 * Image Utilities
 * Helper functions for handling image URLs across different environments
 */

/**
 * Get the correct public URL path for the current environment
 * In development: returns empty string (served from root)
 * In production (GitHub Pages): returns '/site-da-luci'
 *
 * @returns {string} The public URL prefix
 */
export const getPublicUrl = () => {
  return process.env.PUBLIC_URL || '';
};

/**
 * Get the full URL for a creature image
 * Handles both development and production environments correctly
 *
 * @param {string} imageUrl - Relative image URL (e.g., '/images/creatures/X.gif')
 * @returns {string} Full URL with proper base path
 *
 * @example
 * // Development: '/images/creatures/Dragon.gif'
 * // Production: '/site-da-luci/images/creatures/Dragon.gif'
 * getImageUrl('/images/creatures/Dragon.gif')
 */
export const getImageUrl = (imageUrl) => {
  if (!imageUrl) return null;

  // If imageUrl already contains PUBLIC_URL or is absolute, return as-is
  if (imageUrl.startsWith('http://') ||
      imageUrl.startsWith('https://') ||
      imageUrl.startsWith('data:')) {
    return imageUrl;
  }

  // Remove leading slash if present (PUBLIC_URL already includes it)
  const cleanUrl = imageUrl.startsWith('/') ? imageUrl.slice(1) : imageUrl;

  // Combine PUBLIC_URL with the clean URL
  const publicUrl = getPublicUrl();
  return publicUrl ? `${publicUrl}/${cleanUrl}` : `/${cleanUrl}`;
};

/**
 * Placeholder image for when creature image fails to load
 */
export const PLACEHOLDER_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64"%3E%3Crect fill="%23374151" width="64" height="64"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%239CA3AF" font-size="10" font-family="Arial"%3E%3F%3F%3F%3C/text%3E%3C/svg%3E';
