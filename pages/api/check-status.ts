import { NextApiRequest, NextApiResponse } from 'next'
import logger from '../../lib/logger'
import { mapToCheckStatusApiResponse } from '../../lib/mappers/checkStatusApiResponseMapper'
import { compareCIAndAI } from '../../lib/utils/compareCIAndAI'
import {
  PassportStatusesSearchResult,
  CheckStatusApiResponse,
  CheckStatusApiRequestQuery,
} from '../../lib/types'
import passportStatusesMock from '../../__mocks__/passportStatusesMock.json'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CheckStatusApiResponse | string>
) {
  if (req.method !== 'GET') {
    res.status(405).send(`Invalid request method ${req.method}`)
    return
  }

  const { searchParams } = new URL(req.url ?? '', `http://${req.headers.host}`)
  const checkStatusRequest: CheckStatusApiRequestQuery = {
    dateOfBirth: searchParams.get('dateOfBirth') ?? '',
    esrf: searchParams.get('esrf') ?? '',
    givenName: searchParams.get('givenName') ?? '',
    surname: searchParams.get('surname') ?? '',
  }

  try {
    process.env.PASSPORT_STATUS_API_BASE_URI
      ? await searchPassportStatusApi(res, checkStatusRequest)
      : searchPassportStatusMock(res, checkStatusRequest)
  } catch (error) {
    logger.error(error)
    res.status(500).send('Something went wrong.')
  }
}

/**
 * Search passport status from passport status API
 * @param res
 * @param checkStatusApiRequestQuery Check status request object
 * @returns Passport status API search response
 */
export const searchPassportStatusApi = async (
  res: NextApiResponse<CheckStatusApiResponse | string>,
  checkStatusApiRequestQuery: CheckStatusApiRequestQuery
) => {
  if (!process.env.PASSPORT_STATUS_API_BASE_URI) {
    throw Error(
      'process.env.PASSPORT_STATUS_API_BASE_URI must not be undefined, null or empty'
    )
  }

  const { dateOfBirth, esrf, givenName, surname } = checkStatusApiRequestQuery
  const query = new URLSearchParams({
    dateOfBirth,
    fileNumber: esrf,
    givenName,
    surname,
  }).toString()
  const url = `${process.env.PASSPORT_STATUS_API_BASE_URI}/api/v1/passport-statuses/_search?${query}`
  const response = await fetch(url)

  if (response.ok) {
    const searchResult: PassportStatusesSearchResult = await response.json()
    const { GetCertificateApplicationResponse } = searchResult._embedded

    if (GetCertificateApplicationResponse.length === 0) {
      res.status(404).send('Passport Status Not Found')
      return
    }

    res.send(mapToCheckStatusApiResponse(GetCertificateApplicationResponse[0]))
    return
  }

  if (response.status === 404 || response.status === 422) {
    res.status(404).send('Passport Status Not Found')
    return
  }

  res.status(response.status).send(response.statusText)
}

/**
 * Search passport status from mock API data
 * @param res
 * @param checkStatusApiRequestQuery Check status request object
 * @returns Response with status 200 and passport status API mock json, othewise response with status 404
 */
export const searchPassportStatusMock = (
  res: NextApiResponse<CheckStatusApiResponse | string>,
  checkStatusApiRequestQuery: CheckStatusApiRequestQuery
) => {
  const { dateOfBirth, esrf, givenName, surname } = checkStatusApiRequestQuery
  const { GetCertificateApplicationResponse } = passportStatusesMock._embedded

  const applicationResponse = GetCertificateApplicationResponse.find(
    ({
      CertificateApplication: {
        CertificateApplicationApplicant,
        CertificateApplicationIdentification,
      },
    }) =>
      compareCIAndAI(
        esrf,
        CertificateApplicationIdentification.find(
          ({ IdentificationCategoryText }) =>
            IdentificationCategoryText === 'File Number'
        )?.IdentificationID ?? ''
      ) &&
      compareCIAndAI(
        givenName,
        CertificateApplicationApplicant.PersonName.PersonGivenName[0]
      ) &&
      compareCIAndAI(
        surname,
        CertificateApplicationApplicant.PersonName.PersonSurName
      ) &&
      dateOfBirth === CertificateApplicationApplicant.BirthDate.Date
  )

  if (applicationResponse) {
    res.send(mapToCheckStatusApiResponse(applicationResponse))
    return
  }

  res.status(404).send('Passport Status Not Found')
}
