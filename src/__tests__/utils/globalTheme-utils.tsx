import { CssBaseline, GlobalStyles } from '@mui/material';
import ThemeProvider from 'providers/ThemeProvider';
import { FC, ReactNode } from 'react';
import globalStyle from 'style/globalStyles';

const GlobalThemeProvider: FC<ReactNode> = ({ children }) => {
  return (
    <ThemeProvider>
      <CssBaseline />
      <GlobalStyles styles={globalStyle} />
      {children}
    </ThemeProvider>
  );
};

export default GlobalThemeProvider;
