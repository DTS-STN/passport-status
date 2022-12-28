import { FC } from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import DateSelectField from '../../components/DateSelectField'
import { DateSelectProps } from '../../components/DateSelect'

expect.extend(toHaveNoViolations)

const DateSelectMock: FC<DateSelectProps> = ({ label }: DateSelectProps) => {
  return <div data-testid="date-selector">{label}</div>
}

jest.mock('../../components/DateSelect', () => DateSelectMock)

describe('DateSelectField', () => {
  const sut = (
    <DateSelectField
      id="date-picker"
      label="Date Picker"
      onChange={jest.fn()}
      value="Some value"
    />
  )

  it('renders', () => {
    render(sut)
    const screenText = screen.getByText('Date Picker')
    expect(screenText).toBeInTheDocument()
  })

  it('meets a11y', async () => {
    const { container } = render(sut)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
