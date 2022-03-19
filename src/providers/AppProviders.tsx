import { CssBaseline, GlobalStyles } from '@mui/material';
import { FC, ReactNode } from 'react';
import globalStyle from 'style/globalStyles';
import ThemeProvider from './ThemeProvider';

const AppProviders: FC<ReactNode> = ({ children }) => {
  return (
    <ThemeProvider>
      <CssBaseline />
      <GlobalStyles styles={globalStyle} />
      {children}
    </ThemeProvider>
  );
};

export default AppProviders;
