import { TextField } from '@mui/material';
import { ChangeEvent, FC } from 'react';
import { FormControlStyled } from '../Inputs.styled';

interface EmailProps {
  email: string;
  handleEmail: (e: ChangeEvent<HTMLInputElement>) => void;
  isError: boolean;
}

const Email: FC<EmailProps> = ({ email, handleEmail, isError }) => {
  return (
    <FormControlStyled>
      <TextField error={isError} label="Email" value={email} onChange={handleEmail} />
    </FormControlStyled>
  );
};

export default Email;
