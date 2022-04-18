import React, { FC, useEffect, useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ListItemButton, ListItemText } from '@mui/material';
import { RootState } from 'app/store';
import { setSidebarVisibility } from 'app/slices/interfaceSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { v4 as uuidv4 } from 'uuid';
import { setPages } from 'app/slices/pagesSlice';
import CustomTabs from '../CustomTabs/CustomTabs';
import useResize from '../../../hooks/useResize';
import { SidebarListStyled, SliderStyled, Wrapper } from './Sidebar.styled';

export interface SidebarProps {
  sidebarList: string[];
}

const Sidebar: FC<SidebarProps> = ({ sidebarList = [] }) => {
  const [value, setValue] = useState(0);
  const { isWidthSmaller } = useResize('sm');
  const dispatch = useAppDispatch();
  const {
    interface: { isSidebarHide },
    pages: { mainPage },
  } = useAppSelector((state: RootState) => state);

  const handleListItemClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setValue(index);
  };

  useEffect(() => {
    setValue(0);
  }, [mainPage]);

  useEffect(() => {
    dispatch(setPages({ subPage: (value + 1).toString() }));
    if (sidebarList.length === 0) {
      dispatch(setPages({ subPage: '0' }));
    }
  }, [value, dispatch, mainPage, sidebarList]);

  const handleSidebarVisibility = () => {
    dispatch(setSidebarVisibility());
  };

  return (
    <Wrapper>
      {isWidthSmaller ? (
        <CustomTabs asLink elements={sidebarList} setValue={setValue} value={value} />
      ) : (
        <SidebarListStyled is_sidebar_hide={isSidebarHide!.toString()}>
          {sidebarList.map((el, index) => (
            <ListItemButton
              key={uuidv4()}
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
