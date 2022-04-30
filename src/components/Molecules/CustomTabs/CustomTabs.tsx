import { Tab } from '@mui/material';
import AddToDbButton from 'components/Atoms/Buttons/AddToDbButton/AddToDbButton';
import React, { cloneElement, FC, ReactElement, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SidebarListProps } from '../Sidebar/SidebarProps';
import { TabsStyled } from './CustomTabs.styled';

interface CustomTabsProps {
  elements?: string[] | SidebarListProps[];
  value?: number | null;
  component?: ReactElement;
  className?: string;
  isSidebarItem?: boolean;
  setValue?: React.Dispatch<React.SetStateAction<number>>;
  handleOpenModal?: () => void;
  isAddModeOn?: boolean;
}

const CustomTabs: FC<CustomTabsProps> = ({
  value,
  elements = [],
  setValue,
  component,
  className,
  isSidebarItem,
  handleOpenModal,
  isAddModeOn,
}) => {
  const [defaultValue, setDefaultValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, index: number) => {
    if (setValue) setValue(index);
    else setDefaultValue(index);
  };

  const renderAddButton = isSidebarItem && handleOpenModal && isAddModeOn && elements.length < 10;

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
        {renderAddButton && (
          <AddToDbButton className="buttonAddSubPage" onClick={handleOpenModal} />
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
  isAddModeOn: false,
};
