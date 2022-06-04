import { styled } from '@mui/material';

export const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '15px',
  width: '100%',

  [theme.breakpoints.down('sm')]: {
    marginTop: '10px',
  },
}));

export const PaginationStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: `rgba(45, 53, 65, 0.8)`,
  width: '100%',
  margin: '0px',
  padding: '15px 0px',

  '& .goToPage': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '33%',
    gap: '10px',

    input: {
      borderRadius: '5px',
      width: '50px',
      height: '30px',
      border: 'none',
      textAlign: 'center',
    },

    '& .pageButton': {
      margin: '0',
      padding: '5px',
      minWidth: '40px',
      width: '40px',
    },
  },

  '& .button': {
    display: 'flex',
    width: '150px',
    justifyContent: 'space-evenly',
    margin: '0 20px',
    padding: '5px',

    ':disabled': {
      backgroundColor: `${theme.colors.primary}`,
      color: theme.colors.white,
      opacity: '0.3',
    },
  },

  [theme.breakpoints.down('xs')]: {
    '& .button': {
      width: '100px',
    },
  },
}));
