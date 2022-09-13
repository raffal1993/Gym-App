import { fireEvent, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { setupStore } from 'app/store';
import Register from 'components/Molecules/Register/Register';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { pagesPaths } from 'utils/staticVariables/pages';
import { renderWithProviders } from '__tests__/utils/test-utils';
import { mockedReduxState } from '../../mocks/mockedReduxState';
import { mockedMainPage } from '../../mocks/mockedSidebarData';

const createUserWithEmailAndPassword = jest.fn();

jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: () => createUserWithEmailAndPassword(),
}));

const addNewUserToDB = jest.fn();

jest.mock('firebase-cfg/database/user/add', () => ({
  addNewUserToDB: () => addNewUserToDB(),
}));

const useNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => useNavigate,
}));

const store = setupStore(
  mockedReduxState({
    pagesState: { mainPage: mockedMainPage },
  }),
);

const history = createMemoryHistory({ initialEntries: ['/'] });

describe('testing Register component', () => {
  const button = (buttonText: string = 'Register') =>
    screen.getByRole('button', { name: new RegExp(buttonText, 'i') });

  const inputPassword = () => screen.getAllByTestId(/password/i)[0];
  const inputConfirmPassword = () => screen.getAllByTestId(/password/i)[1];
  const inputEmail = () => screen.getByRole('textbox', { name: /email/i });
  const backToLoginPage = () => screen.getByText(/Back to login page/i);

  const provideTestEmailAndPasswords = () => {
    fireEvent.change(inputEmail(), { target: { value: 'test@test.com' } });
    fireEvent.change(inputPassword(), { target: { value: 'testPassword' } });
    fireEvent.change(inputConfirmPassword(), { target: { value: 'testPassword' } });
  };

  beforeEach(() => {
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Register />
      </Router>,
      { store },
    );

    jest.resetAllMocks();
  });

  test('if elements are displayed', () => {
    expect(screen.getByRole('heading', { name: /register/i })).toBeInTheDocument();
    expect(button()).toBeInTheDocument();
    expect(inputEmail()).toBeInTheDocument();
    expect(inputPassword()).toBeInTheDocument();
    expect(inputConfirmPassword()).toBeInTheDocument();
    expect(backToLoginPage()).toBeInTheDocument();
  });

  describe('handle error', () => {
    jest.useFakeTimers();

    beforeEach(() => {
      createUserWithEmailAndPassword.mockImplementationOnce(async () => {
        await Promise.reject({ code: 'testError' });
      });
    });

    test('inputs and button behaviour when error occurs', async () => {
      expect(inputEmail()).toHaveDisplayValue('');
      expect(inputPassword()).toHaveDisplayValue('');
      expect(inputConfirmPassword()).toHaveDisplayValue('');
      fireEvent.click(button());
      await waitFor(() => expect(inputEmail()).toHaveAttribute('aria-invalid', 'true'));
      await waitFor(() => expect(inputPassword()).toHaveAttribute('aria-invalid', 'true'));
      await waitFor(() => expect(inputConfirmPassword()).toHaveAttribute('aria-invalid', 'true'));
      await waitFor(() => expect(button()).toHaveAttribute('aria-invalid', 'true'));
    });

    test('if error message show up with empty email and password inputs', async () => {
      fireEvent.click(button());
      expect(screen.getByText(/Provide email and passwords/i)).toBeInTheDocument();
    });

    test('if error message show up after register with invalid email and password', async () => {
      provideTestEmailAndPasswords();
      fireEvent.click(button());
      jest.advanceTimersByTime(1000);
      await waitFor(async () => expect(await screen.findByText(/testError/i)).toBeInTheDocument());
    });

    test('if error message show up when password and confirm passwords are different', async () => {
      fireEvent.change(inputEmail(), { target: { value: 'test@test.com' } });
      fireEvent.change(inputPassword(), { target: { value: 'testPassword' } });
      fireEvent.change(inputConfirmPassword(), { target: { value: 'testDifferentPassword' } });
      fireEvent.click(button());
      jest.advanceTimersByTime(1000);
      await waitFor(async () =>
        expect(await screen.findByText(/Passwords are different/i)).toBeInTheDocument(),
      );
    });

    test('error message fade out', async () => {
      fireEvent.click(button());
      expect(screen.getByText(/Provide email and passwords/i)).toBeInTheDocument();
      jest.advanceTimersByTime(3500);
      await waitForElementToBeRemoved(screen.queryByText(/Provide email and passwords/i));
      expect(inputEmail()).toHaveAttribute('aria-invalid', 'false');
      expect(inputPassword()).toHaveAttribute('aria-invalid', 'false');
      expect(inputConfirmPassword()).toHaveAttribute('aria-invalid', 'false');
      expect(button()).toHaveAttribute('aria-invalid', 'false');
    });
  });

  describe('register with email and password successful', () => {
    jest.useFakeTimers();

    beforeEach(() => {
      createUserWithEmailAndPassword.mockImplementationOnce(async () => {
        return Promise.resolve({ user: { uid: 'testUID', email: 'testEmail@gmail.com' } });
      });
    });

    test('button behaviour when submit success', async () => {
      provideTestEmailAndPasswords();
      fireEvent.click(button());
      await waitFor(() => expect(button('Success')).toBeInTheDocument());
    });

    test('redirect to mainPage when submit success', async () => {
      provideTestEmailAndPasswords();
      fireEvent.click(button());
      await waitFor(() => {
        expect(addNewUserToDB).toHaveBeenCalled();
      });
      jest.advanceTimersByTime(1000);
      await waitFor(() =>
        expect(useNavigate).toHaveBeenCalledWith(
          `${pagesPaths.dashboard.fullPath}/${mockedMainPage}`,
        ),
      );
    });
  });
});
