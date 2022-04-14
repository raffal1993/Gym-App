import React, { FC, useEffect, useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ListItemButton, ListItemText, useTheme } from '@mui/material';
import { RootState } from 'app/store';
import { setSidebarVisibility } from 'app/slices/interfaceSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { SidebarListStyled, SliderStyled, Wrapper } from './Sidebar.styled';
import CustomTabs from '../CustomTabs/CustomTabs';

export interface SidebarProps {
  sidebarList: string[];
}

const Sidebar: FC<SidebarProps> = ({ sidebarList = [] }) => {
  const [value, setValue] = useState(0);
  const {
    breakpoints: { values },
  } = useTheme();

  const [isSmallWidth, setIsSmallWidth] = useState<boolean>(window.innerWidth < values.sm);

  const dispatch = useAppDispatch();

  const { isSidebarHide } = useAppSelector((state: RootState) => state.interface);

  useEffect(() => {
    const resize = () => {
      if (window.innerWidth < values.sm === isSmallWidth) return;
      setIsSmallWidth(window.innerWidth < values.sm);
    };
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [isSmallWidth, values.sm]);

  const handleListItemClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setValue(index);
  };

  const handleSidebarVisibility = () => {
    dispatch(setSidebarVisibility());
  };

  return (
    <Wrapper>
      {isSmallWidth ? (
        <CustomTabs elements={sidebarList} setValue={setValue} value={value} />
      ) : (
        <SidebarListStyled is_sidebar_hide={isSidebarHide!.toString()}>
          {sidebarList.map((el, index) => (
            <ListItemButton
              key={`${el + index}`}
              selected={value === index}
              onClick={(event) => handleListItemClick(event, index)}
            >
              <div className="listNumber">{index + 1}</div>
              <ListItemText primary={el} />
            </ListItemButton>
          ))}
        </SidebarListStyled>
      )}

      <SliderStyled is_sidebar_hide={isSidebarHide!.toString()} onClick={handleSidebarVisibility}>
        {isSidebarHide ? (
          <ArrowForwardIosIcon fontSize="large" />
        ) : (
          <ArrowBackIosNewIcon fontSize="large" />
        )}
      </SliderStyled>
    </Wrapper>
  );
};

export default Sidebar;
