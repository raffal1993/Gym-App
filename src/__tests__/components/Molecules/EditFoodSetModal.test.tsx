import { fireEvent, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { setModalClose } from 'app/slices/interfaceSlice';
import { setupStore } from 'app/store';
import EditFoodSetModal from 'components/Molecules/Modals/EditFoodSetModal/EditFoodSetModal';
import React from 'react';
import { renderWithProviders } from '__tests__/utils/test-utils';
import { mockedFoodCardDBSnapshot, mockedFoodCards } from '../../mocks/mockedFoodData';
import { mockedReduxState } from '../../mocks/mockedReduxState';
import { mockedSubPageID } from '../../mocks/mockedSidebarData';

const foodCardID = '-testFoodCardID1';

const foodNamesAmount = mockedFoodCardDBSnapshot(1)[foodCardID].foodSet.length;

const dispatch = jest.fn();

jest.mock('app/hooks', () => ({
  ...jest.requireActual('app/hooks'),
  useAppDispatch: () => dispatch,
}));

const updateFoodSetName = jest.fn();

jest.mock('firebase-cfg/database/food/update', () => ({
  updateFoodSetName: () => updateFoodSetName(),
}));

const removeFoodItem = jest.fn();
const removeFoodSet = jest.fn();

jest.mock('firebase-cfg/database/food/remove', () => ({
  removeFoodItem: () => removeFoodItem(),
  removeFoodSet: () => removeFoodSet(),
}));

const initialState = {
  pagesState: { subPageID: mockedSubPageID },
  foodState: { foodCards: mockedFoodCards },
};

const store = setupStore(mockedReduxState(initialState));

describe('testing EditFoodSetModal component', () => {
  const foodCardName = () => screen.getByText(/testFoodCardName1/i);

  const foodNames = (amount: number = foodNamesAmount) => {
    const array = [];
    for (let i = 1; i <= amount; i++) {
      array.push(screen.getByText(new RegExp(`testFoodName${i}`, 'i')));
    }
    return array;
  };

  const removeFoodButtons = () => screen.getAllByTestId(/CloseIcon/i);

  const removeFoodSetButton = () => screen.getByRole('button', { name: /Remove Food Set ?/i });

  beforeEach(() => {
    renderWithProviders(<EditFoodSetModal foodCardID={foodCardID} />, {
      store,
    });

    jest.clearAllMocks();
  });

  test('if elements are displayed', () => {
    expect(foodCardName()).toBeInTheDocument();
    foodNames().forEach((foodName) => expect(foodName).toBeInTheDocument());
    expect(removeFoodSetButton()).toBeInTheDocument();
    expect(removeFoodButtons()).toHaveLength(foodNamesAmount);
  });

  describe('change foodSet name', () => {
    test('if form elemets showed up after click on version name', () => {
      fireEvent.click(foodCardName());
      expect(screen.getByText(/Enter new Food Set name:/i)).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /change name/i })).toBeInTheDocument();
    });

    test('if form elemets fade out after click on "active" element', () => {
      fireEvent.click(foodCardName());
      expect(foodCardName().getAttribute('class')).toMatch(/active/gi);
      fireEvent.click(foodCardName());
      expect(foodCardName().getAttribute('class')).not.toMatch(/active/gi);
      expect(screen.queryByText(/Enter new Food Set name:/i)).not.toBeInTheDocument();
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /change name/i })).not.toBeInTheDocument();
    });
  });
  describe('confirmation feature', () => {
    jest.useFakeTimers();

    test('if "confirm" button show up after click remove version button', () => {
      fireEvent.click(removeFoodButtons()[0]);
      expect(screen.getByRole('button', { name: /confirm/i })).toBeInTheDocument();
    });

    test('if "Are you sure" button show up after click remove exercise button', () => {
      fireEvent.click(removeFoodSetButton());
      expect(screen.getByRole('button', { name: /ARE YOU SURE\?/i })).toBeInTheDocument();
    });

    test('timeout clear after 2.5 sec (if all confirmations fade out)', async () => {
      fireEvent.click(removeFoodButtons()[0]);
      jest.advanceTimersByTime(2400);
      await waitForElementToBeRemoved(() => screen.queryByRole('button', { name: /confirm/i }), {
        timeout: 2500,
      });
      fireEvent.click(removeFoodSetButton());
      jest.advanceTimersByTime(2400);
      await waitForElementToBeRemoved(
        () => screen.queryByRole('button', { name: /ARE YOU SURE\?/i }),
        { timeout: 2500 },
      );
    });
  });

  describe('database functions', () => {
    test('if removeFoodItem is called', () => {
      fireEvent.click(removeFoodButtons()[0]);
      fireEvent.click(screen.getByRole('button', { name: /confirm/i }));
      expect(removeFoodItem).toHaveBeenCalled();
    });

    test('if removeFoodSet is called', () => {
      fireEvent.click(removeFoodSetButton());
      fireEvent.click(screen.getByRole('button', { name: /ARE YOU SURE\?/i }));
      expect(removeFoodSet).toHaveBeenCalled();
      expect(dispatch).toBeCalledWith(setModalClose());
    });
  });

  test('if update exercise name is called', () => {
    fireEvent.click(foodCardName());
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'newName' } });
    fireEvent.click(screen.getByRole('button', { name: /change name/i }));
    expect(updateFoodSetName).toHaveBeenCalled();
  });
});
