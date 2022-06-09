import axios from 'axios';

export const WeatherApiInstance = axios.create({
  baseURL: `${process.env.REACT_APP_WEATHER_APP_BASE_URL}?appid=${process.env.REACT_APP_WEATHER_APP_KEY}&lang=en`,
  timeout: 5000,
});
