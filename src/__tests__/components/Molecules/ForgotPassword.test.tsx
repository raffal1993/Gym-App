import { fireEvent, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import ForgotPassword from 'components/Molecules/ForgotPassword/ForgotPassword';
import { renderWithProviders } from '__tests__/utils/test-utils';

const useNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => useNavigate,
}));

const sendPasswordResetEmail = jest.fn();

jest.mock('firebase/auth', () => ({
  sendPasswordResetEmail: () => sendPasswordResetEmail(),
}));

const backToLoginOnClick = jest.fn();

jest.mock('components/Commons/BackToLogin/BackToLogin', () => {
  return {
    __esModule: true,
    default: () => <button onClick={backToLoginOnClick}>BackToLogin</button>,
  };
});

describe('testing ForgotPassword component', () => {
  const input = () => screen.getByRole('textbox', { name: /email/i });

  const button = (buttonText: string = 'send password') =>
    screen.getByRole('button', { name: new RegExp(buttonText, 'i') });

  const backToLogin = () => screen.getByText(/BackToLogin/i);

  beforeEach(() => {
    renderWithProviders(<ForgotPassword />);

    jest.clearAllMocks();
  });

  test('if elements are displayed', () => {
    expect(screen.getByRole('heading', { name: /forgot password\?/i })).toBeInTheDocument();
    expect(input()).toBeInTheDocument();
    expect(button()).toBeInTheDocument();
    expect(backToLogin()).toBeInTheDocument();
  });

  describe('handle error', () => {
    jest.useFakeTimers();
    beforeEach(() => {
      sendPasswordResetEmail.mockImplementationOnce(async () => {
        await Promise.reject({ code: 'Error: email not found' });
      });
    });
    test('input and button behaviour when error occurs', async () => {
      expect(input()).toHaveDisplayValue('');
      fireEvent.click(button());
      await waitFor(() => expect(input()).toHaveAttribute('aria-invalid', 'true'));
      await waitFor(() => expect(button()).toHaveAttribute('aria-invalid', 'true'));
    });
    test('if error message show up', async () => {
      fireEvent.click(button());
      await waitFor(async () =>
        expect(await screen.findByText(/Error: email not found/i)).toBeInTheDocument(),
      );
    });

    test('error message fade out', async () => {
      fireEvent.click(button());

      await waitFor(async () =>
        expect(await screen.findByText(/Error: email not found/i)).toBeInTheDocument(),
      );
      jest.advanceTimersByTime(3500);
      await waitForElementToBeRemoved(screen.queryByText(/Error: email not found/i));
      expect(input()).toHaveAttribute('aria-invalid', 'false');
      expect(button()).toHaveAttribute('aria-invalid', 'false');
    });
  });

  describe('email submit success', () => {
    jest.useFakeTimers();
    beforeEach(() => {
      sendPasswordResetEmail.mockImplementationOnce(async () => {
        await Promise.resolve();
      });
    });

    test('button behaviour when submit success', async () => {
      fireEvent.click(button());
      await waitFor(() => expect(button('SUCCESS')).toBeInTheDocument());
    });
    test('redirect to "/" when submit success', async () => {
      fireEvent.click(button());
      jest.advanceTimersByTime(1000);
      await waitFor(() => expect(useNavigate).toHaveBeenCalledWith('/'));
    });
  });

  test('backToLogin onClick', () => {
    fireEvent.click(backToLogin());
    expect(backToLoginOnClick).toHaveBeenCalled();
  });
});
