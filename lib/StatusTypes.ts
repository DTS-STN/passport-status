export interface CheckStatusRequestBody {
  birthDate: string
  esrf: string
  givenName: string
  surname: string
}

export interface CheckStatusReponse {
  status: string
}

export interface PassportStatusesSearchResult {
  _embedded: {
    passportStatuses: PassportStatusResult[]
  }
}

export interface PassportStatusResult {
  status: string
}

/**
 * Map passport status object returned by the API to the client
 * filter external API fields
 * @param param0 Passport status object returned by the API
 * @returns Frontend check status object
 */
export function MapToCheckStatusReponse({
  status,
}: PassportStatusResult): CheckStatusReponse {
  return {
    status,
  }
}
