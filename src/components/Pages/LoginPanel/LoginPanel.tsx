import { Route } from 'react-router-dom';
import Register from 'components/Molecules/Register/Register';
import Login from 'components/Molecules/Login/Login';
import Logo from 'components/Molecules/Logo/Logo';
import CustomizedRoutes from 'components/Templates/CustomizedRoutes/CustomizedRoutes';
import ForgotPassword from '../../Molecules/ForgotPassword/ForgotPassword';
import { FormGroupStyled } from './LoginPanel.styled';

const LoginPanel = () => {
  return (
    <>
      <Logo />
      <FormGroupStyled>
        <CustomizedRoutes>
          <Route path="" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </CustomizedRoutes>
      </FormGroupStyled>
    </>
  );
};

export default LoginPanel;
