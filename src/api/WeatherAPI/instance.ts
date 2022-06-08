import axios from 'axios';

export const WeatherApiInstance = axios.create({
  baseURL: `${process.env.REACT_APP_WEATHER_APP_BASE_URL}?appid=${process.env.REACT_APP_WEATHER_APP_KEY}&lang=en`,
  timeout: 5000,
});

//sunrise
//sunset

//list = {

//dt_txt =  (ex."2022-06-04 12:00:00")

//main : {

// temp
// fells_like

//}

// pop = probability of rain / Probability of precipitation
// list.rain.3h = rain volume for the last 3 hours
// list.snow.3h = snow volume for the last 3 hours

//weather[0] = {

//description
// icon
//
//
//
//
//}

//}
