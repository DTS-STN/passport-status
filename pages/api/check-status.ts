import { NextApiRequest, NextApiResponse } from 'next'
import { ApiError } from 'next/dist/server/api-utils'
import logger from '../../lib/logger'
import passportStatusesMock from '../../__mocks__/passportStatusesMock'
import {
  PassportStatusesSearchResult,
  CheckStatusReponse,
  MapToCheckStatusReponse,
  CheckStatusRequestBody,
} from '../../lib/StatusTypes'

/**
 * Fetch passport status from mock API data
 * @param param0 Check status request body object
 * @returns Passport status API mock object
 * @throw ApiError intance
 */
export const fetchPassportStatusMOCK = async ({
  birthDate,
  esrf,
  givenName,
  surname,
}: CheckStatusRequestBody): Promise<CheckStatusReponse> => {
  const { passportStatuses } = passportStatusesMock._embedded

  const passportStatus = passportStatuses.find(
    (passportStatus) =>
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

  if (passportStatus) return passportStatus
  throw new ApiError(404, 'Passport Status Not Found')
}

/**
 * Fetch passport status from passport status API
 * @param passportStatusAPIBaseURI Passport status API base URI
 * @param param1 Check status request body object
 * @returns Passport status API object
 * @throw ApiError intance
 */
export const fetchPassportStatusAPI = async (
  passportStatusAPIBaseURI: string,
  { birthDate, esrf, givenName, surname }: CheckStatusRequestBody
): Promise<CheckStatusReponse> => {
  if (!passportStatusAPIBaseURI) {
    throw Error('passportStatusAPIBaseURI must not be null or empty')
  }

  // passport statuses api _search endpoint
  const response = await fetch(
    `${passportStatusAPIBaseURI}/api/v1/passport-statuses/_search?dateOfBirth=${birthDate}&fileNumber=${esrf}&firstName=${givenName}&lastName=${surname}`
  )

  if (response.ok) {
    const passportStatusesResponse =
      (await response.json()) as PassportStatusesSearchResult
    const { passportStatuses } = passportStatusesResponse._embedded
    if (passportStatuses.length > 0)
      return MapToCheckStatusReponse(passportStatuses[0])
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
  if (req.method !== 'POST') {
    return res.status(405).send(`Invalid request method ${req.method}`)
  }

  const body = JSON.parse(req.body) as CheckStatusRequestBody

  try {
    const passportStatusApiBaseUri = process.env.PASSPORT_STATUS_API_BASE_URI
    const response = passportStatusApiBaseUri
      ? await fetchPassportStatusAPI(passportStatusApiBaseUri, body)
      : await fetchPassportStatusMOCK(body)
    return res.status(200).json(response)
  } catch (error) {
    logger.error(error)
    if ((error as Error).constructor.name === 'ApiError') {
      const apiError = error as ApiError
      return res.status(apiError.statusCode).send(apiError.message)
    }
    throw error
  }
}
