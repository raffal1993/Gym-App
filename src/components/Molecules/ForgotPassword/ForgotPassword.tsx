import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from 'firebase-cfg/firebase-config';
import Email from 'components/Commons/Inputs/Email/Email';
import Button from 'components/Commons/Buttons/CustomButton/CustomButton';
import BackToLogin from 'components/Commons/BackToLogin/BackToLogin';
import ErrorMessage from 'components/Commons/ErrorMessage/ErrorMessage';
import LoginPanelTitle from 'components/Commons/LoginPanelTitle/LoginPanelTitle';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(``);
  const [isSucceed, setIsSucceed] = useState(false);

  const navigate = useNavigate();

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  const handleSubmit = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsSucceed(true);
        setTimeout(() => {
          navigate('/');
        }, 1500);
      })
      .catch(({ code }) => {
        setErrorMessage(code);
      });
  };

  // === CLEAR ERROR MESSAGE ===
  useEffect(() => {
    const interval = setInterval(() => {
      setErrorMessage(``);
    }, 4000);

    return () => clearInterval(interval);
  }, [errorMessage]);

  return (
    <>
      <LoginPanelTitle title="Forgot password?" />

      <Email
        handleSubmit={handleSubmit}
        email={email}
        handleEmail={handleEmail}
        isError={!!errorMessage}
      />

      <Button isError={!!errorMessage} isSucceed={isSucceed} handleClick={handleSubmit}>
        Send password
      </Button>

      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      <BackToLogin />
    </>
  );
};

export default ForgotPassword;
