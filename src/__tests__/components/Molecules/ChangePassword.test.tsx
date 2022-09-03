import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import ChangePassword from 'components/Molecules/ChangePassword/ChangePassword';
import React from 'react';
import { renderWithProviders } from '__tests__/utils/test-utils';

const signInWithEmailAndPassword = jest.fn();
const updatePassword = jest.fn();

jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: () => signInWithEmailAndPassword(),
  updatePassword: () => updatePassword(),
}));

describe('testing ChangePassword component', () => {
  jest.useFakeTimers();
  const oldPassword = () => screen.getByTestId(/oldPassword/i);
  const newPassword = () => screen.getByTestId(/newPassword/i);
  const confirmPassword = () => screen.getByTestId(/confirmPassword/i);
  const button = (name: string = 'Change Password') =>
    screen.getByRole('button', { name: new RegExp(name, 'i') });

  beforeEach(() => {
    cleanup();
    renderWithProviders(<ChangePassword />);
    jest.clearAllMocks();
  });

  test('if elements are displayed', () => {
    expect(oldPassword()).toBeInTheDocument();
    expect(newPassword()).toBeInTheDocument();
    expect(confirmPassword()).toBeInTheDocument();
    expect(button()).toBeInTheDocument();
    expect(screen.getByText(/Old password:/i)).toBeInTheDocument();
    expect(screen.getByText(/Confirm new password:/i)).toBeInTheDocument();
    expect(screen.getByText(/New password:/)).toBeInTheDocument();
  });

  describe('Error handling', () => {
    test('Error: "Old password is incorrect"', async () => {
      signInWithEmailAndPassword.mockImplementationOnce(async () => {
        await Promise.reject();
      });
      expect(oldPassword()).toHaveValue('');
      fireEvent.click(button());
      jest.advanceTimersByTime(1000);
      await waitFor(async () =>
        expect(await screen.findByText(/Old password is incorrect/i)).toBeInTheDocument(),
      );
    });

    test('Error: "Please enter new password"', async () => {
      signInWithEmailAndPassword.mockImplementationOnce(async () => {
        await Promise.resolve();
      });
      expect(newPassword()).toHaveValue('');
      expect(confirmPassword()).toHaveValue('');
      fireEvent.click(button());
      jest.advanceTimersByTime(1000);
      await waitFor(async () =>
        expect(await screen.findByText(/Please enter new password/i)).toBeInTheDocument(),
      );
    });

    test('Error: "New password and confirm password are different"', async () => {
      signInWithEmailAndPassword.mockImplementationOnce(async () => {
        await Promise.resolve();
      });
      fireEvent.change(newPassword(), { target: { value: 'password' } });
      fireEvent.change(confirmPassword(), { target: { value: 'differentPassword' } });
      fireEvent.click(button());
      jest.advanceTimersByTime(1000);
      await waitFor(async () =>
        expect(
          await screen.findByText(/New password and confirm password are different/i),
        ).toBeInTheDocument(),
      );
    });

    test('Error: Firebase error', async () => {
      signInWithEmailAndPassword.mockImplementationOnce(async () => {
        await Promise.resolve();
      });
      updatePassword.mockImplementationOnce(async () => {
        await Promise.reject({ message: 'Firebase error' });
      });

      fireEvent.change(newPassword(), { target: { value: 'newPassword' } });
      fireEvent.change(confirmPassword(), { target: { value: 'newPassword' } });
      fireEvent.click(button());
      jest.advanceTimersByTime(1000);
      await waitFor(async () => expect(await screen.findByText(/error/i)).toBeInTheDocument());
    });
  });

  test('if errorMessage is fading', async () => {
    signInWithEmailAndPassword.mockImplementationOnce(async () => {
      await Promise.reject();
    });
    expect(oldPassword()).toHaveValue('');
    fireEvent.click(button());
    jest.advanceTimersByTime(1500);
    await waitFor(async () => {
      expect(await screen.findByText(/Old password is incorrect/i)).toBeInTheDocument();
    });
    await waitFor(
      async () => {
        expect(screen.queryByText(/Old password is incorrect/i)).not.toBeInTheDocument();
      },
      { timeout: 2500 },
    );
  });

  describe("succeed after click 'Change Password'", () => {
    beforeEach(() => {
      signInWithEmailAndPassword.mockImplementationOnce(async () => {
        await Promise.resolve();
      });
      updatePassword.mockImplementationOnce(async () => {
        await Promise.resolve();
      });
      fireEvent.change(newPassword(), { target: { value: 'newPassword' } });
      fireEvent.change(confirmPassword(), { target: { value: 'newPassword' } });
    });

    test('if isSucceed is fading', async () => {
      fireEvent.click(button());
      await waitFor(async () => expect(button('Success')).toBeInTheDocument());
      jest.advanceTimersByTime(1500);
      await waitFor(async () => expect(button()).toBeInTheDocument(), { timeout: 2000 });
    });

    test('submit and changing password correct + reset inputs', async () => {
      fireEvent.click(button());
      jest.advanceTimersByTime(1000);
      await waitFor(async () => expect(updatePassword).toHaveBeenCalledTimes(1));
      expect(oldPassword()).toHaveValue('');
      expect(newPassword()).toHaveValue('');
      expect(confirmPassword()).toHaveValue('');
    });
  });
});
