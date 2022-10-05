/**
 * Passport Status API Types Definitions
 */

export interface PassportStatuses {
  _embedded: {
    passportStatuses: PassportStatus[]
  }
}

export interface PassportStatus {
  id?: string
  fileNumber?: string
  firstName?: string
  lastName?: string
  dateOfBirth?: string
  status?: string
}
