import { useAppSelector } from 'app/hooks';
import useResize from 'hooks/useResize';
import { FC } from 'react';
import FoodTableMobile from 'components/Molecules/FoodTableMobile/FoodTableMobile';
import FoodTableDesktop from 'components/Molecules/FoodTableDesktop/FoodTableDesktop';
import { Wrapper } from './FoodTable.styled';

interface FoodTableProps {
  foodCardID: String;
}

const FoodTable: FC<FoodTableProps> = ({ foodCardID }) => {
  const {
    food: { foodCards },
  } = useAppSelector((state) => state);

  const { isWidthSmaller } = useResize('xs');

  const foodCardsDisplayed = foodCards !== null ? foodCards : [];

  const foodSet = foodCardsDisplayed.find((card) => card.foodCardID === foodCardID)?.foodSet || [];
  return (
    <Wrapper>
      {isWidthSmaller ? (
        <FoodTableMobile foodSet={foodSet} />
      ) : (
        <FoodTableDesktop foodSet={foodSet} />
      )}
    </Wrapper>
  );
};

export default FoodTable;
