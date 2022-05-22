import { styled } from '@mui/material';

export const AddButtonsStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '40px',
  width: '95%',
  maxWidth: '400px',
  margin: '20px 5px 0px 0px',
  gap: '20px',

  '& .addButton': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: '100%',
    background: theme.colors.bgColorOne,
    transition: 'all 0.1s ease-in-out',

    svg: {
      fontSize: '2em',
      color: theme.colors.burlyWood,
    },

    '&:hover': {
      transform: 'scale(1.05)',
    },
  },

  '& .addFoodSetButton': {},

  '& .addCustomFoodButton': {},
}));