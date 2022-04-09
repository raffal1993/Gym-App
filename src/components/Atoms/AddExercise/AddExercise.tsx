import { FC } from 'react';
import { importImages } from 'helpers/importImages';
import AddIcon from '@mui/icons-material/Add';
import { Wrapper } from './AddExercise.styled';

const { images } = importImages();

interface AddExerciseProps {
  name?: string;
}

const AddExercise: FC<AddExerciseProps> = ({ name = '' }) => {
  return (
    <Wrapper>
      <h5>{name}</h5>
      <img src={images[name]} alt="" />
      <AddIcon />
    </Wrapper>
  );
};

export default AddExercise;

AddExercise.defaultProps = {
  name: '',
};
