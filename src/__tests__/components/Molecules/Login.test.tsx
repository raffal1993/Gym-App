import { fireEvent, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { setupStore } from 'app/store';
import Login from 'components/Molecules/Login/Login';
import { pagesPaths } from 'utils/staticVariables/pages';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { renderWithProviders } from '__tests__/utils/test-utils';
import { mockedReduxState } from '../../mocks/mockedReduxState';
import { mockedMainPage } from '../../mocks/mockedSidebarData';

const mockedFirebaseGet = jest.fn();

jest.mock('firebase/database', () => ({
  child: jest.fn(),
  get: () => mockedFirebaseGet(),
  ref: jest.fn(),
}));

const addNewUserToDB = jest.fn();

jest.mock('firebase-cfg/database/user/add', () => ({
  addNewUserToDB: () => addNewUserToDB(),
}));

const signInWithEmailAndPassword = jest.fn();
const signInWithPopup = jest.fn();

jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: () => signInWithEmailAndPassword(),
  signInWithPopup: () => signInWithPopup(),
}));

const useNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => useNavigate,
}));

jest.mock('assets/images/googleIconRegister.webp', () => ({
  googleIconRegister: 'mockedGoogleIconRegisterSRC',
}));

const store = setupStore(
  mockedReduxState({
    pagesState: { mainPage: mockedMainPage },
  }),
);

const history = createMemoryHistory({ initialEntries: ['/'] });

describe('testing Login component', () => {
  const emailInput = () => screen.getByRole('textbox', { name: /email/i });
  const passwordInput = () => screen.getByTestId(/password/i);

  const button = (buttonText: string = 'login') =>
    screen.getByRole('button', { name: new RegExp(buttonText, 'i') });

  const googleSignInImg = () => screen.getByRole('img', { name: /googlesignin/i });

  const registerLink = () => screen.getByRole('link', { name: /register/i });
  const sendPasswordLink = () => screen.getByRole('link', { name: /send password/i });

  beforeEach(() => {
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Login />
      </Router>,
      { store },
    );

    jest.resetAllMocks();
  });

  test('if elements are displayed', () => {
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(emailInput()).toBeInTheDocument();
    expect(passwordInput()).toBeInTheDocument();
    expect(button()).toBeInTheDocument();
    expect(screen.getByText(/or\.\.\./i)).toBeInTheDocument();
    expect(googleSignInImg()).toBeInTheDocument();
    expect(screen.getByText(/dont have account\?/i)).toBeInTheDocument();
    expect(screen.getByText(/forgot you password\?/i)).toBeInTheDocument();
    expect(registerLink()).toBeInTheDocument();
    expect(sendPasswordLink()).toBeInTheDocument();
  });

  describe('handle error', () => {
    jest.useFakeTimers();

    beforeEach(() => {
      signInWithEmailAndPassword.mockImplementationOnce(async () => {
        await Promise.reject({ code: 'Error: login failed!' });
      });
    });

    test('inputs and button behaviour when error occurs', async () => {
      expect(emailInput()).toHaveDisplayValue('');
      expect(passwordInput()).toHaveDisplayValue('');
      fireEvent.click(button());
      jest.advanceTimersByTime(1000);
      await waitFor(() => expect(emailInput()).toHaveAttribute('aria-invalid', 'true'));
      await waitFor(() => expect(passwordInput()).toHaveAttribute('aria-invalid', 'true'));
      await waitFor(() => expect(button()).toHaveAttribute('aria-invalid', 'true'));
    });

    test('if error message show up after login with email and password', async () => {
      fireEvent.click(button());
      jest.advanceTimersByTime(1000);
      await waitFor(async () =>
        expect(await screen.findByText(/Error: login failed!/i)).toBeInTheDocument(),
      );
    });

    test('if error message show up after login with google popup', async () => {
      signInWithPopup.mockImplementationOnce(async () => {
        await Promise.reject({ code: 'Error: login by google popup failed!' });
      });
      fireEvent.click(googleSignInImg());
      jest.advanceTimersByTime(1000);
      await waitFor(async () =>
        expect(
          await screen.findByText(/Error: login by google popup failed!/i),
        ).toBeInTheDocument(),
      );
    });

    test('error message fade out', async () => {
      fireEvent.click(button());
      await waitFor(async () =>
        expect(await screen.findByText(/Error: login failed!/i)).toBeInTheDocument(),
      );
      jest.advanceTimersByTime(3500);
      await waitForElementToBeRemoved(screen.queryByText(/Error: login failed!/i));
      expect(emailInput()).toHaveAttribute('aria-invalid', 'false');
      expect(passwordInput()).toHaveAttribute('aria-invalid', 'false');
      expect(button()).toHaveAttribute('aria-invalid', 'false');
    });
  });

  describe('login with email and password successful', () => {
    jest.useFakeTimers();

    beforeEach(() => {
      signInWithEmailAndPassword.mockImplementationOnce(async () => {
        await Promise.resolve();
      });
    });

    test('button behaviour when submit success', async () => {
      fireEvent.click(button());
      await waitFor(() => expect(button('Success')).toBeInTheDocument());
    });

    test('redirect to mainPage when submit success', async () => {
      fireEvent.click(button());
      jest.advanceTimersByTime(2500);
      await waitFor(() =>
        expect(useNavigate).toHaveBeenCalledWith(
          `${pagesPaths.dashboard.fullPath}/${mockedMainPage}`,
        ),
      );
    });
  });

  describe('login by google popup successful', () => {
    jest.useFakeTimers();

    beforeEach(() => {
      jest.resetAllMocks();
      signInWithPopup.mockImplementationOnce(async () => {
        return Promise.resolve({ user: { email: 'testEmail', uid: 'testUid' } });
      });
      mockedFirebaseGet.mockImplementationOnce(async () => {
        return Promise.resolve({ exists: () => false });
      });
    });

    test('button behaviour when submit success', async () => {
      fireEvent.click(googleSignInImg());
      await waitFor(() => expect(button('Success')).toBeInTheDocument());
    });

    test('redirect to mainPage when submit success by google popup', async () => {
      fireEvent.click(googleSignInImg());
      jest.advanceTimersByTime(2500);
      await waitFor(() =>
        expect(useNavigate).toHaveBeenCalledWith(
          `${pagesPaths.dashboard.fullPath}/${mockedMainPage}`,
        ),
      );
      expect(history.location.pathname).toBe('/');
    });

    test('login and add new user (snapshot) to DB if not exist', async () => {
      fireEvent.click(googleSignInImg());
      await waitFor(() => expect(addNewUserToDB).toHaveBeenCalled());
    });

    test('login existing user without adding to DB', async () => {
      mockedFirebaseGet.mockImplementationOnce(async () => {
        return Promise.resolve({ exists: () => true });
      });
      fireEvent.click(googleSignInImg());
      await waitFor(() => expect(addNewUserToDB).not.toHaveBeenCalled());
    });
  });

  test("if 'register' link redirect to '/register'", async () => {
    fireEvent.click(registerLink());
    expect(history.location.pathname).toBe('/register');
  });
  test("if 'forgot password' link redirect to '/forgot-password'", async () => {
    fireEvent.click(sendPasswordLink());
    expect(history.location.pathname).toBe('/forgot-password');
  });
});
