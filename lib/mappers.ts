import {
  CheckStatusReponse,
  PassportStatusesGetCertificateApplicationResponse,
} from './types'

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
