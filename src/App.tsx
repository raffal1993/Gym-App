import { Wrapper } from 'App.styled';
import Dashboard from 'components/Pages/Dashboard/Dashboard';
import { Route, useNavigate } from 'react-router-dom';
import LoginPanel from 'components/Pages/LoginPanel/LoginPanel';
import CustomizedRoutes from 'components/Templates/CustomizedRoutes/CustomizedRoutes';
import { useAppDispatch } from 'app/hooks';
import PageNotFound from 'components/Organisms/PageNotFound/PageNotFound';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'firebase-cfg/firebase-config';
import { setUser } from 'app/slices/userSlice';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userEmail = user.email || '';
        dispatch(setUser({ email: userEmail }));
        if (!!window.location.pathname.match(/^(\/|\/register)$/))
          setTimeout(() => {
            navigate('/dashboard');
          }, 1500);
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);
  return (
    <Wrapper>
      <CustomizedRoutes>
        <Route path="/*" element={<LoginPanel />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/page-not-found" element={<PageNotFound />} />
      </CustomizedRoutes>
    </Wrapper>
  );
}

export default App;
