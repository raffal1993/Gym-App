import { styled } from '@mui/material';

// gridTemplateColumns: '45px 205px 1fr',
//   gridTemplateRows: `50px 65px 1fr`,

export const Wrapper = styled('div')<{ is_sidebar_hide: string }>(({ theme, is_sidebar_hide }) => ({
  gridArea: '2/3/4/3',
  padding: '0px 10px',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflow: 'hidden',
  overflowY: 'auto',
  position: 'relative',

  ...(is_sidebar_hide === 'true' && {
    '&': {
      gridArea: '2/2/4/4',
      marginLeft: '15px',
    },
  }),

  [theme.breakpoints.down('sm')]: {
    gridArea: '3/1/4/4',
    margin: '0px 5px',
    padding: '0px',
  },
}));
