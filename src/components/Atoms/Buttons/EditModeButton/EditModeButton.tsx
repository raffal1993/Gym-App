import { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setAddMode } from 'app/slices/interfaceSlice';
import { RootState } from 'app/store';
import CloseIcon from '@mui/icons-material/Close';
import ConstructionIcon from '@mui/icons-material/Construction';
import { EditModeButtonStyled } from './EditModeButton.styled';

interface EditModeButtonProps {
  className?: string;
}

const EditModeButton: FC<EditModeButtonProps> = ({ className }) => {
  const {
    interface: { isAddModeOn },
  } = useAppSelector((state: RootState) => state);

  const dispatch = useAppDispatch();

  const handleHideAddExercise = () => {
    dispatch(setAddMode(!isAddModeOn));
  };
  return (
    <EditModeButtonStyled className={className} onClick={handleHideAddExercise}>
      {isAddModeOn ? <CloseIcon /> : <ConstructionIcon />}
    </EditModeButtonStyled>
  );
};

export default EditModeButton;

EditModeButton.defaultProps = {
  className: '',
};
