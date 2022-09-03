import { cleanup, screen } from '@testing-library/react';
import Settings from 'components/Organisms/Settings/Settings';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { renderWithProviders } from '../../utils/test-utils';

jest.mock('components/Molecules/AccountInfo/AccountInfo', () => {
  return {
    __esModule: true,
    default: () => <div>AccountInfo</div>,
  };
});

jest.mock('components/Molecules/ChangePassword/ChangePassword', () => {
  return {
    __esModule: true,
    default: () => <div>ChangePassword</div>,
  };
});

jest.mock('components/Molecules/DeleteAccount/DeleteAccount', () => {
  return {
    __esModule: true,
    default: () => <div>DeleteAccount</div>,
  };
});

describe('testing Food component', () => {
  const history = createMemoryHistory({ initialEntries: ['/'] });

  const rerender = () => {
    cleanup();
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Settings />
      </Router>,
    );
  };

  const element = (
    option: 'query' | 'get',
    name: 'AccountInfo' | 'ChangePassword' | 'DeleteAccount',
  ) => {
    return (
      ((option === 'get' && screen.getByText(new RegExp(name, 'i'))) as HTMLElement) ||
      (option === 'query' && screen.queryByText(new RegExp(name, 'i')))
    );
  };

  const constructionIcon = (option: 'query' | 'get') => {
    return (
      ((option === 'get' && screen.getByTestId(/ConstructionIcon/i)) as HTMLElement) ||
      (option === 'query' && screen.queryByTestId(/ConstructionIcon/i))
    );
  };

  beforeEach(() => {
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Settings />
      </Router>,
    );
    jest.restoreAllMocks();
  });

  test('elements displayed with "/" route', () => {
    expect(history.location.pathname).toBe('/');

    expect(constructionIcon('get')).toBeInTheDocument();

    expect(element('query', 'AccountInfo')).not.toBeInTheDocument();
    expect(element('query', 'ChangePassword')).not.toBeInTheDocument();
    expect(element('query', 'DeleteAccount')).not.toBeInTheDocument();
  });

  test('elements displayed with "/AccountInfo" route', () => {
    history.push('/AccountInfo');
    rerender();
    expect(history.location.pathname).toBe('/AccountInfo');

    expect(element('get', 'AccountInfo')).toBeInTheDocument();

    expect(constructionIcon('query')).not.toBeInTheDocument();
    expect(element('query', 'ChangePassword')).not.toBeInTheDocument();
    expect(element('query', 'DeleteAccount')).not.toBeInTheDocument();
  });

  test('elements displayed with "/ChangePassword" route', () => {
    history.push('/ChangePassword');
    rerender();
    expect(history.location.pathname).toBe('/ChangePassword');

    expect(element('get', 'ChangePassword')).toBeInTheDocument();

    expect(constructionIcon('query')).not.toBeInTheDocument();
    expect(element('query', 'AccountInfo')).not.toBeInTheDocument();
    expect(element('query', 'DeleteAccount')).not.toBeInTheDocument();
  });

  test('elements displayed with "/DeleteAccount" route', () => {
    history.push('/DeleteAccount');
    rerender();
    expect(history.location.pathname).toBe('/DeleteAccount');

    expect(element('get', 'DeleteAccount')).toBeInTheDocument();

    expect(constructionIcon('query')).not.toBeInTheDocument();
    expect(element('query', 'AccountInfo')).not.toBeInTheDocument();
    expect(element('query', 'ChangePassword')).not.toBeInTheDocument();
  });
});
