import { useQuery } from '@tanstack/react-query';

import buildUrl from 'lib/api/buildUrl';
import isNeedProxy from 'lib/api/isNeedProxy';
import { getResourceKey } from 'lib/api/useApiQuery';
import * as cookies from 'lib/cookies';
import useFetch from 'lib/hooks/useFetch';

export default function useGetCsrfToken() {
  const nodeApiFetch = useFetch();

  useQuery({
    queryKey: getResourceKey('csrf'),
    queryFn: async() => {
      if (!isNeedProxy()) {
        const url = buildUrl('csrf');
        const apiResponse = await fetch(url, { credentials: 'include' });
        const csrfFromHeader = apiResponse.headers.get('x-bs-account-csrf');

        if (!csrfFromHeader) {
          console.error('Unable to get csrf token');
          return;
        }

        return { token: csrfFromHeader };
      }

      return nodeApiFetch('/node-api/csrf');
    },
    enabled: Boolean(cookies.get(cookies.NAMES.API_TOKEN)),
  });
}
