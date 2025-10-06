import { QueryClient } from '@tanstack/react-query';

export const removeCheckStatus = (queryClient: QueryClient) => {
  queryClient.removeQueries({
    queryKey: ['ps:api:check-status'],
  });
};
