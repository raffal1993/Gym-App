import React, { useEffect, useRef, useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ConstructionIcon from '@mui/icons-material/Construction';
import { animateButton } from 'helpers/animateButton';
import { pagesPaths } from 'utils/staticVariables/pages';
import { ListItemButton, ListItemText, Tab } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  setModalOpen,
  setSidebarItemSelected,
  setSidebarVisibility,
} from 'app/slices/interfaceSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import EditDbButton from 'components/Commons/Buttons/EditDbButton/EditDbButton';
import { v4 as uuid4 } from 'uuid';
import { setSubPageID } from 'app/slices/pagesSlice';
import ArrowPointer from 'components/Commons/ArrowPointer/ArrowPointer';
import useResize from '../../../hooks/useResize';
import {
  SidebarListDesktopStyled,
  SidebarListMobileStyled,
  SliderStyled,
  Wrapper,
} from './Sidebar.styled';
import EditSidebarModal from '../Modals/EditSidebarModal/EditSidebarModal';

const Sidebar = () => {
  const [indexSidebarPage, setIndexSidebarPage] = useState<number | null>(null);

  const { isWidthSmaller } = useResize('sm');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    interface: { isSidebarHide, isEditModeOn, isSidebarItemSelected },
    pages: { mainPage, subPageID, sidebarList },
  } = useAppSelector((state) => state);

  const isSidebarEmpty = sidebarList.length === 0;
  const isSettingsPage = mainPage === pagesPaths.settings.name;
  const isBlinkingAnimationOn = !isSidebarEmpty && !isSidebarItemSelected && !isSettingsPage;

  const location = useLocation();

  const buttonRef = useRef<HTMLButtonElement>(null);

  const optionalNavigate = (name: string) => {
    const subPageName = name.replace(/\s/g, '');
    const settingsPath = pagesPaths.settings.fullPath;

    isSettingsPage && navigate(`${settingsPath}/${subPageName}`);
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

  //===================== SET INDEX SIDEBAR BASESD ON LOCATION IF MAINPAGE === SETTINGS

  useEffect(() => {
    if (isSettingsPage) {
      const index = sidebarList.findIndex(
        (subPage) => !!location.pathname.match(subPage.name.replace(' ', '')),
      );
      setIndexSidebarPage(index === -1 ? null : index);
    }
  }, [location, sidebarList, isSettingsPage, indexSidebarPage]);

  //===================== SET SIDEBAR ITEM SELECTED TRUE/FALSE

  useEffect(() => {
    const sidebarItemSelectedTrue = typeof indexSidebarPage === 'number';
    const sidebarItemSelectedFalse = indexSidebarPage === null || isSidebarEmpty;

    sidebarItemSelectedTrue && dispatch(setSidebarItemSelected(true));
    sidebarItemSelectedFalse && dispatch(setSidebarItemSelected(false));
  }, [dispatch, isSidebarEmpty, indexSidebarPage]);

  //===================== RESET WHEN MAINPAGE CHANGES

  useEffect(() => {
    setIndexSidebarPage(null);
    dispatch(setSubPageID(''));
  }, [mainPage, dispatch]);

  //===================== CHANGE SUBPAGEID

  useEffect(() => {
    if (isSidebarEmpty) {
      dispatch(setSubPageID(''));
      return;
    }

    const isAllowedToChangeSubPageID =
      indexSidebarPage !== null && subPageID !== sidebarList[indexSidebarPage].id;

    if (isAllowedToChangeSubPageID) dispatch(setSubPageID(sidebarList[indexSidebarPage].id));
  }, [subPageID, isSidebarEmpty, sidebarList, indexSidebarPage, dispatch]);

  //===================== GLOWING BUTTON ANIMATION

  useEffect(() => {
    if (buttonRef.current) {
      isSidebarEmpty
        ? animateButton(buttonRef, 'start', 'sidebarButton')
        : animateButton(buttonRef, 'stop', 'sidebarButton');
    }
  }, [isSidebarEmpty, isEditModeOn]);

  return (
    <Wrapper>
      {isWidthSmaller ? (
        <SidebarListMobileStyled
          is_blink_animation_on={isBlinkingAnimationOn.toString()}
          is_settings_page={isSettingsPage.toString()}
          setValue={setIndexSidebarPage}
          value={indexSidebarPage}
        >
          {!isSidebarEmpty &&
            sidebarList.map((el) => (
              <Tab key={uuid4()} label={el.name} onClick={() => optionalNavigate(el.name)} />
            ))}

          {isEditModeOn && (
            <EditDbButton ref={buttonRef} className="editSidebarMobile" onClick={handleOpenModal}>
              <ConstructionIcon />
              {isSidebarEmpty && <ArrowPointer className="arrowPointerMobile" />}
            </EditDbButton>
          )}
        </SidebarListMobileStyled>
      ) : (
        <SidebarListDesktopStyled
          is_settings_page={isSettingsPage.toString()}
          is_sidebar_hide={isSidebarHide.toString()}
          is_blink_animation_on={isBlinkingAnimationOn.toString()}
        >
          {sidebarList.map((el, index) => (
            <ListItemButton
              key={uuid4()}
              selected={indexSidebarPage === index}
              onClick={(event) => handleListItemClick(event, index, el.name)}
            >
              <div className="listNumber">{index + 1}</div>
              <ListItemText primary={el.name} />
            </ListItemButton>
          ))}
          {isEditModeOn && (
            <EditDbButton ref={buttonRef} className="editSidebarDesktop" onClick={handleOpenModal}>
              <ConstructionIcon />
              {isSidebarEmpty && <ArrowPointer className="arrowPointerDesktop" />}
            </EditDbButton>
          )}
        </SidebarListDesktopStyled>
      )}

      <SliderStyled is_sidebar_hide={isSidebarHide.toString()} onClick={handleSidebarVisibility}>
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
