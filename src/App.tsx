import { Wrapper } from 'App.styled';
import Dashboard from 'components/Pages/Dashboard/Dashboard';
import { Route, useNavigate } from 'react-router-dom';
import LoginPanel from 'components/Pages/LoginPanel/LoginPanel';
import CustomizedRoutes from 'components/Templates/CustomizedRoutes/CustomizedRoutes';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import PageNotFound from 'components/Organisms/PageNotFound/PageNotFound';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'firebase-cfg/firebase-config';
import { setUser } from 'app/slices/userSlice';
import { RootState } from 'app/store';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { email } = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    if (email === auth.currentUser?.email) return;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userEmail = user.email || '';
        dispatch(setUser({ email: userEmail }));
        if (!!window.location.pathname.match(/^(\/|\/register)$/))
          if (email === null) return navigate('/dashboard');
          else
            setTimeout(() => {
              navigate('/dashboard');
            }, 1500);
      } else dispatch(setUser({ email: '' }));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch, navigate, email]);

  return (
    <Wrapper>
      {email !== null && (
        <CustomizedRoutes>
          <Route path="/*" element={<LoginPanel />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/page-not-found" element={<PageNotFound />} />
        </CustomizedRoutes>
      )}
    </Wrapper>
  );
}

export default App;
