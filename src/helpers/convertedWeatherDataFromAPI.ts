import {
  DailyWeatherInfos,
  WeatherDataAPI,
  WeatherDataType,
} from 'components/Organisms/Weather/WeatherTypes';
import { getDayName, getTime } from './dates';

export const convertedWeatherDataFromAPI = (
  dataAPI: WeatherDataAPI[],
  timezone: number,
  sunrise: number,
  sunset: number,
) => {
  const weatherDataArray: WeatherDataType[] = [];
  const dailyWeatherList: DailyWeatherInfos[] = [];

  dataAPI.forEach((data: WeatherDataAPI, index: number) => {
    const { dt, main, pop, weather, wind } = data;

    const dayName = getDayName(dt, timezone);

    const prevDayName = index > 0 ? getDayName(dataAPI[index - 1].dt, timezone) : dayName;

    dailyWeatherList.push({
      time: getTime(dt, timezone),
      temperature: main.temp,
      sensibleTemperature: main.feels_like,
      pressure: main.pressure,
      possibilityOfPrecipitation: pop,
      description: weather[0].description,
      icon: weather[0].icon,
      windDeg: wind.deg,
      windSpeed: wind.speed,
    } as DailyWeatherInfos);

    const isLastListItem = index === dataAPI.length - 1;

    if (dayName !== prevDayName || isLastListItem) {
      const name = isLastListItem ? dayName : prevDayName;
      const sunsetAndSunrise =
        name === 'Today'
          ? {
              sunrise: getTime(sunrise, timezone, 'sunriseOrSunset'),
              sunset: getTime(sunset, timezone, 'sunriseOrSunset'),
            }
          : {};

      weatherDataArray.push({
        name,
        dailyWeatherList: [...dailyWeatherList],
        ...sunsetAndSunrise,
      });
      dailyWeatherList.length = 0;
    }
  });
  return weatherDataArray;
};
