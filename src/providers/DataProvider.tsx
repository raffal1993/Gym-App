import { useAppDispatch } from 'app/hooks';
import { setUserEmail } from 'app/slices/userSlice';
import { auth } from 'firebase-cfg/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { FC, ReactNode, useEffect } from 'react';

const DataProvider: FC<ReactNode> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const email = user.email || 'User';
        dispatch(setUserEmail(email));
      } else {
        dispatch(setUserEmail(''));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
  return <>{children}</>;
};

export default DataProvider;
