/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import CustomError from '../../src/pages/_error';

jest.mock('../../src/components/error-pages/Error404Page', () => ({
  __esModule: true,
  default: () => {
    return <div data-testid="mock-error-404-page"></div>;
  },
}));

jest.mock('../../src/components/error-pages/ErrorPage', () => ({
  __esModule: true,
  default: (props: { statusCode?: number }) => {
    return <div data-testid="mock-error-page">Error {props.statusCode ? props.statusCode : 'client'}</div>;
  },
}));

describe('custom error', () => {
  it('renders custom error 404 page', () => {
    render(<CustomError statusCode={404} />);
    const mockError404Page = screen.getByTestId('mock-error-404-page');
    const mockErrorPage = screen.queryByTestId('mock-error-page');
    expect(mockError404Page).toBeInTheDocument();
    expect(mockErrorPage).toBeNull();
  });

  it('renders custom error page with 500 status code', () => {
    render(<CustomError statusCode={500} />);
    const mockErrorPage = screen.getByTestId('mock-error-page');
    const mockError404Page = screen.queryByTestId('mock-error-404-page');
    expect(mockErrorPage).toBeInTheDocument();
    expect(mockErrorPage.innerHTML).toBe('Error 500');
    expect(mockError404Page).toBeNull();
  });

  it("renders custom error page with 'undefined' status code", () => {
    render(<CustomError />);
    const mockErrorPage = screen.getByTestId('mock-error-page');
    const mockError404Page = screen.queryByTestId('mock-error-404-page');
    expect(mockErrorPage).toBeInTheDocument();
    expect(mockErrorPage.innerHTML).toBe('Error client');
    expect(mockError404Page).toBeNull();
  });
});
