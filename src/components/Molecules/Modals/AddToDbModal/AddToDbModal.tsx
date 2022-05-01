import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setModalClose } from 'app/slices/interfaceSlice';
import { RootState } from 'app/store';
import AddToDbButton from 'components/Atoms/Buttons/AddToDbButton/AddToDbButton';
import { ChangeEvent, FC, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { addExerciseToDB, addSubPageToDB, updateSubPageName } from 'firebase-cfg/database';
import { SidebarListProps } from 'components/Molecules/Sidebar/SidebarProps';
import ErrorMessage from 'components/Atoms/ErrorMessage/ErrorMessage';
import { Wrapper } from './AddToDbModal.styled';

interface AddToDbModalProps {
  type?: string;
  title: string;
  buttonText: string;
  typeOfAddition: 'addExercise' | 'addSubPage' | 'changeSubPage';
  subPageDataForChange?: SidebarListProps;
}

const AddToDbModal: FC<AddToDbModalProps> = ({
  type,
  title,
  typeOfAddition,
  buttonText,
  subPageDataForChange,
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
    <Wrapper>
      <p className="title">{title}</p>
      <input
        onKeyDown={handleEnterKey}
        ref={ref}
        maxLength={30}
        autoComplete="off"
        type="text"
        value={name}
        onChange={handleInputChange}
        placeholder={subPageDataForChange?.name || ''}
      />
      {isErrorMessage && (
        <ErrorMessage className="errorMessage" errorMessage="Name must be at least 3 chars !" />
      )}
      <AddToDbButton onClick={updateToDB}>{buttonText}</AddToDbButton>
    </Wrapper>
  );
};

export default AddToDbModal;

AddToDbModal.defaultProps = {
  type: '',
  subPageDataForChange: undefined,
};
