import Button from 'components/Atoms/Buttons/CustomButton/CustomButton';
import React, { forwardRef, Ref, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { SearchFoodMethod } from 'components/Organisms/Food/FoodTypes';
import {
  WeatherCityNameParams,
  WeatherCordsParams,
} from 'components/Organisms/Weather/WeatherTypes';
import ErrorMessage from 'components/Atoms/ErrorMessage/ErrorMessage';
import ProgressBar from 'components/Atoms/ProgressBar/ProgressBar';
import { SearchPanelStyled } from './SearchPanel.styled';

interface SearchPanelProps {
  className?: string;
  title: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputValue: string;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  info?: string;
  placeholder?: string;
  buttonText: string;
  searchFoodCb?: (searchType: SearchFoodMethod, page?: number) => Promise<void>;
  searchWeatherCb?: (
    params: WeatherCordsParams | WeatherCityNameParams,
    dataType?: 'getCityName' | 'getWeather',
  ) => Promise<void>;
}

const SearchPanel = forwardRef(
  (
    {
      title,
      className,
      setInputValue,
      inputValue,
      errorMessage,
      setErrorMessage,
      isLoading,
      info,
      placeholder,
      buttonText,
      searchFoodCb,
      searchWeatherCb,
    }: SearchPanelProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const handleInputSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

    const handleSearch = () => {
      searchFoodCb && searchFoodCb('searchByPhrase');
      searchWeatherCb && searchWeatherCb({ q: inputValue });
    };

    useEffect(() => {
      const timeout = setTimeout(() => {
        setErrorMessage('');
      }, 2500);

      return () => clearTimeout(timeout);
    }, [errorMessage, setErrorMessage]);

    return (
      <SearchPanelStyled className={className} ref={ref}>
        <h2>{title}</h2>
        <label htmlFor="searchLabel">
          <SearchIcon />
          <input
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder={placeholder}
            type="text"
            onChange={(e) => handleInputSearchChange(e)}
            value={inputValue}
          />
        </label>
        <Button handleClick={handleSearch}>{buttonText}</Button>
        {errorMessage && <ErrorMessage className="errorMessage" errorMessage={errorMessage} />}
        {info && <p className="info">{info}</p>}
        {isLoading && <ProgressBar className="progressBar" />}
      </SearchPanelStyled>
    );
  },
);

export default SearchPanel;

SearchPanel.defaultProps = {
  searchFoodCb: undefined,
  searchWeatherCb: undefined,
  placeholder: undefined,
  info: undefined,
  className: undefined,
};
