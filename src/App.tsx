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
import { setUserEmail } from 'app/slices/userSlice';
import { RootState } from 'app/store';
import Modal from 'components/Templates/Modal/Modal';
import { pagesPaths } from 'helpers/staticVariables';
import { setMainPage } from 'app/slices/pagesSlice';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    user: { email },
    interface: { isModalOpen },
    pages: { mainPage },
  } = useAppSelector((state: RootState) => state);

  useEffect(() => {
    if (email === auth.currentUser?.email) return;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userEmail = user.email || '';
        dispatch(setUserEmail(userEmail));
        const isLoginOrRegisterPage = !!window.location.pathname.match(/^(\/|\/register)$/);
        if (isLoginOrRegisterPage && email === null)
          return navigate(`${pagesPaths.dashboard.fullPath}/${mainPage}`);
      } else {
        dispatch(setUserEmail(''));
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch, navigate, email, mainPage]);

  useEffect(() => {
    if (!mainPage) {
      navigate(pagesPaths.workout.fullPath);
      dispatch(setMainPage(pagesPaths.workout.name));
    }
  }, [navigate, mainPage, dispatch]);

  return (
    <Wrapper>
      {email !== null && (
        <CustomizedRoutes>
          <Route path="/*" element={<LoginPanel />} />
          <Route path={`${pagesPaths.dashboard.fullPath}/*`} element={<Dashboard />} />
          <Route path={pagesPaths.pageNotFound.fullPath} element={<PageNotFound />} />
        </CustomizedRoutes>
      )}
      {isModalOpen && <Modal />}
    </Wrapper>
  );
}

export default App;
