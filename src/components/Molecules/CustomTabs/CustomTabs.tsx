import React, { cloneElement, FC, ReactElement, useState } from 'react';
import { Tab } from '@mui/material';
import EditDbButton from 'components/Atoms/Buttons/EditDbButton/EditDbButton';
import ConstructionIcon from '@mui/icons-material/Construction';
import { v4 as uuidv4 } from 'uuid';
import { SidebarListProps } from '../Sidebar/SidebarTypes';
import { TabsStyled } from './CustomTabs.styled';

interface CustomTabsProps {
  elements?: string[] | SidebarListProps[];
  value?: number | null;
  component?: ReactElement;
  className?: string;
  isSidebarItem?: boolean;
  setValue?: React.Dispatch<React.SetStateAction<number>>;
  handleOpenModal?: () => void;
  isEditModeOn?: boolean;
}

const CustomTabs: FC<CustomTabsProps> = ({
  value,
  elements = [],
  setValue,
  component,
  className,
  isSidebarItem,
  handleOpenModal = () => {},
  isEditModeOn,
}) => {
  const [defaultValue, setDefaultValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, index: number) => {
    if (setValue) setValue(index);
    else setDefaultValue(index);
  };

  return (
    <>
      <TabsStyled
        className={className}
        value={value || defaultValue}
        onChange={handleChange}
        variant="scrollable"
        allowScrollButtonsMobile
        aria-label="scrollable auto tabs example"
      >
        {isSidebarItem
          ? elements.map((el) => <Tab key={uuidv4()} label={(el as SidebarListProps).name} />)
          : elements.map((el) => (
              <Tab
                key={uuidv4()}
                label={component && cloneElement(component, { name: el as string })}
              ></Tab>
            ))}
        {isEditModeOn && (
          <EditDbButton className="buttonAddSubPage" onClick={handleOpenModal}>
            <ConstructionIcon />
          </EditDbButton>
        )}
      </TabsStyled>
    </>
  );
};

export default CustomTabs;

CustomTabs.defaultProps = {
  elements: [],
  value: null,
  component: undefined,
  className: '',
  setValue: () => {},
  isSidebarItem: false,
  handleOpenModal: () => {},
  isEditModeOn: false,
};
