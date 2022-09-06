import { cleanup, screen, waitFor } from '@testing-library/react';
import App from 'App';
import { setModalClose, setModalOpen } from 'app/slices/interfaceSlice';
import { setMainPage } from 'app/slices/pagesSlice';
import { setUserEmail } from 'app/slices/userSlice';
import { setupStore } from 'app/store';
import { pagesPaths } from 'utils/staticVariables/pages';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { mockedReduxState } from '__tests__/mocks/mockedReduxState';
import { mockedMainPage } from '__tests__/mocks/mockedSidebarData';
import { renderWithProviders } from '__tests__/utils/test-utils';

jest.mock('components/Pages/Dashboard/Dashboard', () => {
  return {
    __esModule: true,
    default: () => <div>Dashboard</div>,
  };
});

jest.mock('components/Pages/LoginPanel/LoginPanel', () => {
  return {
    __esModule: true,
    default: () => <div>LoginPanel</div>,
  };
});

jest.mock('components/Organisms/PageNotFound/PageNotFound', () => {
  return {
    __esModule: true,
    default: () => <div>PageNotFound</div>,
  };
});
jest.mock('components/Templates/Modal/Modal', () => {
  return {
    __esModule: true,
    default: () => <div>Modal</div>,
  };
});

const user = jest.fn().mockReturnValue({ email: 'newTestEmail@test.com' });

jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn((_auth, cb) => {
    cb(user());
    return jest.fn();
  }),
}));

const dispatch = jest.fn();

jest.mock('app/hooks', () => ({
  ...jest.requireActual('app/hooks'),
  useAppDispatch: () => dispatch,
}));

const useNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => useNavigate,
}));

const history = createMemoryHistory({ initialEntries: ['/'] });

const initialEmail = 'test@test.com';

const initialState = {
  userState: { email: initialEmail },
  interfaceState: { isModalOpen: false },
  pagesState: {
    mainPage: mockedMainPage,
  },
};

const store = setupStore(mockedReduxState(initialState));

const rerender = () => {
  cleanup();
  renderWithProviders(
    <Router location={history.location} navigator={history}>
      <App />
    </Router>,
    { store },
  );
};

describe('testing CustomizedRoutes component', () => {
  const element = (option: 'query' | 'get', text: string) => {
    return (
      ((option === 'get' && screen.getByText(new RegExp(text, 'i'))) as HTMLElement) ||
      (option === 'query' && screen.queryByText(new RegExp(text, 'i')))
    );
  };

  beforeEach(() => {
    store.dispatch(setUserEmail(initialEmail));
    store.dispatch(setModalClose());
    store.dispatch(setMainPage(mockedMainPage));
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <App />
      </Router>,
      { store },
    );
  });
  test('elements displayed on initial render', () => {
    expect(element('get', 'LoginPanel')).toBeInTheDocument();
  });
  test('email === null', async () => {
    store.dispatch(setUserEmail(null));
    await waitFor(() => {
      expect(screen.getByTestId(/wrapper/i).childNodes).toHaveLength(0);
    });
  });
  test('modal', () => {
    store.dispatch(setModalOpen(<div>Modal</div>));
    expect(screen.getByText(/Modal/i)).toBeInTheDocument();
  });
  test('user found -> navigate to dashboard + dispatch', () => {
    store.dispatch(setUserEmail('someOtherEmail@test.com'));
    expect(dispatch).toHaveBeenCalledWith(setUserEmail('newTestEmail@test.com'));
    expect(useNavigate).toHaveBeenCalledWith(`${pagesPaths.dashboard.fullPath}/${mockedMainPage}`);
  });

  test('user not found -> dispatch userEmail as empty string', () => {
    store.dispatch(setUserEmail('differentEmail@test.com'));
    user.mockReturnValueOnce({ email: '' });
    rerender();
    expect(dispatch).toHaveBeenCalledWith(setUserEmail(''));
  });
  test('navigate to /workout and setMainPage if !mainPage && auth.currentUser', () => {
    store.dispatch(setMainPage(''));
    rerender();
    expect(useNavigate).toHaveBeenCalledWith(pagesPaths.workout.fullPath);
    expect(dispatch).toHaveBeenCalledWith(setMainPage(pagesPaths.workout.name));
  });
  test('redirect to LoginPanel', () => {
    history.push('/');
    rerender();
    expect(screen.getByText(/LoginPanel/i)).toBeInTheDocument();
  });
  test('redirect to Dashboard', () => {
    history.push('/dashboard');
    rerender();
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });
  test('redirect to PageNotFound', () => {
    history.push('/page-not-found');
    rerender();
    expect(screen.getByText(/PageNotFound/i)).toBeInTheDocument();
  });
});
