import { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { auth } from 'firebase-cfg/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import Register from './Register/Register';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import Logo from './Logo/Logo';
import { FormGroupStyled } from './LoginPanel.styled';
import Login from './Login/Login';

const LoginPanel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/dashboard');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

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
