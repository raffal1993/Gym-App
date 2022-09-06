import ConstructionIcon from '@mui/icons-material/Construction';
import { FC } from 'react';
import { EditCardButtonStyled } from './EditCardButton.styled';

interface EditCardButtonProps {
  onClick: () => void;
  className?: string;
}

const EditCardButton: FC<EditCardButtonProps> = ({ onClick, className }) => {
  return (
    <EditCardButtonStyled className={className} onClick={onClick}>
      <ConstructionIcon />
    </EditCardButtonStyled>
  );
};

export default EditCardButton;

EditCardButton.defaultProps = {
  className: '',
};
