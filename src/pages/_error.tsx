import type { NextPage } from 'next';

import Error404Page from '../components/error-pages/Error404Page';
import ErrorPage from '../components/error-pages/ErrorPage';

export interface ErrorProps {
  statusCode?: number;
}

// biome-ignore lint/suspicious/noShadowRestrictedNames: Shadowing the built-in Error object is intentional here for the custom error page component.
const Error: NextPage<ErrorProps> = ({ statusCode }: ErrorProps) => {
  if (statusCode === 404) return <Error404Page />;
  return <ErrorPage statusCode={statusCode} />;
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 404;
  return { statusCode };
};

export default Error;
