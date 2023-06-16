import { useQuery } from '@tanstack/react-query'
import { ApiError } from 'next/dist/server/api-utils'

import { AlertApiRequestQuery, AlertApiResponse } from './types'

export const fetchAlerts = async (
  alertQuery: AlertApiRequestQuery,
  init?: RequestInit
): Promise<AlertApiResponse | null> => {
  const query = new URLSearchParams({
    ...alertQuery,
  }).toString()
  const response = await fetch('/api/alerts?' + query, init)
  if (response.ok) {
    return response.json()
  }
  if (response.status === 404) return null
  throw new ApiError(response.status, response.statusText)
}

export const useAlerts = (alertQuery: AlertApiRequestQuery) => {
  const query = useQuery<
    AlertApiResponse | null,
    ApiError,
    AlertApiResponse | null
  >(['ps:api:alerts', alertQuery], ({ signal }) =>
    fetchAlerts(alertQuery, { signal })
  )

  // fix isLoading with disabled: false
  // see: https://github.com/TanStack/query/issues/3584#issuecomment-1256986636
  return {
    ...query,
    isLoading: query.isLoading && query.fetchStatus !== 'idle',
  }
}
