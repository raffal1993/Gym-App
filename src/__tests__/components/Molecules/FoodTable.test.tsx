import { cleanup, screen } from '@testing-library/react';
import FoodTable from 'components/Molecules/FoodTable/FoodTable';
import React from 'react';
import { renderWithProviders } from '__tests__/utils/test-utils';
import { mockedFoodCardID, mockedFoodCards } from '__tests__/mocks/mockedFoodData';
import { setupStore } from 'app/store';
import { mockedReduxState } from '__tests__/mocks/mockedReduxState';

const isWidthSmaller = jest.fn();

jest.mock('hooks/useResize', () => {
  return {
    __esModule: true,
    default: () => ({
      isWidthSmaller: isWidthSmaller(),
    }),
  };
});

jest.mock('components/Molecules/FoodTableMobile/FoodTableMobile', () => {
  return {
    __esModule: true,
    default: () => <div>FoodTableMobile</div>,
  };
});

jest.mock('components/Molecules/FoodTableDesktop/FoodTableDesktop', () => {
  return {
    __esModule: true,
    default: () => <div>FoodTableDesktop</div>,
  };
});

const initialState = {
  foodState: { foodCards: mockedFoodCards },
};

const store = setupStore(mockedReduxState(initialState));

const rerender = () => {
  cleanup();
  renderWithProviders(<FoodTable foodCardID={`${mockedFoodCardID}1`} />, { store });
};

describe('testing FoodTable component', () => {
  beforeEach(() => {
    renderWithProviders(<FoodTable foodCardID={`${mockedFoodCardID}1`} />, { store });
  });

  test('if elements are displayed on Desktop resolution)', () => {
    isWidthSmaller.mockReturnValue(false);
    rerender();
    expect(screen.getByText(/FoodTableDesktop/i)).toBeInTheDocument();
  });
  test('if elements are displayed on Mobile resolution)', () => {
    isWidthSmaller.mockReturnValue(true);
    rerender();
    expect(screen.getByText(/FoodTableMobile/i)).toBeInTheDocument();
  });
});
