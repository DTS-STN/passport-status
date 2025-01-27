import {
  CheckStatusApiResponse,
  PassportStatusesCertificateApplicationIdentification,
  PassportStatusesGetCertificateApplicationResponse,
} from '../types'

/**
 * Map passport status object returned by the API to the client
 * filter external API fields
 * @param getCertificateApplicationResponse Passport status object returned by the API
 * @returns Frontend check status object
 */
export const mapToCheckStatusApiResponse = (
  getCertificateApplicationResponse: PassportStatusesGetCertificateApplicationResponse,
): CheckStatusApiResponse => ({
  overdue: false,
  submissionType: 'mail',
  manifestNumber: getManifestNumber(
    getCertificateApplicationResponse.CertificateApplication
      .CertificateApplicationIdentification,
  ),
  status:
    getCertificateApplicationResponse.CertificateApplication
      .CertificateApplicationStatus.StatusCode,
  receivedDate: '2024-01-12',
  reviewedDate: '2024-01-13',
  // printedDate: '2024-01-14',
  // documentsReturnedDate: '2024-01-15',
})

/**
 * Returns the manifest number (aka parcel tracking system number) of the first element
 * where category text is equals to "Manifest Number", and undefined otherwise
 */
export const getManifestNumber = (
  identifications?: PassportStatusesCertificateApplicationIdentification[],
): string | undefined => {
  return identifications?.find(
    (x) =>
      x.IdentificationCategoryText.toLowerCase() ===
      'Manifest Number'.toLowerCase(),
  )?.IdentificationID
}
