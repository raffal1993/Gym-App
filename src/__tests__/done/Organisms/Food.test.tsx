import { fireEvent, screen } from '@testing-library/react';
import { setEditMode } from 'app/slices/interfaceSlice';
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

jest.mock('firebase/database', () => ({
  ref: jest.fn().mockReturnValue('testRef'),
  onValue: jest.fn((_ref, callback) => {
    const snapshot = {
      val: () => [
        mockedFoodCardDBSnapshot(1),
        mockedFoodCardDBSnapshot(2),
        mockedFoodCardDBSnapshot(3),
      ],
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

describe('testing Food component', () => {
  const searchButton = () => screen.getByTestId(/SearchIcon/i);

  const scrollToTopIcon = () => screen.getByTestId('ArrowCircleUpIcon');

  beforeEach(() => {
    renderWithProviders(<Food />, { store });
    jest.restoreAllMocks();
  });

  describe('displayed elements', () => {
    afterAll(() => {
      store.dispatch(setEditMode(false));
    });
    test('elements displayed on initial render', () => {
      expect(searchButton()).toBeInTheDocument();
      expect(screen.getAllByText(/FoodCard/i)).toHaveLength(3);
      expect(scrollToTopIcon()).toBeInTheDocument();
    });

    test('elements displayed when isEditModeOn === true', () => {
      store.dispatch(setEditMode(true));
      expect(screen.getByText(/AddFood/i)).toBeInTheDocument();
    });

    test('elements displayed when isSearchModeOn === true', () => {
      fireEvent.click(searchButton());
      expect(screen.getByText(/SearchFood/i)).toBeInTheDocument();
    });
  });

  test('scrollTop button click', () => {
    fireEvent.click(scrollToTopIcon());
    expect(mockedScrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
