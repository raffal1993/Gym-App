import { TextField } from '@mui/material';
import { ChangeEvent, MouseEvent, useState } from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { ButtonStyled, FormControlStyled, LinkStyled } from '../Form.styled';

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('');

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();

    setEmail('');
  };

  return (
    <>
      <h4 className="title">Forgot password?</h4>

      {/* Email */}
      <FormControlStyled>
        <TextField
          error={false}
          label="Email"
          value={email}
          onChange={handleEmail}
        />
      </FormControlStyled>

      <ButtonStyled variant="contained" type="submit" onClick={handleSubmit}>
        Send email
      </ButtonStyled>
      <p className="errorMessage">Error Message</p>
      <LinkStyled to="/login">
        <KeyboardBackspaceIcon />
        <p>Back to login</p>
      </LinkStyled>
    </>
  );
};

export default ForgotPassword;
