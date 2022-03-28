import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from 'firebase-cfg/firebase-config';
import googleIconRegister from 'assets/images/googleIconRegister.webp';
import Email from 'components/Atoms/Inputs/Email/Email';
import BackToLogin from 'components/Atoms/BackToLogin/BackToMainLogin';
import Password from 'components/Atoms/Inputs/Password/Password';
import ErrorMessage from 'components/Atoms/ErrorMessage/ErrorMessage';
import Button from 'components/Atoms/FormButton/FormButton';
import { useNavigate } from 'react-router-dom';
import LoginPanelTitle from 'components/Atoms/LoginPanelTitle/LoginPanelTitle';
import { GoogleSignInStyled } from './Register.styled';

const Register = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmSetPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>(``);
  const [isSucceed, setIsSucceed] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleConfirmPassword = (e: ChangeEvent<HTMLInputElement>) =>
    setConfirmSetPassword(e.target.value);

  // === CREATE NEW USER WITH EMAIL AND PASSWORD ===
  const handleRegister = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (password !== confirmPassword && email) return setErrorMessage(`Passwords are different`);

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setIsSucceed(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      })
      .catch(({ code }) => {
        setErrorMessage(code);
      });
  };

  // === CREATE NEW USER WITH GOOGLE POPUP ===

  const handleRegisterByGoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        setIsSucceed(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
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

      <Email email={email} handleEmail={handleEmail} isError={!!errorMessage} />

      {/* Password */}
      <Password
        password={password}
        handlePassword={handlePassword}
        isError={!!errorMessage}
        label="Password"
      />

      {/* ConfirmPassword */}
      <Password
        password={confirmPassword}
        handlePassword={handleConfirmPassword}
        isError={!!errorMessage}
        label="Confirm Password"
      />

      <Button
        isError={!!errorMessage}
        isSucceed={isSucceed}
        name="Register"
        handleClick={handleRegister}
      />
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}

      <GoogleSignInStyled>
        <p>or... </p>
        <img onClick={handleRegisterByGoogle} src={googleIconRegister} alt="" />
        <BackToLogin />
      </GoogleSignInStyled>
    </>
  );
};

export default Register;
