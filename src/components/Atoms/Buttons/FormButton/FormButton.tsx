import { FC, MouseEvent } from 'react';
import { FormButtonStyled } from './FormButton.styled';

interface FormButtonProps {
  name: string;
  handleClick: (e: MouseEvent<HTMLButtonElement>) => void;
  isSucceed: boolean;
  isError: boolean;
}

const FormButton: FC<FormButtonProps> = ({ name, handleClick, isSucceed, isError }) => {
  const color = isSucceed ? 'success' : isError ? 'error' : 'primary';
  return (
    <FormButtonStyled color={color} variant="contained" type="submit" onClick={handleClick}>
      {isSucceed ? 'Success' : name}
    </FormButtonStyled>
  );
};

export default FormButton;
