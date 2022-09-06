import { FC } from 'react';
import { FoodCardDB } from 'components/Organisms/Food/FoodTypes';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setModalOpen } from 'app/slices/interfaceSlice';
import EditCardButton from 'components/Commons/Buttons/EditCardButton/EditCardButton';
import { ReactComponent as MyIcon } from 'assets/images/404food.svg';
import { TitleStyled } from '../CardStyled/CardStyled.styled';
import FoodTable from '../FoodTable/FoodTable';
import { Wrapper } from './FoodCard.styled';
import EditFoodSetModal from '../Modals/EditFoodSetModal/EditFoodSetModal';

interface FoodCardProps {
  foodCard: FoodCardDB;
}

const FoodCard: FC<FoodCardProps> = (props) => {
  const {
    foodCard: { foodCardID, foodSet, name },
  } = props;

  const {
    interface: { isEditModeOn },
  } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  const handleOpenModal = () => {
    dispatch(setModalOpen(<EditFoodSetModal foodCardID={foodCardID} />));
  };
  return (
    <Wrapper>
      {isEditModeOn && <EditCardButton onClick={handleOpenModal}></EditCardButton>}
      <TitleStyled className="mainTitle">{name}</TitleStyled>
      {foodSet.length > 0 ? <FoodTable foodCardID={foodCardID} /> : <MyIcon className="noFood" />}
    </Wrapper>
  );
};

export default FoodCard;
