import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { ApiError } from 'next/dist/server/api-utils';

import type { EmailEsrfApiRequestBody } from './types';

const useEmailEsrf = (options?: Omit<UseMutationOptions<void, ApiError, EmailEsrfApiRequestBody>, 'mutationFn'>) => {
  return useMutation<void, ApiError, EmailEsrfApiRequestBody>({
    ...(options ?? {}),
    mutationFn: async (body) => {
      const response = await fetch('/api/email-esrf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new ApiError(response.status, response.statusText);
      }
    },
  });
};

export default useEmailEsrf;
