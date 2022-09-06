import { styled } from '@mui/material';

export const AccountInfoInformationsStyled = styled('div')<{ email_verified: string }>(
  ({ theme, email_verified }) => ({
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

    [theme.breakpoints.down('sm')]: {
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
    },
  }),
);
