import { styled } from '@mui/material';
import EditDbButton from '../EditDbButton/EditDbButton';

export const EditCardButtonStyled = styled(EditDbButton)(({ theme }) => ({
  position: 'absolute',
  top: '3px',
  left: '15px',
  padding: `5px 10px 3px 10px`,
}));
