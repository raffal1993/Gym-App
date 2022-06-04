import Button from 'components/Atoms/Buttons/CustomButton/CustomButton';
import React, { forwardRef, Ref, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { SearchFoodMethod } from 'components/Organisms/Food/FoodTypes';
import ErrorMessage from 'components/Atoms/ErrorMessage/ErrorMessage';
import Spinner from 'components/Atoms/Spinner/Spinner';
import { SearchPanelStyled } from './SearchPanel.styled';

interface SearchPanelProps {
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
}

const SearchPanel = forwardRef(
  (
    {
      title,
      setInputValue,
      inputValue,
      errorMessage,
      setErrorMessage,
      isLoading,
      info,
      placeholder,
      buttonText,
      searchFoodCb,
    }: SearchPanelProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const handleInputSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

    const handleSearch = () => {
      searchFoodCb && searchFoodCb('searchByPhrase');
    };

    useEffect(() => {
      const timeout = setTimeout(() => {
        setErrorMessage('');
      }, 2500);

      return () => clearTimeout(timeout);
    }, [errorMessage, setErrorMessage]);

    return (
      <SearchPanelStyled ref={ref}>
        <h1>{title}</h1>
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
        {isLoading && <Spinner />}
        {errorMessage && <ErrorMessage className="errorMessage" errorMessage={errorMessage} />}
        {info && <p className="info">{info}</p>}
      </SearchPanelStyled>
    );
  },
);

export default SearchPanel;

SearchPanel.defaultProps = {
  searchFoodCb: undefined,
  placeholder: undefined,
  info: undefined,
};
