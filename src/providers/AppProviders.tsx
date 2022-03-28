import { CssBaseline, GlobalStyles } from '@mui/material';
import { FC, ReactNode } from 'react';
import globalStyle from 'style/globalStyles';
import DataProvider from './DataProvider';
import ReduxProvider from './ReduxProvider';
import ThemeProvider from './ThemeProvider';

const AppProviders: FC<ReactNode> = ({ children }) => {
  return (
    <ReduxProvider>
      <DataProvider>
        <ThemeProvider>
          <CssBaseline />
          <GlobalStyles styles={globalStyle} />
          {children}
        </ThemeProvider>
      </DataProvider>
    </ReduxProvider>
  );
};

export default AppProviders;
