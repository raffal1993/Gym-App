import SendIcon from '@mui/icons-material/Send';
import { updateEmailToDB } from 'firebase-cfg/database/user/update';
import { auth } from 'firebase-cfg/firebase-config';
import { updateEmail } from 'firebase/auth';
import React, { ChangeEvent, FC, useState } from 'react';
import { AccountInfoChangeEmailStyled } from './AccountInfoChangeEmail.styled';

interface AccountInfoChangeEmailProps {
  email: string | null;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setIsEmailUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AccountInfoChangeEmail: FC<AccountInfoChangeEmailProps> = (props) => {
  const { email, setErrorMessage, setIsEmailUpdated } = props;

  const [inputEmail, setInputEmail] = useState('');

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
  return (
    <AccountInfoChangeEmailStyled htmlFor="changeEmail">
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
    </AccountInfoChangeEmailStyled>
  );
};

export default AccountInfoChangeEmail;
