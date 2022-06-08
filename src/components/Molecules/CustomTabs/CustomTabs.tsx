import React, { ReactNode, useState } from 'react';
import { TabsStyled } from './CustomTabs.styled';

interface CustomTabsProps {
  value?: number | null;
  className?: string;
  setValue?: React.Dispatch<React.SetStateAction<number>>;
  children?: ReactNode;
}

const CustomTabs = ({ value, setValue, className, children }: CustomTabsProps) => {
  const [defaultValue, setDefaultValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, index: number) => {
    if (setValue) setValue(index);
    else setDefaultValue(index);
  };

  return (
    <TabsStyled
      className={className}
      value={value || defaultValue}
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
  value: null,
  className: '',
  setValue: () => {},
  children: null,
};

export default CustomTabs;
