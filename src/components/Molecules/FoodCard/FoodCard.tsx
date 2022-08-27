import { FC } from 'react';
import { FoodCardDB } from 'components/Organisms/Food/FoodTypes';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { setModalOpen } from 'app/slices/interfaceSlice';
import EditCardButton from 'components/Atoms/Buttons/EditCardButton/EditCardButton';
import { ReactComponent as MyIcon } from 'assets/images/404food.svg';
import { TitleStyled } from '../CardStyled/CardStyled.styled';
import FoodTable from '../FoodTable/FoodTable';
import { Wrapper } from './FoodCard.styled';
import EditFoodSetModal from '../Modals/EditFoodSetModal/EditFoodSetModal';

const FoodCard: FC<{ foodCard: FoodCardDB }> = ({ foodCard }) => {
  const {
    interface: { isEditModeOn },
  } = useAppSelector((state: RootState) => state);

  const dispatch = useAppDispatch();

  const handleOpenModal = () => {
    dispatch(setModalOpen(<EditFoodSetModal foodCardID={foodCard.foodCardID} />));
  };
  return (
    <Wrapper>
      {isEditModeOn && <EditCardButton onClick={handleOpenModal}></EditCardButton>}
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
