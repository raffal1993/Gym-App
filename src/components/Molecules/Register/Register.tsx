import { ChangeEvent, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from 'firebase-cfg/firebase-config';
import { addNewUserToDB } from 'firebase-cfg/database/user/add';
import googleIconRegister from 'assets/images/googleIconRegister.webp';
import Email from 'components/Atoms/Inputs/Email/Email';
import BackToLogin from 'components/Atoms/BackToLogin/BackToMainLogin';
import Password from 'components/Atoms/Inputs/Password/Password';
import ErrorMessage from 'components/Atoms/ErrorMessage/ErrorMessage';
import Button from 'components/Atoms/Buttons/CustomButton/CustomButton';
import LoginPanelTitle from 'components/Atoms/LoginPanelTitle/LoginPanelTitle';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { pagesPaths } from 'helpers/staticVariables';
import { GoogleSignInStyled } from './Register.styled';

const Register = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmSetPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>(``);
  const [isSucceed, setIsSucceed] = useState<boolean>(false);

  const navigate = useNavigate();

  const {
    pages: { mainPage },
  } = useAppSelector((state: RootState) => state);

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

  // === SIGN IN WITH GOOGLE POPUP ===

  const handleRegisterByGoogle = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        const { email, uid } = res.user;
        if (email && uid) {
          addNewUserToDB(email, uid);
          setTimeout(() => {
            navigate(`${pagesPaths.dashboard.fullPath}/${mainPage}`);
          }, 1500);
        } else return Promise.reject();
        setIsSucceed(true);
        setErrorMessage(``);
      })
      .catch((error) => {
        setErrorMessage(error.code);
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
      <GoogleSignInStyled>
        <p>or... </p>
        <img onClick={handleRegisterByGoogle} src={googleIconRegister} alt="googleSignIn" />
      </GoogleSignInStyled>
      <BackToLogin />
    </>
  );
};

export default Register;
