import React, { useEffect, useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ConstructionIcon from '@mui/icons-material/Construction';
import { ListItemButton, ListItemText } from '@mui/material';
import { RootState } from 'app/store';
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
  const {
    interface: { isSidebarHide, isEditModeOn },
    pages: { mainPage, subPageID, sidebarList },
  } = useAppSelector((state: RootState) => state);

  const handleListItemClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setIndexSidebarPage(index);
  };

  useEffect(() => {
    setIndexSidebarPage(0);
  }, [mainPage]);

  useEffect(() => {
    if (!sidebarList || sidebarList.length === 0) {
      dispatch(setSubPageID(''));
      return;
    }
    if (subPageID === sidebarList[indexSidebarPage].id) return;

    dispatch(setSubPageID(sidebarList[indexSidebarPage].id));
  }, [subPageID, sidebarList, indexSidebarPage, dispatch]);

  const handleSidebarVisibility = () => {
    dispatch(setSidebarVisibility());
  };

  const handleOpenModal = () => {
    dispatch(setModalOpen(<EditSidebarModal setIndexSidebarPage={setIndexSidebarPage} />));
  };

  return (
    <Wrapper>
      {isWidthSmaller ? (
        <SidebarTabs
          handleOpenModal={handleOpenModal}
          isEditModeOn={isEditModeOn}
          isSidebarItem
          elements={sidebarList}
          setValue={setIndexSidebarPage}
          value={indexSidebarPage}
        />
      ) : (
        <SidebarListStyled is_sidebar_hide={isSidebarHide!.toString()}>
          {sidebarList &&
            sidebarList.map((el, index) => (
              <ListItemButton
                key={uuidv4()}
                selected={indexSidebarPage === index}
                onClick={(event) => handleListItemClick(event, index)}
              >
                <div className="listNumber">{index + 1}</div>
                <ListItemText primary={el.name} />
              </ListItemButton>
            ))}
          {isEditModeOn && (
            <EditDbButton className="buttonAddSubPage" onClick={handleOpenModal}>
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
