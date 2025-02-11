export const formatDate = (dateString: string, lang: string): string => {
  const date = new Date(dateString)

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date')
  }

  const prefix = lang in ['en', 'fr'] ? lang : 'en'

  const options: Intl.DateTimeFormatOptions = {
    month: 'long', // Full month name
    day: 'numeric', // Numeric day of the month
  }

  return new Intl.DateTimeFormat(`${prefix}-CA`, options).format(date)
}
