import { screen } from '@testing-library/react';
import SearchFoodResults from 'components/Molecules/SearchFoodResults/SearchFoodResults';
import React from 'react';
import { mockedFoodCards, SearchFoodItemResult } from '../../mocks/mockedFoodData';
import { renderWithProviders } from '../../utils/test-utils';

const useStateMock = jest.spyOn(React, 'useState').mockImplementation(() => [false, jest.fn()]);

jest.mock('components/Molecules/SearchFoodItem/SearchFoodItem', () => {
  return {
    __esModule: true,
    default: () => <div>SearchFoodItem</div>,
  };
});

jest.mock('assets/images/404food.svg', () => ({
  ReactComponent: () => <svg data-testid="404food"></svg>,
}));

const searchResults = [1, 2, 3].map((number) =>
  SearchFoodItemResult(number, { setOpenSnackbar: jest.fn() }),
);

const searchFoodResultsProps = {
  searchResults,
  foodCards: mockedFoodCards,
  isLoading: false,
};

describe('testing SearchFoodResults component', () => {
  test('if elements are displayed', () => {
    renderWithProviders(<SearchFoodResults {...searchFoodResultsProps} />);
    expect(screen.getAllByText(/SearchFoodItem/i)).toHaveLength(3);
  });

  test('snackbar shows up', () => {
    useStateMock.mockImplementationOnce(() => [true, jest.fn()]);
    renderWithProviders(<SearchFoodResults {...searchFoodResultsProps} />);
    expect(screen.getByText(/Added to Food Set!/i)).toBeInTheDocument();
  });

  test('snackbar hide', () => {
    useStateMock.mockImplementationOnce(() => [false, jest.fn()]);
    renderWithProviders(<SearchFoodResults {...searchFoodResultsProps} />);
    expect(screen.queryByText(/Added to Food Set!/i)).not.toBeInTheDocument();
  });
});
