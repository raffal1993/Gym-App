import axios from 'axios';

export const FoodApiInstance = axios.create({
  baseURL: `https://api.edamam.com/api/food-database/v2/parser?app_id=${process.env.REACT_APP_FOOD_APP_ID}&app_key=${process.env.REACT_APP_FOOD_APP_KEY}&`,
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});
