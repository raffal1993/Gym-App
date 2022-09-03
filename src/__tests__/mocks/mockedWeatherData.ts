import {
  DailyWeatherInfos,
  TodayWeatherInfosAPI,
  WeatherDataAPI,
  WeatherDataType,
} from 'components/Organisms/Weather/WeatherTypes';

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

export const mockedWeatherData = (number: number = 1): WeatherDataType => {
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

export const mockedWeatherDataAPI = (number: number = 1): WeatherDataAPI => ({
  dt: 1661612406721 + number * 10000,
  main: {
    temp: number * 10,
    feels_like: number * 10 + 1,
    pressure: number * 10 + 2,
  },
  pop: number * 10 + 3,
  weather: [
    {
      description: `testDescription${number}`,
      icon: `testSRC${number}`,
    },
  ],
  wind: {
    speed: number * 10 + 4,
    deg: number * 10 + 5,
  },
});

export const todayWeatherInfosAPI = (number: number = 1): TodayWeatherInfosAPI => ({
  name: `testCityName${number}`,
  country: `testCountryName${number}`,
  sunrise: 1661612406721 + number * 10000,
  sunset: 1661612406721 + number * 20000,
  timezone: 1661612406721 + number * 30000,
});
