import { screen } from '@testing-library/react';
import React from 'react';
import { renderWithProviders } from '__tests__/utils/test-utils';
import { mockedFoodSet } from '__tests__/mocks/mockedFoodData';
import FoodTableMobile from 'components/Molecules/FoodTableMobile/FoodTableMobile';

const initialProps = [mockedFoodSet(1), mockedFoodSet(2), mockedFoodSet(3)];

describe('testing FoodTableMobile component', () => {
  const kcalRows = () => screen.getAllByText(/kcal/i);
  const fatRows = () => screen.getAllByText(/fat/i);
  const carbsRows = () => screen.getAllByText(/carbs/i);
  const proteinRows = () => screen.getAllByText(/protein/i);
  const fiberRows = () => screen.getAllByText(/fiber/i);

  beforeEach(() => {
    renderWithProviders(<FoodTableMobile foodSet={initialProps} />);
  });

  test('if elements are displayed)', () => {
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
