import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'

import CheckStatusInfo from '../../src/components/CheckStatusInfo'

expect.extend(toHaveNoViolations)

jest.mock('../../src/components/ActionButton')

jest.mock('../../src/lib/useAlerts', () => ({
  useAlerts: () => ({
    isLoading: false,
    error: undefined,
    data: undefined,
  }),
}))

describe('StatusInfo', () => {
  const handleOnGoBackClick = jest.fn()
  const sut = (
    <CheckStatusInfo
      id="status-info"
      onGoBackClick={handleOnGoBackClick}
      goBackText="back"
      checkStatusResponse={null}
    />
  )

  it('renders with no result', () => {
    render(sut)
    //back will not be in document as it is mocked
    expect(screen.getByTestId('no-record')).toBeInTheDocument()
  })

  it('meets a11y', async () => {
    const { container } = render(sut)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
