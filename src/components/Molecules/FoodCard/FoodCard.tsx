import { TitleStyled } from '../CardStyled/CardStyled.styled';
import FoodTable from '../FoodTable/FoodTable';
import { Wrapper } from './FoodCard.styled';

const FoodCard = () => {
  return (
    <Wrapper>
      <TitleStyled className="mainTitle">Śniadanie</TitleStyled>
      <FoodTable />
    </Wrapper>
  );
};

export default FoodCard;
