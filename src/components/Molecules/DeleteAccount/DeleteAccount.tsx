import { TextField } from '@mui/material';
import CustomButton from 'components/Atoms/Buttons/CustomButton/CustomButton';
import ErrorMessage from 'components/Atoms/ErrorMessage/ErrorMessage';
import { FormControlStyled } from 'components/Atoms/Inputs/Inputs.styled';
import { removeUserFromDB } from 'firebase-cfg/database/user/remove';
import { auth } from 'firebase-cfg/firebase-config';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TitleStyled } from '../CardStyled/CardStyled.styled';
import { Wrapper } from './DeleteAccount.styled';

const DeleteAccount = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');

  const navigate = useNavigate();

  const handleRemoveAccount = () => {
    const email = auth.currentUser?.email;
    if (!email) return setErrorMessage('An error has occurred');
    if (email === 'test@wp.pl') return setErrorMessage("Can't delete account test@wp.pl");

    if (email !== inputValue)
      return setErrorMessage('Email address is different than your account email address.');

    removeUserFromDB()
      .then(() => {
        navigate('/');
      })
      .catch(() => {
        setErrorMessage('An error has occurred');
      });
  };

  const handleInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErrorMessage('');
    }, 2000);
    return () => clearTimeout(timeout);
  }, [errorMessage]);

  return (
    <Wrapper>
      <TitleStyled>Are you sure You want to remove your account?</TitleStyled>
      <p className="info">Type your email address to delete account</p>
      <FormControlStyled className="formControl">
        <TextField
          onKeyPress={(e) => e.key === 'Enter' && handleRemoveAccount()}
          error={!!errorMessage}
          value={inputValue}
          onChange={handleInputValueChange}
        />
      </FormControlStyled>
      <CustomButton className="button" isError={!!errorMessage} handleClick={handleRemoveAccount}>
        Delete Account
      </CustomButton>
      {errorMessage && <ErrorMessage className="errorMessage" errorMessage={errorMessage} />}
    </Wrapper>
  );
};

export default DeleteAccount;
