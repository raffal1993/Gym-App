import { FC, MouseEvent, ReactNode } from 'react';
import { CustomButtonStyled } from './CustomButton.styled';

interface ButtonProps {
  handleClick: (e: MouseEvent<HTMLButtonElement>) => void;
  isSucceed?: boolean;
  isError?: boolean;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
}

const CustomButton: FC<ButtonProps> = ({
  handleClick,
  isSucceed,
  isError,
  children,
  className,
  disabled,
}) => {
  const color = isSucceed ? 'success' : isError ? 'error' : 'primary';
  return (
    <CustomButtonStyled
      className={className}
      color={color}
      disabled={disabled}
      variant="contained"
      type="submit"
      onClick={handleClick}
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
