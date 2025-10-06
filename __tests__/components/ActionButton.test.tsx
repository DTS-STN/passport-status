import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { axe, toHaveNoViolations } from 'jest-axe';

import ActionButton from '../../src/components/ActionButton';

expect.extend(toHaveNoViolations);

describe('ActionButton', () => {
  const { container } = render(<ActionButton text="text" />);

  it('renders', () => {
    const sut = screen.getByText('text');
    expect(sut).toBeInTheDocument();
  });

  it('sets primary style', () => {
    render(<ActionButton text="my-button-text" style="primary" />);
    const sut = screen.getByText('my-button-text');
    expect(sut).toHaveClass(
      'align-middle border font-display inline-flex items-center justify-center shadow-xs disabled:cursor-not-allowed disabled:opacity-70 disabled:pointer-events-none disabled:shadow-none focus:ring-2 focus:ring-black focus:ring-offset-2 undefined px-3.5 py-2.5 rounded-sm text-base border-blue-dark bg-blue-dark text-basic-white hover:bg-blue-normal active:bg-blue-active focus:bg-blue-normal focus:text-basic-white',
    );
  });

  it('is meets a11y', async () => {
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
