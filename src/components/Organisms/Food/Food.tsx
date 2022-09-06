import { memo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import SearchIcon from '@mui/icons-material/Search';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import CustomButton from 'components/Commons/Buttons/CustomButton/CustomButton';
import { v4 as uuid4 } from 'uuid';
import FoodCard from 'components/Molecules/FoodCard/FoodCard';
import { foodCardsDBListener } from 'firebase-cfg/database/food/listeners';
import { setFoodCards } from 'app/slices/foodSlice';
import SearchFood from 'components/Molecules/SearchFood/SearchFood';
import AddFood from 'components/Molecules/AddFood/AddFood';
import { ScrollTopStyled, Wrapper } from './Food.styled';
import { FoodCardDB } from './FoodTypes';

const Food = memo(() => {
  const [isSearchModeOn, setIsSearchModeOn] = useState(false);

  const {
    interface: { isEditModeOn },
    pages: { subPageID },
    food: { foodCards },
  } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  const divRef = useRef<HTMLDivElement>(null);

  const scrollTopRef = useRef<HTMLDivElement>(null);

  const handleScrollTop = () => {
    if (divRef.current && divRef.current.parentElement)
      divRef.current.parentElement.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchMode = () => {
    setIsSearchModeOn(!isSearchModeOn);
  };

  useEffect(() => {
    const dispatcher = (foodCards: FoodCardDB[]) => dispatch(setFoodCards(foodCards));
    return foodCardsDBListener(subPageID, dispatcher);
  }, [subPageID, dispatch]);

  useEffect(() => {
    setIsSearchModeOn(false);
  }, [subPageID]);

  useLayoutEffect(() => {
    const currentDivRef = divRef.current;
    const currentScrollTopRef = scrollTopRef.current;

    const isRefExisting = currentDivRef && currentDivRef.parentElement && currentScrollTopRef;
    let timeout: NodeJS.Timeout;

    function listener() {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (isRefExisting) {
          currentScrollTopRef.style.transform =
            currentDivRef.parentElement.scrollTop > currentDivRef.parentElement.clientHeight
              ? 'scale(1)'
              : 'scale(0)';
        }
      }, 100);
    }

    if (isRefExisting) currentDivRef.parentElement.addEventListener('scroll', listener);

    return () => {
      clearTimeout(timeout);
      if (isRefExisting) {
        currentDivRef.parentElement.removeEventListener('scroll', listener);
      }
    };
  }, []);

  return (
    <Wrapper ref={divRef}>
      <CustomButton className="searchFoodButton" handleClick={handleSearchMode}>
        <SearchIcon />
      </CustomButton>
      {isEditModeOn && (
        <AddFood
          cards={foodCards.map((card) => ({
            foodCardID: card.foodCardID,
            name: card.name,
            foodSet: card.foodSet,
          }))}
        />
      )}
      {isSearchModeOn && <SearchFood foodCards={foodCards} />}
      {foodCards.map((foodCard) => (
        <FoodCard key={uuid4()} foodCard={foodCard} />
      ))}
      <ScrollTopStyled ref={scrollTopRef} onClick={handleScrollTop}>
        <ArrowCircleUpIcon />
      </ScrollTopStyled>
    </Wrapper>
  );
});

export default Food;
