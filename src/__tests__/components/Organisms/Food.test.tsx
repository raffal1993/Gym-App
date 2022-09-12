import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import { setEditMode, setSidebarItemSelected } from 'app/slices/interfaceSlice';
import { setupStore } from 'app/store';
import Food from 'components/Organisms/Food/Food';
import React from 'react';
import { mockedFoodCardDBSnapshot } from '__tests__/mocks/mockedFoodData';
import { mockedReduxState } from '../../mocks/mockedReduxState';
import { mockedSubPageID } from '../../mocks/mockedSidebarData';
import { renderWithProviders } from '../../utils/test-utils';

jest.mock('components/Molecules/AddFood/AddFood', () => {
  return {
    __esModule: true,
    default: () => <div>AddFood</div>,
  };
});

jest.mock('components/Molecules/SearchFood/SearchFood', () => {
  return {
    __esModule: true,
    default: () => <div>SearchFood</div>,
  };
});

jest.mock('components/Molecules/FoodCard/FoodCard', () => {
  return {
    __esModule: true,
    default: () => <div>FoodCard</div>,
  };
});

jest.mock('components/Commons/NoCardsFound/NoCardsFound', () => {
  return {
    __esModule: true,
    default: () => <div>NoCardsFound</div>,
  };
});

const snapshotValue = jest
  .fn()
  .mockReturnValue([
    mockedFoodCardDBSnapshot(1),
    mockedFoodCardDBSnapshot(2),
    mockedFoodCardDBSnapshot(3),
  ]);

jest.mock('firebase/database', () => ({
  ref: jest.fn().mockReturnValue('testRef'),
  onValue: jest.fn((_ref, callback) => {
    const snapshot = {
      val: () => snapshotValue(),
    };
    callback(snapshot);
  }),
}));

const mockedScrollTo = jest.fn();
Element.prototype.scrollTo = mockedScrollTo;

const initialState = {
  interfaceState: { isEditModeOn: false },
  pagesState: {
    subPageID: mockedSubPageID,
  },
};

const store = setupStore(mockedReduxState(initialState));

const rerender = (newStore = store) => {
  cleanup();
  renderWithProviders(<Food />, {
    store: newStore,
  });
};

describe('testing Food component', () => {
  const searchButton = () => screen.getByTestId(/SearchIcon/i);

  const scrollToTopIcon = () => screen.getByTestId('ArrowCircleUpIcon');

  beforeEach(() => {
    renderWithProviders(<Food />, { store });
    jest.restoreAllMocks();
  });

  describe('displayed elements', () => {
    afterEach(() => {
      store.dispatch(setEditMode(false));
    });

    test('elements displayed on initial render', async () => {
      expect(searchButton()).toBeInTheDocument();
      await waitFor(() => {
        expect(screen.getAllByText(/FoodCard/i)).toHaveLength(3);
      });
      expect(scrollToTopIcon()).toBeInTheDocument();
    });

    test('elements displayed when isEditModeOn === true', () => {
      store.dispatch(setEditMode(true));
      rerender();
      expect(screen.getByText(/AddFood/i)).toBeInTheDocument();
    });

    test('elements displayed when isSearchModeOn === true', () => {
      store.dispatch(setEditMode(true));
      rerender();
      fireEvent.click(searchButton());
      expect(screen.getByText(/SearchFood/i)).toBeInTheDocument();
    });

    test('display NoCardsFound component', async () => {
      store.dispatch(setSidebarItemSelected(true));
      snapshotValue.mockReturnValue([])();
      rerender();
      expect(screen.getByText(/NoCardsFound/i)).toBeInTheDocument();
    });
  });

  test('scrollTop button click', () => {
    fireEvent.click(scrollToTopIcon());
    expect(mockedScrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
