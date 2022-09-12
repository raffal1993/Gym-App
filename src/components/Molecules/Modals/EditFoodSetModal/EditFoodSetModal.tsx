import { FC, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { v4 as uuid4 } from 'uuid';
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
import { EditFoodSetModalProps } from '../ModalsTypes';

const initialTimer = setTimeout(() => {});

const EditFoodSetModal: FC<EditFoodSetModalProps> = ({ foodCardID }) => {
  const [isFoodCardNameActive, setIsFoodCardNameActive] = useState(false);
  const [confirmItems, setConfirmItems] = useState<string[]>([]);
  const [timer, setTimer] = useState<NodeJS.Timeout>(initialTimer);

  const {
    pages: { subPageID },
    food: { foodCards },
  } = useAppSelector((state) => state);

  const foodCardsDisplayed = foodCards !== null ? foodCards : [];
  const foodCard = foodCardsDisplayed.find((card) => card.foodCardID === foodCardID);

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
    clearTimeout(timer);
    setConfirmItems([]);
  };

  const handleRemoveFoodSet = () => {
    if (subPageID) removeFoodSet(subPageID, foodCardID);
    dispatch(setModalClose());
  };

  const handleConfirmations = (index: string) => {
    if (confirmItems.includes(index)) return;
    setConfirmItems([...confirmItems, index]);
    clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        setConfirmItems([]);
      }, 2500),
    );
  };

  useEffect(() => {
    return () => clearTimeout(timer);
  });

  return (
    <Wrapper>
      <div className="foodSetName">
        <NameStyled
          className={`name ${isFoodCardNameActive && `active`}`}
          onClick={handleActivateChangeName}
        >
          {foodCard && foodCard.name}
        </NameStyled>
      </div>
      <ul className="foodList">
        {foodCard &&
          foodCard.foodSet.map((set) => (
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
          Remove Food Set ?
        </RemoveCardButtonStyled>
      )}
    </Wrapper>
  );
};

export default EditFoodSetModal;
