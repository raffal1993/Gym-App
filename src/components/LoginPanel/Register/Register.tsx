import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { TextField, OutlinedInput, InputAdornment, InputLabel, IconButton } from '@mui/material';
import {
  ButtonStyled,
  FormControlStyled,
  LinkStyled,
} from 'components/LoginPanel/LoginPanel.styled';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { auth, provider } from 'firebase-cfg/firebase-config';
import googleIconRegister from 'assets/images/googleIconRegister.webp';
import { GoogleSignInStyled } from './Register.styled';

const Register = () => {
  const [showPassword, setShowPassword] = useState<boolean>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmSetPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>(``);

  const handleClickShowPassword = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleConfirmPassword = (e: ChangeEvent<HTMLInputElement>) =>
    setConfirmSetPassword(e.target.value);

  // === CREATE NEW USER WITH EMAIL AND PASSWORD ===
  const handleRegister = (e: MouseEvent) => {
    e.preventDefault();
    if (password !== confirmPassword && email) return setErrorMessage(`Passwords are different`);

    createUserWithEmailAndPassword(auth, email, password).catch(({ code }) => {
      setErrorMessage(code);
    });
  };

  // === CREATE NEW USER WITH GOOGLE POPUP ===

  const handleRegisterByGoogle = () => {
    signInWithPopup(auth, provider).catch((error) => {
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
      <h4 className="title">Register</h4>
      {/* Email */}
      <FormControlStyled>
        <TextField error={!!errorMessage} label="Email" value={email} onChange={handleEmail} />
      </FormControlStyled>
      {/* Password */}
      <FormControlStyled>
        <InputLabel error={!!errorMessage} htmlFor="password">
          Password
        </InputLabel>

        <OutlinedInput
          error={!!errorMessage}
          id="password"
          type={showPassword ? 'text' : 'password'}
          onChange={handlePassword}
          value={password}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={(e) => handleClickShowPassword(e)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControlStyled>

      {/* ConfirmPassword */}
      <FormControlStyled>
        <InputLabel error={!!errorMessage} htmlFor="confirmPassword">
          Confirm password
        </InputLabel>

        <OutlinedInput
          error={!!errorMessage}
          id="confirmPassword"
          type={showPassword ? 'text' : 'password'}
          onChange={handleConfirmPassword}
          value={confirmPassword}
          label="Confirm password"
        />
      </FormControlStyled>
      <ButtonStyled variant="contained" type="submit" onClick={handleRegister}>
        Register
      </ButtonStyled>
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}

      <GoogleSignInStyled>
        <p>or... </p>
        <img onClick={handleRegisterByGoogle} src={googleIconRegister} alt="" />
        <LinkStyled to="/">
          <KeyboardBackspaceIcon />
          <p>Back to login</p>
        </LinkStyled>
      </GoogleSignInStyled>
    </>
  );
};

export default Register;
