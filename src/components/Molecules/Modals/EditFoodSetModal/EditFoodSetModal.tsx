import { FC, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { v4 as uuid4 } from 'uuid';
import { FoodIdName, FoodCardDB } from 'components/Organisms/Food/FoodTypes';
import { foodCardsDBListener } from 'firebase-cfg/database/food/listeners';
import { updateFoodSetName } from 'firebase-cfg/database/food/update';
import { setModalClose } from 'app/slices/interfaceSlice';

import { removeFoodItem, removeFoodSet } from 'firebase-cfg/database/food/remove';
import {
  ConfirmationButtonStyled,
  NameStyled,
  RemoveButtonStyled,
  RemoveCardButtonStyled,
} from '../Modals.styled';
import { Wrapper } from './EditFoodSetModal.styled';
import AddEditNameModal from '../AddEditNameModal/AddEditNameModal';

let timeout: NodeJS.Timeout;

const EditFoodSetModal: FC<FoodIdName> = ({ foodCardID, name }) => {
  const [foodCard, setFoodCard] = useState<FoodCardDB[]>([]);
  const [isFoodCardNameActive, setIsFoodCardNameActive] = useState<boolean>(false);
  const [confirmItems, setConfirmItems] = useState<string[]>([]);

  const {
    pages: { subPageID },
  } = useAppSelector((state: RootState) => state);

  const dispatch = useAppDispatch();

  const handleActivateChangeName = () => {
    setIsFoodCardNameActive(!isFoodCardNameActive);
  };

  const handleChangeName = (newName: string) => {
    if (subPageID) {
      updateFoodSetName(subPageID, foodCardID, newName);
      setIsFoodCardNameActive(false);
    }
  };

  const handleRemoveFoodItem = (id: string) => {
    if (subPageID) removeFoodItem(subPageID, foodCardID, id);
  };

  const handleRemoveFoodSet = () => {
    if (subPageID) removeFoodSet(subPageID, foodCardID);
    dispatch(setModalClose());
  };

  const handleConfirmations = (index: string) => {
    if (confirmItems.includes(index)) return;
    setConfirmItems([...confirmItems, index]);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setConfirmItems([]);
    }, 2500);
  };

  useEffect(() => {
    return foodCardsDBListener(subPageID, setFoodCard, foodCardID);
  }, [subPageID, foodCardID]);

  useEffect(() => {
    timeout = setTimeout(() => {
      setConfirmItems([]);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Wrapper>
      <div className="foodSetName">
        <NameStyled
          className={`name ${isFoodCardNameActive && `active`}`}
          onClick={handleActivateChangeName}
        >
          {foodCard.length !== 0 && foodCard[0].name}
        </NameStyled>
      </div>
      <ul className="foodList">
        {foodCard.length !== 0 &&
          foodCard[0].foodSet.map((set) => (
            <li key={uuid4()}>
              <RemoveButtonStyled onClick={() => handleConfirmations(set.id)}>
                <CloseIcon />
              </RemoveButtonStyled>
              {confirmItems.includes(set.id) && (
                <ConfirmationButtonStyled onClick={() => handleRemoveFoodItem(set.id)}>
                  confirm
                </ConfirmationButtonStyled>
              )}
              <span className="name">{set.name}</span>
            </li>
          ))}
      </ul>
      {isFoodCardNameActive && (
        <AddEditNameModal
          buttonText="Change name"
          title="Enter new Food Set name: "
          updateDbCallback={handleChangeName}
        />
      )}
      {confirmItems.includes(foodCardID) ? (
        <RemoveCardButtonStyled onClick={handleRemoveFoodSet}>ARE YOU SURE?</RemoveCardButtonStyled>
      ) : (
        <RemoveCardButtonStyled onClick={() => handleConfirmations(foodCardID)}>
          Remove {`"${name}" ?`}
        </RemoveCardButtonStyled>
      )}
    </Wrapper>
  );
};

export default EditFoodSetModal;
