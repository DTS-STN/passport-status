import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import '@testing-library/jest-dom/extend-expect'
import StatusInfo from '../../components/StatusInfo'

expect.extend(toHaveNoViolations)

jest.mock('../../components/ActionButton')

describe('StatusInfo', () => {
  const handleClick = jest.fn()
  const sut = (
    <StatusInfo
      handleGoBackClick={handleClick}
      goBackText="back"
      checkAgainText="check"
    >
      <p data-testid="test">Child</p>
    </StatusInfo>
  )

  it('renders', () => {
    render(sut)
    //back will not be in document as it is mocked
    expect(screen.getByText('check')).toBeInTheDocument()
    expect(screen.getByTestId('test')).toBeInTheDocument()
  })

  it('meets a11y', async () => {
    const { container } = render(sut)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
