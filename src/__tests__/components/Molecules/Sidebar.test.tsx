import { cleanup, fireEvent, screen } from '@testing-library/react';
import {
  setEditMode,
  setSidebarItemSelected,
  setSidebarVisibility,
} from 'app/slices/interfaceSlice';
import { setMainPage, setSidebarList, setSubPageID } from 'app/slices/pagesSlice';
import { setupStore } from 'app/store';
import Sidebar from 'components/Molecules/Sidebar/Sidebar';
import { animateButton } from 'helpers/animateButton';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { mockedReduxState } from '../../mocks/mockedReduxState';
import { mockedMainPage, mockedSidebarList, mockedSubPageID } from '../../mocks/mockedSidebarData';
import { renderWithProviders } from '../../utils/test-utils';

const mockedSetModalOpen = jest.fn();

jest.mock('app/slices/interfaceSlice', () => ({
  __esModule: true,
  ...jest.requireActual('app/slices/interfaceSlice'),
  setModalOpen: () => mockedSetModalOpen,
}));

jest.mock('helpers/animateButton', () => ({
  animateButton: jest.fn(),
}));

const mockedAnimation = jest.mocked(animateButton);

const useNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => useNavigate,
}));

const dispatch = jest.fn();

jest.mock('app/hooks', () => ({
  ...jest.requireActual('app/hooks'),
  useAppDispatch: () => dispatch,
}));

const isWidthSmaller = jest.fn();

jest.mock('hooks/useResize', () => {
  return {
    __esModule: true,
    default: () => ({
      isWidthSmaller: isWidthSmaller(),
    }),
  };
});

jest.mock('components/Molecules/Modals/EditSidebarModal/EditSidebarModal', () => {
  return {
    __esModule: true,
    default: () => <div>EditSidebarModal</div>,
  };
});

const initialState = {
  interfaceState: { isSidebarHide: false, isEditModeOn: false },
  pagesState: {
    mainPage: mockedMainPage,
    subPageID: mockedSubPageID,
    sidebarList: mockedSidebarList,
  },
};

const store = setupStore(mockedReduxState(initialState));

const history = createMemoryHistory({ initialEntries: ['/dashboard'] });

const rerender = (newStore = store) => {
  cleanup();
  renderWithProviders(
    <Router location={history.location} navigator={history}>
      <Sidebar />
    </Router>,
    {
      store: newStore,
    },
  );
};

describe('testing Sidebar component', () => {
  const buttons = (amount: number = mockedSidebarList.length) => {
    const array = [];
    for (let i = 1; i <= amount; i++) {
      array.push(screen.getByRole('button', { name: new RegExp(`${i} testSubPageName${i}`, 'i') }));
    }
    return array;
  };
  const tabs = (amount: number = mockedSidebarList.length) => {
    const array = [];
    for (let i = 1; i <= amount; i++) {
      array.push(screen.getByRole('tab', { name: new RegExp(`testSubPageName${i}`, 'i') }));
    }
    return array;
  };

  const editSidebarButton = () => screen.getByTestId('ConstructionIcon');
  const slider = () => screen.getByTestId('ArrowBackIosNewIcon');

  beforeEach(() => {
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Sidebar />
      </Router>,
      { store },
    );
    jest.restoreAllMocks();
  });

  test('if elements are displayed on wider screens', () => {
    buttons().forEach((button) => {
      expect(button).toBeInTheDocument();
    });
    expect(slider()).toBeInTheDocument();
  });
  test('if elements are displayed on smaller screens', () => {
    isWidthSmaller.mockReturnValueOnce(true);
    rerender();
    tabs().forEach((tab) => {
      expect(tab).toBeInTheDocument();
    });
  });

  describe('editModeOn === true on small and wide screens', () => {
    beforeAll(() => {
      store.dispatch(setEditMode(true));
    });
    afterAll(() => {
      store.dispatch(setEditMode(false));
    });

    test('edit Sidebar button on wider screens', () => {
      expect(editSidebarButton()).toBeInTheDocument();
      fireEvent.click(editSidebarButton());
      expect(dispatch).toHaveBeenCalledWith(mockedSetModalOpen);
    });
    test('edit Sidebar button on smaller screens', () => {
      isWidthSmaller.mockReturnValueOnce(true);
      rerender();
      expect(editSidebarButton()).toBeInTheDocument();
      fireEvent.click(editSidebarButton());
      expect(dispatch).toHaveBeenCalledWith(mockedSetModalOpen);
    });
  });

  describe('active element after click', () => {
    afterAll(() => {
      isWidthSmaller.mockReturnValue(false);
    });
    test('active on wider screens', async () => {
      buttons().forEach((button) =>
        expect(button.getAttribute('class')).not.toMatch(/Mui-selected/gi),
      );
      fireEvent.click(buttons()[1]);
      expect(buttons()[1].getAttribute('class')).toMatch(/Mui-selected/gi);
    });

    test('active on small screens', () => {
      isWidthSmaller.mockReturnValue(true);
      rerender();
      tabs().forEach((tab) => {
        expect(tab).toBeInTheDocument();
      });
      tabs().forEach((tab) => expect(tab.getAttribute('class')).not.toMatch(/Mui-selected/gi));
      fireEvent.click(tabs()[1]);
      expect(tabs()[1].getAttribute('class')).toMatch(/Mui-selected/gi);
    });
  });
  test('sidebar hide', () => {
    fireEvent.click(slider());
    expect(dispatch).toHaveBeenCalledWith(setSidebarVisibility());
  });
  describe('animation', () => {
    beforeAll(() => {
      store.dispatch(setEditMode(true));
    });
    afterAll(() => {
      store.dispatch(setEditMode(false));
      store.dispatch(setSidebarList(mockedSidebarList));
    });
    test('animation stop', async () => {
      expect(mockedAnimation).toHaveBeenCalledWith({ current: null }, 'stop', 'sidebarButton');
    });
    test('animation start', () => {
      store.dispatch(setSidebarList([]));
      rerender();
      expect(mockedAnimation).toHaveBeenCalledWith({ current: null }, 'start', 'sidebarButton');
    });
  });
  describe('setSubPageID', () => {
    test('setSubPage when sidebarList.length === 0', () => {
      store.dispatch(setSidebarList([]));
      rerender();
      expect(dispatch).toHaveBeenCalledWith(setSubPageID(''));
    });
    test('setSubPage when sidebarList.length > 0', () => {
      store.dispatch(setSidebarList(mockedSidebarList));
      rerender();
      fireEvent.click(buttons()[0]);
      expect(dispatch).toHaveBeenCalledWith(setSubPageID(mockedSidebarList[0].id));
    });
  });
  test('sidebar element selected/not selected', () => {
    expect(dispatch).toHaveBeenCalledWith(setSidebarItemSelected(false));
    fireEvent.click(buttons()[0]);
    expect(dispatch).toHaveBeenCalledWith(setSidebarItemSelected(true));
  });
  test('navigation/routes when mainPage === "settings"', () => {
    store.dispatch(setMainPage('settings'));
    history.push('dashboard/settings');
    rerender();
    expect(history.location.pathname).toBe('dashboard/settings');
    fireEvent.click(buttons()[0]);
    expect(useNavigate).toHaveBeenCalledWith('/dashboard/settings/testSubPageName1');
  });
});
