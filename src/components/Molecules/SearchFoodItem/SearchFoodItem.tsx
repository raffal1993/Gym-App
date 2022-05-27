import { FC, useEffect, useRef, useState } from 'react';
import { ReactComponent as MyIcon } from 'assets/images/404food.svg';
import { SearchFoodItemTypes } from 'components/Organisms/Food/FoodTypes';
import { addFoodToDB } from 'firebase-cfg/database/food/add';
import { addFoodAnimation } from 'helpers/showAddFoodAnimation.ts';
import CustomButton from 'components/Atoms/Buttons/CustomButton/CustomButton';
import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { v4 as uuid4 } from 'uuid';
import { TitleStyled } from '../CardStyled/CardStyled.styled';
import { AddToFoodSetStyled, NutrientsStyled, Wrapper } from './SearchFoodItem.styled';

const brokenSrcs: string[] = [];

let timeout: NodeJS.Timeout;

const SearchFoodItem: FC<SearchFoodItemTypes> = ({
  label,
  nutrients: { kcal, fat, carbs, protein, fiber },
  image,
  foodCards,
  setOpenSnackbar,
}) => {
  const [src, setSrc] = useState<string | undefined>(image);
  const [showAddToFoodSet, setShowAddToFoodSet] = useState<boolean>(false);

  const {
    pages: { subPageID },
  } = useAppSelector((state: RootState) => state);

  const ref = useRef<HTMLDivElement>(null);
  const handleImgError = () => {
    setSrc('');
    if (image && !brokenSrcs.includes(image)) brokenSrcs.push(image);
  };

  const handleShowAddFoodPanel = () => {
    setShowAddToFoodSet(true);
  };

  const handleOnMouseLeave = () => {
    const duration = 300;
    addFoodAnimation(ref, 'hide', duration);
    timeout = setTimeout(() => {
      setShowAddToFoodSet(false);
    }, duration + 100);
  };

  const addFoodToFoodSet = (foodCardID: string) => {
    const nutrients = { kcal, fat, carbs, protein, fiber };
    if (subPageID) {
      addFoodToDB(subPageID, label, foodCardID, nutrients);
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Wrapper onMouseLeave={handleOnMouseLeave} onClick={handleShowAddFoodPanel}>
      <h2 className="foodName">{label}</h2>
      {src && !brokenSrcs.includes(src) ? (
        <img onError={() => handleImgError()} src={src} alt="food" />
      ) : (
        <MyIcon />
      )}
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
          {foodCards === undefined || foodCards.length === 0 ? (
            <TitleStyled className="title titleNoSets">No Food Sets available :/</TitleStyled>
          ) : (
            <>
              <TitleStyled className="title">Add Food to Food Set: </TitleStyled>
              {foodCards.map(({ name, foodCardID }) => (
                <CustomButton
                  handleClick={() => addFoodToFoodSet(foodCardID)}
                  className="foodSetButton"
                  key={uuid4()}
                >
                  {name}
                </CustomButton>
              ))}
            </>
          )}
        </AddToFoodSetStyled>
      )}
    </Wrapper>
  );
};

export default SearchFoodItem;
