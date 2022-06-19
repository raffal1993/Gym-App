import { lighten, styled } from '@mui/material';
import { SettingsCardStyled } from 'components/Organisms/Settings/Settings.styled';

export const Wrapper = styled(SettingsCardStyled)<{ email_verified: string }>(
  ({ theme, email_verified }) => ({
    paddingBottom: '20px',
    overflowY: 'auto',
    maxHeight: '100%',

    '& .accountInfo': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '50px',
      textShadow: 'none',
      fontSize: '1.3rem',
      margin: '10px 40px',
      padding: '10px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 1)',
      borderBottom: `1px solid ${theme.colors.burlyWood}`,

      span: {
        width: '50%',
        padding: '0px 15px',
        wordBreak: 'break-all',
      },

      '& .description': {
        display: 'inline-block',
        direction: 'rtl',
        textTransform: 'uppercase',
        fontWeight: '600',
      },

      '& .userInfo': {
        display: 'flex',
        svg: {
          height: '100%',
          width: '30px',
          color: email_verified === 'true' ? theme.colors.green : theme.colors.error,
        },
      },
    },

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

    '& .info': {
      fontSize: '1.4rem',
      textShadow: 'none',
      textAlign: 'center',
      color: lighten(theme.colors.green, 0.3),
      filter: 'contrast(400%)',
      margin: '30px 20px 0px 20px',
    },

    '& .changeEmail': {
      margin: '40px 0',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
      width: '100%',

      span: {
        textShadow: 'none',
        fontSize: '1.3rem',
      },

      div: {
        width: '50%',
        minWidth: '200px',
        display: 'flex',
        gap: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',

        input: {
          border: 'none',
          textAlign: 'center',
          fontSize: '1.3rem',
          fontFamily: theme.fonts.roboto,
          fontWeight: '600',
          height: '30px',
          width: '100%',

          '&:focus': {
            outline: 'none',
          },
        },

        button: {
          position: 'absolute',
          right: '-60px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '40px',
          border: `none`,
          borderRadius: '25px',

          svg: {
            color: theme.colors.white,
          },

          '&:hover': {
            cursor: 'pointer',
            backgroundColor: theme.colors.purple,
          },
        },
      },
    },

    '& .errorMessage': {
      textShadow: 'none',
    },

    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',

      '& .accountInfo': {
        flexDirection: 'column',
        margin: '10px',
        minWidth: '250px',
        width: '70%',
        minHeight: 'fit-content',
        padding: '5px 10px',

        span: {
          display: 'flex',
          flexDirecton: 'column',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
          padding: '5px 0px',
        },

        '& .description': {
          direction: 'ltr',
        },
      },

      div: {
        paddingRight: '10px',
        button: {
          left: 'calc(100% - 5px)',
          backgroundColor: 'black',
        },
      },
    },
  }),
);
