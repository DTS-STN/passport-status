import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import DateModified from '../../components/DateModified'

expect.extend(toHaveNoViolations)

describe('DateModified', () => {
  it('renders dateModified', () => {
    const primary = render(<DateModified {...DateModified.args} />)
    expect(primary).toBeTruthy()
  })

  it('has no a11y violations', async () => {
    const { container } = render(<DateModified {...DateModified.args} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
