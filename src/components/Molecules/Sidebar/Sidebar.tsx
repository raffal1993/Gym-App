import React, { useEffect, useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ListItemButton, ListItemText, Tab, useTheme } from '@mui/material';
import { RootState } from 'app/store';
import { setSidebarVisibility } from 'app/slices/interfaceSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { SidebarListStyled, SliderStyled, TabsStyled, Wrapper } from './Sidebar.styled';

export type SidebarElements = string[];

export default function Sidebar({ elements = [] }: { elements?: SidebarElements }) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [value, setValue] = useState(0);
  const [width, setWidth] = useState<number>(window.innerWidth);

  const dispatch = useAppDispatch();

  const {
    breakpoints: { values },
  } = useTheme();

  const { isSidebarHide } = useAppSelector((state: RootState) => state.interface);

  useEffect(() => {
    const resize = () => {
      const windowWidth = window.innerWidth as number;
      setWidth(windowWidth);
    };
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleListItemClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSidebarVisibility = () => {
    dispatch(setSidebarVisibility());
  };

  return (
    <Wrapper>
      {width < values.sm ? (
        <TabsStyled
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable auto tabs example"
        >
          {elements.map((el, index) => (
            <Tab
              key={`${el + index}`}
              label={el}
              onClick={(event) => handleListItemClick(event, index)}
            ></Tab>
          ))}
        </TabsStyled>
      ) : (
        <SidebarListStyled is_sidebar_hide={isSidebarHide!.toString()}>
          {elements.map((el, index) => (
            <ListItemButton
              key={`${el + index}`}
              selected={selectedIndex === index}
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
}

Sidebar.defaultProps = {
  elements: [],
};
