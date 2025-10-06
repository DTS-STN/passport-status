import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { ApiError } from 'next/dist/server/api-utils';

import { Alert, AlertApiRequestQuery } from './types';

export const fetchAlerts = async (alertQuery: AlertApiRequestQuery, init?: RequestInit): Promise<Alert[] | null> => {
  const query = new URLSearchParams({ ...alertQuery }).toString();
  const uri = alertQuery.page ? `/api/alerts?${query}` : `/api/alerts`;

  const response = await fetch(uri, {
    ...(init ?? {}),
    headers: { 'Cache-Control': 'max-age=600' },
  });

  if (response.ok) return response.json();
  if (response.status === 404) return null;
  throw new ApiError(response.status, response.statusText);
};

export const useAlerts = (
  alertQuery: AlertApiRequestQuery,
  queryOptions?: Omit<UseQueryOptions<Alert[] | null, ApiError, Alert[] | null>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery<Alert[] | null, ApiError, Alert[] | null>({
    ...(queryOptions ?? {}),
    queryKey: ['ps:api:alerts', alertQuery],
    queryFn: ({ signal }) => fetchAlerts(alertQuery, { signal }),
  });
};
