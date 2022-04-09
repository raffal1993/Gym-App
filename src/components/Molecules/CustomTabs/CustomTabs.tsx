import { Tab } from '@mui/material';
import React, { cloneElement, FC, useState } from 'react';
import { TabsStyled } from './CustomTabs.styled';
import { CustomTabsProps } from './CustomTabsProps';

const CustomTabs: FC<CustomTabsProps> = ({
  value,
  elements = [],
  setValue,
  component,
  className,
}) => {
  const [defaultValue, setDefaultValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, index: number) => {
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
      {elements.map((el, index) => (
        <Tab
          key={`${el + index}`}
          label={component ? cloneElement(component, { name: el }) : el}
        ></Tab>
      ))}
    </TabsStyled>
  );
};

export default CustomTabs;
