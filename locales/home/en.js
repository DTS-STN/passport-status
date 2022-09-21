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
  checkStatus: 'Check Status',
}
