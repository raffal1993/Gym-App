import { styled } from '@mui/material';
import EditDbButton from 'components/Atoms/Buttons/EditDbButton/EditDbButton';

export const CustomModalWrapper = styled(`div`)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '5px 5px 20px 5px',
  maxHeight: '100vh',

  li: {
    display: 'flex',
    paddingBottom: '10px',
    width: '300px',
  },
});

export const RemoveButtonStyled = styled(EditDbButton)(({ theme }) => ({
  marginLeft: '5px',
  fontSize: '1.8rem',
  padding: '5px',
  display: 'flex',
  alignItems: 'center',
  color: theme.colors.error,
  backgroundColor: theme.colors.bgDark,

  '&:hover': {
    transform: 'scale(1.1)',
    backgroundColor: theme.colors.bgDark,
  },
}));

export const ConfirmationButtonStyled = styled(RemoveButtonStyled)(({ theme }) => ({
  backgroundColor: theme.colors.bgDark,
  fontSize: '1rem',
  padding: '5px 10px',
  color: theme.colors.burlyWood,
  fontWeight: 'bold',
}));

export const NameStyled = styled('span')(({ theme }) => ({
  color: theme.colors.white,
  fontSize: '1.2rem',
  padding: '5px 0px',
  margin: '0px 5px',
  borderRadius: '5px',
  alignSelf: 'center',
  flexGrow: '1',
  display: 'flex',
  justifyContent: 'center',
  border: '1px solid rgba(0, 0, 0, 0.5)',
  whiteSpace: 'nowrap',
  overflow: 'hidden',

  '&.active': {
    boxShadow: 'inset 0px 0px 10px 0px rgba(0,0,0,0.9)',

    '&:hover': {
      boxShadow: 'inset 0px 0px 10px 0px rgba(0,0,0,0.9)',
    },
  },

  '&:hover': {
    boxShadow: 'inset 0px 0px 10px 0px rgba(0,0,0,0.3)',
    cursor: 'pointer',
  },
}));

export const RemoveCardButtonStyled = styled(EditDbButton)(({ theme }) => ({
  color: theme.colors.error,
  backgroundColor: theme.colors.bgDark,
  fontFamily: theme.fonts.roboto,
  fontWeight: 'bold',
  fontSize: '1.2rem',
  minWidth: '130px',
  minHeight: `35px`,

  '&:hover': {
    transform: 'scale(1.1)',
  },
}));
