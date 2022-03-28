import { FC, ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const CustomizedRoutes: FC<ReactNode> = ({ children }) => {
  return (
    <Routes>
      {children}
      <Route path="*" element={<Navigate to="/page-not-found" replace />} />
    </Routes>
  );
};

export default CustomizedRoutes;
