import { memo, useState } from 'react';
import CustomizedSnackbars from 'components/Atoms/Snackbar/CustomizedSnackbars';
import { SearchResultsProps } from 'components/Organisms/Food/FoodTypes';
import { v4 as uuid4 } from 'uuid';
import SearchFoodItem from '../SearchFoodItem/SearchFoodItem';
import { SearchingResultsStyled } from './SearchResults.styled';

const SearchResults = memo(({ searchResults, foodCards }: SearchResultsProps) => {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  return (
    <SearchingResultsStyled>
      {searchResults.map(({ label, nutrients, image }) => (
        <SearchFoodItem
          setOpenSnackbar={setOpenSnackbar}
          foodCards={foodCards}
          key={uuid4()}
          label={label}
          nutrients={nutrients}
          image={image || ''}
        />
      ))}
      <CustomizedSnackbars open={openSnackbar} setOpen={setOpenSnackbar}>
        Added to Food Set!
      </CustomizedSnackbars>
    </SearchingResultsStyled>
  );
});

export default SearchResults;
