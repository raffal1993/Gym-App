import { ChangeEvent, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'firebase-cfg/firebase-config';
import { addNewUserToDB } from 'firebase-cfg/database/user/add';
import Email from 'components/Commons/Inputs/Email/Email';
import BackToLogin from 'components/Commons/BackToLogin/BackToLogin';
import Password from 'components/Commons/Inputs/Password/Password';
import ErrorMessage from 'components/Commons/ErrorMessage/ErrorMessage';
import Button from 'components/Commons/Buttons/CustomButton/CustomButton';
import LoginPanelTitle from 'components/Commons/LoginPanelTitle/LoginPanelTitle';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'app/hooks';
import { pagesPaths } from 'utils/staticVariables/pages';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmSetPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(``);
  const [isSucceed, setIsSucceed] = useState(false);

  const navigate = useNavigate();

  const {
    pages: { mainPage },
  } = useAppSelector((state) => state);

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleConfirmPassword = (e: ChangeEvent<HTMLInputElement>) =>
    setConfirmSetPassword(e.target.value);

  // === CREATE NEW USER WITH EMAIL AND PASSWORD ===
  const handleRegister = () => {
    if (password !== confirmPassword && email) return setErrorMessage(`Passwords are different`);

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const { email, uid } = res.user;
        if (email && uid) {
          addNewUserToDB(email, uid);
          setTimeout(() => {
            navigate(`${pagesPaths.dashboard.fullPath}/${mainPage}`);
          }, 1500);
        } else return Promise.reject();
        setIsSucceed(true);
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
      <LoginPanelTitle title="Register" />
      <Email
        handleSubmit={handleRegister}
        email={email}
        handleEmail={handleEmail}
        isError={!!errorMessage}
      />
      <Password
        handleSubmit={handleRegister}
        password={password}
        handlePassword={handlePassword}
        isError={!!errorMessage}
        label="Password"
      />
      <Password
        handleSubmit={handleRegister}
        password={confirmPassword}
        handlePassword={handleConfirmPassword}
        isError={!!errorMessage}
        label="Confirm Password"
      />
      <Button isError={!!errorMessage} isSucceed={isSucceed} handleClick={handleRegister}>
        Register
      </Button>
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}

      <BackToLogin />
    </>
  );
};

export default Register;
