import { Tab } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import React, { cloneElement, FC, ReactElement, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { TabsStyled } from './CustomTabs.styled';

interface CustomTabsProps {
  elements?: string[];
  value?: number | null;
  component?: ReactElement;
  className?: string;
  asLink?: boolean;
  setValue?: React.Dispatch<React.SetStateAction<number>>;
}

const CustomTabs: FC<CustomTabsProps> = ({
  value,
  elements = [],
  setValue,
  component,
  className,
  asLink,
}) => {
  const [defaultValue, setDefaultValue] = useState(0);

  const navigate = useNavigate();
  const { mainPage } = useAppSelector((state: RootState) => state.pages);

  const handleChange = (event: React.SyntheticEvent, index: number) => {
    if (setValue) setValue(index);
    else setDefaultValue(index);
  };

  const handleRedirect = (event: SyntheticEvent, index: number) => {
    navigate(`/dashboard/${mainPage}/${index + 1}`);
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
          onClick={(e) => asLink && handleRedirect(e, index)}
          key={uuidv4()}
          label={component ? cloneElement(component, { name: el }) : el}
        ></Tab>
      ))}
    </TabsStyled>
  );
};

export default CustomTabs;

CustomTabs.defaultProps = {
  elements: [],
  value: null,
  component: undefined,
  className: '',
  setValue: undefined,
  asLink: false,
};
