import { DailyWeatherInfos, WeatherDataType } from 'components/Organisms/Weather/WeatherTypes';

export const mockedDailyWeatherInfos = (number: number = 1): DailyWeatherInfos => {
  return {
    time: `200${number}`,
    temperature: number * 10 + 1,
    sensibleTemperature: number * 20 + 1,
    pressure: number,
    possibilityOfPrecipitation: number,
    description: `testDescription${number}`,
    icon: `testSRC${number}`,
    windDeg: number,
    windSpeed: number,
  };
};

export const mockedWeatherDataType = (number: number = 1): WeatherDataType => {
  return {
    name: `testName${number}`,
    sunrise: `testSunrise${number}`,
    sunset: `testSunset${number}`,
    dailyWeatherList: [
      mockedDailyWeatherInfos(number * 10 + 1),
      mockedDailyWeatherInfos(number * 10 + 2),
      mockedDailyWeatherInfos(number * 10 + 3),
    ],
  };
};
