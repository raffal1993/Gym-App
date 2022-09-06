import { useAppSelector } from 'app/hooks';
import { NutrientsDB } from 'components/Organisms/Food/FoodTypes';
import useResize from 'hooks/useResize';
import { FC, useEffect, useState } from 'react';
import FoodTableDesktop from '../FoodTableDesktop/FoodTableDesktop';
import FoodTableMobile from '../FoodTableMobile/FoodTableMobile';
import { Wrapper } from './FoodTable.styled';

interface FoodTableProps {
  foodCardID: String;
}

const FoodTable: FC<FoodTableProps> = ({ foodCardID }) => {
  const [foodSet, setFoodSet] = useState<NutrientsDB[]>([]);
  const { isWidthSmaller } = useResize('xs');

  const {
    food: { foodCards },
  } = useAppSelector((state) => state);

  useEffect(() => {
    const foodSet = foodCards.find((card) => card.foodCardID === foodCardID)?.foodSet || [];
    setFoodSet(foodSet);
  }, [foodCardID, foodCards]);

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
