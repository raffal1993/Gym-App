import { FC } from 'react';
import { importImages } from 'helpers/importImages';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { AddExerciseProps } from 'components/Organisms/Workout/WorkoutTypes';
import { setModalClose, setModalOpen } from 'app/slices/interfaceSlice';
import { RootState } from 'app/store';
import { addExerciseToDB } from 'firebase-cfg/database/workout/add';
import AddEditNameModal from 'components/Molecules/Modals/AddEditNameModal/AddEditNameModal';
import { Wrapper } from './AddExercise.styled';

const { images } = importImages();

const AddExercise: FC<AddExerciseProps> = ({ name = '', isDisabled }) => {
  const dispatch = useAppDispatch();
  const {
    pages: { subPageID },
  } = useAppSelector((state: RootState) => state);

  const addExercise = (newName: string) => {
    if (subPageID) addExerciseToDB(subPageID, newName, name);
    dispatch(setModalClose());
  };

  const handleOpenModal = () => {
    dispatch(
      setModalOpen(
        <AddEditNameModal
          updateDbCallback={addExercise}
          title="Enter exercise name: "
          buttonText="Add exercise"
        />,
      ),
    );
  };

  return images ? (
    <Wrapper is_disabled={isDisabled.toString()} onClick={handleOpenModal}>
      <h5>{name}</h5>
      <img src={images[name]} alt="imageExercise" />
      <AddIcon />
    </Wrapper>
  ) : null;
};

export default AddExercise;
