import React, { FC } from 'react';
import { v4 as uuid4 } from 'uuid';
import { TableBody, TableHead, TableRow } from '@mui/material';
import { columns } from 'utils/staticVariables/foodTableCells';
import { totalMacronutrients } from 'helpers/totalMacronutrients';
import { NutrientsDB } from 'components/Organisms/Food/FoodTypes';
import {
  TableCellBodyStyled,
  TableCellHeaderStyled,
  TableCellTotalStyled,
  TableRowTotalStyled,
  TableStyled,
} from './FoodTableDesktop.styled';

interface FoodTableDesktopProps {
  foodSet: NutrientsDB[];
}

const FoodTableDesktop: FC<FoodTableDesktopProps> = ({ foodSet }) => {
  return (
    <TableStyled stickyHeader aria-label="sticky table">
      <TableHead>
        <TableRow>
          {columns.map((column) => {
            if (column.id === 'weight') return;
            return (
              <TableCellHeaderStyled
                key={uuid4()}
                align={column.align}
                style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}
              >
                {column.label}
              </TableCellHeaderStyled>
            );
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {foodSet.map((row, index) => (
          <TableRow key={uuid4()}>
            {columns.map((column) => {
              if (column.id === 'weight') return;
              return (
                <TableCellBodyStyled
                  key={uuid4()}
                  align={column.align}
                  style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}
                >
                  {row[column.id]}
                  {column.id === 'name' && (
                    <p>{foodSet[index].weight ? `(${foodSet[index].weight})` : '(?)'}</p>
                  )}
                </TableCellBodyStyled>
              );
            })}
          </TableRow>
        ))}
        <TableRowTotalStyled>
          {columns.map((column) => {
            if (column.id === 'weight') return;
            const cellValue = totalMacronutrients(foodSet)[column.id];

            return (
              <TableCellTotalStyled
                key={uuid4()}
                align={column.align}
                style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}
                className="tableCellTotal"
              >
                {cellValue}
                {cellValue === 'TOTAL' && (
                  <p className="cellTotal">[ {totalMacronutrients(foodSet).weight} ]</p>
                )}
              </TableCellTotalStyled>
            );
          })}
        </TableRowTotalStyled>
      </TableBody>
    </TableStyled>
  );
};

export default FoodTableDesktop;
