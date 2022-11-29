/**
 * Compare to strings with case insensitive and accent insensitive
 */
export const compareCIAndAI = (value1: string, value2: string): boolean => {
  return value1.localeCompare(value2, 'en', { sensitivity: 'base' }) === 0
}
