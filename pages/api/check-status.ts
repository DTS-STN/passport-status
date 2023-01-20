import { NextApiRequest, NextApiResponse } from 'next'
import { mapToCheckStatusApiResponse } from '../../lib/mappers/checkStatusApiResponseMapper'
import { compareCIAndAI } from '../../lib/utils/compareCIAndAI'
import {
  PassportStatusesSearchResult,
  CheckStatusApiResponse,
  CheckStatusApiRequestQuery,
} from '../../lib/types'
import passportStatusesMock from '../../__mocks__/passportStatusesMock.json'
import { getLogger } from '../../logging/log-util'

const logger = getLogger('check-status')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CheckStatusApiResponse | string>
) {
  if (req.method !== 'GET') {
    logger.debug(`error 405: Invalid request method ${req.method}`)
    return res.status(405).send(`Invalid request method ${req.method}`)
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
    logger.error(`error 500: ${JSON.stringify(error)}`)
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
    logger.error(
      'PASSPORT_STATUS_API_BASE_URI must not be undefined, null or empty'
    )
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
    logger.debug('response OK')
    const searchResult: PassportStatusesSearchResult = await response.json()
    const { GetCertificateApplicationResponse } = searchResult._embedded

    if (GetCertificateApplicationResponse.length === 0) {
      logger.debug('error 404: searchResult._embedded is empty')
      return res.status(404).send('Passport Status Not Found')
    }

    return res.send(
      mapToCheckStatusApiResponse(GetCertificateApplicationResponse[0])
    )
  }

  if (response.status === 404 || response.status === 422) {
    logger.debug(`error ${response.status}: ${response.body}`)

    // 404 and 422 responses should both be handled as
    // `not found` results to mitigate data probing attacks
    return res.status(404).send('Passport Status Not Found')
  }

  logger.debug(`Status: ${response.status}: ${response.statusText}`)
  return res.status(response.status).send(response.statusText)
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
    logger.debug(applicationResponse)
    return res.send(mapToCheckStatusApiResponse(applicationResponse))
  }
  logger.debug(`Status 404: Passport Status Not Found`)
  return res.status(404).send('Passport Status Not Found')
}
