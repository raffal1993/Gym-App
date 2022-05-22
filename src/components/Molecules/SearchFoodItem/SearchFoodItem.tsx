import { FC, useRef, useState } from 'react';
import { ReactComponent as MyIcon } from 'assets/images/404food.svg';
import { FoodCardDB, SearchResultProps } from 'components/Organisms/Food/FoodProps';
import { addFoodAnimation } from 'helpers/showAddFoodAnimation.ts';
import CustomButton from 'components/Atoms/Buttons/CustomButton/CustomButton';
import { v4 as uuid4 } from 'uuid';
import { TitleStyled } from '../CardStyled/CardStyled.styled';
import { AddToFoodSetStyled, NutrientsStyled, Wrapper } from './SearchFoodItem.styled';

let timeout: NodeJS.Timeout;

const brokenSrcs: string[] = [];

const SearchFoodItem: FC<SearchResultProps & { foodCards: FoodCardDB[] }> = ({
  label,
  nutrients: { ENERC_KCAL = 0, FAT = 0, CHOCDF = 0, PROCNT = 0, FIBTG = 0 },
  image,
  foodCards,
}) => {
  const [src, setSrc] = useState<string | undefined>(image);
  const [showAddToFoodSet, setShowAddToFoodSet] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);
  const handleImgError = () => {
    setSrc('');
    if (image && !brokenSrcs.includes(image)) brokenSrcs.push(image);
  };

  const handleAddToFoodSet = () => {
    setShowAddToFoodSet(true);
  };

  const handleOnMouseLeave = () => {
    const duration = 300;
    addFoodAnimation(ref, 'hide', duration);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setShowAddToFoodSet(false);
    }, duration + 100);
  };

  return (
    <Wrapper onMouseLeave={handleOnMouseLeave} onClick={handleAddToFoodSet}>
      <h2 className="foodName">{label}</h2>
      {src && !brokenSrcs.includes(src) ? (
        <img onError={() => handleImgError()} src={src} alt="food" />
      ) : (
        <MyIcon />
      )}
      <NutrientsStyled>
        <p>
          KCAL : <span>{ENERC_KCAL === 0 ? 0 : ENERC_KCAL.toFixed(1)}</span>
        </p>
        <p>
          FAT : <span>{FAT === 0 ? 0 : FAT.toFixed(1)}g</span>
        </p>
        <p>
          CARBS : <span>{CHOCDF === 0 ? 0 : CHOCDF.toFixed(1)}g</span>
        </p>
        <p>
          PROTEIN : <span>{PROCNT === 0 ? 0 : PROCNT.toFixed(1)}g</span>
        </p>
        <p>
          FIBER : <span>{FIBTG === 0 ? 0 : FIBTG.toFixed(1)}g</span>
        </p>
      </NutrientsStyled>
      {showAddToFoodSet && (
        <AddToFoodSetStyled ref={ref}>
          <TitleStyled className="title">Add Food to Food Set: </TitleStyled>
          {foodCards.map(({ name, foodCardID }) => (
            <CustomButton handleClick={() => {}} className="foodSetButton" key={uuid4()}>
              {name}
            </CustomButton>
          ))}
        </AddToFoodSetStyled>
      )}
    </Wrapper>
  );
};

export default SearchFoodItem;
