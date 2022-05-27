import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Column, NutrientsDB } from 'components/Organisms/Food/FoodTypes';
import { totalMacronutrients } from 'helpers/totalMacronutrients';
import useResize from 'hooks/useResize';
import { FC } from 'react';
import { v4 as uuid4 } from 'uuid';
import { SmallTable, Wrapper } from './FoodTable.styled';

const columns: readonly Column[] = [
  { id: 'name', label: 'NAME', maxWidth: 110, minWidth: 90 },
  { id: 'kcal', label: 'KCAL', align: 'center', maxWidth: 50 },
  {
    id: 'fat',
    label: 'FAT',
    maxWidth: 50,
    align: 'center',
  },
  {
    id: 'carbs',
    label: 'CARBS',
    maxWidth: 50,
    align: 'center',
  },
  {
    id: 'protein',
    label: 'PROTEIN',
    maxWidth: 60,
    align: 'center',
  },
  {
    id: 'fiber',
    label: 'FIBER',
    maxWidth: 50,
    align: 'center',
  },
];

const FoodTable: FC<{ foodSet: NutrientsDB[] }> = ({ foodSet }) => {
  const { isWidthSmaller } = useResize('xs');
  return (
    <Wrapper>
      {isWidthSmaller ? (
        <SmallTable>
          {foodSet.map((foodRow) => (
            <div className="mealContainer" key={uuid4()}>
              <p className="title">{foodRow.name} (323g)</p>

              <div className="nutrients">
                {columns.map((column) => {
                  if (column.id === 'name') return;
                  return (
                    <span className="macronutrient" key={uuid4()}>
                      {column.id}: <span className="value">{foodRow[column.id]}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
          <div className="mealContainer mealContainerTotal">
            <p className="title titleTotal">TOTAL</p>
            <div className="nutrients nutrientsTotal">
              {columns.map((column) => {
                if (column.id === 'name') return;
                return (
                  <span className="macronutrient macronutrientTotal" key={uuid4()}>
                    {column.id}:{' '}
                    <span className="value valueTotal">
                      {totalMacronutrients(foodSet)[column.id]}
                    </span>
                  </span>
                );
              })}
            </div>
          </div>
        </SmallTable>
      ) : (
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  className="headerCell"
                  key={uuid4()}
                  align={column.align}
                  style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {foodSet.map((row) => (
              <TableRow key={uuid4()}>
                {columns.map((column) => (
                  <TableCell
                    className="tableCell"
                    key={uuid4()}
                    align={column.align}
                    style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}
                  >
                    {row[column.id]}
                    {column.id === 'name' && <p style={{ marginTop: '5px' }}>(323g)</p>}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow className="tableRowTotal">
              {columns.map((column) => (
                <TableCell
                  key={uuid4()}
                  align={column.align}
                  style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}
                  className="tableCellTotal"
                >
                  {totalMacronutrients(foodSet)[column.id]}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      )}
    </Wrapper>
  );
};

export default FoodTable;
