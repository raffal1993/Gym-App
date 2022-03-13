import { ThemeProvider as ThemeComponent } from '@mui/material';
import { FC, ReactNode } from 'react';
import theme from '../style/theme';

const ThemeProvider: FC<ReactNode> = ({ children }) => {
  return <ThemeComponent theme={theme}>{children}</ThemeComponent>;
};

export default ThemeProvider;
