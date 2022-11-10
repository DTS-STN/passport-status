import {
  CheckStatusReponse,
  PassportStatusesCertificateApplicationIdentification,
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
  manifestNumber: getManifestNumber(
    getCertificateApplicationResponse.CertificateApplication
      .CertificateApplicationIdentification
  ),
  status:
    getCertificateApplicationResponse.CertificateApplication
      .CertificateApplicationStatus.StatusCode,
})

/**
 * Returns the manifest number (aka parcel tracking system number) of the first element
 * where category text is equals to "Manifest Number", and undefined otherwise
 */
export const getManifestNumber = (
  identifications?: PassportStatusesCertificateApplicationIdentification[]
): string | undefined => {
  return identifications?.find(
    (x) =>
      x.IdentificationCategoryText.toLowerCase() ===
      'Manifest Number'.toLowerCase()
  )?.IdentificationID
}
