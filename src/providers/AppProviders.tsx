import { CssBaseline, GlobalStyles } from '@mui/material';
import { FC, ReactNode } from 'react';
import globalStyle from 'style/globalStyles';
import ReduxProvider from './ReduxProvider';
import ThemeProvider from './ThemeProvider';

const AppProviders: FC<ReactNode> = ({ children }) => {
  return (
    <ReduxProvider>
      <ThemeProvider>
        <CssBaseline />
        <GlobalStyles styles={globalStyle} />
        {children}
      </ThemeProvider>
    </ReduxProvider>
  );
};

export default AppProviders;
