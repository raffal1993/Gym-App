import { fireEvent, screen } from '@testing-library/react';
import { setEditMode, setModalOpen } from 'app/slices/interfaceSlice';
import { setupStore } from 'app/store';
import FoodCard from 'components/Molecules/FoodCard/FoodCard';
import EditFoodSetModal from 'components/Molecules/Modals/EditFoodSetModal/EditFoodSetModal';
import React from 'react';
import { renderWithProviders } from '__tests__/utils/test-utils';
import { mockedFoodCardDB } from '../../mocks/mockedFoodData';
import { mockedReduxState } from '../../mocks/mockedReduxState';

const dispatch = jest.fn();

jest.mock('app/hooks', () => ({
  ...jest.requireActual('app/hooks'),
  useAppDispatch: () => dispatch,
}));

jest.mock('assets/images/404food.svg', () => ({
  ReactComponent: () => <svg data-testid="404food"></svg>,
}));

jest.mock('components/Molecules/Modals/EditFoodSetModal/EditFoodSetModal', () => {
  return {
    __esModule: true,
    default: () => <div>Edit FoodSet Modal</div>,
  };
});

jest.mock('components/Molecules/FoodTable/FoodTable', () => {
  return {
    __esModule: true,
    default: () => <table></table>,
  };
});

const store = setupStore(
  mockedReduxState({
    interfaceState: {
      isEditModeOn: false,
    },
  }),
);

describe('testing FoodCard component', () => {
  let renderNew: (ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>) => void;
  const editCardButton = () => screen.getByTestId(/ConstructionIcon/i);

  beforeEach(() => {
    const { rerender } = renderWithProviders(<FoodCard foodCard={mockedFoodCardDB} />, {
      store,
    });
    renderNew = rerender;

    jest.clearAllMocks();
  });

  test('if elements are displayed', () => {
    expect(screen.getByRole('heading', { name: /testFoodCardName/i })).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  describe('isEditModeOn is true', () => {
    beforeAll(() => {
      store.dispatch(setEditMode(true));
    });
    test('if editCardButton is displayed', () => {
      expect(editCardButton()).toBeInTheDocument();
    });
    test('if modal open after click editCardButton', () => {
      fireEvent.click(editCardButton());
      expect(dispatch).toBeCalledWith(
        setModalOpen(<EditFoodSetModal foodCardID={mockedFoodCardDB.foodCardID} />),
      );
    });
  });

  test('if "noFood" icon is displayed when foodSet.length === 0', () => {
    renderNew(<FoodCard foodCard={{ ...mockedFoodCardDB, foodSet: [] }} />);
    expect(screen.getByTestId(/404food/)).toBeInTheDocument();
  });
});
