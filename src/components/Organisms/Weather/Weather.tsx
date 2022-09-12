import { memo, useEffect, useMemo, useState } from 'react';
import CustomButton from 'components/Commons/Buttons/CustomButton/CustomButton';
import { v4 as uuid4 } from 'uuid';
import { pagesPaths } from 'utils/staticVariables/pages';
import { WeatherApiInstance } from 'api/WeatherAPI/instance';
import { convertedWeatherDataFromAPI } from 'helpers/convertedWeatherDataFromAPI';
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
} from './WeatherTypes';

const Weather = memo(() => {
  const {
    pages: { sidebarList, subPageID, mainPage },
  } = useAppSelector((state) => state);

  const [inputValue, setInputValue] = useState('');
  const [weatherCards, setWeatherCards] = useState<WeatherDataType[]>([]);
  const [searchingCityInfo, setSearchingCityInfo] = useState<SearchingCityInfoTypes | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearchWeather = async (
    params: WeatherCordsParams | WeatherCityNameParams,
    dataType: 'getCityName' | 'getWeather' = 'getWeather',
  ) => {
    if (inputValue === '' && dataType === 'getWeather') {
      return setErrorMessage('Enter name of the city !');
    }
    setIsLoading(true);

    await WeatherApiInstance.get('', { params: { units: 'metric', ...params } })
      .then((res) => {
        if (dataType === 'getCityName') {
          return setInputValue(res.data.city.name);
        }
        const { name, timezone, country, sunrise, sunset }: TodayWeatherInfosAPI = res.data.city;

        setSearchingCityInfo({ name, country });

        setWeatherCards(convertedWeatherDataFromAPI(res.data.list, timezone, sunrise, sunset));
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

  const weatherCardsMemoized = useMemo(
    () =>
      weatherCards.map((weatherCard: WeatherDataType) => {
        const { name, sunrise, sunset, dailyWeatherList } = weatherCard;
        return (
          <WeatherCard
            name={name}
            sunrise={sunrise}
            sunset={sunset}
            dailyWeatherList={dailyWeatherList}
            key={uuid4()}
          />
        );
      }),
    [weatherCards],
  );

  useEffect(() => {
    const isInputChangeAllowed = mainPage === pagesPaths.weather.name && sidebarList.length > 0;
    if (isInputChangeAllowed) {
      const name = sidebarList.find((item) => item.id === subPageID)?.name;
      setInputValue(name || '');
    }
  }, [mainPage, sidebarList, subPageID]);

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
      {weatherCardsMemoized}
    </Wrapper>
  );
});

export default Weather;
