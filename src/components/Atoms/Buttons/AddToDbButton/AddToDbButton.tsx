import React, { FC } from 'react';
import { AddToDbButtonStyled } from './AddToDbButton.styled';

interface AddToDbButtonProps {
  onClick: () => void;
  className?: string;
}

const AddToDbButton: FC<AddToDbButtonProps> = ({ onClick, className }) => {
  return (
    <AddToDbButtonStyled className={className && className} onClick={onClick}>
      +
    </AddToDbButtonStyled>
  );
};

export default AddToDbButton;

AddToDbButton.defaultProps = {
  className: '',
};
