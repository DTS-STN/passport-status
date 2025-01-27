import { Service } from 'next-seo/lib/types'

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
  receivedDate?: string
  reviewedDate?: string
  printedDate?: string
  mailedDate?: string
  pickUpReadyDate?: string
  documentsReturnedDate?: string
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
}

export interface PassportStatusesCertificateApplicationIdentification {
  IdentificationCategoryText: string
  IdentificationID: string
}

export interface PassportStatusesCertificateApplicationStatus {
  StatusCode: string
  // SubmissionType: 'mail' | 'person'
  // Overdue: boolean
  // ReceivedDate?: string
  // ReviewedDate?: string
  // PrintedDate?: string
  // MailedDate?: string
  // PickUpReadyDate?: string
  // DocumentsReturnedDate?: string
}

export enum StatusCode {
  APPLICATION_NO_LONGER_MEETS_CRITERIA = '99',
  FILE_BEING_PROCESSED = '1',
  PASSPORT_ISSUED_READY_FOR_PICKUP = '2',
  PASSPORT_ISSUED_SHIPPING_CANADA_POST = '3',
  PASSPORT_ISSUED_SHIPPING_FEDEX = '4',
  NOT_ACCEPTABLE_FOR_PROCESSING = '5',
  PASSPORT_IS_PRINTING = '6',
}

export type TimelineEntryStatus = 'done' | 'current' | 'future'

export type TimelinePosition = 'first' | 'middle' | 'last'

export type TimelineEntryData = {
  step: string
  status: TimelineEntryStatus
  date?: string
}

export enum ServiceLevelCode {
  TEN_DAYS = '1',
  TWENTY_DAYS = '2',
}

export enum DeliveryMethodCode {
  MAIL = '1',
  IN_PERSON = '2',
}
