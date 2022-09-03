import { cleanup, screen } from '@testing-library/react';
import { setMainPage } from 'app/slices/pagesSlice';
import { setupStore } from 'app/store';
import Dashboard from 'components/Pages/Dashboard/Dashboard';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { mockedReduxState } from '../../mocks/mockedReduxState';
import { mockedMainPage, mockedSubPageDBSnapshot } from '../../mocks/mockedSidebarData';
import { renderWithProviders } from '../../utils/test-utils';

jest.mock('components/Atoms/Buttons/EditModeButton/EditModeButton', () => {
  return {
    __esModule: true,
    default: () => <div>EditModeButton</div>,
  };
});
jest.mock('components/Molecules/Navbar/Navbar', () => {
  return {
    __esModule: true,
    default: () => <div>Navbar</div>,
  };
});
jest.mock('components/Molecules/Sidebar/Sidebar', () => {
  return {
    __esModule: true,
    default: () => <div>Sidebar</div>,
  };
});
jest.mock('components/Organisms/Food/Food', () => {
  return {
    __esModule: true,
    default: () => <div>Food</div>,
  };
});
jest.mock('components/Organisms/Settings/Settings', () => {
  return {
    __esModule: true,
    default: () => <div>Settings</div>,
  };
});
jest.mock('components/Organisms/Weather/Weather', () => {
  return {
    __esModule: true,
    default: () => <div>Weather</div>,
  };
});
jest.mock('components/Organisms/Workout/Workout', () => {
  return {
    __esModule: true,
    default: () => <div>Workout</div>,
  };
});

jest.mock('firebase/database', () => ({
  ref: jest.fn().mockReturnValue('testRef'),
  onValue: jest.fn((_ref, callback) => {
    const snapshot = {
      val: () => ({
        ...mockedSubPageDBSnapshot(1),
        ...mockedSubPageDBSnapshot(2),
        ...mockedSubPageDBSnapshot(3),
      }),
    };
    callback(snapshot);
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

const initialState = {
  pagesState: {
    mainPage: mockedMainPage,
  },
};

const store = setupStore(mockedReduxState(initialState));

const history = createMemoryHistory({ initialEntries: ['/'] });

const rerender = () => {
  cleanup();
  renderWithProviders(
    <Router location={history.location} navigator={history}>
      <Dashboard />
    </Router>,
    { store },
  );
};

describe('testing Dashboard component', () => {
  const editModeButton = (option: 'query' | 'get') => {
    return (
      ((option === 'get' && screen.getByText(/EditModeButton/i)) as HTMLElement) ||
      (option === 'query' && screen.queryByText(/EditModeButton/i))
    );
  };

  beforeEach(() => {
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Dashboard />
      </Router>,
      { store },
    );
  });

  test('elements displayed on initial render', () => {
    expect(screen.getByText(/Navbar/i)).toBeInTheDocument();
    expect(screen.getByText(/Sidebar/i)).toBeInTheDocument();
    expect(editModeButton('get')).toBeInTheDocument();
  });

  test("hide editModeButton when mainPage is 'settings'", () => {
    store.dispatch(setMainPage('settings'));
    rerender();
    expect(editModeButton('query')).not.toBeInTheDocument();
  });
  describe('auth.currentUser === undefined', () => {
    const mockedCurrentUser = require('firebase-cfg/firebase-config').auth.currentUser;
    beforeAll(() => {
      require('firebase-cfg/firebase-config').auth.currentUser = undefined;
    });
    afterAll(() => {
      require('firebase-cfg/firebase-config').auth.currentUser = mockedCurrentUser;
    });
    test("redirect to '/' when auth.currentUser === undefined", () => {
      expect(useNavigate).toHaveBeenCalledWith('/');
    });
  });

  test('redirect to Workout component when path "/workout"', () => {
    history.push('/workout');
    rerender();
    expect(screen.getByText(/Workout/i)).toBeInTheDocument();
  });
  test('redirect to Food component when path "/food"', () => {
    history.push('/food');
    rerender();
    expect(screen.getByText(/Food/i)).toBeInTheDocument();
  });
  test('redirect to Weather component when path "/weather"', () => {
    history.push('/weather');
    rerender();
    expect(screen.getByText(/Weather/i)).toBeInTheDocument();
  });
  test('redirect to Settings component when path "/settings"', () => {
    history.push('/settings');
    rerender();
    expect(screen.getByText(/Settings/i)).toBeInTheDocument();
  });
});
