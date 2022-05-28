import { NutrientsDB } from 'components/Organisms/Food/FoodTypes';

type Nutrients = Omit<NutrientsDB, 'id' | 'timestamp' | 'name'> & { name?: string };

const nutritionValue = (prev: string, current: string, isKcal = false): string =>
  `${(parseFloat(prev) + (parseFloat(current) || 0)).toFixed(1)}${isKcal ? '' : 'g'}`;

export const totalMacronutrients = (rows: Nutrients[]) => {
  const total = rows.reduce(
    (previousValue: Nutrients, currentValue: Nutrients) => {
      return {
        weight: nutritionValue(previousValue.weight, currentValue.weight),
        kcal: nutritionValue(previousValue.kcal, currentValue.kcal, true),
        fat: nutritionValue(previousValue.fat, currentValue.fat),
        carbs: nutritionValue(previousValue.carbs, currentValue.carbs),
        protein: nutritionValue(previousValue.protein, currentValue.protein),
        fiber: nutritionValue(previousValue.fiber, currentValue.fiber),
      } as Nutrients;
    },
    {
      weight: '0g',
      kcal: '0',
      fat: '0g',
      carbs: '0g',
      protein: '0g',
      fiber: '0g',
    } as Nutrients,
  );

  const totalCell = {
    name: 'TOTAL',
    ...total,
  } as Nutrients;

  return totalCell;
};
