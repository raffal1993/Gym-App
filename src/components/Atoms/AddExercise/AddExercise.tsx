import { FC } from 'react';
import { importImages } from 'helpers/importImages';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch } from 'app/hooks';
import { setModalOpen } from 'app/slices/interfaceSlice';
import AddToDbModal from 'components/Molecules/Modals/AddToDbModal/AddToDbModal';
import { Wrapper } from './AddExercise.styled';

const { images } = importImages();

interface AddExerciseProps {
  name?: string;
}

const AddExercise: FC<AddExerciseProps> = ({ name = '' }) => {
  const dispatch = useAppDispatch();

  const handleOpenModal = () => {
    dispatch(
      setModalOpen(
        <AddToDbModal typeOfAddition="exercise" type={name} title="Enter exercise name: " />,
      ),
    );
  };

  return images ? (
    <Wrapper onClick={handleOpenModal}>
      <h5>{name}</h5>
      <img src={images[name]} alt="" />
      <AddIcon />
    </Wrapper>
  ) : null;
};

export default AddExercise;

AddExercise.defaultProps = {
  name: '',
};
