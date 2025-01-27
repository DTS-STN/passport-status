export const formatDate = (dateString: string, lang: string): string => {
  const date = new Date(dateString)

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date')
  }

  const options: Intl.DateTimeFormatOptions = {
    month: 'long', // Full month name
    day: 'numeric', // Numeric day of the month
  }

  return new Intl.DateTimeFormat(`${lang}-US`, options).format(date)
}
