import ErrorMessage from 'components/Atoms/ErrorMessage/ErrorMessage';
import { TitleStyled } from 'components/Molecules/CardStyled/CardStyled.styled';
import { AddFoodProps, NutrientsTypes } from 'components/Organisms/Food/FoodProps';
import { addCustomFoodToDB } from 'firebase-cfg/database/food/add';
import { ChangeEvent, FC, MouseEvent, useEffect, useState } from 'react';
import { v4 as uuid4 } from 'uuid';
import AddEditNameModal from '../AddEditNameModal/AddEditNameModal';
import { NameStyled } from '../Modals.styled';
import { EnterNutrientsStyled, PickFoodSetStyled, Wrapper } from './AddCustomFoodModal.styled';

const nutrients: (keyof NutrientsTypes)[] = ['kcal', 'fat', 'carbs', 'protein', 'fiber'];

type NutrientsFocus = {
  [key in keyof NutrientsTypes]: boolean;
};

const initialFocuses: NutrientsFocus = {
  kcal: false,
  fat: false,
  carbs: false,
  protein: false,
  fiber: false,
};

const initialInputValues: NutrientsTypes = {
  kcal: '',
  fat: '',
  carbs: '',
  protein: '',
  fiber: '',
};

interface AddCustomFoodModalProps {
  cards: AddFoodProps[];
  subPageID: string;
}

const AddCustomFoodModal: FC<AddCustomFoodModalProps> = ({ cards, subPageID }) => {
  const [nutrientsValue, setNutrientsValue] = useState(initialInputValues);
  const [focusOnInput, setFocusOnInput] = useState(initialFocuses);
  const [pickedFoodSetID, setPickedFoodSetID] = useState<string>('');
  const [nutrientsError, setNutrientsError] = useState<boolean>(false);
  const [pickFoodSetError, setPickFoodSetError] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputType = e.currentTarget.id as keyof NutrientsTypes;
    if (e.currentTarget.value.length > 4) return;

    setNutrientsValue({
      ...nutrientsValue,
      [inputType]: e.currentTarget.value,
    });
    setFocusOnInput({ ...initialFocuses, [inputType]: true });
  };

  const handlePickFoodSet = (e: MouseEvent<HTMLSpanElement>, id: string) => {
    if (pickedFoodSetID === id) return setPickedFoodSetID('');
    setPickedFoodSetID(id);
  };

  const addCustomFood = (newName: string) => {
    let isValidate = true;
    if (Object.values(nutrientsValue).includes('')) {
      setNutrientsError(true);
      isValidate = false;
    }
    if (pickedFoodSetID === '') {
      setPickFoodSetError(true);
      isValidate = false;
    }

    const nutrients = {} as NutrientsTypes;

    for (const key in nutrientsValue) {
      Object.assign(nutrients, {
        [key]: nutrientsValue[key as keyof NutrientsTypes] + `${key !== 'kcal' ? 'g' : ''}`,
      });
    }

    if (isValidate && subPageID) addCustomFoodToDB(subPageID, newName, pickedFoodSetID, nutrients);
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
        <p className="info">(in 100g)</p>
        {nutrients.map((nutrient) => {
          return (
            <div className="insertNutrient" key={uuid4()}>
              <p>{nutrient}</p>
              <input
                autoFocus={focusOnInput[nutrient] === true}
                value={nutrientsValue[nutrient]}
                onChange={(e) => handleInputChange(e)}
                id={nutrient}
                type="number"
              />
            </div>
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
        className="enterFoodName"
        updateDbCallback={addCustomFood}
        title="Enter Food name: "
        buttonText="Add Food"
      />
    </Wrapper>
  );
};

export default AddCustomFoodModal;
