import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FoodCardDB } from 'components/Organisms/Food/FoodTypes';

interface FoodState {
  foodCards: FoodCardDB[] | null;
}

const initialState: FoodState = {
  foodCards: null,
};

export const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    setFoodCards: (state, action: PayloadAction<FoodState['foodCards']>) => {
      state.foodCards = action.payload;
    },
  },
});

export const { setFoodCards } = foodSlice.actions;

export default foodSlice.reducer;
