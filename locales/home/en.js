export default {
  header: 'Passport Status Check',
  description:
    'Use this service with your ESRF to check the status of your passport application.',
  esrf: {
    label: 'File number',
    error: {
      required: 'The File number is required',
      length: 'The File number must be 8 characters long',
    },
  },
  givenName: {
    label: 'Given Name',
    error: {
      required: 'The Given name is required',
    },
  },
  surname: {
    label: 'Surname',
    error: {
      required: 'The Surname is required',
    },
  },
  birthDate: {
    label: 'Date of birth',
    error: {
      required: 'The Date of birth is required',
      invalid:
        'The Date of birth must be a valid date in the format of (dd/mm/yyyy)',
      current: 'The Date of birth must be a date in the past',
    },
  },
  checkStatus: 'Check Status',
  unableToFindStatus:
    'We are unable to determine the status of your application at this time using this service.',
  statusIs:
    'The latest status of your application according to our reccords is: ',
}
