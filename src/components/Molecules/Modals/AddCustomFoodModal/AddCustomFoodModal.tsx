import { useAppDispatch } from 'app/hooks';
import { setModalClose } from 'app/slices/interfaceSlice';
import ErrorMessage from 'components/Atoms/ErrorMessage/ErrorMessage';
import { TitleStyled } from 'components/Molecules/CardStyled/CardStyled.styled';
import { FoodIdName, NutrientsTypes } from 'components/Organisms/Food/FoodTypes';
import { addFoodToDB } from 'firebase-cfg/database/food/add';
import { countNutrientsByWeight } from 'helpers/countNutrientsByWeight';
import { filterNumberInputValue } from 'helpers/filterNumberInputValue';
import React, { ChangeEvent, FC, MouseEvent, useEffect, useState } from 'react';
import { v4 as uuid4 } from 'uuid';
import AddEditNameModal from '../AddEditNameModal/AddEditNameModal';
import { NameStyled } from '../Modals.styled';
import { EnterNutrientsStyled, PickFoodSetStyled, Wrapper } from './AddCustomFoodModal.styled';

const nutrients: (keyof NutrientsTypes)[] = ['weight', 'kcal', 'fat', 'carbs', 'protein', 'fiber'];

type NutrientsFocus = {
  [key in keyof NutrientsTypes]: boolean;
};

const initialFocuses: NutrientsFocus = {
  weight: false,
  kcal: false,
  fat: false,
  carbs: false,
  protein: false,
  fiber: false,
};

const initialInputValues: NutrientsTypes = {
  weight: '',
  kcal: '',
  fat: '',
  carbs: '',
  protein: '',
  fiber: '',
};

interface AddCustomFoodModalProps {
  cards: FoodIdName[];
  subPageID: string;
}

const AddCustomFoodModal: FC<AddCustomFoodModalProps> = ({ cards, subPageID }) => {
  const [nutrientsValue, setNutrientsValue] = useState(initialInputValues);
  const [focusOnInput, setFocusOnInput] = useState(initialFocuses);
  const [pickedFoodSetID, setPickedFoodSetID] = useState<string>('');
  const [nutrientsError, setNutrientsError] = useState<boolean>(false);
  const [pickFoodSetError, setPickFoodSetError] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputType = e.currentTarget.id as keyof NutrientsTypes;
    const { value } = e.currentTarget;

    if (Number(value) > 9999) return;

    const isTwoDigitsAfterDot = value.split('.').length === 2 && value.split('.')[1].length === 2;

    if (isTwoDigitsAfterDot) return;

    setNutrientsValue({
      ...nutrientsValue,
      [inputType]: filterNumberInputValue(value),
    });
    setFocusOnInput({ ...initialFocuses, [inputType]: true });
  };

  const handlePickFoodSet = (e: MouseEvent<HTMLSpanElement>, id: string) => {
    if (pickedFoodSetID === id) return setPickedFoodSetID('');
    setPickedFoodSetID(id);
  };

  const checkIfAllIsValid = () => {
    let isValidate = true;
    if (Object.values(nutrientsValue).includes('')) {
      setNutrientsError(true);
      isValidate = false;
    }
    if (pickedFoodSetID === '') {
      setPickFoodSetError(true);
      isValidate = false;
    }
    return isValidate;
  };

  const addCustomFood = (newName: string) => {
    if (subPageID) {
      addFoodToDB(subPageID, newName, pickedFoodSetID, countNutrientsByWeight(nutrientsValue));
      dispatch(setModalClose());
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNutrientsError(false);
      setPickFoodSetError(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [nutrientsError, pickFoodSetError]);

  return (
    <Wrapper>
      <TitleStyled className="newFoodTitle">New Food</TitleStyled>
      <EnterNutrientsStyled>
        {nutrients.map((nutrient, index) => {
          return (
            <React.Fragment key={uuid4()}>
              {index === 1 && <p className="info">Nutrients in 100g: </p>}
              <div className="insertNutrient">
                <p>{nutrient}</p>
                <input
                  min={0}
                  max={9999}
                  autoFocus={focusOnInput[nutrient] === true}
                  value={nutrientsValue[nutrient]}
                  onChange={(e) => handleInputChange(e)}
                  id={nutrient}
                  type="number"
                  placeholder={nutrient !== 'kcal' ? 'g' : ''}
                />
              </div>
            </React.Fragment>
          );
        })}
        {nutrientsError && (
          <ErrorMessage
            className="errorMessage"
            errorMessage="You must provide all nutrients !"
          ></ErrorMessage>
        )}
      </EnterNutrientsStyled>
      <PickFoodSetStyled>
        <TitleStyled className="chooseFoodTitle">Choose Food Set to put custom food: </TitleStyled>
        {cards.map((card) => (
          <NameStyled
            onClick={(e) => handlePickFoodSet(e, card.foodCardID)}
            className={`foodSet ${card.foodCardID === pickedFoodSetID && 'active'}`}
            key={uuid4()}
          >
            {card.name}
          </NameStyled>
        ))}
        {pickFoodSetError && (
          <ErrorMessage className="errorMessage" errorMessage="Pick a Food Set !"></ErrorMessage>
        )}
      </PickFoodSetStyled>
      <AddEditNameModal
        checkIfAllIsValid={checkIfAllIsValid}
        className="enterFoodName"
        updateDbCallback={addCustomFood}
        title="Enter Food name: "
        buttonText="Add Food"
      />
    </Wrapper>
  );
};

export default AddCustomFoodModal;
