import { styled } from '@mui/material';
import { SettingsCardStyled } from 'components/Organisms/Settings/Settings.styled';

export const Wrapper = styled(SettingsCardStyled)(({ theme }) => ({
  minHeight: '300px',

  '& .title': {
    marginBottom: '40px',
  },

  label: {
    margin: '0 auto 10px auto',

    '& span': {
      display: 'inline-block',
      fontSize: '1.2rem',
      padding: '5px 10px',
      width: '150px',
      minWidth: '200px',
      maxWidth: '200px',
    },
    input: {
      height: '30px',
      textAlign: 'center',
    },
  },

  '& .changePassButton': {
    marginTop: '40px',
    width: '200px',
  },

  '& .errorMessage': {
    textShadow: 'none',
    fontSize: '1.3rem',
  },

  [theme.breakpoints.down('xs')]: {
    '& .title': {
      fontSize: '1.5rem',
    },

    label: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
}));
