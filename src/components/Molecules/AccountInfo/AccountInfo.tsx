import { ChangeEvent, useEffect, useState } from 'react';
import { auth } from 'firebase-cfg/firebase-config';
import { sendEmailVerification, updateEmail } from 'firebase/auth';
import VerifiedIcon from '@mui/icons-material/Verified';
import SendIcon from '@mui/icons-material/Send';
import ErrorMessage from 'components/Atoms/ErrorMessage/ErrorMessage';
import DangerousSharpIcon from '@mui/icons-material/DangerousSharp';
import ContactMailSharpIcon from '@mui/icons-material/ContactMailSharp';
import { TitleStyled } from '../CardStyled/CardStyled.styled';
import { Wrapper } from './AccountInfo.styled';

const userData = () => {
  const { currentUser } = auth;
  if (currentUser)
    return {
      email: currentUser.email,
      emailVerified: currentUser.emailVerified,
      metadata: currentUser.metadata,
    };
  return {
    email: '',
    emailVerified: false,
    metadata: {},
  };
};

const AccountInfo = () => {
  const [isVerificationEmailSent, setIsVerificationEmailSent] = useState(false);
  const [isEmailUpdated, setIsEmailUpdated] = useState(false);
  const [inputEmail, setInputEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { email, emailVerified, metadata } = userData();

  const handleSendVerificationEmail = () => {
    auth.currentUser &&
      sendEmailVerification(auth.currentUser).then(() => {
        setIsVerificationEmailSent(true);
      });
  };

  const handleEmailOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputEmail(e.currentTarget.value);
  };

  const handleChangeEmail = () => {
    if (inputEmail.length === 0) return setErrorMessage("Email can't be empty");
    auth.currentUser &&
      updateEmail(auth.currentUser, inputEmail)
        .then(() => {
          setIsEmailUpdated(true);
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
    <Wrapper email_verified={emailVerified.toString()}>
      <TitleStyled className="title">Account Info</TitleStyled>
      <p className="accountInfo">
        <span className="description">Account email </span>
        <span className="userInfo">{email}</span>{' '}
      </p>
      <p className="accountInfo">
        <span className="description">Email verified</span>
        <span className="userInfo">
          {emailVerified ? <VerifiedIcon /> : <DangerousSharpIcon />}
        </span>
      </p>
      <p className="accountInfo">
        <span className="description">Account created at </span>
        <span className="userInfo">{metadata.creationTime}</span>
      </p>
      <p className="accountInfo">
        <span className="description">Last login</span>
        <span className="userInfo">{metadata.lastSignInTime}</span>
      </p>
      {!emailVerified && !isVerificationEmailSent && (
        <button onClick={handleSendVerificationEmail} className="sendVerificationEmail">
          Send verification email
          <ContactMailSharpIcon />
        </button>
      )}
      {isVerificationEmailSent && (
        <span className="info">
          Email has been sent. Check your emailbox. Account will be verified after next loggin to
          account and verificated via email.
        </span>
      )}
      {isEmailUpdated ? (
        <span className="info">
          Email has been changed. Check your emailbox. You can login now with new email.
        </span>
      ) : (
        <label className="changeEmail" htmlFor="changeEmail">
          <span>Change email: </span>
          <div>
            <input
              value={inputEmail}
              onChange={(e) => handleEmailOnChange(e)}
              onKeyPress={(e) => e.key === 'Enter' && handleChangeEmail()}
              type="email"
              id="changeEmail"
            />
            <button onClick={handleChangeEmail} type="submit">
              <SendIcon />
            </button>
          </div>
        </label>
      )}

      {errorMessage && <ErrorMessage className="errorMessage" errorMessage={errorMessage} />}
    </Wrapper>
  );
};

export default AccountInfo;
