import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setEditMode } from 'app/slices/interfaceSlice';
import { RootState } from 'app/store';
import CloseIcon from '@mui/icons-material/Close';
import ConstructionIcon from '@mui/icons-material/Construction';
import { EditModeButtonStyled } from './EditModeButton.styled';

const EditModeButton = () => {
  const {
    interface: { isEditModeOn },
  } = useAppSelector((state: RootState) => state);

  const dispatch = useAppDispatch();

  const handleHideAddExercise = () => {
    dispatch(setEditMode(!isEditModeOn));
  };
  return (
    <EditModeButtonStyled onClick={handleHideAddExercise}>
      {isEditModeOn ? <CloseIcon /> : <ConstructionIcon />}
    </EditModeButtonStyled>
  );
};

export default EditModeButton;
