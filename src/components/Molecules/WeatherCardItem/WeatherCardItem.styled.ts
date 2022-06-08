import { styled } from '@mui/material';

export const Wrapper = styled(`div`)<{ wind_deg: number }>(({ theme, wind_deg }) => ({
  display: 'flex',
  flexDirection: 'column',
  color: theme.colors.white,
  gap: '10px',
  fontWeight: '400',
  textTransform: 'none',

  '& .time': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    fontSize: '1.7rem',
    marginBottom: '15px',
    padding: '2px 0px',
    borderBottom: `2px solid ${theme.colors.whiteLight}`,
    borderTop: `2px solid ${theme.colors.whiteLight}`,

    svg: {
      marginBottom: '2px',
    },
  },
  '& .imgContainer': {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',

    img: {
      width: '60px',
      height: '60px',
      alignSelf: 'center',
    },
    p: {
      fontSize: '4rem',
      display: 'flex',

      span: {
        fontSize: '1.7rem',
        marginTop: '5px',
      },
    },
  },

  '& .description': {
    marginBottom: '20px',
    fontSize: '1.2rem',
    textTransform: 'capitalize',
  },

  '& .infos': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    fontSize: '1.2rem',

    p: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      marginBottom: '5px',
      paddingBottom: '5px',
      borderBottom: `1px solid ${theme.colors.whiteLight}`,

      span: {
        width: '50%',
        '&:nth-of-type(2)': {
          fontWeight: 'bold',
          color: theme.colors.burlyWood,
        },
      },
    },

    '.windArrow': {
      transform: `rotate(${wind_deg}deg)`,
    },
  },
}));

// time
// weatherImage
// description
// infos
