import { FC, MouseEvent } from 'react';
import { ButtonStyled } from './Button.styled';

interface ButtonProps {
  name: string;
  handleClick: (e: MouseEvent<HTMLButtonElement>) => void;
  isSucceed: boolean;
  isError: boolean;
}

const Button: FC<ButtonProps> = ({ name, handleClick, isSucceed, isError }) => {
  const color = isSucceed ? 'success' : isError ? 'error' : 'primary';
  return (
    <ButtonStyled color={color} variant="contained" type="submit" onClick={handleClick}>
      {isSucceed ? 'Success' : name}
    </ButtonStyled>
  );
};

export default Button;
