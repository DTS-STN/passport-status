import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { ApiError } from 'next/dist/server/api-utils'
import { CheckStatusReponse, CheckStatusRequest } from './StatusTypes'

export const fetchCheckStatus = async (
  checkStatusRequest: CheckStatusRequest,
  init?: RequestInit
): Promise<CheckStatusReponse | null> => {
  const query = new URLSearchParams({ ...checkStatusRequest }).toString()
  const response = await fetch('/api/check-status?' + query, init)
  if (response.ok) return response.json()
  if (response.status === 404) return null
  throw new ApiError(response.status, response.statusText)
}

export const useCheckStatus = (
  checkStatusRequest: CheckStatusRequest,
  queryOptions?: UseQueryOptions<
    CheckStatusReponse | null,
    ApiError,
    CheckStatusReponse | null
  >
) => {
  const query = useQuery<
    CheckStatusReponse | null,
    ApiError,
    CheckStatusReponse | null
  >(
    ['ps:api:check-status', checkStatusRequest],
    ({ signal }) => fetchCheckStatus(checkStatusRequest, { signal }),
    { ...(queryOptions ?? {}) }
  )

  // fix isLoading with disabled: false
  // see: https://github.com/TanStack/query/issues/3584#issuecomment-1256986636
  return {
    ...query,
    isLoading: query.isLoading && query.fetchStatus !== 'idle',
  }
}
