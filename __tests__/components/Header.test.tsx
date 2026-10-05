import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';

import { axe, toHaveNoViolations } from 'jest-axe';
import { useRouter } from 'next/router';

import Header from '../../src/components/Header';
import { renderWithClientEnvironment } from '../../test-utils/renderWithClientEnvironment';

const defaultRouterObj = {
  pathname: '/',
  asPath: '/',
  locale: 'en',
};

// mocks useRouter to be able to use component' router.asPath
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => defaultRouterObj),
}));

expect.extend(toHaveNoViolations);

describe('Header', () => {
  it('renders Header in English', () => {
    renderWithClientEnvironment(<Header gocLink="testGocLink" skipToMainText="testSkipToMainText" />);
    const HeaderLang = screen.getByText('Français');
    expect(HeaderLang).toBeInTheDocument();
  });

  it('renders Header in French', () => {
    const useRouterMock = useRouter as jest.Mock;
    useRouterMock.mockImplementationOnce(() => ({
      ...defaultRouterObj,
      locale: 'fr',
    }));
    renderWithClientEnvironment(<Header gocLink="testGocLink" skipToMainText="testSkipToMainText" />);
    const HeaderLang = screen.getByText('English');
    expect(HeaderLang).toBeInTheDocument();
  });

  it('shows the test banner outside production', () => {
    renderWithClientEnvironment(<Header gocLink="testGocLink" skipToMainText="testSkipToMainText" />, {
      ENVIRONMENT: 'test',
    });

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('hides the test banner in production', () => {
    renderWithClientEnvironment(<Header gocLink="testGocLink" skipToMainText="testSkipToMainText" />, {
      ENVIRONMENT: 'prod',
    });

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = renderWithClientEnvironment(<Header gocLink="testGocLink" skipToMainText="testSkipToMainText" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
