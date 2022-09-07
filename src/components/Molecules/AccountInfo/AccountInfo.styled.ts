import { lighten, styled } from '@mui/material';
import { SettingsCardStyled } from 'components/Organisms/Settings/Settings.styled';

export const Wrapper = styled(SettingsCardStyled)<{ email_verified: string }>(({ theme }) => ({
  paddingBottom: '20px',
  overflowY: 'auto',
  maxHeight: '100%',

  '& .sendVerificationEmail': {
    display: 'flex',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: theme.colors.burlyWood,
    fontFamily: theme.fonts.sarpanch,
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.4rem',
    borderRadius: '5px',
    margin: '50px auto 0px auto',
    padding: '10px 20px',
    textAlign: 'center',
    transition: 'all 0.3s ease-in-out',

    svg: {
      marginLeft: '20px',
      color: theme.colors.white,
      width: '20px',
      height: '20px',
      transition: 'all 0.3s ease-in-out',
      transformOrigin: 'bottom left',
    },

    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',

      svg: {
        transform: 'rotate(-30deg)',
      },
    },
  },

  span: {
    textShadow: 'none',
    fontSize: '1.3rem',
  },

  '& .info': {
    fontSize: '1.4rem',
    textShadow: 'none',
    textAlign: 'center',
    color: lighten(theme.colors.green, 0.3),
    filter: 'contrast(400%)',
    margin: '30px 20px 0px 20px',
  },

  [theme.breakpoints.down('sm')]: {
    alignItems: 'center',
  },
}));
