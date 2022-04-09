import { ReactElement } from 'react';

export interface CustomTabsProps {
  elements?: string[];
  value?: number | null;
  component?: ReactElement;
  className?: string;
  setValue?: React.Dispatch<React.SetStateAction<number>>;
}
