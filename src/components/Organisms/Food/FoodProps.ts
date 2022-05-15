export interface NutrientsAPI {
  ENERC_KCAL?: number;
  FAT?: number;
  CHOCDF?: number;
  PROCNT?: number;
  FIBTG?: number;
}

export interface Column {
  id: 'name' | 'kcal' | 'fat' | 'carbs' | 'protein' | 'fiber';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
}

export interface SearchResultProps {
  label: string;
  image?: string;
  nutrients: NutrientsAPI;
}

export interface NutrientsDB {
  id: string;
  timestamp: number;
  name: string;
  kcal: string;
  fat: string;
  carbs: string;
  protein: string;
  fiber: string;
}

export interface FoodCardDB {
  foodCardID: string;
  timestamp: number;
  name: string;
  foodSet: NutrientsDB[];
}
