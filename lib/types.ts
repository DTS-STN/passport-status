export interface CheckStatusRequest {
  dateOfBirth: string
  esrf: string
  givenName: string
  surname: string
}

export interface CheckStatusReponse {
  manifestNumber?: string
  status: StatusCode
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
  StatusCode: StatusCode | string
}

export enum StatusCode {
  APPLICATION_NO_LONGER_MEETS_CRITERIA = '99',
  FILE_BEING_PROCESSED = '1',
  PASSPORT_ISSUED_READY_FOR_PICKUP = '2',
  PASSPORT_ISSUED_SHIPPING_CANADA_POST = '3',
  PASSPORT_ISSUED_SHIPPING_FEDEX = '4',
  NOT_ACCEPTABLE_FOR_PROCESSING = '5',
}
