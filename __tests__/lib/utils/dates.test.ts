import { formatDateLong, formatDateShort } from '../../../src/lib/utils/dates';

describe('dates-utils', () => {
  describe('formatDateShort', () => {
    it('should format a valid date in English', () => {
      const result = formatDateShort('1979-04-11', 'en');
      expect(result).toBe('April 11');
    });

    it('should format a valid date in French', () => {
      const result = formatDateShort('1979-04-11', 'fr');
      expect(result).toBe('11 avril');
    });

    it('should default to English for unsupported languages', () => {
      const result = formatDateShort('1979-04-11', 'es');
      expect(result).toBe('April 11');
    });

    it('should throw an error for an invalid date', () => {
      expect(() => formatDateShort('invalid-date', 'en')).toThrow('Invalid date');
    });

    it('should handle leap years correctly', () => {
      const result = formatDateShort('2024-02-29', 'en');
      expect(result).toBe('February 29');
    });

    it('should handle single-digit months and days', () => {
      const result = formatDateShort('2025-01-01', 'en');
      expect(result).toBe('January 1');
    });
  });

  describe('formatDateLong', () => {
    it('should format a valid date in English', () => {
      const result = formatDateLong('1979-04-11', 'en');
      expect(result).toBe('April 11, 1979');
    });

    it('should format a valid date in French', () => {
      const result = formatDateLong('1979-04-11', 'fr');
      expect(result).toBe('11 avril 1979');
    });

    it('should default to English for unsupported languages', () => {
      const result = formatDateLong('1979-04-11', 'es');
      expect(result).toBe('April 11, 1979');
    });

    it('should throw an error for an invalid date', () => {
      expect(() => formatDateLong('invalid-date', 'en')).toThrow('Invalid date');
    });

    it('should handle leap years correctly', () => {
      const result = formatDateLong('2024-02-29', 'en');
      expect(result).toBe('February 29, 2024');
    });

    it('should handle single-digit months and days', () => {
      const result = formatDateLong('2025-01-01', 'en');
      expect(result).toBe('January 1, 2025');
    });
  });
});
