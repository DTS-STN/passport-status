/**
 * @description Formats a date string into a more readable format.
 * @param {string} dateString - The date string to format (YYYY-MM-DD).
 * @param {string} lang - The language code for formatting (e.g., 'en', 'fr').
 * @returns {string} - The formatted date string. 'April 11'
 **/
export const formatDateShort = (dateString: string, lang: string): string => {
  return formatDateWithOptions(dateString, lang, {
    month: 'long', // Full month name
    day: 'numeric', // Numeric day of the month
  })
}

/**
 * @description Formats a date string into a more readable format.
 * @param {string} dateString - The date string to format (YYYY-MM-DD).
 * @param {string} lang - The language code for formatting (e.g., 'en', 'fr').
 * @returns {string} - The formatted date string. 'April 11, 1979'
 **/
export const formatDateLong = (dateString: string, lang: string): string => {
  return formatDateWithOptions(dateString, lang, {
    dateStyle: 'long', // Full date
  })
}

/**
 * @description Formats a date string into a more readable format.
 * @param {string} dateString - The date string to format (YYYY-MM-DD).
 * @param {string} lang - The language code for formatting (e.g., 'en', 'fr').
 * @param {Intl.DateTimeFormatOptions} formatOptions - Additional formatting options.
 * @returns {string} - The formatted date string.
 **/
const formatDateWithOptions = (
  dateString: string,
  lang: string,
  formatOptions: Omit<Intl.DateTimeFormatOptions, 'timeZone'>,
) => {
  let date = new Date(dateString)

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date')
  }

  // In my testing setting the timezone on the Intl.DateTimeFormatOptions
  // to UTC seemed to work, but just in there's an edge case and I got
  // lucky with my local time, forcing the underlying date to be UTC
  // is a safe bet.

  // Parse the date string into components
  const [year, month, day] = dateString.split('-').map(Number)

  // Create a Date object in UTC
  date = new Date(Date.UTC(year, month - 1, day))

  const prefix = ['en', 'fr'].includes(lang) ? lang : 'en'

  const options: Intl.DateTimeFormatOptions = {
    ...formatOptions,
    timeZone: 'UTC', // Force UTC timezone
  }

  return new Intl.DateTimeFormat(`${prefix}-CA`, options).format(date)
}
