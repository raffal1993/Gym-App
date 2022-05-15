export interface Data {
  name: string;
  kcal: string;
  fat: string;
  carbs: string;
  protein: string;
  fiber: string;
}

export interface Column {
  id: 'name' | 'kcal' | 'fat' | 'carbs' | 'protein' | 'fiber';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
}
