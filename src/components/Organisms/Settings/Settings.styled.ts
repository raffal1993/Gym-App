import { darken, styled } from '@mui/material';
import { CardWrapper } from 'components/Molecules/CardStyled/CardStyled.styled';

export const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const SettingsCardStyled = styled(CardWrapper)(({ theme }) => ({
  marginTop: '50px',
  minHeight: '250px',
  background: darken(theme.colors.whiteLight, 0.6),
}));
