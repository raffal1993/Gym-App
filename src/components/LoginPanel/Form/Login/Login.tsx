import { VisibilityOff, Visibility } from '@mui/icons-material';
import {
  TextField,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  IconButton,
} from '@mui/material';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { ButtonStyled, FormControlStyled } from '../Form.styled';

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleClickShowPassword = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const hnadlePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();

    setEmail('');
    setPassword('');
  };

  return (
    <>
      <h4 className="title">Login</h4>
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
          onChange={hnadlePassword}
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

      <ButtonStyled variant="contained" type="submit" onClick={handleSubmit}>
        Login
      </ButtonStyled>
      <p className="errorMessage">Error Message</p>
      <p className="info_register">
        Dont have account?&nbsp;
        <Link to="/register">Register</Link>
      </p>
      <p className="info_forgotPassword">
        Forgot you password?&nbsp;
        <Link to="/forgot-password">Click here</Link>
      </p>

      {/* INSERT TEST USER */}
      <p style={{ marginTop: 10 }}>
        Or if You are just lazy
        <a
          onClick={(e) => {
            e.preventDefault();
            setEmail(`test@wp.pl`);
            setPassword(`test1234`);
          }}
          style={{ marginLeft: 5, textDecoration: 'underline' }}
          href="/"
        >
          Click here
        </a>
      </p>
      {/*  / / / / / / / / / / / / / / / / */}
    </>
  );
};

export default Login;
