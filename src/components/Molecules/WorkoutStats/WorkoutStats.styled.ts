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
  margin: '5px 0px 10px 10px',
  color: theme.colors.white,
  fontFamily: theme.fonts.sarpanch,
  textShadow: '0px 0px 2px white',
  letterSpacing: '.1rem',
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
}));

export const StatsRowStyled = styled('div')(({ theme }) => ({
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
