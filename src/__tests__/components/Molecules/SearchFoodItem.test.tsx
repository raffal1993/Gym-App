import {
  cleanup,
  fireEvent,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { setupStore } from 'app/store';
import SearchFoodItem from 'components/Molecules/SearchFoodItem/SearchFoodItem';
import { SearchFoodItemResult } from '../../mocks/mockedFoodData';
import { mockedReduxState } from '../../mocks/mockedReduxState';
import { mockedSubPageID } from '../../mocks/mockedSidebarData';
import { renderWithProviders } from '../../utils/test-utils';

const addFoodToDB = jest.fn();

jest.mock('firebase-cfg/database/food/add', () => ({
  addFoodToDB: () => addFoodToDB(),
}));

jest.mock('assets/images/404food.svg', () => ({
  ReactComponent: () => <svg data-testid="404food"></svg>,
}));

const addFoodAnimation = jest.fn();

jest.mock('helpers/showAddFoodAnimation.ts', () => ({
  addFoodAnimation: () => addFoodAnimation(),
}));

const store = setupStore(
  mockedReduxState({
    pagesState: {
      subPageID: mockedSubPageID,
    },
  }),
);

const setOpenSnackbar = jest.fn();

const SearchFoodItemProps = SearchFoodItemResult(1, { setOpenSnackbar });

describe('testing SearchFoodItem component', () => {
  const wrapper = () => screen.getByTestId(/wrapper/i);
  const foodCardNameButton = (buttonText: string) =>
    screen.getByRole('button', { name: new RegExp(buttonText, 'i') });

  const addFoodButton = () => screen.getByRole('button', { name: /add/i });
  const weightInput = () => screen.getByRole('spinbutton');

  beforeEach(() => {
    require('utils/staticVariables/maxElements').MAX_FOODS_IN_CARD = 25;
    renderWithProviders(<SearchFoodItem {...SearchFoodItemProps} />, {
      store,
    });

    jest.resetAllMocks();
  });

  test('if elements are displayed', () => {
    expect(wrapper()).toBeInTheDocument();
    expect(screen.getByText(/foodLabelTest/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    ['KCAL', '4', 'FAT', '2g', 'CARBS', '1g', 'PROTEIN', '5g', 'FIBER', '3g'].forEach((nutrient) =>
      expect(screen.getByText(new RegExp(nutrient, 'i'))).toBeInTheDocument(),
    );
  });

  test('if image not found', () => {
    cleanup();
    renderWithProviders(<SearchFoodItem {...{ ...SearchFoodItemProps, image: undefined }} />, {
      store,
    });
    expect(screen.getByTestId('404food')).toBeInTheDocument();
  });

  test('if elements are displayed after click on card', () => {
    fireEvent.click(wrapper());
    expect(screen.getByRole('heading', { name: /Add Food to Food Set:/i })).toBeInTheDocument();
    expect(foodCardNameButton('testFoodCardName1')).toBeInTheDocument();
    expect(foodCardNameButton('testFoodCardName2')).toBeInTheDocument();
    expect(foodCardNameButton('testFoodCardName3')).toBeInTheDocument();
  });

  test('if warning message shows up when foodCards.length === 0', () => {
    cleanup();
    renderWithProviders(<SearchFoodItem {...{ ...SearchFoodItemProps, foodCards: [] }} />, {
      store,
    });
    fireEvent.click(wrapper());
    expect(screen.getByText(/No Food Sets available :/i)).toBeInTheDocument();
  });

  test('if elements are displayed after picking foodCard', () => {
    fireEvent.click(wrapper());
    fireEvent.click(foodCardNameButton('testFoodCardName1'));
    expect(screen.getByRole('heading', { name: /WEIGHT \(g\):/i })).toBeInTheDocument();
    expect(weightInput()).toBeInTheDocument();
    expect(addFoodButton()).toBeInTheDocument();
  });

  test('if spinner shows up when isLoading === true', () => {
    cleanup();
    renderWithProviders(<SearchFoodItem {...{ ...SearchFoodItemProps, isLoading: true }} />, {
      store,
    });
    expect(screen.getByTestId(/spinner/i)).toBeInTheDocument();
  });

  test('foodCardNameButton is disabled when max foods in cards is reached', () => {
    require('utils/staticVariables/maxElements').MAX_FOODS_IN_CARD = 2;

    fireEvent.click(wrapper());
    expect(foodCardNameButton('testFoodCardName1')).toBeDisabled();
    expect(foodCardNameButton('testFoodCardName2')).toBeDisabled();
    expect(foodCardNameButton('testFoodCardName3')).toBeDisabled();
  });

  describe('error handling', () => {
    jest.useFakeTimers();
    beforeEach(() => {
      fireEvent.click(wrapper());
      fireEvent.click(foodCardNameButton('testFoodCardName1'));
    });
    test('shows error when input is empty', () => {
      expect(weightInput()).toHaveDisplayValue('');
      fireEvent.click(addFoodButton());
      expect(screen.getByText(/Enter properly value!/i)).toBeInTheDocument();
    });
    test('error fade out', async () => {
      fireEvent.click(addFoodButton());
      jest.advanceTimersByTime(1500);
      await waitForElementToBeRemoved(() => screen.queryByText(/Enter properly value!/i));
    });
  });

  describe('input weight value test', () => {
    test('input weight only numbers allowed', () => {
      fireEvent.click(wrapper());
      fireEvent.click(foodCardNameButton('testFoodCardName1'));
      fireEvent.change(weightInput(), { target: { value: 'someText' } });
      expect(weightInput()).toHaveDisplayValue('');
    });

    test('input weight only numbers from 0 to 9999', () => {
      fireEvent.click(wrapper());
      fireEvent.click(foodCardNameButton('testFoodCardName1'));
      fireEvent.change(weightInput(), { target: { value: '-10' } });
      expect(weightInput()).toHaveDisplayValue('0');
      fireEvent.change(weightInput(), { target: { value: '10000' } });
      expect(weightInput()).toHaveDisplayValue('0');
      fireEvent.change(weightInput(), { target: { value: '9999' } });
      expect(weightInput()).toHaveDisplayValue('9999');
    });

    test('input weight only 1 digit after dot', () => {
      fireEvent.click(wrapper());
      fireEvent.click(foodCardNameButton('testFoodCardName1'));
      fireEvent.change(weightInput(), { target: { value: '2.22' } });
      expect(weightInput()).toHaveDisplayValue('');
      fireEvent.change(weightInput(), { target: { value: '1.1' } });
      expect(weightInput()).toHaveDisplayValue('1.1');
    });
  });

  test('add food to foodCard', () => {
    fireEvent.click(wrapper());
    fireEvent.click(foodCardNameButton('testFoodCardName1'));
    fireEvent.change(weightInput(), { target: { value: '100' } });
    fireEvent.click(addFoodButton());
    expect(setOpenSnackbar).toHaveBeenCalled();
    expect(addFoodToDB).toHaveBeenCalled();
  });

  test('mouseLeave', async () => {
    fireEvent.click(wrapper());
    fireEvent.mouseLeave(wrapper());
    await waitFor(() => {
      expect(
        screen.queryByRole('heading', { name: /Add Food to Food Set:/i }),
      ).not.toBeInTheDocument();
    });
    expect(addFoodAnimation).toHaveBeenCalled();
  });
});
