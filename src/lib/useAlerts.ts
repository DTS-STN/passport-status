import { useQuery } from '@tanstack/react-query'
import { ApiError } from 'next/dist/server/api-utils'

import { Alert, AlertApiRequestQuery } from './types'

export const fetchAlerts = async (
  alertQuery: AlertApiRequestQuery
): Promise<Alert[] | null> => {
  const query = new URLSearchParams({
    ...alertQuery,
  }).toString()
  let uri = alertQuery.page ? `/api/alerts?${query}` : `/api/alerts`
  const response = await fetch(uri, {
    headers: { 'Cache-Control': 'max-age=600' },
  })
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
