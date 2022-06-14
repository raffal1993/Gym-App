import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { ChangeEvent, FC, KeyboardEvent, MouseEvent, useState } from 'react';
import { FormControlStyled } from '../Inputs.styled';

interface PasswordProps {
  password: string;
  handlePassword: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: KeyboardEvent<HTMLDivElement>) => void;
  isError: boolean;
  label: 'Password' | 'Confirm Password';
}

const Password: FC<PasswordProps> = ({
  handlePassword,
  handleSubmit,
  password,
  isError,
  label,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };
  return (
    <FormControlStyled>
      <InputLabel error={isError} htmlFor={label}>
        {label}
      </InputLabel>

      <OutlinedInput
        error={isError}
        id={label}
        type={showPassword ? 'text' : 'password'}
        onChange={handlePassword}
        onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
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
        label={label}
      />
    </FormControlStyled>
  );
};

export default Password;
