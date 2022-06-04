import { NutrientsTypes } from 'components/Organisms/Food/FoodTypes';

export const countNutrientsByWeight = ({
  carbs,
  fat,
  fiber,
  kcal,
  protein,
  weight,
}: NutrientsTypes) => {
  const nutrients = { kcal, fat, carbs, protein, fiber };

  const ratio = Number(weight) / 100;

  const convertedNutrients = Object.entries(nutrients).reduce((prev, cur) => {
    const [key, value] = cur;
    prev[key] = (Number(value) * ratio).toFixed(1).toString();
    prev[key] = prev[key] === 'NaN' ? '(?)' : prev[key];
    return prev;
  }, {} as Record<string, string>);

  return { weight, ...convertedNutrients } as NutrientsTypes;
};
