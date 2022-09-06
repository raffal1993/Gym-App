import { ButtonProps } from '@mui/material';
import { FC, MouseEvent, ReactNode } from 'react';
import { CustomButtonStyled } from './CustomButton.styled';

interface CustomButtonProps {
  handleClick: (e: MouseEvent<HTMLButtonElement>) => void;
  isSucceed?: boolean;
  isError?: boolean;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
}

const CustomButton: FC<CustomButtonProps & ButtonProps> = ({
  handleClick,
  isSucceed,
  isError,
  children,
  className,
  disabled,
  ...props
}) => {
  const color = isSucceed ? 'success' : isError ? 'error' : 'primary';
  return (
    <CustomButtonStyled
      aria-invalid={isError}
      className={className}
      color={color}
      disabled={disabled}
      variant="contained"
      type="submit"
      onClick={handleClick}
      {...props}
    >
      {isSucceed ? 'Success' : children}
    </CustomButtonStyled>
  );
};

export default CustomButton;

CustomButton.defaultProps = {
  isError: false,
  isSucceed: false,
  children: null,
  className: '',
  disabled: false,
};
