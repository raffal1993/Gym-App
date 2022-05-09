import { ReactComponent as MyIcon } from 'assets/images/404food.svg';
import { SearchResultProps } from 'components/Organisms/Food/FoodProps';
import { FC, useState } from 'react';
import { NutrientsStyled, Wrapper } from './SearchFoodItem.styled';

const brokenSrcs: string[] = [];

const SearchFoodItem: FC<SearchResultProps> = ({
  label,
  nutrients: { ENERC_KCAL = 0, FAT = 0, CHOCDF = 0, PROCNT = 0, FIBTG = 0 },
  image,
}) => {
  const [src, setSrc] = useState<string | undefined>(image);

  const handleImgError = () => {
    setSrc('');
    if (image && !brokenSrcs.includes(image)) brokenSrcs.push(image);
  };

  return (
    <Wrapper>
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
          FAT : <span>{FAT === 0 ? 0 : FAT.toFixed(1)}</span>
        </p>
        <p>
          CARBS : <span>{CHOCDF === 0 ? 0 : CHOCDF.toFixed(1)}</span>
        </p>
        <p>
          PROTEIN : <span>{PROCNT === 0 ? 0 : PROCNT.toFixed(1)}</span>
        </p>
        <p>
          FIBER : <span>{FIBTG === 0 ? 0 : FIBTG.toFixed(1)}</span>
        </p>
      </NutrientsStyled>
    </Wrapper>
  );
};

export default SearchFoodItem;
