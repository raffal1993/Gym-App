import {
  cleanup,
  fireEvent,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import DeleteAccount from 'components/Molecules/DeleteAccount/DeleteAccount';
import React from 'react';
import { renderWithProviders } from '__tests__/utils/test-utils';

const removeUserFromDB = jest.fn();

jest.mock('firebase-cfg/database/user/remove', () => ({
  removeUserFromDB: () => removeUserFromDB(),
}));

const useNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => useNavigate,
}));

const { email } = require('firebase-cfg/firebase-config').auth.currentUser;

describe('testing DeleteAccount component', () => {
  jest.useFakeTimers();
  const input = () => screen.getByRole('textbox');
  const button = (buttonText: string = 'Delete Account') =>
    screen.getByRole('button', { name: new RegExp(buttonText, 'i') });

  beforeEach(() => {
    cleanup();
    renderWithProviders(<DeleteAccount />);
    require('firebase-cfg/firebase-config').auth.currentUser.email = email;
    jest.clearAllMocks();
  });

  test('if elements are displayed', () => {
    expect(screen.getByText(/Are you sure You want to remove your account?/i)).toBeInTheDocument();
    expect(screen.getByText(/Type your email address to delete account/i)).toBeInTheDocument();
    expect(input()).toBeInTheDocument();
    expect(button()).toBeInTheDocument();
  });

  describe('Error handling', () => {
    test('error => "An error has occurred" when auth.currentUser.email not exist', () => {
      require('firebase-cfg/firebase-config').auth.currentUser.email = null;
      fireEvent.click(button());
      expect(screen.getByText(/An error has occurred/i)).toBeInTheDocument();
    });

    test('error => "Email address is different than your account email address.', () => {
      fireEvent.change(input(), { target: { value: 'someDifferentEmail@gmail.com' } });
      fireEvent.click(button());
      expect(
        screen.getByText(/Email address is different than your account email address./i),
      ).toBeInTheDocument();
    });

    test('error => "An error has occurred" when removeUserFromDB.catch', async () => {
      removeUserFromDB.mockImplementationOnce(async () => {
        await Promise.reject();
      });
      require('firebase-cfg/firebase-config').auth.currentUser.email = 'testEmail@gmail.com';
      fireEvent.change(input(), { target: { value: 'testEmail@gmail.com' } });
      fireEvent.click(button());
      expect(removeUserFromDB).toHaveBeenCalledTimes(1);
      jest.advanceTimersByTime(1000);
      await waitFor(async () =>
        expect(await screen.findByText(/An error has occurred/i)).toBeInTheDocument(),
      );
    });

    test('input and button when error appeard', async () => {
      fireEvent.click(button());
      expect(
        screen.getByText(/Email address is different than your account email address./i),
      ).toBeInTheDocument();
      expect(input()).toHaveAttribute('aria-invalid', 'true');
      expect(button()).toHaveAttribute('aria-invalid', 'true');
    });

    test('error fading', async () => {
      fireEvent.click(button());
      jest.advanceTimersByTime(1500);
      await waitForElementToBeRemoved(
        () => screen.queryByText(/Email address is different than your account email address./i),
        { timeout: 2500 },
      );
    });
  });

  test('to successfull submit and remove user from DB', async () => {
    require('firebase-cfg/firebase-config').auth.currentUser.email = 'testEmail@gmail.com';
    removeUserFromDB.mockImplementationOnce(async () => {
      await Promise.resolve();
    });
    fireEvent.change(input(), { target: { value: 'testEmail@gmail.com' } });
    fireEvent.click(button());
    jest.advanceTimersByTime(1000);
    await waitFor(() => {
      expect(useNavigate).toHaveBeenCalledWith('/');
    });
    await waitFor(() => {
      expect(useNavigate).toHaveBeenCalledTimes(1);
    });
    expect(removeUserFromDB).toHaveBeenCalledTimes(1);
  });
});
