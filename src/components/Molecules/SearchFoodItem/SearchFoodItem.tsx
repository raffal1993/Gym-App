import { ChangeEvent, memo, useEffect, useRef, useState } from 'react';
import { ReactComponent as MyIcon } from 'assets/images/404food.svg';
import { SearchFoodItemTypes } from 'components/Organisms/Food/FoodTypes';
import { addFoodToDB } from 'firebase-cfg/database/food/add';
import { addFoodAnimation } from 'helpers/showAddFoodAnimation.ts';
import { filterNumberInputValue } from 'helpers/filterNumberInputValue';
import { MAX_FOODS_IN_CARD } from 'helpers/staticVariables';
import { countNutrientsByWeight } from 'helpers/countNutrientsByWeight';
import Spinner from 'components/Atoms/Spinner/Spinner';
import ErrorMessage from 'components/Atoms/ErrorMessage/ErrorMessage';
import CustomButton from 'components/Atoms/Buttons/CustomButton/CustomButton';
import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { v4 as uuid4 } from 'uuid';
import { TitleStyled } from '../CardStyled/CardStyled.styled';
import {
  AddToFoodSetStyled,
  InsertWeightStyled,
  NutrientsStyled,
  Wrapper,
} from './SearchFoodItem.styled';

let timeout: NodeJS.Timeout;

const SearchFoodItem = memo(
  ({
    label,
    nutrients: { kcal, fat, carbs, protein, fiber },
    image,
    foodCards,
    setOpenSnackbar,
    isLoading,
  }: SearchFoodItemTypes) => {
    const [src, setSrc] = useState<string | undefined>(image);
    const [showAddToFoodSet, setShowAddToFoodSet] = useState<boolean>(false);
    const [selectedFoodCardID, setSelectedFoodCardID] = useState<string>('');
    const [inputWeight, setInputWeight] = useState<string>('');
    const [inputWeightError, setInputWeightError] = useState<boolean>(false);

    const {
      pages: { subPageID },
    } = useAppSelector((state: RootState) => state);

    const ref = useRef<HTMLDivElement>(null);

    const handleImgError = () => {
      setSrc('');
    };

    const handleShowAddFoodPanel = () => {
      setShowAddToFoodSet(true);
    };

    const handleOnMouseLeave = () => {
      const duration = 300;
      addFoodAnimation(ref, 'hide', duration);
      timeout = setTimeout(() => {
        setShowAddToFoodSet(false);
        setSelectedFoodCardID('');
        setInputWeight('');
      }, duration + 100);
    };

    const handleSelectFoodCard = (foodCardID: string) => {
      setSelectedFoodCardID(foodCardID);
    };

    const handleInputWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget;

      if (Number(value) > 9999) return;

      const isTwoDigitsAfterDot = value.split('.').length === 2 && value.split('.')[1].length === 2;

      if (isTwoDigitsAfterDot) return;

      setInputWeight(filterNumberInputValue(value));
    };

    const addFoodToFoodSet = () => {
      if (inputWeight.length === 0) return setInputWeightError(true);

      const nutrients = { kcal, fat, carbs, protein, fiber };

      if (subPageID) {
        addFoodToDB(
          subPageID,
          label,
          selectedFoodCardID,
          countNutrientsByWeight({ weight: inputWeight, ...nutrients }),
        );
        setOpenSnackbar(true);
      }
    };

    useEffect(() => {
      return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
      const errorMessageTimeout = setTimeout(() => {
        setInputWeightError(false);
      }, 2000);

      return () => clearTimeout(errorMessageTimeout);
    });

    return isLoading ? (
      <Wrapper>
        <Spinner className="spinner" />
      </Wrapper>
    ) : (
      <Wrapper onMouseLeave={handleOnMouseLeave} onClick={handleShowAddFoodPanel}>
        <h2 className="foodName">{label}</h2>
        {src ? <img onError={() => handleImgError()} src={src} alt="food" /> : <MyIcon />}
        <NutrientsStyled>
          <p>
            KCAL : <span>{kcal}</span>
          </p>
          <p>
            FAT : <span>{fat}g</span>
          </p>
          <p>
            CARBS : <span>{carbs}g</span>
          </p>
          <p>
            PROTEIN : <span>{protein}g</span>
          </p>
          <p>
            FIBER : <span>{fiber}g</span>
          </p>
        </NutrientsStyled>
        {showAddToFoodSet && (
          <AddToFoodSetStyled ref={ref}>
            {selectedFoodCardID ? (
              <InsertWeightStyled>
                <TitleStyled className="title weightTitle">WEIGHT (g):</TitleStyled>
                <input
                  type="number"
                  value={inputWeight}
                  onChange={(e) => handleInputWeightChange(e)}
                  onKeyPress={(e) => {
                    e.key === 'Enter' && addFoodToFoodSet();
                  }}
                />
                <CustomButton handleClick={addFoodToFoodSet} className="weightButton">
                  Add
                </CustomButton>
                {inputWeightError && (
                  <ErrorMessage className="error" errorMessage="Weight must be provided!" />
                )}
              </InsertWeightStyled>
            ) : (
              <>
                {foodCards === undefined || foodCards.length === 0 ? (
                  <TitleStyled className="title titleNoSets">No Food Sets available :/</TitleStyled>
                ) : (
                  <>
                    <TitleStyled className="title">Add Food to Food Set: </TitleStyled>
                    {foodCards.map(({ name, foodCardID, foodSet }) => (
                      <CustomButton
                        disabled={foodSet.length >= MAX_FOODS_IN_CARD}
                        handleClick={() => handleSelectFoodCard(foodCardID)}
                        className="foodSetButton"
                        key={uuid4()}
                      >
                        {name}
                      </CustomButton>
                    ))}
                  </>
                )}
              </>
            )}
          </AddToFoodSetStyled>
        )}
      </Wrapper>
    );
  },
);

export default SearchFoodItem;
