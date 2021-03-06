import EditDbButton from 'components/Atoms/Buttons/EditDbButton/EditDbButton';
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import ErrorMessage from 'components/Atoms/ErrorMessage/ErrorMessage';
import { Wrapper } from './AddEditNameModal.styled';
import { AddEditNameModalProps } from '../ModalsTypes';

const AddEditNameModal: FC<AddEditNameModalProps> = ({
  title,
  buttonText,
  className,
  inputType = 'text',
  updateDbCallback,
  checkIfAllIsValid,
}) => {
  const [name, setName] = useState<string>('');
  const [isErrorMessage, setIsErrorMessage] = useState<boolean>(false);

  const ref = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const updateToDB = () => {
    if (name.length < 3) {
      setIsErrorMessage(true);
      return;
    }
    const isValid = checkIfAllIsValid ? checkIfAllIsValid() : true;
    if (updateDbCallback && isValid) {
      updateDbCallback(name);
      setName('');
    }
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
    <Wrapper className={className}>
      <p className="title">{title}</p>
      <input
        onKeyDown={(e) => e.key === 'Enter' && updateToDB()}
        ref={ref}
        maxLength={30}
        autoComplete="off"
        type={inputType}
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
