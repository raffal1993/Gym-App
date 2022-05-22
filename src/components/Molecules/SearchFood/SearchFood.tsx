import { FoodApiInstance } from 'api/FoodAPI/instance';
import Button from 'components/Atoms/Buttons/CustomButton/CustomButton';
import { setURL } from 'helpers/setURL';
import { FC, useEffect, useState } from 'react';
import {
  FoodCardDB,
  NutrientsTypes,
  FoodDB,
  SearchFoodItemTypes,
} from 'components/Organisms/Food/FoodProps';
import { v4 as uuid4 } from 'uuid';
import SearchIcon from '@mui/icons-material/Search';
import ErrorMessage from 'components/Atoms/ErrorMessage/ErrorMessage';
import Spinner from 'components/Atoms/Spinner/Spinner';
import SearchFoodItem from '../SearchFoodItem/SearchFoodItem';
import { Wrapper, SearchBarStyled, SearchingResultsStyled } from './SearchFood.styled';

const INPUTS = {
  search: 'search',
  page: 'page',
};

const SearchFood: FC<{ foodCards: FoodCardDB[] }> = ({ foodCards }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchResults, setSearchResults] = useState<SearchFoodItemTypes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.getAttribute('data-type') === INPUTS.search) setInputValue(e.target.value);
    if (e.target.getAttribute('data-type') === INPUTS.page) setPageNumber(Number(e.target.value));
  };

  const handleSearchFood = async () => {
    setErrorMessage('');
    if (inputValue) {
      setIsLoading(true);
      await FoodApiInstance.get(`${setURL(inputValue, pageNumber)}`)
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
        .catch(() => setErrorMessage('An error has occurred'))
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
            onKeyPress={(e) => e.key === 'Enter' && handleSearchFood()}
            placeholder="(english only)"
            type="text"
            data-type={INPUTS.search}
            onChange={(e) => onInputChange(e)}
            value={inputValue}
          />
        </label>
        <Button handleClick={handleSearchFood}>Search Food</Button>
        {isLoading && <Spinner />}
        {errorMessage && <ErrorMessage className="errorMessage" errorMessage={errorMessage} />}
        <p className="info">All nutrition information is provided per 100 grams of product</p>
      </SearchBarStyled>
      {!!searchResults.length && (
        <SearchingResultsStyled>
          {searchResults.map(({ label, nutrients, image }) => (
            <SearchFoodItem
              foodCards={foodCards}
              key={uuid4()}
              label={label}
              nutrients={nutrients}
              image={image || ''}
            />
          ))}
        </SearchingResultsStyled>
      )}
    </Wrapper>
  );
};

export default SearchFood;
