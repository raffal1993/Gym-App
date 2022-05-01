import React, { FC, ReactNode } from 'react';
import { AddToDbButtonStyled } from './AddToDbButton.styled';

interface AddToDbButtonProps {
  onClick: () => void;
  className?: string;
  children?: ReactNode;
}

const AddToDbButton: FC<AddToDbButtonProps> = ({ onClick, className, children }) => {
  return (
    <AddToDbButtonStyled className={className && className} onClick={onClick}>
      {children || '+'}
    </AddToDbButtonStyled>
  );
};

export default AddToDbButton;

AddToDbButton.defaultProps = {
  className: '',
  children: '',
};
