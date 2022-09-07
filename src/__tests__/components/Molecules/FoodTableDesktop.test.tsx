import { screen } from '@testing-library/react';
import FoodTableDesktop from 'components/Molecules/FoodTableDesktop/FoodTableDesktop';
import React from 'react';
import { renderWithProviders } from '__tests__/utils/test-utils';
import { mockedFoodSet } from '__tests__/mocks/mockedFoodData';

const initialProps = [mockedFoodSet(1), mockedFoodSet(2), mockedFoodSet(3)];

describe('testing FoodTableDesktop component', () => {
  const row1 = () =>
    screen.getByRole('row', { name: /testFoodName1 \(100\.0g\) 4\.0 2\.0g 1\.0g 5\.0g 3\.0g/i });
  const row2 = () =>
    screen.getByRole('row', { name: /testFoodName2 \(200\.0g\) 8\.0 4\.0g 2\.0g 10\.0g 6\.0g/i });
  const row3 = () =>
    screen.getByRole('row', { name: /testFoodName3 \(300\.0g\) 12\.0 6\.0g 3\.0g 15\.0g 9\.0g/i });
  const rowTotal = () =>
    screen.getByRole('row', { name: /TOTAL \[ 600\.0g \] 24\.0 12\.0g 6\.0g 30\.0g 18\.0g/i });
  beforeEach(() => {
    renderWithProviders(<FoodTableDesktop foodSet={initialProps} />);
  });

  test('if elements are displayed)', () => {
    expect(screen.getByText(/NAME/)).toBeInTheDocument();
    expect(screen.getByText(/KCAL/i)).toBeInTheDocument();
    expect(screen.getByText(/FAT/i)).toBeInTheDocument();
    expect(screen.getByText(/CARBS/i)).toBeInTheDocument();
    expect(screen.getByText(/PROTEIN/i)).toBeInTheDocument();
    expect(screen.getByText(/FIBER/i)).toBeInTheDocument();
    expect(screen.getByText(/TOTAL/i)).toBeInTheDocument();

    expect(row1()).toBeInTheDocument();
    expect(row2()).toBeInTheDocument();
    expect(row3()).toBeInTheDocument();
    expect(rowTotal()).toBeInTheDocument();

    expect(row1().children).toHaveLength(6);
    expect(row2().children).toHaveLength(6);
    expect(row3().children).toHaveLength(6);
    expect(rowTotal().children).toHaveLength(6);
  });
});
