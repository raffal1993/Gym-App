import Logo from './Logo/Logo';
import { Wrapper } from './LoginPanel.styled';
import Form from './Form/Form';

const LoginPanel = () => {
  return (
    <Wrapper>
      <Logo />
      <Form />
    </Wrapper>
  );
};

export default LoginPanel;
