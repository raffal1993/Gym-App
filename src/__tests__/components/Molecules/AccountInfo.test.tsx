import { fireEvent, screen } from '@testing-library/react';
import AccountInfo from 'components/Molecules/AccountInfo/AccountInfo';
import { renderWithProviders } from '__tests__/utils/test-utils';

jest.mock('firebase-cfg/database/user/update', () => ({
  updateEmailToDB: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  sendEmailVerification: jest.fn().mockResolvedValue(true),
  updateEmail: jest.fn(),
}));

describe('testing AccountInfo component', () => {
  let renderNew: (ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>) => void;

  beforeEach(() => {
    const { rerender } = renderWithProviders(<AccountInfo />);
    renderNew = rerender;
  });

  test('to display infos', () => {
    expect(screen.getByText(/test@test.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Mon, 18 Jul 2022 10:32:00 GMT/i)).toBeInTheDocument();
    expect(screen.getByText(/Mon, 18 Jul 2022 12:57:22 GMT/i)).toBeInTheDocument();
    expect(screen.getByText(/change Email:/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  test('show/hide elements when account is verified', () => {
    expect(screen.queryByText(/Send verification email/i)).not.toBeInTheDocument();
    expect(screen.getByTestId(/VerifiedIcon/i)).toBeInTheDocument();
  });

  test('show/hide elements when account is not verified', () => {
    require('firebase-cfg/firebase-config').auth.currentUser.emailVerified = false;
    renderNew(<AccountInfo />);
    expect(screen.getByTestId(/DangerousSharpIcon/i)).toBeInTheDocument();
    expect(screen.getByText(/Send verification email/i)).toBeInTheDocument();
  });

  test('show/hide elements after sending veryfication email', async () => {
    fireEvent.click(screen.getByText(/Send verification email/));
    expect(await screen.findByText(/Email has been sent./i)).toBeInTheDocument();
    expect(screen.queryByText(/Send verification email/i)).not.toBeInTheDocument();
  });

  test('show/hide elements after change email', async () => {
    fireEvent.click(screen.getByText(/Send verification email/));
    expect(await screen.findByText(/Email has been sent./i)).toBeInTheDocument();
    expect(screen.queryByText(/Send verification email/i)).not.toBeInTheDocument();
  });
});
