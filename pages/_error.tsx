import { NextPage } from 'next'
import ErrorPage from '../components/ErrorPage'

export interface ErrorProps {
  statusCode?: number | undefined
}

const Error: NextPage<ErrorProps> = ({ statusCode }) => {
  return <ErrorPage statusCode={statusCode} />
}

Error.getInitialProps = async ({ res, err }) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 404
  return { statusCode }
}

export default Error
