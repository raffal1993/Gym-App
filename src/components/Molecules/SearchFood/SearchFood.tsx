import { FoodApiInstance } from 'api/FoodAPI/instance';
import Button from 'components/Atoms/Buttons/CustomButton/CustomButton';
import { setURL } from 'helpers/setURL';
import { useEffect, useState } from 'react';
import { SearchResultProps } from 'components/Organisms/Food/FoodProps';
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

const SearchFood = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [searchingName, setSearchingName] = useState<string>('');
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchResults, setSearchResults] = useState<SearchResultProps[]>([]);
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
            ({ food: { image, label, nutrients } }: { food: SearchResultProps }) => ({
              label: label || '???',
              image: image || '',
              nutrients: {
                ENERC_KCAL: nutrients.ENERC_KCAL || 0,
                FAT: nutrients.FAT || 0,
                CHOCDF: nutrients.CHOCDF || 0,
                PROCNT: nutrients.PROCNT || 0,
                FIBTG: nutrients.FIBTG || 0,
              },
            }),
          );
          if (!foods.length) setErrorMessage('No results found');
          setSearchResults(foods);
        })
        .catch(() => setErrorMessage('An error has occurred'))
        .finally(() => setIsLoading(false));
      setSearchingName(inputValue);
    }
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setErrorMessage('');
    }, 2500);

    return () => clearTimeout(timeout);
  }, [errorMessage]);

  const handlePageChange = () => {
    if (searchingName)
      FoodApiInstance.get(`${setURL(searchingName, pageNumber)}`)
        .then((res) => console.log(res.data.hints))
        .catch((err) => console.log(err));
  };

  return (
    <Wrapper>
      <SearchBarStyled>
        <h1>Search for food: </h1>
        <label htmlFor="searchFood">
          <SearchIcon />
          <input
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
            <SearchFoodItem key={uuid4()} label={label} nutrients={nutrients} image={image || ''} />
          ))}
        </SearchingResultsStyled>
      )}
    </Wrapper>
  );
};

export default SearchFood;