import { useAppSelector } from 'app/hooks';
import Button from 'components/Commons/Buttons/CustomButton/CustomButton';
import ErrorMessage from 'components/Commons/ErrorMessage/ErrorMessage';
import Email from 'components/Commons/Inputs/Email/Email';
import Password from 'components/Commons/Inputs/Password/Password';
import LoginPanelTitle from 'components/Commons/LoginPanelTitle/LoginPanelTitle';
import googleIconRegister from 'assets/images/googleIconRegister.webp';
import { addNewUserToDB } from 'firebase-cfg/database/user/add';
import { auth, db, provider } from 'firebase-cfg/firebase-config';
import { child, get, ref } from 'firebase/database';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { pagesPaths } from 'utils/staticVariables/pages';
import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleSignInStyled, InfoStyled } from './Login.styled';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>(``);
  const [isSucceed, setIsSucceed] = useState<boolean>(false);

  const {
    pages: { mainPage },
  } = useAppSelector((state) => state);

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const navigate = useNavigate();

  // === SIGN IN ===

  const handleSignIn = () => {
    const areInputsEmpty = email.length === 0 || password.length === 0;
    if (areInputsEmpty) return setErrorMessage('Provide email and password');

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setIsSucceed(true);
        setTimeout(() => {
          navigate(`${pagesPaths.dashboard.fullPath}/${mainPage}`);
        }, 1500);
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
          get(child(ref(db), `users/${uid}`)).then(
            (snapshot) => !snapshot.exists() && addNewUserToDB(email, uid),
          );
          setTimeout(() => {
            navigate(`${pagesPaths.dashboard.fullPath}/${mainPage}`);
          }, 1500);
        } else return Promise.reject();
        setIsSucceed(true);
        setErrorMessage(``);
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
      <Email
        handleSubmit={handleSignIn}
        isError={!!errorMessage}
        email={email}
        handleEmail={handleEmail}
      />

      <Password
        label="Password"
        isError={!!errorMessage}
        password={password}
        handlePassword={handlePassword}
        handleSubmit={handleSignIn}
      />

      <Button isError={!!errorMessage} handleClick={handleSignIn} isSucceed={isSucceed}>
        Login
      </Button>

      <GoogleSignInStyled>
        <p>or... </p>
        <img onClick={handleRegisterByGoogle} src={googleIconRegister} alt="googleSignIn" />
      </GoogleSignInStyled>

      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}

      <InfoStyled>
        Dont have account?&nbsp;
        <Link to="/register">Register</Link>
      </InfoStyled>

      <InfoStyled>
        Forgot you password?&nbsp;
        <Link to="/forgot-password">Send password</Link>
      </InfoStyled>

      {/* INSERT TEST USER */}
      <InfoStyled>
        Want
        <strong> Test Account ? </strong>
        <a
          onClick={(e) => {
            e.preventDefault();
            setEmail(`test@wp.pl`);
            setPassword(`test1234`);
          }}
          href="/"
        >
          Insert email and password
        </a>
      </InfoStyled>
    </>
  );
};

export default Login;
