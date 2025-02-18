import {
  CheckStatusApiResponse,
  DeliveryMethodCode,
  PassportStatusesCertificateApplicationIdentification,
  PassportStatusesGetCertificateApplicationResponse,
  ServiceLevelCode,
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
  serviceLevel: getCertificateApplicationResponse.CertificateApplication
    .CertificateApplicationServiceLevel.ServiceLevelCode as ServiceLevelCode,
  deliveryMethod: getCertificateApplicationResponse.CertificateApplication
    .CertificateApplicationDeliveryMethod
    .DeliveryMethodCode as DeliveryMethodCode,
  manifestNumber: getManifestNumber(
    getCertificateApplicationResponse.CertificateApplication
      .CertificateApplicationIdentification,
  ),
  status:
    getCertificateApplicationResponse.CertificateApplication
      .CertificateApplicationStatus.StatusCode,
  receivedDate:
    getCertificateApplicationResponse.CertificateApplication
      .CertificateApplicationTimelineDates.ApplicationReceivedDate.Date,
  reviewedDate:
    getCertificateApplicationResponse.CertificateApplication
      .CertificateApplicationTimelineDates.ApplicationReviewedDate.Date,
  printedDate:
    getCertificateApplicationResponse.CertificateApplication
      .CertificateApplicationTimelineDates.ApplicationPrintedDate.Date,
  completedDate:
    getCertificateApplicationResponse.CertificateApplication
      .CertificateApplicationTimelineDates.ApplicationCompletedDate.Date,
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
