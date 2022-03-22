import { Navigate, Route, Routes } from 'react-router-dom';
import Register from 'components/Molecules/Register/Register';
import Login from 'components/Molecules/Login/Login';
import Logo from 'components/Molecules/Logo/Logo';
import ForgotPassword from '../../Molecules/ForgotPassword/ForgotPassword';
import { FormGroupStyled } from './LoginPanel.styled';

const LoginPanel = () => {
  return (
    <>
      <Logo />
      <FormGroupStyled>
        <Routes>
          <Route path="" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Navigate to="/page-not-found" replace />} />
        </Routes>
      </FormGroupStyled>
    </>
  );
};

export default LoginPanel;
