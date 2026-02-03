/**
 * Image Utils Tests
 */

import { getImageUrl, getPublicUrl, PLACEHOLDER_IMAGE } from '../imageUtils';

describe('imageUtils', () => {
  describe('getPublicUrl', () => {
    it('should return PUBLIC_URL from environment', () => {
      const originalPublicUrl = process.env.PUBLIC_URL;
      process.env.PUBLIC_URL = '/site-da-luci';

      expect(getPublicUrl()).toBe('/site-da-luci');

      process.env.PUBLIC_URL = originalPublicUrl;
    });

    it('should return empty string when PUBLIC_URL is not set', () => {
      const originalPublicUrl = process.env.PUBLIC_URL;
      delete process.env.PUBLIC_URL;

      expect(getPublicUrl()).toBe('');

      process.env.PUBLIC_URL = originalPublicUrl;
    });
  });

  describe('getImageUrl', () => {
    const originalPublicUrl = process.env.PUBLIC_URL;

    afterEach(() => {
      process.env.PUBLIC_URL = originalPublicUrl;
    });

    it('should return null for empty imageUrl', () => {
      expect(getImageUrl('')).toBeNull();
      expect(getImageUrl(null)).toBeNull();
      expect(getImageUrl(undefined)).toBeNull();
    });

    it('should return absolute HTTP URLs unchanged', () => {
      const httpUrl = 'http://example.com/image.gif';
      expect(getImageUrl(httpUrl)).toBe(httpUrl);
    });

    it('should return absolute HTTPS URLs unchanged', () => {
      const httpsUrl = 'https://example.com/image.gif';
      expect(getImageUrl(httpsUrl)).toBe(httpsUrl);
    });

    it('should return data URLs unchanged', () => {
      expect(getImageUrl(PLACEHOLDER_IMAGE)).toBe(PLACEHOLDER_IMAGE);
    });

    it('should prepend PUBLIC_URL to relative URLs in production', () => {
      process.env.PUBLIC_URL = '/site-da-luci';

      const relativeUrl = '/images/creatures/Dragon.gif';
      const expected = '/site-da-luci/images/creatures/Dragon.gif';

      expect(getImageUrl(relativeUrl)).toBe(expected);
    });

    it('should handle URLs without leading slash in production', () => {
      process.env.PUBLIC_URL = '/site-da-luci';

      const relativeUrl = 'images/creatures/Dragon.gif';
      const expected = '/site-da-luci/images/creatures/Dragon.gif';

      expect(getImageUrl(relativeUrl)).toBe(expected);
    });

    it('should work correctly in development (no PUBLIC_URL)', () => {
      delete process.env.PUBLIC_URL;

      const relativeUrl = '/images/creatures/Dragon.gif';
      expect(getImageUrl(relativeUrl)).toBe('/images/creatures/Dragon.gif');
    });

    it('should handle relative URLs without leading slash in development', () => {
      delete process.env.PUBLIC_URL;

      const relativeUrl = 'images/creatures/Dragon.gif';
      expect(getImageUrl(relativeUrl)).toBe('/images/creatures/Dragon.gif');
    });
  });

  describe('PLACEHOLDER_IMAGE', () => {
    it('should be a valid data URL', () => {
      expect(PLACEHOLDER_IMAGE).toMatch(/^data:image\/svg\+xml/);
    });

    it('should be a non-empty string', () => {
      expect(PLACEHOLDER_IMAGE).toBeTruthy();
      expect(typeof PLACEHOLDER_IMAGE).toBe('string');
    });
  });
});
