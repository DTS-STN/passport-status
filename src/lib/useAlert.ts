import { useQuery } from '@tanstack/react-query'
import { ApiError } from 'next/dist/server/api-utils'

import { AlertApiResponse } from './types'

export const fetchAlerts = async (
  init?: RequestInit
): Promise<AlertApiResponse | null> => {
  const response = await fetch('/api/alerts', init)
  if (response.ok) {
    return response.json()
  }
  if (response.status === 404) return null
  throw new ApiError(response.status, response.statusText)
}

export const useAlerts = () => {
  const query = useQuery<
    AlertApiResponse | null,
    ApiError,
    AlertApiResponse | null
  >(['ps:api:alerts'], ({ signal }) => fetchAlerts({ signal }))

  // fix isLoading with disabled: false
  // see: https://github.com/TanStack/query/issues/3584#issuecomment-1256986636
  return {
    ...query,
    isLoading: query.isLoading && query.fetchStatus !== 'idle',
  }
}
