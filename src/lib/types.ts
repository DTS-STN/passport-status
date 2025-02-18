export type AdobeDataLayer = { push?: (object: Record<string, string>) => void }
export type AppWindow = Window &
  typeof globalThis & { adobeDataLayer?: AdobeDataLayer }

export type AlertPage =
  | 'email'
  | 'expectations'
  | 'landing'
  | 'status'
  | 'status-not-found'
  | 'status-invalid'
  | 'status-processing'
  | 'status-processing-overdue'
  | 'status-ready-pickup'
  | 'status-shipped-canada'
  | 'status-shipped-fedex'

export type AlertType = 'danger' | 'info' | 'warning' | 'success'

export interface AlertApiRequestQuery {
  page?: AlertPage
}

export interface AlertJsonResponse {
  jsonAlerts: AlertMeta[]
}

export interface Alert {
  uid: string
  textEn: string
  textFr: string
  type: AlertType
}

export interface AlertMeta extends Alert {
  pages?: AlertPage[]
  validFrom: Date
  validTo: Date
}

export interface CheckStatusApiRequestQuery {
  dateOfBirth: string
  esrf: string
  givenName: string
  surname: string
}

export interface CheckStatusApiResponse {
  manifestNumber?: string
  status: string
  serviceLevel: ServiceLevelCode
  deliveryMethod: DeliveryMethodCode
  receivedDate: string
  reviewedDate?: string
  printedDate?: string
  completedDate?: string
}

export interface EmailEsrfApiRequestBody {
  dateOfBirth: string
  email: string
  givenName: string
  locale: string
  surname: string
}

export interface HealthApiResponse {
  adobeAnalyticsScriptSrc: string | null
  appBaseUri: string | null
  buildDate: string | null
  environment: string | null
  loggingLevel: string | null
  status: string
  uptime: string
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
  CertificateApplicationIdentification: PassportStatusesCertificateApplicationIdentification[]
  CertificateApplicationStatus: PassportStatusesCertificateApplicationStatus
  CertificateApplicationDeliveryMethod: PassportStatusesCertificateApplicationDeliveryMethod
  CertificateApplicationServiceLevel: PassportStatusesCertificateApplicationServiceLevel
  CertificateApplicationTimelineDates: PassportStatusesCertificateApplicationTimelineDates
}

export interface PassportStatusesCertificateApplicationIdentification {
  IdentificationCategoryText: string
  IdentificationID: string
}

export interface PassportStatusesCertificateApplicationStatus {
  StatusCode: string
}

export interface PassportStatusesCertificateApplicationDeliveryMethod {
  DeliveryMethodCode: string
}

export interface PassportStatusesCertificateApplicationServiceLevel {
  ServiceLevelCode: string
}

export interface PassportStatusesCertificateApplicationTimelineDates {
  ApplicationReceivedDate: NIEMRequiredDate
  ApplicationReviewedDate: NIEMNullableDate
  ApplicationPrintedDate: NIEMNullableDate
  ApplicationCompletedDate: NIEMNullableDate
}

export interface NIEMRequiredDate {
  Date: string
}

export interface NIEMNullableDate {
  Date?: string
}

export enum StatusCode {
  APPLICATION_NO_LONGER_MEETS_CRITERIA = '99',
  FILE_BEING_PROCESSED = '1',
  PASSPORT_ISSUED_READY_FOR_PICKUP = '2',
  PASSPORT_ISSUED_SHIPPING_CANADA_POST = '3',
  PASSPORT_ISSUED_SHIPPING_FEDEX = '4',
  NOT_ACCEPTABLE_FOR_PROCESSING = '5',
  PASSPORT_IS_PRINTING = '6',
  FILE_BEING_PROCESSED_OVERDUE = '7',
}

export type TimelineEntryStatus = 'done' | 'current' | 'future'

export type TimelinePosition = 'first' | 'middle' | 'last'

export type TimelineEntryData = {
  step: string
  status: TimelineEntryStatus
  date?: string
  subtext?: string
}

export enum ServiceLevelCode {
  TEN_DAYS = '1',
  TWENTY_DAYS = '2',
}

export enum DeliveryMethodCode {
  MAIL = '1',
  IN_PERSON = '2',
}

export type StatusDisplayData = {
  receivedDate: string
  serviceLevel: ServiceLevelCode
  deliveryMethod: DeliveryMethodCode
  timelineExists: boolean
  timelineData: TimelineEntryData[]
}
