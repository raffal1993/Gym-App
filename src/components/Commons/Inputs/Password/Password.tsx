import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { ChangeEvent, FC, KeyboardEvent, MouseEvent, useState } from 'react';
import { FormControlStyled } from '../Inputs.styled';

interface PasswordProps {
  password: string;
  handlePassword: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: KeyboardEvent<HTMLDivElement>) => void;
  isError: boolean;
  label: 'Password' | 'Confirm Password' | 'Old Password';
  className?: string;
}

const Password: FC<PasswordProps> = (props) => {
  const { handlePassword, handleSubmit, password, isError, label, className } = props;

  const [showPassword, setShowPassword] = useState(false);

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
        inputProps={{ 'data-testid': 'password' }}
        className={className}
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

Password.defaultProps = {
  className: undefined,
};
