import { styled, Tabs, TabsProps } from '@mui/material';

export const TabsStyled = styled(Tabs)<TabsProps>(({ theme }) => ({
  alignItems: 'center',
  gridArea: '3/1/2/4',
  width: '100vw',
  height: '50px',
  backgroundColor: theme.colors.primary,
  padding: '0px 20px',
  marginTop: '5px',
  borderBottom: `4px solid ${theme.colors.darkGrey}`,
  borderTop: `4px solid ${theme.colors.darkGrey}`,

  '& .MuiTabs-flexContainer': {
    columnGap: '40px',
  },

  '& .MuiButtonBase-root': {
    fontFamily: theme.fonts.roboto,
    textTransform: 'uppercase',
    fontSize: '1.3rem',
    fontWeight: '800',
    color: theme.colors.primaryLight,
    margin: '0 5px',

    '&:hover': { color: `${theme.colors.white} !important` },
  },

  '& .Mui-selected': {
    color: `${theme.colors.white} !important`,
  },

  '& .MuiTabScrollButton-root': {
    svg: {
      fontSize: '3.5rem',
      color: theme.colors.bgDark,

      '&:hover': {
        color: theme.colors.darkGrey,
      },
    },
  },

  '& .MuiTabs-indicator': {
    backgroundColor: theme.colors.purple,
    height: '4px',
    borderRadius: '10px',
    bottom: '5px',
  },
}));
