export type AdobeDataLayer = { push?: (object: Record<string, string>) => void }
export type AppWindow = Window &
  typeof globalThis & { adobeDataLayer?: AdobeDataLayer }

export enum AlertPage {
  EXPECTATIONS,
  LANDING,
  STATUS,
  STATUS_NOT_FOUND,
  STATUS_INVALID,
  STATUS_PROCESSING,
  STATUS_READY_PICKUP,
  STATUS_SHIPPED_CANADA,
  STATUS_SHIPPED_FEDEX,
}

export type AlertPosition = 'bottom' | 'top'

export type AlertType = 'info' | 'warning' | 'success'

export interface AlertApiResponse {
  alerts: Alert[]
}

export interface Alert {
  position: AlertPosition
  textEn: string
  textFr: string
  type: AlertType
}

export interface AlertJson extends Alert {
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
