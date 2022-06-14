import { useEffect, useRef } from 'react';
import { animateButton } from 'helpers/animateButton';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setEditMode } from 'app/slices/interfaceSlice';
import { RootState } from 'app/store';
import CloseIcon from '@mui/icons-material/Close';
import ConstructionIcon from '@mui/icons-material/Construction';
import { EditModeButtonStyled } from './EditModeButton.styled';

const EditModeButton = () => {
  const {
    interface: { isEditModeOn },
    pages: { sidebarList },
  } = useAppSelector((state: RootState) => state);

  const ref = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();

  const handleHideAddExercise = () => {
    dispatch(setEditMode(!isEditModeOn));
  };

  useEffect(() => {
    if (ref.current) {
      sidebarList.length <= 0 && !isEditModeOn
        ? animateButton(ref, 'start', 'editModeButton')
        : animateButton(ref, 'stop', 'editModeButton');
    }
  }, [sidebarList, isEditModeOn]);

  return (
    <EditModeButtonStyled ref={ref} onClick={handleHideAddExercise}>
      {isEditModeOn ? <CloseIcon /> : <ConstructionIcon />}
    </EditModeButtonStyled>
  );
};

export default EditModeButton;
