import { useQuery } from '@tanstack/react-query'
import { ApiError } from 'next/dist/server/api-utils'

import { Alert, AlertApiRequestQuery } from './types'

export const fetchAlerts = async (
  alertQuery: AlertApiRequestQuery
): Promise<Alert[] | null> => {
  const query = new URLSearchParams({
    ...alertQuery,
  }).toString()
  const response = await fetch('/api/alerts?' + query, { cache: 'no-store' })
  if (response.ok) {
    return response.json()
  }
  if (response.status === 404) return null
  throw new ApiError(response.status, response.statusText)
}

export const useAlerts = (alertQuery: AlertApiRequestQuery) => {
  const query = useQuery<Alert[] | null, ApiError, Alert[] | null>(
    ['ps:api:alerts', alertQuery],
    async () => await fetchAlerts(alertQuery)
  )

  return {
    ...query,
  }
}
