import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { totalMacronutrients } from 'helpers/totalMacronutrients';
import useResize from 'hooks/useResize';
import { v4 as uuid4 } from 'uuid';
import { SmallTable, Wrapper } from './FoodTable.styled';
import { Column, Data } from './FoodTableProps';

const columns: readonly Column[] = [
  { id: 'name', label: 'NAME', minWidth: 80 },
  { id: 'kcal', label: 'KCAL', minWidth: 35 },
  {
    id: 'fat',
    label: 'FAT',
    minWidth: 30,
    align: 'center',
  },
  {
    id: 'carbs',
    label: 'CARBS',
    minWidth: 30,
    align: 'center',
  },
  {
    id: 'protein',
    label: 'PROTEIN',
    minWidth: 30,
    align: 'center',
  },
  {
    id: 'fiber',
    label: 'FIBER',
    minWidth: 30,
    align: 'center',
  },
];

const rows: readonly Data[] = [
  { name: 'Water', kcal: '2200', fat: '70g', carbs: '220g', protein: '20g', fiber: '10g' },
  { name: 'Milk', kcal: '155', fat: '15g', carbs: '20g', protein: '0', fiber: '0' },
  {
    name: 'Ocean Spray Whole Berry Mixed Berry',
    kcal: '200',
    fat: '15g',
    carbs: '20g',
    protein: '0',
    fiber: '0',
  },
  { name: 'Cheese', kcal: '200', fat: '15g', carbs: '20g', protein: '0', fiber: '0' },
  { name: 'Bread', kcal: '200', fat: '15g', carbs: '20g', protein: '0', fiber: '0' },
  { name: 'Butter', kcal: '200', fat: '15g', carbs: '20g', protein: '0', fiber: '0' },
  { name: 'Cream', kcal: '200', fat: '15g', carbs: '20g', protein: '0', fiber: '0' },
];

const FoodTable = () => {
  const { isWidthSmaller } = useResize('xs');

  return (
    <Wrapper>
      {isWidthSmaller ? (
        <SmallTable>
          {rows.map((row) => (
            <div className="mealContainer" key={uuid4()}>
              <p className="title">{row.name}</p>
              <div className="nutrients">
                {columns.map((column) => {
                  if (column.id === 'name') return;
                  return (
                    <span className="macronutrient" key={uuid4()}>
                      {column.id}: <span className="value">{row[column.id]}</span>
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
                    <span className="value valueTotal">{totalMacronutrients(rows)[column.id]}</span>
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
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={uuid4()}>
                {columns.map((column) => (
                  <TableCell className="tableCell" key={uuid4()} align={column.align}>
                    {row[column.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow className="tableRowTotal">
              {columns.map((column) => (
                <TableCell key={uuid4()} align={column.align} className="tableCellTotal">
                  {totalMacronutrients(rows)[column.id]}
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
