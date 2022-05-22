import EditDbButton from 'components/Atoms/Buttons/EditDbButton/EditDbButton';
import { ChangeEvent, FC, KeyboardEvent, useEffect, useRef, useState } from 'react';
import ErrorMessage from 'components/Atoms/ErrorMessage/ErrorMessage';
import { Wrapper } from './AddEditNameModal.styled';

interface AddEditNameModalProps {
  className?: string;
  title: string;
  buttonText: string;
  updateDbCallback: (newName: string) => void;
}

const AddEditNameModal: FC<AddEditNameModalProps> = ({
  title,
  buttonText,
  className,
  updateDbCallback,
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
    if (updateDbCallback) updateDbCallback(name);
    setName('');
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
  className: '',
};
