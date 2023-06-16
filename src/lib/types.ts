export type AdobeDataLayer = { push?: (object: Record<string, string>) => void }
export type AppWindow = Window &
  typeof globalThis & { adobeDataLayer?: AdobeDataLayer }

export type AlertPage =
  | 'expectations'
  | 'landing'
  | 'status'
  | 'status-not-found'
  | 'status-invalid'
  | 'status-processing'
  | 'status-ready-pickup'
  | 'status-shipped-canada'
  | 'status-shipped-fedex'

export type AlertPosition = 'bottom' | 'top'

export type AlertType = 'danger' | 'info' | 'warning' | 'success'

export interface AlertApiRequestQuery {
  page: AlertPage
}

export interface AlertApiResponse {
  alerts: Alert[]
}

export interface Alert {
  uid: string
  position: AlertPosition
  textEn: string
  textFr: string
  type: AlertType
}

export interface AlertMeta extends Alert {
  pages: AlertPage[]
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
}

export interface EmailEsrfApiRequestBody {
  dateOfBirth: string
  email: string
  givenName: string
  locale: string
  surname: string
}

export interface HealthApiResponse {
  appBaseUri: string
  buildDate: string
  environment: string
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
}

export enum StatusCode {
  APPLICATION_NO_LONGER_MEETS_CRITERIA = '99',
  FILE_BEING_PROCESSED = '1',
  PASSPORT_ISSUED_READY_FOR_PICKUP = '2',
  PASSPORT_ISSUED_SHIPPING_CANADA_POST = '3',
  PASSPORT_ISSUED_SHIPPING_FEDEX = '4',
  NOT_ACCEPTABLE_FOR_PROCESSING = '5',
}
