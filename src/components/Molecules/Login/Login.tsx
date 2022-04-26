import Button from 'components/Atoms/Buttons/FormButton/FormButton';
import ErrorMessage from 'components/Atoms/ErrorMessage/ErrorMessage';
import Email from 'components/Atoms/Inputs/Email/Email';
import Password from 'components/Atoms/Inputs/Password/Password';
import LoginPanelTitle from 'components/Atoms/LoginPanelTitle/LoginPanelTitle';
import { auth } from 'firebase-cfg/firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { InfoStyled, TestAcc } from './Login.styled';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>(``);
  const [isSucceed, setIsSucceed] = useState<boolean>(false);

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  // === SIGN IN ===

  const handleSignIn = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
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
      <LoginPanelTitle title="Login" />
      <Email isError={!!errorMessage} email={email} handleEmail={handleEmail} />

      <Password
        label="Password"
        isError={!!errorMessage}
        password={password}
        handlePassword={handlePassword}
      />

      <Button
        isError={!!errorMessage}
        handleClick={handleSignIn}
        name="Login"
        isSucceed={isSucceed}
      />

      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}

      <InfoStyled>
        Dont have account?&nbsp;
        <Link to="/register">Register</Link>
      </InfoStyled>

      <InfoStyled>
        Forgot you password?&nbsp;
        <Link to="/forgot-password">Click here</Link>
      </InfoStyled>

      {/* INSERT TEST USER */}
      <TestAcc>
        Login on
        <strong> Test Account </strong>
        <a
          onClick={(e) => {
            e.preventDefault();
            setEmail(`test@wp.pl`);
            setPassword(`test1234`);
          }}
          href="/"
        >
          Click here
        </a>
      </TestAcc>
    </>
  );
};

export default Login;
