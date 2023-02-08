import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { ApiError } from 'next/dist/server/api-utils'

import { CheckStatusApiRequestQuery, CheckStatusApiResponse } from './types'

export const fetchCheckStatus = async (
  checkStatusApiRequestQuery: CheckStatusApiRequestQuery,
  init?: RequestInit
): Promise<CheckStatusApiResponse | null> => {
  const query = new URLSearchParams({
    ...checkStatusApiRequestQuery,
  }).toString()
  const response = await fetch('/api/check-status?' + query, init)
  if (response.ok) return response.json()
  if (response.status === 404) return null
  throw new ApiError(response.status, response.statusText)
}

export const useCheckStatus = (
  checkStatusApiRequestQuery: CheckStatusApiRequestQuery,
  queryOptions?: UseQueryOptions<
    CheckStatusApiResponse | null,
    ApiError,
    CheckStatusApiResponse | null
  >
) => {
  const query = useQuery<
    CheckStatusApiResponse | null,
    ApiError,
    CheckStatusApiResponse | null
  >(
    ['ps:api:check-status', checkStatusApiRequestQuery],
    ({ signal }) => fetchCheckStatus(checkStatusApiRequestQuery, { signal }),
    { ...(queryOptions ?? {}) }
  )

  // fix isLoading with disabled: false
  // see: https://github.com/TanStack/query/issues/3584#issuecomment-1256986636
  return {
    ...query,
    isLoading: query.isLoading && query.fetchStatus !== 'idle',
  }
}
