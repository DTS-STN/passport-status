import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'

import ExampleImage from '../../src/components/ExampleImage'

expect.extend(toHaveNoViolations)

describe('ExampleImage', () => {
  const sut = (
    <ExampleImage
      title="title"
      imageProps={{
        src: '/Receipt1_EN.png',
        alt: 'This is an image',
        width: 350,
        height: 350,
      }}
    >
      <p>{'description'}</p>
    </ExampleImage>
  )

  it('renders', async () => {
    render(sut)
    const screenText = screen.getByText('description')
    expect(screenText).toBeInTheDocument()
    await waitFor(() => {
      const img = screen.getByAltText('This is an image')
      expect(img.getAttribute('src')).toContain('Receipt1_EN.png')
    })
  })

  it('meets a11y', async () => {
    const { container } = render(sut)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
