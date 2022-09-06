import React, { FC } from 'react';
import { v4 as uuid4 } from 'uuid';
import { totalMacronutrients } from 'helpers/totalMacronutrients';
import { columns } from 'utils/staticVariables/foodTableCells';
import { NutrientsDB } from 'components/Organisms/Food/FoodTypes';
import {
  FoodsContainerStyled,
  FoodsContainerTotalStyled,
  FoodTableMobileStyled,
  NutrientsStyled,
  NutrientsTotalStyled,
} from './FoodTableMobile.styled';

interface FoodTableMobileProps {
  foodSet: NutrientsDB[];
}

const FoodTableMobile: FC<FoodTableMobileProps> = ({ foodSet }) => {
  return (
    <FoodTableMobileStyled>
      {foodSet.map((nutrient) => (
        <FoodsContainerStyled key={uuid4()}>
          <p className="title">
            {nutrient.name}
            <span className="weight">{nutrient.weight ? `(${nutrient.weight})` : '(?)'}</span>
          </p>

          <NutrientsStyled>
            {columns.map((column) => {
              if (column.id === 'name' || column.id === 'weight') return;
              return (
                <p className="macronutrient" key={uuid4()}>
                  <span className="key">:{column.id}</span>
                  <span className="value">{nutrient[column.id]}</span>
                </p>
              );
            })}
          </NutrientsStyled>
        </FoodsContainerStyled>
      ))}

      <FoodsContainerTotalStyled>
        <p className="title titleTotal">TOTAL</p>

        <NutrientsTotalStyled>
          {columns.map((column) => {
            if (column.id === 'name') return;
            return (
              <p className="macronutrient macronutrientTotal" key={uuid4()}>
                <span className="key keyTotal">:{column.id} </span>
                <span className="value valueTotal">{totalMacronutrients(foodSet)[column.id]}</span>
              </p>
            );
          })}
        </NutrientsTotalStyled>
      </FoodsContainerTotalStyled>
    </FoodTableMobileStyled>
  );
};

export default FoodTableMobile;
