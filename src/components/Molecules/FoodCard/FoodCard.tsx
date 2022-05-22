import { FC } from 'react';
import { FoodCardDB } from 'components/Organisms/Food/FoodProps';
import { ReactComponent as MyIcon } from 'assets/images/404food.svg';
import { TitleStyled } from '../CardStyled/CardStyled.styled';
import FoodTable from '../FoodTable/FoodTable';
import { Wrapper } from './FoodCard.styled';

const FoodCard: FC<{ foodCard: FoodCardDB }> = ({ foodCard }) => {
  return (
    <Wrapper>
      <TitleStyled className="mainTitle">{foodCard.name}</TitleStyled>
      {foodCard.foodSet.length > 0 ? (
        <FoodTable foodSet={foodCard.foodSet} />
      ) : (
        <MyIcon className="noFood" />
      )}
    </Wrapper>
  );
};

export default FoodCard;
