import { styled } from '@mui/material';
import { SettingsCardStyled } from 'components/Organisms/Settings/Settings.styled';

export const Wrapper = styled(SettingsCardStyled)(({ theme }) => ({
  '& .info': {
    margin: '10px auto',
    fontWeight: '400',
    textShadow: 'none',
    fontSize: '1.2rem',
  },

  '& .formControl': {
    backgroundColor: theme.colors.white,
    margin: '0 auto',
    width: '70%',

    input: {
      height: '100%',
      textAlign: 'center',
      fontWeight: 'bold',
    },
  },

  '& .button': {
    maxWidth: '200px',
  },

  '& .errorMessage': {
    fontSize: '1.2rem',
    marginTop: '15px',
    textShadow: 'none',
  },

  [theme.breakpoints.down('sm')]: {
    minHeight: '200px',

    '& .info': {
      fontSize: '1rem',
    },

    '& .errorMessage': {
      fontSize: '1rem',
    },
  },
}));
