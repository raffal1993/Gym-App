import { useState } from 'react';
import { auth } from 'firebase-cfg/firebase-config';
import { sendEmailVerification } from 'firebase/auth';
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

  const { email, emailVerified, metadata } = userData();

  const handleSendVerificationEmail = () => {
    auth.currentUser &&
      sendEmailVerification(auth.currentUser).then(() => {
        setIsVerificationEmailSent(true);
      });
  };

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

      <AccountInfoChangeEmail email={email} />
    </Wrapper>
  );
};

export default AccountInfo;
