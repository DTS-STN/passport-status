import {
  CheckStatusApiResponse,
  DeliveryMethodCode,
  PassportStatusesCertificateApplicationIdentification,
  PassportStatusesCertificateApplicationTimelineDate,
  PassportStatusesGetCertificateApplicationResponse,
  ServiceLevelCode,
  TimelineReferenceDataName,
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
  // From a business logic perspective, received is a required date.
  // All new statuses after this update should have it. But if one sneaks
  // through, this is the default date we use for old statuses, so returning
  // this will trigger the old version of the status page to load.
  receivedDate:
    getTimelineDateByDataReference(
      getCertificateApplicationResponse.CertificateApplication
        .CertificateApplicationTimelineDates,
      TimelineReferenceDataName.RECEIVED,
    ) ?? '0001-01-01',
  reviewedDate: getTimelineDateByDataReference(
    getCertificateApplicationResponse.CertificateApplication
      .CertificateApplicationTimelineDates,
    TimelineReferenceDataName.REVIEWED,
  ),
  printedDate: getTimelineDateByDataReference(
    getCertificateApplicationResponse.CertificateApplication
      .CertificateApplicationTimelineDates,
    TimelineReferenceDataName.PRINTED,
  ),
  completedDate: getTimelineDateByDataReference(
    getCertificateApplicationResponse.CertificateApplication
      .CertificateApplicationTimelineDates,
    TimelineReferenceDataName.COMPLETED,
  ),
})

export const getTimelineDateByDataReference = (
  dates: PassportStatusesCertificateApplicationTimelineDate[],
  name: TimelineReferenceDataName,
): string | undefined => {
  const date = dates.find((d) => d.ReferenceDataName === name)

  return date ? date.TimelineDate.Date : undefined
}

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
