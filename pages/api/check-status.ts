import { NextApiRequest, NextApiResponse } from 'next'
import { ApiError } from 'next/dist/server/api-utils'
import logger from '../../lib/logger'
import passportStatusesMock from '../../__mocks__/passportStatusesMock.json'
import {
  PassportStatusesSearchResult,
  CheckStatusReponse,
  mapToCheckStatusReponse,
  CheckStatusRequest,
} from '../../lib/StatusTypes'

/**
 * Fetch passport status from mock API data
 * @param checkStatusRequest Check status request object
 * @returns Passport status API mock object
 * @throw ApiError intance
 */
export const fetchPassportStatusMOCK = async (
  checkStatusRequest: CheckStatusRequest
): Promise<CheckStatusReponse> => {
  const { dateOfBirth, esrf, givenName, surname } = checkStatusRequest
  const { GetCertificateApplicationResponse } = passportStatusesMock._embedded

  /**
   * Compare to strings with case insensitive and accent insensitive
   */
  const compareCIAndAI = (value1: string, value2: string): boolean =>
    value1.localeCompare(value2, 'en', { sensitivity: 'base' }) === 0

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

  if (applicationResponse) return mapToCheckStatusReponse(applicationResponse)
  throw new ApiError(404, 'Passport Status Not Found')
}

/**
 * Fetch passport status from passport status API
 * @param passportStatusAPIBaseURI Passport status API base URI
 * @param checkStatusRequest Check status request object
 * @returns Passport status API object
 * @throw ApiError intance
 */
export const fetchPassportStatusAPI = async (
  passportStatusAPIBaseURI: string,
  checkStatusRequest: CheckStatusRequest
): Promise<CheckStatusReponse> => {
  if (!passportStatusAPIBaseURI) {
    throw Error('passportStatusAPIBaseURI must not be null or empty')
  }

  const { dateOfBirth, esrf, givenName, surname } = checkStatusRequest

  // passport statuses api _search endpoint
  const response = await fetch(
    `${passportStatusAPIBaseURI}/api/v1/passport-statuses/_search?dateOfBirth=${dateOfBirth}&fileNumber=${esrf}&firstName=${givenName}&lastName=${surname}`
  )

  if (response.ok) {
    const passportStatusesResponse =
      (await response.json()) as PassportStatusesSearchResult
    const { GetCertificateApplicationResponse } =
      passportStatusesResponse._embedded

    if (GetCertificateApplicationResponse.length > 0) {
      return mapToCheckStatusReponse(GetCertificateApplicationResponse[0])
    }

    throw new ApiError(404, 'Passport Status Not Found')
  }

  if (response.status === 404 || response.status === 402) {
    throw new ApiError(404, 'Passport Status Not Found')
  }

  throw new ApiError(response.status, response.statusText)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CheckStatusReponse | string>
) {
  if (req.method !== 'GET') {
    res.status(405).send(`Invalid request method ${req.method}`)
    return
  }

  const { searchParams } = new URL(req.url ?? '', `http://${req.headers.host}`)
  const checkStatusRequest: CheckStatusRequest = {
    dateOfBirth: searchParams.get('dateOfBirth') ?? '',
    esrf: searchParams.get('esrf') ?? '',
    givenName: searchParams.get('givenName') ?? '',
    surname: searchParams.get('surname') ?? '',
  }

  try {
    const passportStatusApiBaseUri = process.env.PASSPORT_STATUS_API_BASE_URI
    const response = passportStatusApiBaseUri
      ? await fetchPassportStatusAPI(
          passportStatusApiBaseUri,
          checkStatusRequest
        )
      : await fetchPassportStatusMOCK(checkStatusRequest)
    res.status(200).json(response)
  } catch (error) {
    logger.error(error)

    if ((error as Error).constructor.name === 'ApiError') {
      const apiError = error as ApiError
      res.status(apiError.statusCode).send(apiError.message)
      return
    }

    res.status(500).send('Something went wrong.')
  }
}
