import { fireEvent, screen, waitFor } from '@testing-library/react';
import SearchFood from 'components/Molecules/SearchFood/SearchFood';
import { foodDataFromAPI, mockedFoodCards } from '../../mocks/mockedFoodData';
import { renderWithProviders } from '../../utils/test-utils';

const mockFoodAPI = jest.fn();

jest.mock('api/FoodAPI/instance', () => ({
  FoodApiInstance: {
    get: () => mockFoodAPI(),
  },
}));

jest.mock('assets/images/404food.svg', () => ({
  ReactComponent: () => <svg data-testid="404food"></svg>,
}));

jest.mock('components/Molecules/SearchFoodResults/SearchFoodResults', () => {
  return {
    __esModule: true,
    default: () => <div>SearchFoodResults</div>,
  };
});

const scrollIntoViewMock = jest.fn();
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

describe('testing SearchFood component', () => {
  const searchFoodButton = (buttonText: string = 'search food') =>
    screen.getByRole('button', { name: new RegExp(buttonText, 'i') });

  const searchInput = () => screen.getByPlaceholderText(/(english only)/i);

  const prevPageButton = () => screen.getByRole('button', { name: /prev page/i });
  const nextPageButton = () => screen.getByRole('button', { name: /next page/i });
  const pageNumberInput = () => screen.getByRole('spinbutton');
  const goToPageButton = () => screen.getByTestId(/goToPageButton/i);

  beforeEach(() => {
    renderWithProviders(<SearchFood foodCards={mockedFoodCards} />);

    jest.resetAllMocks();
  });

  test('if elements are displayed', () => {
    expect(screen.getByTestId('searchPanel')).toBeInTheDocument();
  });

  describe('error handling', () => {
    test('show error if results.length === 0', async () => {
      mockFoodAPI.mockImplementationOnce(async () => {
        return Promise.resolve({ data: { hints: [] } });
      });
      fireEvent.change(searchInput(), { target: { value: 'testFood' } });
      fireEvent.click(searchFoodButton());
      await waitFor(() => {
        expect(screen.getByText(/No results found/i)).toBeInTheDocument();
      });
    });

    test('show error from API call .catch', async () => {
      mockFoodAPI.mockImplementationOnce(async () => {
        return Promise.reject();
      });
      fireEvent.change(searchInput(), { target: { value: 'testFood' } });
      fireEvent.click(searchFoodButton());
      await waitFor(() => {
        expect(screen.getByText(/An error has occurred/i)).toBeInTheDocument();
      });
    });
  });

  describe('search food', () => {
    beforeEach(async () => {
      mockFoodAPI.mockImplementation(async () => {
        return Promise.resolve(foodDataFromAPI);
      });
      fireEvent.change(searchInput(), { target: { value: 'testFood' } });
      fireEvent.click(searchFoodButton());
      await waitFor(() => {
        expect(screen.getByText(/SearchFoodResults/i)).toBeInTheDocument();
      });
    });

    test('if searching results displays properly when searchResults.length > 0', async () => {
      expect(prevPageButton()).toBeInTheDocument();
      expect(nextPageButton()).toBeInTheDocument();
      expect(pageNumberInput()).toBeInTheDocument();
      expect(goToPageButton()).toBeInTheDocument();
    });

    test('prev page button disabled if page === 0 or 1', async () => {
      fireEvent.change(pageNumberInput(), { target: { value: 0 } });
      expect(prevPageButton()).toBeDisabled();
      fireEvent.change(pageNumberInput(), { target: { value: 1 } });
      expect(prevPageButton()).toBeDisabled();
      fireEvent.change(pageNumberInput(), { target: { value: 2 } });
      expect(prevPageButton()).not.toBeDisabled();
    });

    test('pageNumberInput (only numbers greater or equal than 0 allowed)', async () => {
      fireEvent.change(pageNumberInput(), { target: { value: -1 } });
      expect(pageNumberInput()).toHaveValue(1);
      fireEvent.change(pageNumberInput(), { target: { value: 'some text' } });
      expect(pageNumberInput()).toHaveValue(0);
    });

    test('load the specific page by prev/next page button or by input number', async () => {
      expect(pageNumberInput()).toHaveValue(1);
      fireEvent.click(nextPageButton());
      await waitFor(() => {
        expect(mockFoodAPI).toHaveBeenCalledTimes(2);
      });
      expect(pageNumberInput()).toHaveValue(2);
      fireEvent.click(prevPageButton());
      await waitFor(() => {
        expect(mockFoodAPI).toHaveBeenCalledTimes(3);
      });
      expect(pageNumberInput()).toHaveValue(1);
      fireEvent.change(pageNumberInput(), { target: { value: 10 } });
      fireEvent.click(goToPageButton());
      await waitFor(() => {
        expect(mockFoodAPI).toHaveBeenCalledTimes(4);
      });
      expect(pageNumberInput()).toHaveValue(10);
    });
  });
});
