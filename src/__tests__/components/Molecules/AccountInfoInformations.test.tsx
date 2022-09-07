import { cleanup, screen } from '@testing-library/react';
import AccountInfoInformations from 'components/Molecules/AccountInfoInformations/AccountInfoInformations';
import { renderWithProviders } from '__tests__/utils/test-utils';

const initialProps = {
  email: 'test@test.com',
  emailVerified: true,
  metadata: {
    creationTime: 'Mon, 18 Jul 2022 10:32:00 GMT',
    lastSignInTime: 'Mon, 18 Jul 2022 12:57:22 GMT',
  },
};

const rerender = (newProps: Partial<typeof initialProps>) => {
  cleanup();
  const props = { ...initialProps, ...newProps };
  renderWithProviders(<AccountInfoInformations {...props} />);
};

describe('testing AccountInfoInformations component', () => {
  beforeEach(() => {
    renderWithProviders(<AccountInfoInformations {...initialProps} />);
  });

  test('to display elements on initial render', () => {
    expect(screen.getByText(/Account Info/i)).toBeInTheDocument();

    expect(screen.getByText(/Account email/i)).toBeInTheDocument();
    expect(screen.getByText(/test@test.com/i)).toBeInTheDocument();

    expect(screen.getByText(/Email verified/i)).toBeInTheDocument();
    expect(screen.getByTestId(/VerifiedIcon/i)).toBeInTheDocument();

    expect(screen.getByText(/Account created at/i)).toBeInTheDocument();
    expect(screen.getByText(/Mon, 18 Jul 2022 10:32:00 GMT/i)).toBeInTheDocument();

    expect(screen.getByText(/Last login/i)).toBeInTheDocument();
    expect(screen.getByText(/Mon, 18 Jul 2022 12:57:22 GMT/i)).toBeInTheDocument();
  });

  test('show/hide elements when account is not verified', () => {
    rerender({ emailVerified: false });
    expect(screen.getByTestId(/DangerousSharpIcon/i)).toBeInTheDocument();
  });
});
