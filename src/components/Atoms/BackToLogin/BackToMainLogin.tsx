import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { LinkStyled } from './BackToLogin.styled';

const BackToLogin = () => {
  return (
    <LinkStyled to="/">
      <KeyboardBackspaceIcon />
      <p>Back to login</p>
    </LinkStyled>
  );
};

export default BackToLogin;
