import { useEffect, useState } from 'react';
import { auth } from 'firebase-cfg/firebase-config';
import { sendEmailVerification } from 'firebase/auth';
import ErrorMessage from 'components/Commons/ErrorMessage/ErrorMessage';
import ContactMailSharpIcon from '@mui/icons-material/ContactMailSharp';
import { Wrapper } from './AccountInfo.styled';
import AccountInfoInformations from '../AccountInfoInformations/AccountInfoInformations';
import AccountInfoChangeEmail from '../AccountInfoChangeEmail/AccountInfoChangeEmail';

const userData = () => {
  const { currentUser } = auth;
  if (currentUser) {
    return {
      email: currentUser.email,
      emailVerified: currentUser.emailVerified,
      metadata: currentUser.metadata,
    };
  }
  return {
    email: '',
    emailVerified: false,
    metadata: {},
  };
};

const AccountInfo = () => {
  const [isVerificationEmailSent, setIsVerificationEmailSent] = useState(false);
  const [isEmailUpdated, setIsEmailUpdated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { email, emailVerified, metadata } = userData();

  const handleSendVerificationEmail = () => {
    auth.currentUser &&
      sendEmailVerification(auth.currentUser).then(() => {
        setIsVerificationEmailSent(true);
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
      <AccountInfoInformations email={email} emailVerified={emailVerified} metadata={metadata} />
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
        <span className="info">Email has been changed. You can login now with new email.</span>
      ) : (
        <AccountInfoChangeEmail
          email={email}
          setErrorMessage={setErrorMessage}
          setIsEmailUpdated={setIsEmailUpdated}
        />
      )}

      {errorMessage && <ErrorMessage className="errorMessage" errorMessage={errorMessage} />}
    </Wrapper>
  );
};

export default AccountInfo;
