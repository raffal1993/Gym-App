import { Wrapper } from 'App.styled';
import Dashboard from 'components/Pages/Dashboard/Dashboard';
import PageNotFound from 'components/Organisms/PageNotFound/PageNotFound';
import { auth } from 'firebase-cfg/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import AppProviders from 'providers/AppProviders';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginPanel from 'components/Pages/LoginPanel/LoginPanel';

function App() {
  const [isFirstCheck, setIsFirstCheck] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    //   CHECK USER LOGGED LISTENER
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && window.location.pathname !== '/dashboard') {
        if (isFirstCheck) {
          navigate('/dashboard');
        } else
          setTimeout(() => {
            navigate('/dashboard');
          }, 1500);
      }
      if (isFirstCheck) setIsFirstCheck(false);
    });

    return () => unsubscribe();
  }, [isFirstCheck, navigate]);

  return (
    <AppProviders>
      <Wrapper>
        {!isFirstCheck && (
          <Routes>
            <Route path="/*" element={<LoginPanel />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/page-not-found" element={<PageNotFound />} />
          </Routes>
        )}
      </Wrapper>
    </AppProviders>
  );
}

export default App;
