import { memo, useMemo, useState } from 'react';
import CustomizedSnackbars from 'components/Commons/Snackbar/CustomizedSnackbars';
import { SearchResultsProps } from 'components/Organisms/Food/FoodTypes';
import { v4 as uuid4 } from 'uuid';
import SearchFoodItem from '../SearchFoodItem/SearchFoodItem';
import { SearchFoodResultsStyled } from './SearchFoodResults.styled';

const SearchFoodResults = memo(({ searchResults, foodCards, isLoading }: SearchResultsProps) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const SearchFoodItemMemoized = useMemo(() => {
    return searchResults.map(({ label, nutrients, image }) => (
      <SearchFoodItem
        isLoading={isLoading}
        setOpenSnackbar={setOpenSnackbar}
        foodCards={foodCards}
        key={uuid4()}
        label={label}
        nutrients={nutrients}
        image={image || ''}
      />
    ));
  }, [foodCards, isLoading, searchResults]);

  return (
    <SearchFoodResultsStyled>
      {SearchFoodItemMemoized}
      <CustomizedSnackbars open={openSnackbar} setOpen={setOpenSnackbar}>
        Added to Food Set!
      </CustomizedSnackbars>
    </SearchFoodResultsStyled>
  );
});

export default SearchFoodResults;
