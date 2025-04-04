import { formatDate } from '../../../src/lib/utils/dates'

describe('formatDate', () => {
  it('should format a valid date in English', () => {
    const result = formatDate('1979-04-11', 'en')
    expect(result).toBe('April 11')
  })

  it('should format a valid date in French', () => {
    const result = formatDate('1979-04-11', 'fr')
    expect(result).toBe('11 avril')
  })

  it('should default to English for unsupported languages', () => {
    const result = formatDate('1979-04-11', 'es')
    expect(result).toBe('April 11')
  })

  it('should throw an error for an invalid date', () => {
    expect(() => formatDate('invalid-date', 'en')).toThrow('Invalid date')
  })

  it('should handle leap years correctly', () => {
    const result = formatDate('2024-02-29', 'en')
    expect(result).toBe('February 29')
  })

  it('should handle single-digit months and days', () => {
    const result = formatDate('2025-01-01', 'en')
    expect(result).toBe('January 1')
  })
})
