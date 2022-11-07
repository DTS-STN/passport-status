/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Custom404 from '../../pages/404'

describe('404', () => {
  it('renders 404 without crashing', () => {
    render(<Custom404 />)
    expect(
      screen.getByText('An error 404 occured on server')
    ).toBeInTheDocument()
  })
})
