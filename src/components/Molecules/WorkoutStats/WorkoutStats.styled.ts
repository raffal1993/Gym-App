import { styled } from '@mui/material';

const columnsSize = {
  set: {
    width: '15%',
    maxWidth: '80px',
  },
  weight: '25%',
  reps: '15%',
  info: '45%',
};

export const Wrapper = styled('div')(({ theme }) => ({
  width: '85%',
  height: '80%',
  display: 'flex',
  flexDirection: 'column',
  margin: '5px 0px 5px 10px',
  color: theme.colors.white,
  fontFamily: theme.fonts.sarpanch,
  textShadow: '0px 0px 2px white',
  fontSize: '1.4rem',
  overflow: 'auto',
}));

export const HeaderStyled = styled('nav')(({ theme }) => ({
  backgroundColor: 'rgba(0,0,0,0.4)',
  width: '100%',
  height: '40px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',

  '& > div': {
    textAlign: 'center',
  },

  '& > div:nth-of-type(1)': {
    width: columnsSize.set.width,
    maxWidth: columnsSize.set.maxWidth,
  },
  '& > div:nth-of-type(2)': {
    width: columnsSize.weight,
  },
  '& > div:nth-of-type(3)': {
    width: columnsSize.reps,
  },
  '& > div:nth-of-type(4)': {
    width: columnsSize.info,
  },
}));

export const StatsStyled = styled('div')(({ theme }) => ({
  overflow: 'auto',
  '::-webkit-scrollbar': {
    width: '3px',
  },
  display: 'flex',
  flexDirection: 'column',

  '& .buttonAddSet': {
    margin: '20px 0 10px 0px',
    padding: '0px',
    fontSize: '2rem',
    width: columnsSize.set.width,
    maxWidth: `${columnsSize.set.maxWidth}`,
  },
}));

export const StatsNormalStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',

  '& > div': {
    textAlign: 'center',
    marginTop: '5px',
  },

  '& > div:nth-of-type(1)': {
    width: columnsSize.set.width,
    maxWidth: columnsSize.set.maxWidth,
  },
  '& > div:nth-of-type(2)': {
    width: columnsSize.weight,
  },
  '& > div:nth-of-type(3)': {
    width: columnsSize.reps,
  },
  '& > div:nth-of-type(4)': {
    width: columnsSize.info,
  },
}));

export const StatsSmallerStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  justifyContent: 'center',
  marginBottom: '30px',
  paddingLeft: '10px',
  width: '100%',

  '& :after': {
    content: "''",
    position: 'absolute',
    width: '1px',
    height: '90%',
    left: '5px',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: theme.colors.burlyWood,
    boxShadow: `0px 0px 5px  ${theme.colors.burlyWood}`,
  },

  '.stat': {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginBottom: '8px',

    span: { width: '45%', direction: 'rtl', paddingRight: '10px' },
  },
}));
