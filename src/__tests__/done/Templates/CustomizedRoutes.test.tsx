import { cleanup, screen } from '@testing-library/react';
import CustomizedRoutes from 'components/Templates/CustomizedRoutes/CustomizedRoutes';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Route, Router } from 'react-router-dom';
import { renderWithProviders } from '../../utils/test-utils';

const history = createMemoryHistory({ initialEntries: ['/testPath'] });

const rerender = () => {
  cleanup();
  renderWithProviders(
    <Router location={history.location} navigator={history}>
      <CustomizedRoutes>
        <Route path="/testPath" element={<>testReactElement</>} />
      </CustomizedRoutes>
    </Router>,
  );
};

describe('testing CustomizedRoutes component', () => {
  beforeEach(() => {
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <CustomizedRoutes>
          <Route path="/testPath" element={<>testReactElement</>} />
        </CustomizedRoutes>
      </Router>,
    );
  });

  test('elements displayed on initial render', () => {
    expect(history.location.pathname).toBe('/testPath');
    expect(screen.getByText(/testReactElement/i)).toBeInTheDocument();
  });

  test('redirect to "/page-not-found" when not found valid path', () => {
    history.push('/notValidPath');
    rerender();
    expect(history.location.pathname).toBe('/page-not-found');
    expect(screen.queryByText(/testReactElement/i)).not.toBeInTheDocument();
  });
});
