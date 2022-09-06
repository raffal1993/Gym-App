import { Column } from 'components/Organisms/Food/FoodTypes';

export const columns: readonly Column[] = [
  { id: 'weight', label: 'WEIGHT' },
  { id: 'name', label: 'NAME', maxWidth: 110, minWidth: 90 },
  { id: 'kcal', label: 'KCAL', align: 'center', maxWidth: 80 },
  {
    id: 'fat',
    label: 'FAT',
    maxWidth: 80,
    align: 'center',
  },
  {
    id: 'carbs',
    label: 'CARBS',
    maxWidth: 80,
    align: 'center',
  },
  {
    id: 'protein',
    label: 'PROTEIN',
    maxWidth: 80,
    align: 'center',
  },
  {
    id: 'fiber',
    label: 'FIBER',
    maxWidth: 80,
    align: 'center',
  },
];
