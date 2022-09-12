import { useEffect, useRef } from 'react';
import { animateButton } from 'helpers/animateButton';
import ArrowPointer from 'components/Commons/ArrowPointer/ArrowPointer';
import useDelay from 'hooks/useDelay';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setEditMode } from 'app/slices/interfaceSlice';
import CloseIcon from '@mui/icons-material/Close';
import ConstructionIcon from '@mui/icons-material/Construction';
import { EditModeButtonStyled } from './EditModeButton.styled';

const EditModeButton = () => {
  const {
    interface: { isEditModeOn },
    pages: { sidebarList, mainPage },
  } = useAppSelector((state) => state);

  const { isDelayed } = useDelay(300, mainPage);

  const ref = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();

  const handleHideAddExercise = () => {
    dispatch(setEditMode(!isEditModeOn));
  };

  const isSidebarEmpty = sidebarList.length === 0;
  const showArrowPointer = isSidebarEmpty && !isEditModeOn && !isDelayed;

  useEffect(() => {
    if (!ref.current && isDelayed) return;
    isSidebarEmpty && !isEditModeOn && !isDelayed
      ? animateButton(ref, 'start', 'editModeButton')
      : animateButton(ref, 'stop', 'editModeButton');
  }, [isSidebarEmpty, isEditModeOn, isDelayed]);

  return (
    <EditModeButtonStyled ref={ref} onClick={handleHideAddExercise}>
      {isEditModeOn ? <CloseIcon /> : <ConstructionIcon />}
      {showArrowPointer && <ArrowPointer className="arrowPointer" />}
    </EditModeButtonStyled>
  );
};

export default EditModeButton;
