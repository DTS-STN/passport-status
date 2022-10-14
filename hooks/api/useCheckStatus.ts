import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { ApiError } from 'next/dist/server/api-utils'
import {
  CheckStatusReponse,
  CheckStatusRequestBody,
} from '../../pages/api/check-status'
import { checkStatusQueryKey, checkStatusUri } from './types'

export const fetchCheckStatus = async (
  request: CheckStatusRequestBody,
  init?: RequestInit
): Promise<CheckStatusReponse | null> => {
  const response = await fetch(checkStatusUri, {
    ...init,
    method: 'POST',
    body: JSON.stringify(request),
  })
  if (response.ok) return response.json()
  if (response.status === 404) return null
  throw new ApiError(response.status, response.statusText)
}

export const useCheckStatus = (
  requestBody: CheckStatusRequestBody,
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
    [checkStatusQueryKey, requestBody],
    ({ signal }) => fetchCheckStatus(requestBody, { signal }),
    { ...(queryOptions ?? {}) }
  )

  // fix isLoading with disabled: false
  // see: https://github.com/TanStack/query/issues/3584#issuecomment-1256986636
  return {
    ...query,
    isLoading: query.isLoading && query.fetchStatus !== 'idle',
  }
}
