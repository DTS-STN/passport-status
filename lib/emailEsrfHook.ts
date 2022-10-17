import { useMutation } from '@tanstack/react-query'

export interface EmailEsrfRequestBody {
  dateOfBirth: string
  email: string
  firstName: string
  lastName: string
}

export function EmailEsrf(requestBody: EmailEsrfRequestBody) {
  const query = useMutation(
    ['ps:api:email-esrf', requestBody],
    async () =>
      await fetch('/api/email-esrf', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })
  )
}
