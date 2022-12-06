import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import '@testing-library/jest-dom/extend-expect'
import CheckStatusInfo from '../../components/CheckStatusInfo'

expect.extend(toHaveNoViolations)

jest.mock('../../components/ActionButton')

describe('StatusInfo', () => {
  const handleOnGoBackClick = jest.fn()
  const sut = (
    <CheckStatusInfo
      id="status-info"
      onGoBackClick={handleOnGoBackClick}
      goBackText="back"
      checkAgainText="check"
      checkStatusResponse={null}
    />
  )

  it('renders with no result', () => {
    render(sut)
    //back will not be in document as it is mocked
    expect(screen.getByText('check')).toBeInTheDocument()
    expect(screen.getByTestId('no-record')).toBeInTheDocument()
  })

  it('meets a11y', async () => {
    const { container } = render(sut)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
