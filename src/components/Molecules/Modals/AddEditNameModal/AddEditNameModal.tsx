import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setModalClose } from 'app/slices/interfaceSlice';
import { RootState } from 'app/store';
import EditDbButton from 'components/Atoms/Buttons/EditDbButton/EditDbButton';
import { ChangeEvent, FC, KeyboardEvent, useEffect, useRef, useState } from 'react';
import {
  addExerciseToDB,
  addSubPageToDB,
  updateExerciseName,
  updateSubPageName,
} from 'firebase-cfg/database';
import { SidebarListProps } from 'components/Molecules/Sidebar/SidebarProps';
import ErrorMessage from 'components/Atoms/ErrorMessage/ErrorMessage';
import { Wrapper } from './AddEditNameModal.styled';
import { EditNameExercise } from '../ModalsProps';

interface AddEditNameModalProps {
  className?: string;
  type?: string;
  title: string;
  buttonText: string;
  typeOfAddition: 'addExercise' | 'addSubPage' | 'changeSubPage' | 'changeExercise';
  subPageDataForChange?: SidebarListProps;
  nameDataForChange?: EditNameExercise;
}

const AddEditNameModal: FC<AddEditNameModalProps> = ({
  type,
  title,
  typeOfAddition,
  buttonText,
  subPageDataForChange,
  className,
  nameDataForChange,
}) => {
  const [name, setName] = useState<string>('');
  const [isErrorMessage, setIsErrorMessage] = useState<boolean>(false);

  const ref = useRef<HTMLInputElement>(null);

  const {
    pages: { subPageID, mainPage },
  } = useAppSelector((state: RootState) => state);

  const dispatch = useAppDispatch();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.toUpperCase());
  };

  const updateToDB = () => {
    if (name.length < 3) {
      setIsErrorMessage(true);
      return;
    }

    switch (typeOfAddition) {
      case 'addSubPage':
        if (mainPage) addSubPageToDB(mainPage, name);

        break;
      case 'addExercise':
        if (subPageID && type) addExerciseToDB(subPageID, name, type);
        break;

      case 'changeSubPage':
        if (mainPage && subPageDataForChange)
          updateSubPageName(mainPage, subPageDataForChange, name);
        break;
      case 'changeExercise':
        if (subPageID && nameDataForChange)
          updateExerciseName(
            subPageID,
            nameDataForChange.exerciseID,
            nameDataForChange.versionIndex,
            name,
          );
        break;

      default:
        return;
    }
    setName('');

    if (typeOfAddition === 'addExercise') dispatch(setModalClose());
  };

  const handleEnterKey = (e: KeyboardEvent) => {
    e.key === 'Enter' && updateToDB();
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsErrorMessage(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isErrorMessage]);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <Wrapper className={className || undefined}>
      <p className="title">{title}</p>
      <input
        onKeyDown={handleEnterKey}
        ref={ref}
        maxLength={30}
        autoComplete="off"
        type="text"
        value={name}
        onChange={handleInputChange}
      />
      {isErrorMessage && (
        <ErrorMessage className="errorMessage" errorMessage="Name must be at least 3 chars !" />
      )}
      <EditDbButton onClick={updateToDB}>{buttonText}</EditDbButton>
    </Wrapper>
  );
};

export default AddEditNameModal;

AddEditNameModal.defaultProps = {
  type: '',
  subPageDataForChange: undefined,
  className: '',
  nameDataForChange: undefined,
};
