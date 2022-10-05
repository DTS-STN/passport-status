import { NextApiRequest, NextApiResponse } from 'next'
import { ApiError } from 'next/dist/server/api-utils'
import {
  PassportStatus,
  PassportStatuses,
} from '../../lib/passport-status-api-types'
import passportStatusesMock from '../../__mocks__/passportStatusesMock'

export interface CheckStatusRequestBody {
  birthDate: string
  esrf: string
  givenName: string
  surname: string
}

export interface CheckStatusReponse {
  dateOfBirth?: string
  fileNumber?: string
  firstName?: string
  lastName?: string
  status?: string
}

/**
 * Map passport status object returned by the API to the client
 * filter external API fields
 * @param param0 Passport status object returned by the API
 * @returns Frontend check status object
 */
export const mapToCheckStatusReponse = ({
  dateOfBirth,
  fileNumber,
  firstName,
  lastName,
  status,
}: PassportStatus): CheckStatusReponse => ({
  dateOfBirth,
  fileNumber,
  firstName,
  lastName,
  status,
})

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
}: CheckStatusRequestBody): Promise<PassportStatus> => {
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
): Promise<PassportStatus> => {
  if (!passportStatusAPIBaseURI) {
    throw Error('passportStatusAPIBaseURI must not be null or empty')
  }

  // passport statuses api _search endpoint
  const response = await fetch(
    `${passportStatusAPIBaseURI}/api/v1/passport-statuses/_search?dateOfBirth=${birthDate}&fileNumber=${esrf}&firstName=${givenName}&lastName=${surname}`
  )

  if (response.ok) {
    const passportStatusesResponse = (await response.json()) as PassportStatuses
    const { passportStatuses } = passportStatusesResponse._embedded
    if (passportStatuses.length > 0) return passportStatuses[0]
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
    return res.status(200).json(mapToCheckStatusReponse(response))
  } catch (error) {
    if ((error as Error).constructor.name === 'ApiError') {
      const apiError = error as ApiError
      return res.status(apiError.statusCode).send(apiError.message)
    }
    throw error
  }
}
