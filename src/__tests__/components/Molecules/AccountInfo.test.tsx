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

jest.mock('components/Molecules/AccountInfoInformations/AccountInfoInformations', () => {
  return {
    __esModule: true,
    default: () => <div>AccountInfoInformations</div>,
  };
});
jest.mock('components/Molecules/AccountInfoChangeEmail/AccountInfoChangeEmail', () => {
  return {
    __esModule: true,
    default: () => <div>AccountInfoChangeEmail</div>,
  };
});

describe('testing AccountInfo component', () => {
  let renderNew: (ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>) => void;

  beforeEach(() => {
    const { rerender } = renderWithProviders(<AccountInfo />);
    renderNew = rerender;
  });

  test('to display elements on initial render', () => {
    expect(screen.getByText(/AccountInfoInformations/i)).toBeInTheDocument();
    expect(screen.getByText(/AccountInfoChangeEmail/i)).toBeInTheDocument();
  });

  test('show/hide elements when account is verified', () => {
    expect(screen.queryByText(/Send verification email/i)).not.toBeInTheDocument();
  });

  test('show/hide elements when account is not verified', () => {
    require('firebase-cfg/firebase-config').auth.currentUser.emailVerified = false;
    renderNew(<AccountInfo />);
    expect(screen.getByText(/Send verification email/i)).toBeInTheDocument();
  });

  test('show/hide elements after sending verification email', async () => {
    fireEvent.click(screen.getByText(/Send verification email/));
    expect(await screen.findByText(/Email has been sent./i)).toBeInTheDocument();
    expect(screen.queryByText(/Send verification email/i)).not.toBeInTheDocument();
  });
});
