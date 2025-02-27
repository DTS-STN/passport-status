export const formatDate = (dateString: string, lang: string): string => {
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

  const prefix = lang in ['en', 'fr'] ? lang : 'en'

  const options: Intl.DateTimeFormatOptions = {
    month: 'long', // Full month name
    day: 'numeric', // Numeric day of the month
    timeZone: 'UTC', // Force UTC timezone
  }

  return new Intl.DateTimeFormat(`${prefix}-CA`, options).format(date)
}
