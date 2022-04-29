import React, { FC } from 'react';
import { AddToDbButtonStyled } from './AddToDbButton.styled';

interface AddToDbButtonProps {
  onClick: () => void;
  className?: string;
  buttonText?: string;
}

const AddToDbButton: FC<AddToDbButtonProps> = ({ onClick, className, buttonText = '' }) => {
  return (
    <AddToDbButtonStyled className={className && className} onClick={onClick}>
      {buttonText || '+'}
    </AddToDbButtonStyled>
  );
};

export default AddToDbButton;

AddToDbButton.defaultProps = {
  className: '',
  buttonText: '',
};
