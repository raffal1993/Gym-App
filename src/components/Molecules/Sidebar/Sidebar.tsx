import React, { useEffect, useRef, useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ConstructionIcon from '@mui/icons-material/Construction';
import { animateButton } from 'helpers/animateButton';
import { pagesPaths } from 'helpers/staticVariables';
import { ListItemButton, ListItemText, Tab } from '@mui/material';
import { RootState } from 'app/store';
import { useNavigate } from 'react-router-dom';
import { setModalOpen, setSidebarVisibility } from 'app/slices/interfaceSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import EditDbButton from 'components/Atoms/Buttons/EditDbButton/EditDbButton';
import { v4 as uuidv4 } from 'uuid';
import { setSubPageID } from 'app/slices/pagesSlice';
import SidebarTabs from '../CustomTabs/CustomTabs';
import useResize from '../../../hooks/useResize';
import { SidebarListStyled, SliderStyled, Wrapper } from './Sidebar.styled';
import EditSidebarModal from '../Modals/EditSidebarModal/EditSidebarModal';

const Sidebar = () => {
  const [indexSidebarPage, setIndexSidebarPage] = useState(0);
  const { isWidthSmaller } = useResize('sm');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    interface: { isSidebarHide, isEditModeOn },
    pages: { mainPage, subPageID, sidebarList },
  } = useAppSelector((state: RootState) => state);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const optionalNavigate = (name: string) => {
    mainPage === pagesPaths.settings.name &&
      navigate(`${pagesPaths.settings.fullPath}/${name.replace(/\s/g, '')}`);
  };

  const handleListItemClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    name: string,
  ) => {
    setIndexSidebarPage(index);
    optionalNavigate(name);
  };

  const handleSidebarVisibility = () => {
    dispatch(setSidebarVisibility());
  };

  const handleOpenModal = () => {
    dispatch(setModalOpen(<EditSidebarModal setIndexSidebarPage={setIndexSidebarPage} />));
  };

  useEffect(() => {
    setIndexSidebarPage(0);
  }, [mainPage]);

  useEffect(() => {
    if (sidebarList.length === 0) {
      dispatch(setSubPageID(''));
      return;
    }
    if (subPageID === sidebarList[indexSidebarPage].id) return;

    dispatch(setSubPageID(sidebarList[indexSidebarPage].id));
  }, [subPageID, sidebarList, indexSidebarPage, dispatch]);

  useEffect(() => {
    if (buttonRef.current) {
      sidebarList.length <= 0
        ? animateButton(buttonRef, 'start', 'sidebarButton')
        : animateButton(buttonRef, 'stop', 'sidebarButton');
    }
  }, [sidebarList, isEditModeOn]);

  return (
    <Wrapper is_settings_page={(mainPage === pagesPaths.settings.name).toString()}>
      {isWidthSmaller ? (
        <SidebarTabs className="sidebar" setValue={setIndexSidebarPage} value={indexSidebarPage}>
          {sidebarList.length > 0 &&
            sidebarList.map((el) => (
              <Tab key={uuidv4()} label={el.name} onClick={() => optionalNavigate(el.name)} />
            ))}
          {isEditModeOn && (
            <EditDbButton ref={buttonRef} className="buttonAddSubPage" onClick={handleOpenModal}>
              <ConstructionIcon />
            </EditDbButton>
          )}
        </SidebarTabs>
      ) : (
        <SidebarListStyled className="sidebar" is_sidebar_hide={isSidebarHide!.toString()}>
          {sidebarList.map((el, index) => (
            <ListItemButton
              key={uuidv4()}
              selected={indexSidebarPage === index}
              onClick={(event) => handleListItemClick(event, index, el.name)}
            >
              <div className="listNumber">{index + 1}</div>
              <ListItemText primary={el.name} />
            </ListItemButton>
          ))}
          {isEditModeOn && (
            <EditDbButton ref={buttonRef} className="buttonAddSubPage" onClick={handleOpenModal}>
              <ConstructionIcon />
            </EditDbButton>
          )}
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
