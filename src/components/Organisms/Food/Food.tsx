import { useLayoutEffect, useRef, useState } from 'react';
import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import SearchIcon from '@mui/icons-material/Search';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import CustomButton from 'components/Atoms/Buttons/CustomButton/CustomButton';
import FoodCard from 'components/Molecules/FoodCard/FoodCard';
import SearchFood from 'components/Molecules/SearchFood/SearchFood';
import { ScrollTopStyled, Wrapper } from './Food.styled';

const Food = () => {
  const [isScrollTopIconVisible, setIsScrollTopIconVisible] = useState(false);
  const [isSearchModeOn, setIsSearchModeOn] = useState(false);

  const {
    interface: { isEditModeOn },
  } = useAppSelector((state: RootState) => state);

  const ref = useRef<HTMLDivElement>(null);

  const handleScrollTop = () => {
    if (ref.current && ref.current.parentElement)
      ref.current.parentElement.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchMode = () => {
    setIsSearchModeOn(!isSearchModeOn);
  };

  useLayoutEffect(() => {
    const currentRef = ref.current;
    const isRefExisting = currentRef && currentRef.parentElement;

    let timeout: NodeJS.Timeout;

    function listener() {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (isRefExisting) {
          setIsScrollTopIconVisible(
            currentRef.parentElement.scrollTop > currentRef.parentElement.clientHeight,
          );
        }
      }, 100);
    }

    if (isRefExisting) currentRef.parentElement.addEventListener('scroll', listener);

    return () => {
      if (isRefExisting) {
        currentRef.parentElement.removeEventListener('scroll', listener);
      }
    };
  }, []);

  return (
    <Wrapper ref={ref}>
      <CustomButton className="searchFoodButton" handleClick={handleSearchMode}>
        <SearchIcon />
      </CustomButton>
      {isSearchModeOn && <SearchFood />}
      <FoodCard />

      <ScrollTopStyled is_visible={isScrollTopIconVisible.toString()} onClick={handleScrollTop}>
        <ArrowCircleUpIcon />
      </ScrollTopStyled>
    </Wrapper>
  );
};

export default Food;
