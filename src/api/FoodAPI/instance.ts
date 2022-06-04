import axios from 'axios';

export const FoodApiInstance = axios.create({
  baseURL: `${process.env.REACT_APP_FOOD_APP_BASE_URL}?app_id=${process.env.REACT_APP_FOOD_APP_ID}&app_key=${process.env.REACT_APP_FOOD_APP_KEY}`,
  timeout: 5000,
});
