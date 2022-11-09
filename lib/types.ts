export interface CheckStatusRequest {
  dateOfBirth: string
  esrf: string
  givenName: string
  surname: string
}

export interface CheckStatusReponse {
  status: string
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
  CertificateApplicationStatus: PassportStatusesCertificateApplicationStatus
}

export interface PassportStatusesCertificateApplicationStatus {
  StatusCode: string
}
