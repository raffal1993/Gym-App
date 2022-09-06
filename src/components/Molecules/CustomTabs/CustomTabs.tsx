import React, { FC, ReactNode, useState } from 'react';
import { TabsStyled } from './CustomTabs.styled';

export interface CustomTabsProps {
  value?: number | null;
  className?: string;
  setValue?: React.Dispatch<React.SetStateAction<number | null>>;
  children?: ReactNode;
}

const CustomTabs: FC<CustomTabsProps> = ({ value, setValue, className, children }) => {
  const [defaultValue, setDefaultValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, index: number) => {
    if (setValue) setValue(index);
    else setDefaultValue(index);
  };

  return (
    <TabsStyled
      TabIndicatorProps={{ style: { display: value === null ? 'none' : 'initial' } }}
      className={className}
      value={value === undefined ? defaultValue : value === null ? false : value}
      onChange={handleChange}
      variant="scrollable"
      allowScrollButtonsMobile
      aria-label="scrollable auto tabs example"
    >
      {children}
    </TabsStyled>
  );
};

CustomTabs.defaultProps = {
  value: undefined,
  className: '',
  setValue: undefined,
  children: null,
};

export default CustomTabs;
