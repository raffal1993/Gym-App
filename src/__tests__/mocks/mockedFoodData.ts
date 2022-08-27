import {
  FoodCardDB,
  FoodDB,
  NutrientsDB,
  NutrientsTypes,
  SearchFoodItemTypes,
} from 'components/Organisms/Food/FoodTypes';

export const mockedFoodCardID = '-testFoodCardID';

export const mockedFoodSet = (number: number): NutrientsDB => ({
  id: `-testFoodSetID${number}`,
  name: `testFoodName${number}`,
  carbs: `${number}.0g`,
  fat: `${number * 2}.0g`,
  fiber: `${number * 3}.0g`,
  kcal: `${number * 4}.0`,
  protein: `${number * 5}.0g`,
  timestamp: number * 1000,
  weight: `${number * 100}.0g`,
});

export const mockedNutrients = (number: number = 1): NutrientsTypes => ({
  carbs: `${number * 1}`,
  fat: `${number * 2}`,
  fiber: `${number * 3}`,
  kcal: `${number * 4}`,
  protein: `${number * 5}`,
  weight: `${number * 100}`,
});

export const mockedFoodCardDBSnapshot = (number: number) => ({
  [`-testFoodCardID${number}`]: {
    foodSet: [mockedFoodSet(1), mockedFoodSet(2), mockedFoodSet(3)],
    name: `testFoodCardName${number}`,
    timestamp: number * 1000,
  },
});

export const mockedFoodCardDB: FoodCardDB = {
  foodCardID: mockedFoodCardID,
  timestamp: 123456789,
  name: 'testFoodCardName',
  foodSet: [mockedFoodSet(1), mockedFoodSet(2), mockedFoodSet(3)],
};

export const mockedFoodCards: FoodCardDB[] = [
  {
    foodCardID: `${mockedFoodCardID}1`,
    timestamp: 1234567891,
    name: 'testFoodCardName1',
    foodSet: [mockedFoodSet(1), mockedFoodSet(2), mockedFoodSet(3)],
  },
  {
    foodCardID: `${mockedFoodCardID}2`,
    timestamp: 1234567892,
    name: 'testFoodCardName2',
    foodSet: [mockedFoodSet(4), mockedFoodSet(5), mockedFoodSet(6)],
  },
  {
    foodCardID: `${mockedFoodCardID}3`,
    timestamp: 1234567893,
    name: 'testFoodCardName3',
    foodSet: [mockedFoodSet(7), mockedFoodSet(8), mockedFoodSet(9)],
  },
];

export const foodDataDB = (number: number): { food: FoodDB } => ({
  food: {
    label: 'foodLabelTest',
    image: 'imageSRCTest',
    nutrients: {
      ENERC_KCAL: number * 5,
      FAT: number * 4,
      CHOCDF: number * 3,
      PROCNT: number * 2,
      FIBTG: number,
    },
  },
});
export const foodDataFromAPI = { data: { hints: [foodDataDB(1), foodDataDB(2), foodDataDB(3)] } };

export const SearchFoodItemResult = (
  number: number,
  { setOpenSnackbar }: { setOpenSnackbar: (arg?: boolean) => void },
): SearchFoodItemTypes => ({
  label: `foodLabelTest${number}`,
  nutrients: mockedNutrients(number),
  image: `imageSRCTest${number}`,
  foodCards: mockedFoodCards,
  setOpenSnackbar,
  isLoading: false,
});
