import EditDbButton from 'components/Commons/Buttons/EditDbButton/EditDbButton';
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import ErrorMessage from 'components/Commons/ErrorMessage/ErrorMessage';
import { Wrapper } from './AddEditNameModal.styled';
import { AddEditNameModalProps } from '../ModalsTypes';

const MIN_NAME_LENGTH = 3;

const AddEditNameModal: FC<AddEditNameModalProps> = (props) => {
  const {
    title,
    buttonText,
    className,
    inputType = 'text',
    updateDbCallback,
    checkIfAllIsValid,
  } = props;

  const [name, setName] = useState('');
  const [isErrorMessage, setIsErrorMessage] = useState(false);

  const ref = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.replace(/^\s+/g, ''));
  };

  const updateToDB = () => {
    if (name.length < MIN_NAME_LENGTH) {
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
        data-testid="addEditNameInput"
      />
      {isErrorMessage && (
        <ErrorMessage
          className="errorMessage"
          errorMessage={`Name must be at least ${MIN_NAME_LENGTH} chars !`}
        />
      )}
      <EditDbButton onClick={updateToDB}>{buttonText}</EditDbButton>
    </Wrapper>
  );
};

export default AddEditNameModal;
