import { Route, Routes } from 'react-router-dom';
import { FormGroupStyled } from './Form.styled';
import Login from './Login/Login';
import Register from './Register/Register';

const Form = () => {
  return (
    <FormGroupStyled>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />
      </Routes>
    </FormGroupStyled>
  );
};

export default Form;
