import { useQuery } from '@tanstack/react-query'
import { EmailEsrfRequestBody } from '../pages/api/email-esrf'

export function EmailEsrf(requestBody: EmailEsrfRequestBody) {
  const query = useQuery(
    ['ps:api:email-esrf', requestBody],
    async () =>
      await fetch('/api/email-esrf', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })
  )

  return {
    ...query,
    isLoading: query.isLoading,
  }
}
