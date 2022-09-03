import { cleanup, screen } from '@testing-library/react';
import { setSidebarVisibility } from 'app/slices/interfaceSlice';
import { setupStore } from 'app/store';
import DashboardContent from 'components/Templates/DashboardContent/DashboardContent';
import React from 'react';
import { mockedReduxState } from '__tests__/mocks/mockedReduxState';
import { renderWithProviders } from '../../utils/test-utils';

const initialState = {
  interfaceState: { isSidebarHide: false },
};

const store = setupStore(mockedReduxState(initialState));

const rerender = () => {
  cleanup();
  renderWithProviders(
    <DashboardContent>
      <div>ChildrenComponent</div>
    </DashboardContent>,
    { store },
  );
};

describe('testing DashboardContent component', () => {
  const childrenElement = () => screen.getByText(/ChildrenComponent/i);
  const wrapper = () => screen.getByText(/ChildrenComponent/i).parentElement;

  beforeEach(() => {
    renderWithProviders(
      <DashboardContent>
        <div>ChildrenComponent</div>
      </DashboardContent>,
      { store },
    );
  });

  test('elements displayed on initial render', () => {
    expect(childrenElement()).toBeInTheDocument();
    expect(wrapper()).toBeInTheDocument();
  });

  describe('is_sidebar_hide attribute', () => {
    test('false', () => {
      expect(wrapper()).toHaveAttribute('is_sidebar_hide', 'false');
    });
    test('true', () => {
      store.dispatch(setSidebarVisibility());
      rerender();
      expect(wrapper()).toHaveAttribute('is_sidebar_hide', 'true');
    });
  });
});
