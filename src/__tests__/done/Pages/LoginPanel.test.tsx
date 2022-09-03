import { cleanup, screen } from '@testing-library/react';
import LoginPanel from 'components/Pages/LoginPanel/LoginPanel';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { renderWithProviders } from '../../utils/test-utils';

jest.mock('components/Molecules/Login/Login', () => {
  return {
    __esModule: true,
    default: () => <div>Login</div>,
  };
});
jest.mock('components/Molecules/Register/Register', () => {
  return {
    __esModule: true,
    default: () => <div>Register</div>,
  };
});
jest.mock('components/Molecules/ForgotPassword/ForgotPassword', () => {
  return {
    __esModule: true,
    default: () => <div>ForgotPassword</div>,
  };
});
jest.mock('components/Molecules/Logo/Logo', () => {
  return {
    __esModule: true,
    default: () => <div>Logo</div>,
  };
});

const history = createMemoryHistory({ initialEntries: ['/'] });

const rerender = () => {
  cleanup();
  renderWithProviders(
    <Router location={history.location} navigator={history}>
      <LoginPanel />
    </Router>,
  );
};

describe('testing LoginPanel component', () => {
  beforeEach(() => {
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <LoginPanel />
      </Router>,
    );
  });

  test('elements displayed on initial render', () => {
    expect(history.location.pathname).toBe('/');
    expect(screen.getByText(/Logo/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    //     screen.debug();
  });

  test('redirect to Register component when path "/register"', () => {
    history.push('/register');
    rerender();
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });
  test('redirect to ForgotPassword component when path "/forgot-password"', () => {
    history.push('/forgot-password');
    rerender();
    expect(screen.getByText(/ForgotPassword/i)).toBeInTheDocument();
  });
});
