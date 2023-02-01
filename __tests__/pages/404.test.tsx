/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import Custom404 from '../../pages/404'

describe('404', () => {
  it('renders 404 without crashing', () => {
    render(<Custom404 />)
    expect(screen.getByText('Error 404')).toBeInTheDocument()
  })
})
