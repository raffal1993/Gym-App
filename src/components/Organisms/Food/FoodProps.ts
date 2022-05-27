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
  maxWidth?: number;
  align?: 'right' | 'left' | 'center';
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

export type NutrientsTypes = Omit<NutrientsDB, 'id' | 'timestamp' | 'name'>;

export interface FoodDB {
  label: string;
  image?: string;
  nutrients: NutrientsAPI;
}

export interface SearchFoodItemTypes extends Omit<FoodDB, 'nutrients'> {
  nutrients: NutrientsTypes;
  foodCards?: FoodCardDB[];
  setOpenSnackbar: (arg: boolean) => void;
}

export interface FoodCardDB {
  foodCardID: string;
  timestamp: number;
  name: string;
  foodSet: NutrientsDB[];
}

export interface FoodIdName extends Pick<FoodCardDB, 'foodCardID' | 'name'> {}

export type ConvertTimestampDB<T> = Omit<T, 'timestamp'> & { timestamp: object };
