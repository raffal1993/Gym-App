import { cleanup, fireEvent, screen } from '@testing-library/react';
import { setSidebarVisibility } from 'app/slices/interfaceSlice';
import { setMainPage } from 'app/slices/pagesSlice';
import { setupStore } from 'app/store';
import Navbar from 'components/Molecules/Navbar/Navbar';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { renderWithProviders } from '__tests__/utils/test-utils';
import { mockedReduxState } from '../../mocks/mockedReduxState';
import { mockedMainPage } from '../../mocks/mockedSidebarData';
import { authSignOut } from '../../setupMocks/auth';

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

const store = setupStore(
  mockedReduxState({
    userState: { email: 'test@test.com' },
    pagesState: { mainPage: mockedMainPage },
    interfaceState: { isSidebarHide: false },
  }),
);

const history = createMemoryHistory({ initialEntries: ['/'] });

const rerender = () => {
  cleanup();
  renderWithProviders(
    <Router location={history.location} navigator={history}>
      <Navbar />
    </Router>,
    { store },
  );
};

describe('testing Navbar component', () => {
  const logoutButton = (buttonText: string = 'logout') =>
    screen.getByRole('button', { name: new RegExp(buttonText, 'i') });

  const pages = (name: 'workout' | 'food' | 'weather' | 'settings') =>
    screen.getAllByText(new RegExp(name, 'i'));

  const hamburgerMenu = () => screen.getByRole('button', { name: /hamburger menu/i });

  const welcomeHeading = () => screen.getByText(/Welcome/i);
  const email = () => screen.getByRole('heading', { name: /test@test.com/i });

  beforeEach(() => {
    history.replace('/');
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Navbar />
      </Router>,
      { store },
    );
    jest.resetAllMocks();
  });

  test('if elements are displayed', () => {
    expect(welcomeHeading()).toBeInTheDocument();
    expect(email()).toBeInTheDocument();
    expect(logoutButton()).toBeInTheDocument();
    expect(hamburgerMenu()).toBeInTheDocument();

    expect(pages('workout')).toHaveLength(2);
    expect(pages('food')).toHaveLength(2);
    expect(pages('weather')).toHaveLength(2);
    expect(pages('settings')).toHaveLength(2);
  });

  test('if navbar change when isSidebarHide === true', () => {
    store.dispatch(setSidebarVisibility());

    expect(welcomeHeading()).not.toBeVisible();
    expect(screen.getByText(/logout/i)).not.toBeVisible();

    store.dispatch(setSidebarVisibility());
  });

  test('logout click', () => {
    fireEvent.click(logoutButton());
    expect(authSignOut).toHaveBeenCalled();
    expect(useNavigate).toHaveBeenCalledWith('/');
  });

  test('redirect working properly on main navigation bar', () => {
    expect(history.location.pathname).toBe('/');
    fireEvent.click(pages('workout')[0]);
    rerender();
    expect(dispatch).toHaveBeenCalledWith(setMainPage('workout'));
    expect(history.location.pathname).toBe('/workout');
    fireEvent.click(pages('food')[0]);
    expect(history.location.pathname).toBe('/food');
  });

  describe('hamburger menu', () => {
    test('if elements showing after click', () => {
      expect(pages('workout')[1]).not.toBeVisible();
      expect(pages('food')[1]).not.toBeVisible();
      expect(pages('weather')[1]).not.toBeVisible();
      expect(pages('settings')[1]).not.toBeVisible();

      fireEvent.click(hamburgerMenu());

      expect(pages('workout')[1]).toBeVisible();
      expect(pages('food')[1]).toBeVisible();
      expect(pages('weather')[1]).toBeVisible();
      expect(pages('settings')[1]).toBeVisible();
    });

    test('if hamburger menu close properly', async () => {
      fireEvent.click(hamburgerMenu());
      expect(pages('workout')[1]).toBeVisible();
      expect(pages('food')[1]).toBeVisible();
      expect(pages('weather')[1]).toBeVisible();
      expect(pages('settings')[1]).toBeVisible();

      fireEvent.click(pages('settings')[1]);

      expect(pages('workout')[1]).not.toBeVisible();
      expect(pages('food')[1]).not.toBeVisible();
      expect(pages('weather')[1]).not.toBeVisible();
      expect(pages('settings')[1]).not.toBeVisible();
    });

    test('redirect working properly in hamburger menu elements', () => {
      expect(history.location.pathname).toBe('/');
      fireEvent.click(pages('workout')[1]);
      rerender();
      expect(dispatch).toHaveBeenCalledWith(setMainPage('workout'));
      expect(history.location.pathname).toBe('/workout');
      fireEvent.click(pages('food')[1]);
      expect(history.location.pathname).toBe('/food');
    });
  });
});
