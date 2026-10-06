import type { ReactNode } from 'react';

import '@testing-library/jest-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';

import AlertBlock from '../../src/components/AlertBlock';

jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    i18n: { language: 'en' },
  }),
}));

const mockFetch = jest.fn();

describe('AlertBlock', () => {
  const fakeAlerts = [
    {
      uid: 'test-alert',
      textEn: 'Service **update**',
      textFr: 'Mise a jour du service',
      type: 'info',
    },
  ];

  const renderWithQueryClient = (children: ReactNode) => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    return render(<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>);
  };

  beforeEach(() => {
    mockFetch.mockReset();
    global.fetch = mockFetch;
  });

  it('renders alerts returned for the requested page', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => fakeAlerts,
    } as Response);

    const { container } = renderWithQueryClient(<AlertBlock page="landing" className="custom-alerts" />);

    expect(await screen.findByText('update')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('custom-alerts');
    expect(mockFetch).toHaveBeenCalledWith('/api/alerts?page=landing', {
      signal: expect.any(AbortSignal),
      headers: { 'Cache-Control': 'max-age=600' },
    });
  });

  it('renders nothing when the response contains no alerts', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => [],
    } as Response);

    const { container } = renderWithQueryClient(<AlertBlock />);

    await waitFor(() => expect(mockFetch).toHaveBeenCalled());
    expect(container.firstChild).toBeNull();
  });
});
