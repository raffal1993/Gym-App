import { FC, MouseEvent, ReactNode } from 'react';
import { CustomButtonStyled } from './CustomButton.styled';

interface ButtonProps {
  handleClick: (e: MouseEvent<HTMLButtonElement>) => void;
  isSucceed?: boolean;
  isError?: boolean;
  children?: ReactNode;
}

const FormButton: FC<ButtonProps> = ({ handleClick, isSucceed, isError, children }) => {
  const color = isSucceed ? 'success' : isError ? 'error' : 'primary';
  return (
    <CustomButtonStyled color={color} variant="contained" type="submit" onClick={handleClick}>
      {isSucceed ? 'Success' : children}
    </CustomButtonStyled>
  );
};

export default FormButton;

FormButton.defaultProps = {
  isError: false,
  isSucceed: false,
  children: null,
};
