import { screen } from '@testing-library/react';
import FoodTable from 'components/Molecules/FoodTable/FoodTable';
import React from 'react';
import { renderWithProviders } from '__tests__/utils/test-utils';
import { mockedFoodCardDB } from '../../mocks/mockedFoodData';

const isWidthSmaller = jest.fn();

jest.mock('hooks/useResize', () => {
  return {
    __esModule: true,
    default: () => ({
      isWidthSmaller: isWidthSmaller(),
    }),
  };
});

describe('testing FoodTable component', () => {
  const row1 = () =>
    screen.getByRole('row', { name: /testFoodName1 \(100\.0g\) 4\.0 2\.0g 1\.0g 5\.0g 3\.0g/i });
  const row2 = () =>
    screen.getByRole('row', { name: /testFoodName2 \(200\.0g\) 8\.0 4\.0g 2\.0g 10\.0g 6\.0g/i });
  const row3 = () =>
    screen.getByRole('row', { name: /testFoodName3 \(300\.0g\) 12\.0 6\.0g 3\.0g 15\.0g 9\.0g/i });
  const rowTotal = () =>
    screen.getByRole('row', { name: /TOTAL \[ 600\.0g \] 24\.0 12\.0g 6\.0g 30\.0g 18\.0g/i });

  const kcalRows = () => screen.getAllByText(/kcal/i);
  const fatRows = () => screen.getAllByText(/fat/i);
  const carbsRows = () => screen.getAllByText(/carbs/i);
  const proteinRows = () => screen.getAllByText(/protein/i);
  const fiberRows = () => screen.getAllByText(/fiber/i);

  beforeEach(() => {
    renderWithProviders(<FoodTable foodSet={mockedFoodCardDB.foodSet} />);
  });

  test('if elements are displayed on larger screens (greater than "xs")', () => {
    isWidthSmaller.mockReturnValueOnce(() => false);
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

  test('if elements are displayed on smaller screens ("xs")', () => {
    isWidthSmaller.mockReturnValueOnce(() => true);
    expect(screen.getByText(/testFoodName1/i)).toBeInTheDocument();
    expect(screen.getByText(/testFoodName2/i)).toBeInTheDocument();
    expect(screen.getByText(/testFoodName3/i)).toBeInTheDocument();

    expect(screen.getByText(/(100.0g)/i)).toBeInTheDocument();
    expect(screen.getByText(/(200.0g)/i)).toBeInTheDocument();
    expect(screen.getByText(/(300.0g)/i)).toBeInTheDocument();

    expect(kcalRows()).toHaveLength(4);
    kcalRows().forEach((kcalRow) => {
      expect(kcalRow).toBeInTheDocument();
      expect(kcalRow.nextSibling).toBeInTheDocument();
    });

    expect(fatRows()).toHaveLength(4);
    fatRows().forEach((fatRow) => {
      expect(fatRow).toBeInTheDocument();
      expect(fatRow.nextSibling).toBeInTheDocument();
    });

    expect(carbsRows()).toHaveLength(4);
    carbsRows().forEach((carbRows) => {
      expect(carbRows).toBeInTheDocument();
      expect(carbRows.nextSibling).toBeInTheDocument();
    });

    expect(proteinRows()).toHaveLength(4);
    proteinRows().forEach((proteinRow) => {
      expect(proteinRow).toBeInTheDocument();
      expect(proteinRow.nextSibling).toBeInTheDocument();
    });

    expect(fiberRows()).toHaveLength(4);
    fiberRows().forEach((fiberRow) => {
      expect(fiberRow).toBeInTheDocument();
      expect(fiberRow.nextSibling).toBeInTheDocument();
    });

    expect(screen.getByText(/TOTAL/i)).toBeInTheDocument();
    expect(screen.getByText(/weight/i)).toBeInTheDocument();
    expect(screen.getByText(/(600.0g)/i)).toBeInTheDocument();
  });
});
