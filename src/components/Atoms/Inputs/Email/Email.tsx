import { TextField } from '@mui/material';
import { ChangeEvent, FC, KeyboardEvent } from 'react';
import { FormControlStyled } from '../Inputs.styled';

interface EmailProps {
  email: string;
  handleEmail: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: KeyboardEvent<HTMLDivElement>) => void;
  isError: boolean;
}

const Email: FC<EmailProps> = ({ email, handleEmail, isError, handleSubmit }) => {
  return (
    <FormControlStyled>
      <TextField
        onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
        error={isError}
        label="Email"
        value={email}
        onChange={handleEmail}
      />
    </FormControlStyled>
  );
};

export default Email;
