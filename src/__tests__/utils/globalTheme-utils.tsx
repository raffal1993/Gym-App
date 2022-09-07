import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { FC, ReactNode } from 'react';
import globalStyle from 'style/globalStyles';
import theme from 'style/theme';

const GlobalThemeProvider: FC<ReactNode> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyle} />
      {children}
    </ThemeProvider>
  );
};

export default GlobalThemeProvider;
