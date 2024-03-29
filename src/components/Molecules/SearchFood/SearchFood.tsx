import { ChangeEvent, FC, useRef, useState } from 'react';
import { FoodApiInstance } from 'api/FoodAPI/instance';
import Button from 'components/Commons/Buttons/CustomButton/CustomButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
  FoodCardDB,
  NutrientsTypes,
  FoodDB,
  SearchFoodItemTypes,
  SearchFoodMethod,
} from 'components/Organisms/Food/FoodTypes';
import SearchFoodResults from 'components/Molecules/SearchFoodResults/SearchFoodResults';
import { Wrapper, PaginationStyled } from './SearchFood.styled';
import SearchPanel from '../SearchPanel/SearchPanel';

interface SearchfoodProps {
  foodCards: FoodCardDB[];
}

const SearchFood: FC<SearchfoodProps> = ({ foodCards }) => {
  const [inputValue, setInputValue] = useState('');
  const [searchingPhrase, setSearchingPhrase] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [searchResults, setSearchResults] = useState<SearchFoodItemTypes[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const searchResultsRef = useRef<HTMLDivElement>(null);

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
    }

    if (validation) {
      setIsLoading(true);

      page = page <= 0 ? 1 : page;

      const params = { ingr: searchingValue, session: page * 20 - 20 };

      await FoodApiInstance.get('', { params })
        .then((res) => {
          const foods = res.data.hints.map(({ food }: { food: FoodDB }) => {
            const { image, label, nutrients } = food;

            return {
              label: label || '???',
              image: image || '',
              nutrients: {
                kcal: nutrients.ENERC_KCAL?.toFixed(1).toString() || '(?)',
                fat: nutrients.FAT?.toFixed(1).toString() || '(?)',
                carbs: nutrients.CHOCDF?.toFixed(1).toString() || '(?)',
                protein: nutrients.PROCNT?.toFixed(1).toString() || '(?)',
                fiber: nutrients.FIBTG?.toFixed(1).toString() || '(?)',
              } as NutrientsTypes,
            };
          });
          if (foods.length === 0) setErrorMessage('No results found');
          setSearchResults(foods);
        })
        .catch(() => {
          setErrorMessage('An error has occurred');
          setPageNumber(1);
        })
        .finally(() => {
          setIsLoading(false);
          if (searchResultsRef.current) {
            searchResultsRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        });
    }
  };
  return (
    <Wrapper>
      <SearchPanel
        title="Search for food: "
        setInputValue={setInputValue}
        inputValue={inputValue}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        isLoading={isLoading}
        info="All nutrition information is provided per 100 grams of product"
        placeholder="(english only)"
        buttonText="Search Food"
        searchFoodCb={handleSearchFood}
        ref={searchResultsRef}
      />
      {searchResults.length !== 0 && (
        <>
          <SearchFoodResults
            isLoading={isLoading}
            foodCards={foodCards}
            searchResults={searchResults}
          />
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
                onKeyPress={(e) =>
                  e.key === 'Enter' && handleSearchFood('searchByPageNumber', Number(pageNumber))
                }
              />
              <Button
                data-testid="goToPageButton"
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
