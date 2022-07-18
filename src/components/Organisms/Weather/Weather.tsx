import { memo, useEffect, useMemo, useState } from 'react';
import CustomButton from 'components/Atoms/Buttons/CustomButton/CustomButton';
import { getDayName, getTime } from 'helpers/dates';
import { v4 as uuid4 } from 'uuid';
import { WeatherApiInstance } from 'api/WeatherAPI/instance';
import { RootState } from 'app/store';
import { useAppSelector } from 'app/hooks';
import WeatherCard from 'components/Molecules/WeatherCard/WeatherCard';
import SearchPanel from 'components/Molecules/SearchPanel/SearchPanel';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { Wrapper } from './Weather.styled';
import {
  DailyWeatherInfos,
  SearchingCityInfoTypes,
  TodayWeatherInfosAPI,
  WeatherCityNameParams,
  WeatherCordsParams,
  WeatherDataType,
  WeatherTimestampDataAPI,
} from './WeatherTypes';

const Weather = memo(() => {
  const {
    pages: { sidebarList, subPageID },
  } = useAppSelector((state: RootState) => state);

  const [inputValue, setInputValue] = useState<string>('');
  const [weatherCards, setWeatherCards] = useState<WeatherDataType[]>([]);
  const [searchingCityInfo, setSearchingCityInfo] = useState<SearchingCityInfoTypes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSearchWeather = async (
    params: WeatherCordsParams | WeatherCityNameParams,
    dataType: 'getCityName' | 'getWeather' = 'getWeather',
  ) => {
    if (inputValue === '' && dataType === 'getWeather')
      return setErrorMessage('Enter name of the city !');
    setIsLoading(true);
    await WeatherApiInstance.get('', { params: { units: 'metric', ...params } })
      .then((res) => {
        if (dataType === 'getCityName') return setInputValue(res.data.city.name);
        const { name, timezone, country, sunrise, sunset }: TodayWeatherInfosAPI = res.data.city;
        const WeatherTimestampsData: WeatherTimestampDataAPI[] = res.data.list;

        setSearchingCityInfo({ name, country });

        const weatherDataArray: WeatherDataType[] = [];
        const dailyWeatherList: DailyWeatherInfos[] = [];

        WeatherTimestampsData.forEach((timestamp: WeatherTimestampDataAPI, index: number) => {
          const { dt, main, pop, weather, wind } = timestamp;

          const dayName = getDayName(dt, timezone);

          const prevDayName =
            index > 0 ? getDayName(WeatherTimestampsData[index - 1].dt, timezone) : dayName;

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

          const isLastListItem = index === WeatherTimestampsData.length - 1;

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
        setWeatherCards(weatherDataArray);
      })
      .catch(() => {
        setErrorMessage('An error has occurred');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getCityNameByGeolocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        handleSearchWeather({ lat, lon }, 'getCityName');
      });
    }
  };

  useEffect(() => {
    if (sidebarList.length <= 0) return;

    const name = sidebarList.find((item) => item.id === subPageID)?.name;

    setInputValue(name || '');
  }, [sidebarList, subPageID]);

  return (
    <Wrapper>
      <CustomButton handleClick={getCityNameByGeolocation} className="searchWeatherByLocation">
        <TravelExploreIcon />
      </CustomButton>
      <SearchPanel
        className="searchPanel"
        title="Enter name of the city: "
        inputValue={inputValue}
        setInputValue={setInputValue}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        isLoading={isLoading}
        buttonText="Search weather"
        searchWeatherCb={handleSearchWeather}
        info={
          searchingCityInfo ? `${searchingCityInfo.name} [${searchingCityInfo.country}]` : undefined
        }
      />
      {useMemo(
        () =>
          weatherCards.map(({ name, sunrise, sunset, dailyWeatherList }: WeatherDataType) => (
            <WeatherCard
              name={name}
              sunrise={sunrise}
              sunset={sunset}
              dailyWeatherList={dailyWeatherList}
              key={uuid4()}
            />
          )),
        [weatherCards],
      )}
    </Wrapper>
  );
});

export default Weather;
