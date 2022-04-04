import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setUserInfo } from 'app/slices/userSlice';
import { RootState } from 'app/store';
import { auth } from 'firebase-cfg/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { FC, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DataProvider: FC<ReactNode> = ({ children }) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { email } = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userEmail = user.email || 'User';
        dispatch(setUserInfo({ email: userEmail }));
        if (email === null) navigate('/dashboard');
      } else {
        dispatch(setUserInfo({ email: '' }));
        if (email === null) navigate('/');
      }
    });

    return () => unsubscribe();
  }, [dispatch, email, navigate]);
  return <>{children}</>;
};

export default DataProvider;
