import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { resourceKey } from 'lib/api/resources';
import type { ResourceError } from 'lib/api/resources';
import * as cookies from 'lib/cookies';
import useLoginUrl from 'lib/hooks/useLoginUrl';

export default function useRedirectForInvalidAuthToken() {
  const queryClient = useQueryClient();

  const state = queryClient.getQueryState<unknown, ResourceError>([ resourceKey('user_info') ]);
  const errorStatus = state?.error?.status;
  const loginUrl = useLoginUrl();

  React.useEffect(() => {
    if (errorStatus === 401) {
      const apiToken = cookies.get(cookies.NAMES.API_TOKEN);

      if (apiToken && loginUrl) {
        console.log('Invalid auth token, redirecting to login page');
        window.location.assign(loginUrl);
      }
    }
  }, [ errorStatus, loginUrl ]);
}
