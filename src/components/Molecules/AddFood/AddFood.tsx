import { FC } from 'react';
import CustomButton from 'components/Commons/Buttons/CustomButton/CustomButton';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setModalClose, setModalOpen } from 'app/slices/interfaceSlice';
import { MAX_CARDS } from 'utils/staticVariables/maxElements';
import { addFoodSetToDB } from 'firebase-cfg/database/food/add';
import AddIcon from '@mui/icons-material/Add';
import { FoodCardInfo } from 'components/Organisms/Food/FoodTypes';
import { AddButtonsStyled } from './AddFood.styled';
import AddEditNameModal from '../Modals/AddEditNameModal/AddEditNameModal';
import AddCustomFoodModal from '../Modals/AddCustomFoodModal/AddCustomFoodModal';

interface AddFoodProps {
  cards: FoodCardInfo[];
}

const AddFood: FC<AddFoodProps> = ({ cards }) => {
  const dispatch = useAppDispatch();

  const {
    pages: { subPageID, sidebarList },
    interface: { isSidebarItemSelected },
  } = useAppSelector((state) => state);

  const addFoodSet = (newName: string) => {
    if (subPageID) addFoodSetToDB(subPageID, newName);
    dispatch(setModalClose());
  };

  const handleAddFoodSetModal = () => {
    dispatch(
      setModalOpen(
        <AddEditNameModal
          updateDbCallback={addFoodSet}
          title="Enter Food Set name: "
          buttonText="Add Food Set"
        />,
      ),
    );
  };

  const handleAddCustomFoodModal = () => {
    dispatch(setModalOpen(<AddCustomFoodModal subPageID={subPageID} cards={cards} />));
  };
  return (
    <AddButtonsStyled>
      <CustomButton
        disabled={cards.length >= MAX_CARDS || sidebarList.length <= 0 || !isSidebarItemSelected}
        className="addFoodSetButton addButton"
        handleClick={handleAddFoodSetModal}
      >
        <AddIcon />
        Add Food Set
      </CustomButton>
      <CustomButton
        disabled={cards.length === 0}
        className="addCustomFoodButton addButton"
        handleClick={handleAddCustomFoodModal}
      >
        <AddIcon />
        Add Custom Food
      </CustomButton>
    </AddButtonsStyled>
  );
};

export default AddFood;
