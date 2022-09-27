import { NextApiRequest, NextApiResponse } from 'next'
import passportStatusesMock from '../../__mocks__/passportStatusesMock'

export interface RequestData {
  esrf?: string
  givenName?: string
  surname?: string
  birthDate?: string
}

export async function handlerWithMock(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { esrf, givenName, surname, birthDate } = req.body as RequestData

  //temporary mock lookup
  const { passportStatuses } = passportStatusesMock._embedded

  const status = passportStatuses.find((passportStatus) => {
    return (
      esrf?.localeCompare(passportStatus.fileNumber, 'en', {
        sensitivity: 'base',
      }) === 0 &&
      givenName?.localeCompare(passportStatus.firstName, 'en', {
        sensitivity: 'base',
      }) === 0 &&
      surname?.localeCompare(passportStatus.lastName, 'en', {
        sensitivity: 'base',
      }) === 0 &&
      birthDate === passportStatus.dateOfBirth
    )
  })

  if (status) {
    return res.status(200).json(status)
  }

  return res.status(404).send({ message: 'Not Found' })
}

export async function handlerWithAPI(
  req: NextApiRequest,
  res: NextApiResponse,
  passportStatusAPIBaseURI: string
) {
  if (!passportStatusAPIBaseURI) {
    throw Error('passportStatusAPIBaseURI must not be null or empty')
  }

  const { esrf, givenName, surname, birthDate } = req.body as RequestData

  // fetch from passport statuses _search endpoints
  const response = await fetch(
    `${passportStatusAPIBaseURI}/api/v1/passport-statuses/_search?fileNumber=${esrf}&firstName=${givenName}&lastName=${surname}&dateOfBirth=${birthDate}`
  )

  if (response.ok) {
    const passportStatusesSearchResponse = await response.json()
    const { passportStatuses } = passportStatusesSearchResponse._embedded

    if (passportStatuses.length === 0) {
      return res.status(404).send({ message: 'Not Found' })
    }

    return res.status(200).json(passportStatuses[0])
  }

  if (response.status === 404) {
    return res.status(404).send({ message: 'Not Found' })
  }

  return res.status(response.status).send({ message: response.statusText })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Invalid Request' })
  }

  // TODO Sebastien: Remove hardcoded API URI, only used for DEMO purposes
  const passportStatusAPIBaseURI =
    process.env.NEXT_PUBLIC_API_PASSPORT_STATUS_BASE_URI

  return passportStatusAPIBaseURI
    ? handlerWithAPI(req, res, passportStatusAPIBaseURI)
    : handlerWithMock(req, res)
}
