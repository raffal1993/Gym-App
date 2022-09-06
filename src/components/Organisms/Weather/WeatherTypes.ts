export interface WeatherCityNameParams {
  q: string;
  cnt?: number;
}

export interface Coords {
  lat: number;
  lon: number;
}

export interface WeatherCordsParams extends Coords {
  cnt?: number;
}

export interface SearchingCityInfoTypes {
  name: string;
  country: string;
}

export interface TodayWeatherInfosAPI extends SearchingCityInfoTypes {
  sunrise: number;
  sunset: number;
  timezone: number;
}

interface WeatherDataAPIMain {
  temp: number;
  feels_like: number;
  pressure: number;
}

interface WeatherDataAPIWeather {
  description: string;
  icon: string;
}

interface WeatherDataAPIWind {
  speed: number;
  deg: number;
}

export interface WeatherDataAPI {
  dt: number;
  main: WeatherDataAPIMain;
  pop: number;
  weather: WeatherDataAPIWeather[];
  wind: WeatherDataAPIWind;
}

export interface DailyWeatherInfos {
  time: string;
  temperature: number;
  sensibleTemperature: number;
  pressure: number;
  possibilityOfPrecipitation: number;
  description: string;
  icon: string;
  windDeg: number;
  windSpeed: number;
}

export interface WeatherDataType {
  name: string;
  sunrise?: string;
  sunset?: string;
  dailyWeatherList: DailyWeatherInfos[];
}
