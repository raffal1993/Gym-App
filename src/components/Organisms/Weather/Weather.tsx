import { memo, useEffect, useMemo, useState } from 'react';
import CustomButton from 'components/Atoms/Buttons/CustomButton/CustomButton';
import { v4 as uuid4 } from 'uuid';
import { WeatherApiInstance } from 'api/WeatherAPI/instance';
import { convertedWeatherDataFromAPI } from 'helpers/convertedWeatherDataFromAPI';
import { RootState } from 'app/store';
import { useAppSelector } from 'app/hooks';
import WeatherCard from 'components/Molecules/WeatherCard/WeatherCard';
import SearchPanel from 'components/Molecules/SearchPanel/SearchPanel';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { Wrapper } from './Weather.styled';
import {
  SearchingCityInfoTypes,
  TodayWeatherInfosAPI,
  WeatherCityNameParams,
  WeatherCordsParams,
  WeatherDataType,
  WeatherDataAPI,
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

        const weatherDataAPI: WeatherDataAPI[] = res.data.list;

        setSearchingCityInfo({ name, country });

        setWeatherCards(convertedWeatherDataFromAPI(weatherDataAPI, timezone, sunrise, sunset));
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
