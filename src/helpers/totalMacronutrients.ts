import { NutrientsDB } from 'components/Organisms/Food/FoodProps';

type Nutrients = Omit<NutrientsDB, 'id' | 'timestamp' | 'name'> & { name?: string };

export const totalMacronutrients = (rows: Nutrients[]) => {
  const total = rows.reduce(
    (previousValue: Nutrients, currentValue: Nutrients) => {
      return {
        kcal: `${parseInt(previousValue.kcal, 10) + parseInt(currentValue.kcal, 10)}`,
        fat: `${parseInt(previousValue.fat, 10) + parseInt(currentValue.fat, 10)}g`,
        carbs: `${parseInt(previousValue.carbs, 10) + parseInt(currentValue.carbs, 10)}g`,
        protein: `${parseInt(previousValue.protein, 10) + parseInt(currentValue.protein, 10)}g`,
        fiber: `${parseInt(previousValue.fiber, 10) + parseInt(currentValue.fiber, 10)}g`,
      } as Nutrients;
    },
    {
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
