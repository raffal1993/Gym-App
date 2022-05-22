import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import SearchIcon from '@mui/icons-material/Search';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import CustomButton from 'components/Atoms/Buttons/CustomButton/CustomButton';
import { v4 as uuid4 } from 'uuid';
import FoodCard from 'components/Molecules/FoodCard/FoodCard';
import SearchFood from 'components/Molecules/SearchFood/SearchFood';
import { auth, db } from 'firebase-cfg/firebase-config';
import AddFood from 'components/Molecules/AddFood/AddFood';
import { sortedArrayByTimestamp } from 'helpers/sortArrayByTimestamp';
import { onValue, ref } from 'firebase/database';
import { ScrollTopStyled, Wrapper } from './Food.styled';
import { FoodCardDB, NutrientsDB } from './FoodProps';

const Food = () => {
  const [isScrollTopIconVisible, setIsScrollTopIconVisible] = useState(false);
  const [isSearchModeOn, setIsSearchModeOn] = useState(false);
  const [foodCards, setFoodCards] = useState<FoodCardDB[]>([]);

  const {
    interface: { isEditModeOn },
    pages: { subPageID },
  } = useAppSelector((state: RootState) => state);

  const divRef = useRef<HTMLDivElement>(null);

  const handleScrollTop = () => {
    if (divRef.current && divRef.current.parentElement)
      divRef.current.parentElement.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchMode = () => {
    setIsSearchModeOn(!isSearchModeOn);
  };

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    const dbRef = ref(db, `users/${uid}/food/${subPageID}`);

    return onValue(dbRef, (snapshot) => {
      if (uid && subPageID) {
        const data = snapshot.val();

        if (data) {
          const newArr = [] as FoodCardDB[];
          for (const key in data) {
            if (typeof data[key] === 'object') {
              const { foodSet }: { foodSet: NutrientsDB[] } = data[key];
              const sortedFoodSet = foodSet === undefined ? [] : sortedArrayByTimestamp(foodSet);

              newArr.push({
                foodCardID: key,
                timestamp: data[key].timestamp,
                name: data[key].name,
                foodSet: sortedFoodSet,
              });
            }
          }

          const sortedFoodCards = sortedArrayByTimestamp(newArr);
          setFoodCards(sortedFoodCards);
        }
      }
    });
  }, [subPageID]);

  useLayoutEffect(() => {
    const currentRef = divRef.current;
    const isRefExisting = currentRef && currentRef.parentElement;
    let timeout: NodeJS.Timeout;

    function listener() {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (isRefExisting) {
          setIsScrollTopIconVisible(
            currentRef.parentElement.scrollTop > currentRef.parentElement.clientHeight || false,
          );
        }
      }, 100);
    }

    if (isRefExisting) currentRef.parentElement.addEventListener('scroll', listener);

    return () => {
      clearTimeout(timeout);
      if (isRefExisting) {
        currentRef.parentElement.removeEventListener('scroll', listener);
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
          }))}
        />
      )}
      {isSearchModeOn && <SearchFood foodCards={foodCards} />}
      {foodCards.map((foodCard) => (
        <FoodCard key={uuid4()} foodCard={foodCard} />
      ))}

      <ScrollTopStyled is_visible={isScrollTopIconVisible.toString()} onClick={handleScrollTop}>
        <ArrowCircleUpIcon />
      </ScrollTopStyled>
    </Wrapper>
  );
};

export default Food;
