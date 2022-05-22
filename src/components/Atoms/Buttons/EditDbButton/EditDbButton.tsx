import { FC, ReactNode } from 'react';
import { EditDbButtonStyled } from './EditDbButton.styled';

interface EditDbButtonProps {
  onClick: () => void;
  className?: string;
  children?: ReactNode;
}

const EditDbButton: FC<EditDbButtonProps> = ({ onClick, className, children }) => {
  return (
    <EditDbButtonStyled className={className} onClick={onClick}>
      {children || '+'}
    </EditDbButtonStyled>
  );
};

export default EditDbButton;

EditDbButton.defaultProps = {
  className: '',
  children: '',
};
