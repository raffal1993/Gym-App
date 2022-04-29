import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setModalClose } from 'app/slices/interfaceSlice';
import { RootState } from 'app/store';
import AddToDbButton from 'components/Atoms/Buttons/AddToDbButton/AddToDbButton';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import ErrorMessage from 'components/Atoms/ErrorMessage/ErrorMessage';
import { Wrapper } from './AddExerciseModal.styled';

interface AddExerciseModalProps {
  type: string;
}

const AddExerciseModal: FC<AddExerciseModalProps> = ({ type }) => {
  const [newExerciseName, setNewExerciseName] = useState<string>('');
  const [isErrorMessage, setIsErrorMessage] = useState<boolean>(false);

  const {
    pages: { subPageID },
  } = useAppSelector((state: RootState) => state);

  const dispatch = useAppDispatch();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewExerciseName(e.target.value);
  };

  const updateExerciseToDB = () => {
    if (newExerciseName.length < 3) {
      setIsErrorMessage(true);
      return;
    }

    dispatch(setModalClose());
    console.log(type);
    console.log(subPageID);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsErrorMessage(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isErrorMessage]);

  return (
    <Wrapper>
      <p className="title">Enter exercise name:</p>
      <input
        maxLength={20}
        autoComplete="off"
        type="text"
        id="newExercise"
        value={newExerciseName}
        onChange={handleInputChange}
      />
      {isErrorMessage && (
        <ErrorMessage className="errorMessage" errorMessage="Name must be at least 3 chars !" />
      )}
      <AddToDbButton buttonText="Add exercise" onClick={updateExerciseToDB}>
        Add Exercise
      </AddToDbButton>
    </Wrapper>
  );
};

export default AddExerciseModal;
