import '@testing-library/jest-dom';

import { axe, toHaveNoViolations } from 'jest-axe';

import DateModified from '../../src/components/DateModified';
import { renderWithClientEnvironment } from '../../test-utils/renderWithClientEnvironment';

expect.extend(toHaveNoViolations);

describe('DateModified', () => {
  it('renders dateModified', () => {
    const { container } = renderWithClientEnvironment(<DateModified id="date-modified" text="Date Modified" />, {
      BUILD_DATE: '20000101',
    });
    const dl = container.querySelector('#date-modified');
    const dt = dl?.querySelector('dt');
    const dd = dl?.querySelector('dd');
    expect(dl).toBeInTheDocument();
    expect(dl?.tagName).toBe('DL');
    expect(dt?.textContent).toBe('Date Modified');
    expect(dd?.textContent).toBe('2000-01-01');
  });

  it('has no a11y violations', async () => {
    const { container } = renderWithClientEnvironment(<DateModified id="date-modified" text="Date Modified" />, {
      BUILD_DATE: '20000101',
    });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
