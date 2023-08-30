/**
 * NOTE: This requires `@sentry/nextjs` version 7.3.0 or higher.
 *
 * NOTE: If using this with `next` version 12.2.0 or lower, uncomment the
 * penultimate line in `CustomErrorComponent`.
 *
 * This page is loaded by Nextjs:
 *  - on the server, when data-fetching methods throw or reject
 *  - on the client, when `getInitialProps` throws or rejects
 *  - on the client, when a React lifecycle method throws or rejects, and it's
 *    caught by the built-in Nextjs error boundary
 *
 * See:
 *  - https://nextjs.org/docs/basic-features/data-fetching/overview
 *  - https://nextjs.org/docs/api-reference/data-fetching/get-initial-props
 *  - https://reactjs.org/docs/error-boundaries.html
 */

import NextErrorComponent from 'next/error';
import React from 'react';

import type { Props as ServerSidePropsCommon } from 'nextjs/getServerSideProps';

import * as cookies from 'lib/cookies';

type Props = ServerSidePropsCommon & {
  statusCode: number;
}

const CustomErrorComponent = (props: Props) => {
  const colorModeCookie = cookies.getFromCookieString(props.cookies || '', cookies.NAMES.COLOR_MODE);
  return <NextErrorComponent statusCode={ props.statusCode } withDarkMode={ colorModeCookie === 'dark' }/>;
};

export default CustomErrorComponent;
