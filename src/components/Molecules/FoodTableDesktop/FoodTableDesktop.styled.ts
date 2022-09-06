import { styled } from '@mui/material';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export const TableStyled = styled(Table)(() => ({}));

export const TableCellHeaderStyled = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.colors.burlyWood,
  fontSize: '1.3rem',
  fontWeight: 'bold',
  borderBottom: 'none',
  color: theme.colors.bgDark,
  padding: '16px 4px',
  textShadow: 'none',

  '&:first-of-type': {
    padding: '16px 4px 16px 16px',
  },
}));

export const TableCellBodyStyled = styled(TableCell)(() => ({
  fontSize: '1.3rem',
  borderBottom: '1px solid black',
  color: 'white',
  padding: '16px 10px',
  wordWrap: 'break-word',

  '&:not(:first-of-type)': {
    textAlign: 'center',
  },
}));

export const TableRowTotalStyled = styled(TableRow)(() => ({
  position: 'sticky',
  bottom: '-1px',
}));

export const TableCellTotalStyled = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.colors.darkGrey,
  fontSize: '1.2rem',
  borderBottom: '1px solid black',
  fontWeight: 'bold',
  color: theme.colors.primaryLight,
  textShadow: '3px 3px  black',

  '&:not(:first-of-type)': {
    textAlign: 'center',
  },

  '& .cellTotal': {
    whiteSpace: 'nowrap',
  },
}));
