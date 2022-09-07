import SendIcon from '@mui/icons-material/Send';
import ErrorMessage from 'components/Commons/ErrorMessage/ErrorMessage';
import { updateEmailToDB } from 'firebase-cfg/database/user/update';
import { auth } from 'firebase-cfg/firebase-config';
import { updateEmail } from 'firebase/auth';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { AccountInfoChangeEmailStyled } from './AccountInfoChangeEmail.styled';

interface AccountInfoChangeEmailProps {
  email: string | null;
}

const AccountInfoChangeEmail: FC<AccountInfoChangeEmailProps> = (props) => {
  const { email } = props;

  const [inputEmail, setInputEmail] = useState('');
  const [isEmailUpdated, setIsEmailUpdated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputEmail(e.currentTarget.value);
  };

  const handleChangeEmail = () => {
    if (email === 'test@wp.pl') return setErrorMessage("You can't change test@wp.pl email");
    if (inputEmail.length === 0) return setErrorMessage("Email can't be empty");

    auth.currentUser &&
      updateEmail(auth.currentUser, inputEmail)
        .then(() => {
          setIsEmailUpdated(true);
          updateEmailToDB(inputEmail);
        })
        .catch((error) => {
          setErrorMessage(error.message.replace('Firebase: ', ''));
        });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErrorMessage('');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [errorMessage]);

  return (
    <AccountInfoChangeEmailStyled htmlFor="changeEmail">
      {isEmailUpdated ? (
        <span className="info">Email has been changed. You can login now with new email.</span>
      ) : (
        <>
          <span>Change email: </span>
          <div>
            <input
              value={inputEmail}
              onChange={handleEmailOnChange}
              onKeyPress={(e) => e.key === 'Enter' && handleChangeEmail()}
              type="email"
              id="changeEmail"
            />
            <button onClick={handleChangeEmail} type="submit">
              <SendIcon />
            </button>
          </div>
        </>
      )}
      {errorMessage && <ErrorMessage className="errorMessage" errorMessage={errorMessage} />}
    </AccountInfoChangeEmailStyled>
  );
};

export default AccountInfoChangeEmail;
