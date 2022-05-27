import { FC } from 'react';
import CustomButton from 'components/Atoms/Buttons/CustomButton/CustomButton';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setModalClose, setModalOpen } from 'app/slices/interfaceSlice';
import { addFoodSetToDB } from 'firebase-cfg/database/food/add';
import { RootState } from 'app/store';
import AddIcon from '@mui/icons-material/Add';
import { FoodIdName } from 'components/Organisms/Food/FoodTypes';
import { AddButtonsStyled } from './AddFood.styled';
import AddEditNameModal from '../Modals/AddEditNameModal/AddEditNameModal';
import AddCustomFoodModal from '../Modals/AddCustomFoodModal/AddCustomFoodModal';

const AddFood: FC<{ cards: FoodIdName[] }> = ({ cards }) => {
  const dispatch = useAppDispatch();

  const {
    pages: { subPageID },
  } = useAppSelector((state: RootState) => state);

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

  const handleAddCustomFoodtModal = () => {
    dispatch(setModalOpen(<AddCustomFoodModal subPageID={subPageID || ''} cards={cards} />));
  };

  return (
    <AddButtonsStyled>
      <CustomButton className="addFoodSetButton addButton" handleClick={handleAddFoodSetModal}>
        <AddIcon />
        Add Food Set
      </CustomButton>
      {!(cards.length === 0 || cards === undefined) && (
        <CustomButton
          className="addCustomFoodButton addButton"
          handleClick={handleAddCustomFoodtModal}
        >
          <AddIcon />
          Add Custom Food
        </CustomButton>
      )}
    </AddButtonsStyled>
  );
};

export default AddFood;
