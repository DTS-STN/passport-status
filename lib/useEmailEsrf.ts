import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { ApiError } from 'next/dist/server/api-utils'
import { EmailEsrfRequestBody } from '../pages/api/email-esrf'

const useEmailEsrf = (
  options?: UseMutationOptions<void, ApiError, EmailEsrfRequestBody>
) => {
  return useMutation<void, ApiError, EmailEsrfRequestBody>(async (body) => {
    const response = await fetch('/api/email-esrf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new ApiError(response.status, response.statusText)
    }
  }, options)
}

export default useEmailEsrf
