export interface CheckStatusRequest {
  dateOfBirth: string
  esrf: string
  givenName: string
  surname: string
}

export interface CheckStatusReponse {
  status: string
}

export interface PassportStatusesSearchResult {
  _embedded: {
    GetCertificateApplicationResponse: PassportStatusesGetCertificateApplicationResponse[]
  }
}

export interface PassportStatusesGetCertificateApplicationResponse {
  id: string
  CertificateApplication: PassportStatusesCertificateApplication
}

export interface PassportStatusesCertificateApplication {
  CertificateApplicationStatus: PassportStatusesCertificateApplicationStatus
}

export interface PassportStatusesCertificateApplicationStatus {
  StatusCode: string
}

/**
 * Map passport status object returned by the API to the client
 * filter external API fields
 * @param param0 Passport status object returned by the API
 * @returns Frontend check status object
 */
export const mapToCheckStatusReponse = (
  getCertificateApplicationResponse: PassportStatusesGetCertificateApplicationResponse
): CheckStatusReponse => ({
  status:
    getCertificateApplicationResponse.CertificateApplication
      .CertificateApplicationStatus.StatusCode,
})
