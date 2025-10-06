import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { axe, toHaveNoViolations } from 'jest-axe';

import CheckStatusShippingCanadaPost from '../../../src/components/check-status-responses/CheckStatusShippingCanadaPost';
import { DeliveryMethodCode, ServiceLevelCode, StatusDisplayData, TimelineEntryData } from '../../../src/lib/types';

expect.extend(toHaveNoViolations);

jest.mock('../../../src/lib/useAlerts', () => ({
  useAlerts: () => ({
    isPending: false,
    error: undefined,
    data: undefined,
  }),
}));

describe('CheckStatusShippingCanadaPost', () => {
  const checkAnotherHandler = () => {};

  const timelineData: TimelineEntryData[] = [
    {
      step: 'Received',
      status: 'done',
      date: '2025-01-01',
    },
  ];

  const displayData: StatusDisplayData = {
    serviceLevel: ServiceLevelCode.TWENTY_DAYS,
    timelineExists: true,
    timelineData: timelineData,
    deliveryMethod: DeliveryMethodCode.MAIL,
    receivedDate: '2025-01-01',
  };

  const sut = <CheckStatusShippingCanadaPost displayData={displayData} checkAnotherHandler={checkAnotherHandler} />;

  //TODO: add test for when phone number is visible and when it isn't
  it('renders', () => {
    render(sut);

    const heading = screen.getByRole('heading', { level: 1 });

    expect(screen.getByTestId('shipped-canada-post')).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveAttribute('id', 'main-header');
  });

  it('meets a11y', async () => {
    const { container } = render(sut);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
