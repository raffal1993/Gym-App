import { Route, Routes } from 'react-router-dom';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import { FormGroupStyled } from './Form.styled';
import Login from './Login/Login';
import Register from './Register/Register';

const Form = () => {
  return (
    <FormGroupStyled>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </FormGroupStyled>
  );
};

export default Form;
