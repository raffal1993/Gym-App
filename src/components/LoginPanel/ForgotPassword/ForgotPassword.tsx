import { TextField } from '@mui/material';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {
  ButtonStyled,
  FormControlStyled,
  LinkStyled,
} from 'components/LoginPanel/LoginPanel.styled';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from 'firebase-cfg/firebase-config';

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>(``);

  const navigate = useNavigate();

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setTimeout(() => {
          navigate('/');
        }, 2000);
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
      <h4 className="title">Forgot password?</h4>

      {/* Email */}
      <FormControlStyled>
        <TextField error={false} label="Email" value={email} onChange={handleEmail} />
      </FormControlStyled>

      <ButtonStyled variant="contained" type="submit" onClick={handleSubmit}>
        Send password
      </ButtonStyled>
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      <LinkStyled to="/">
        <KeyboardBackspaceIcon />
        <p>Back to login</p>
      </LinkStyled>
    </>
  );
};

export default ForgotPassword;
