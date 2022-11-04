/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ErrorPage from '../../components/ErrorPage'

describe('Reusable error page component', () => {
  it('renders page with status code without crashing', () => {
    render(<ErrorPage statusCode={500} />)
    expect(
      screen.getByText('An error 500 occurred on server')
    ).toBeInTheDocument()
  })

  it('renders page without status code without crashing', () => {
    render(<ErrorPage />)
    expect(screen.getByText('An error occurred on client')).toBeInTheDocument()
  })
})
