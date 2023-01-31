/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import CustomError from '../../pages/_error'

describe('custom error', () => {
  it('renders custom statusCode without crashing', () => {
    render(<CustomError statusCode={500} />)
    expect(screen.getByText('Error 500')).toBeInTheDocument()
  })

  it('renders no statusCode without crashing', () => {
    render(<CustomError />)
    expect(screen.getByText('An error occurred on client')).toBeInTheDocument()
  })
})
