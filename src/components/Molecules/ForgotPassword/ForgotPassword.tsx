import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from 'firebase-cfg/firebase-config';
import Email from 'components/Atoms/Inputs/Email/Email';
import Button from 'components/Atoms/Buttons/CustomButton/CustomButton';
import BackToLogin from 'components/Atoms/BackToLogin/BackToLogin';
import ErrorMessage from 'components/Atoms/ErrorMessage/ErrorMessage';
import LoginPanelTitle from 'components/Atoms/LoginPanelTitle/LoginPanelTitle';

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>(``);
  const [isSucceed, setIsSucceed] = useState<boolean>(false);

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
