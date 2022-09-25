import passportStatusesMock from '../../__mocks__/passportStatusesMock'

export default function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).send({ message: 'Invalid Request' })

  const { esrf, givenName, surname, birthDate } = req.body

  //temporary mock lookup
  const status = passportStatusesMock._embedded.passportStatuses.find(
    (passportStatus) => {
      return (
        esrf.toLowerCase() === passportStatus.fileNumber.toLowerCase() &&
        givenName.toLowerCase() === passportStatus.firstName.toLowerCase() &&
        surname.toLowerCase() === passportStatus.lastName.toLowerCase() &&
        birthDate === passportStatus.dateOfBirth
      )
    }
  )

  if (status) {
    return res.status(200).json(status)
  } else {
    return res.status(404).send({ message: 'Not Found' })
  }
}
