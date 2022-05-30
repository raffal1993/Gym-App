import { FoodApiInstance } from 'api/FoodAPI/instance';
import Button from 'components/Atoms/Buttons/CustomButton/CustomButton';
import { setURL } from 'helpers/setURL';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import {
  FoodCardDB,
  NutrientsTypes,
  FoodDB,
  SearchFoodItemTypes,
} from 'components/Organisms/Food/FoodTypes';
import SearchIcon from '@mui/icons-material/Search';
import ErrorMessage from 'components/Atoms/ErrorMessage/ErrorMessage';
import Spinner from 'components/Atoms/Spinner/Spinner';
import { Wrapper, SearchBarStyled, PaginationStyled } from './SearchFood.styled';
import SearchResult from '../SearchResults/SearchResults';

type SearchFoodMethod = 'searchByPageNumber' | 'searchByPhrase';
interface SearchFoodProps {
  handleScrollTop: () => void;
  foodCards: FoodCardDB[];
}

const SearchFood: FC<SearchFoodProps> = ({ foodCards, handleScrollTop }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [searchingPhrase, setSearchingPhrase] = useState<string>('');
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchResults, setSearchResults] = useState<SearchFoodItemTypes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputPageChange = (e: ChangeEvent<HTMLInputElement>) => {
    let { value } = e.currentTarget;
    value = value.toString();

    let newValue = value[0] === '0' && value.length > 1 ? value.slice(1) : value;
    newValue = Number(newValue) < 0 ? '1' : newValue;

    setPageNumber(Number(newValue));
  };

  const handleSearchFood = async (searchType: SearchFoodMethod, page: number = 1) => {
    setErrorMessage('');
    let validation = false;
    let searchingValue = '';

    if (searchType === 'searchByPhrase' && inputValue) {
      setSearchingPhrase(inputValue);
      setPageNumber(1);
      validation = true;
      searchingValue = inputValue;
    }

    if (searchType === 'searchByPageNumber' && searchingPhrase) {
      page === 0 ? setPageNumber(1) : setPageNumber(page);
      validation = true;
      searchingValue = searchingPhrase;
      handleScrollTop();
    }

    if (validation) {
      setIsLoading(true);
      await FoodApiInstance.get(`${setURL(searchingValue, page)}`)
        .then((res) => {
          const foods = res.data.hints.map(
            ({ food: { image, label, nutrients } }: { food: FoodDB }) => ({
              label: label || '???',
              image: image || '',
              nutrients: {
                kcal: nutrients.ENERC_KCAL?.toFixed(1).toString() || '(?)',
                fat: nutrients.FAT?.toFixed(1).toString() || '(?)',
                carbs: nutrients.CHOCDF?.toFixed(1).toString() || '(?)',
                protein: nutrients.PROCNT?.toFixed(1).toString() || '(?)',
                fiber: nutrients.FIBTG?.toFixed(1).toString() || '(?)',
              } as NutrientsTypes,
            }),
          );
          if (!foods.length) setErrorMessage('No results found');

          setSearchResults(foods);
        })
        .catch(() => {
          setErrorMessage('An error has occurred');
          setPageNumber(1);
        })
        .finally(() => setIsLoading(false));
    }
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setErrorMessage('');
    }, 2500);

    return () => clearTimeout(timeout);
  }, [errorMessage]);

  return (
    <Wrapper>
      <SearchBarStyled>
        <h1>Search for food: </h1>
        <label htmlFor="searchFood">
          <SearchIcon />
          <input
            ref={inputRef}
            onKeyPress={(e) => e.key === 'Enter' && handleSearchFood('searchByPhrase')}
            placeholder="(english only)"
            type="text"
            onChange={(e) => handleInputSearchChange(e)}
            value={inputValue}
          />
        </label>
        <Button handleClick={() => handleSearchFood('searchByPhrase')}>Search Food</Button>
        {isLoading && <Spinner />}
        {errorMessage && <ErrorMessage className="errorMessage" errorMessage={errorMessage} />}
        <p className="info">All nutrition information is provided per 100 grams of product</p>
      </SearchBarStyled>
      {searchResults.length !== 0 && (
        <>
          <SearchResult isLoading={isLoading} foodCards={foodCards} searchResults={searchResults} />
          <PaginationStyled>
            <Button
              disabled={pageNumber <= 1}
              className="button prevButton"
              handleClick={() => handleSearchFood('searchByPageNumber', Number(pageNumber) - 1)}
            >
              <ArrowBackIosNewIcon />
              prev page
            </Button>

            <div className="goToPage">
              <input
                type="number"
                value={pageNumber.toString()}
                onChange={(e) => handleInputPageChange(e)}
              />
              <Button
                className="button pageButton"
                handleClick={() => handleSearchFood('searchByPageNumber', Number(pageNumber))}
              >
                <ArrowForwardIosIcon />
              </Button>
            </div>
            <Button
              className="button nextButton"
              handleClick={() => handleSearchFood('searchByPageNumber', Number(pageNumber) + 1)}
            >
              next page
              <ArrowForwardIosIcon />
            </Button>
          </PaginationStyled>
        </>
      )}
    </Wrapper>
  );
};

export default SearchFood;
