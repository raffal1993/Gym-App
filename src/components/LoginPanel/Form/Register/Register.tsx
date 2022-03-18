import { VisibilityOff, Visibility } from '@mui/icons-material';
import {
  TextField,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  IconButton,
} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { ButtonStyled, FormControlStyled, LinkStyled } from '../Form.styled';
import googleIconRegister from '../../../../assets/images/googleIconRegister.webp';
import { GoogleSignInStyled } from './Register.styled';

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmSetPassword] = useState<string>('');

  const handleClickShowPassword = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleConfirmPassword = (e: ChangeEvent<HTMLInputElement>) =>
    setConfirmSetPassword(e.target.value);

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();

    setEmail('');
    setPassword('');
    setConfirmSetPassword('');
  };

  return (
    <>
      <h4 className="title">Register</h4>
      {/* Email */}
      <FormControlStyled>
        <TextField
          error={false}
          label="Email"
          value={email}
          onChange={handleEmail}
        />
      </FormControlStyled>
      {/* Password */}
      <FormControlStyled>
        <InputLabel error={false} htmlFor="password">
          Password
        </InputLabel>

        <OutlinedInput
          error={false}
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
        <InputLabel error={false} htmlFor="confirmPassword">
          Confirm password
        </InputLabel>

        <OutlinedInput
          error={false}
          id="confirmPassword"
          type={showPassword ? 'text' : 'password'}
          onChange={handleConfirmPassword}
          value={confirmPassword}
          label="Confirm password"
        />
      </FormControlStyled>
      <ButtonStyled variant="contained" type="submit" onClick={handleSubmit}>
        Register
      </ButtonStyled>
      <p className="errorMessage">Error Message</p>
      <GoogleSignInStyled>
        <p>or... </p>
        <img src={googleIconRegister} alt="" />
        <LinkStyled to="/login">
          <KeyboardBackspaceIcon />
          <p>Back to login</p>
        </LinkStyled>
      </GoogleSignInStyled>
    </>
  );
};

export default Login;
