import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import Layout from '../../components/Layout'

//mock custom components
jest.mock('../../components/Header')
jest.mock('../../components/Footer')

expect.extend(toHaveNoViolations)

describe('Layout with default text', () => {
  const sut = <Layout>Content</Layout>

  it('Layout contains a Main tag', () => {
    render(sut)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('Layout contains no a11y violations', async () => {
    const { container } = render(sut)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
