import ErrorPage from '../components/ErrorPage'

const Custom404 = () => {
  return (
    <div data-testid="404page">
      <ErrorPage statusCode={404} />
    </div>
  )
}

export default Custom404
