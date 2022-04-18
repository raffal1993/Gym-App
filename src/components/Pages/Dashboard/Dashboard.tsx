import { useAppDispatch, useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import Navbar from 'components/Molecules/Navbar/Navbar';
import Sidebar from 'components/Molecules/Sidebar/Sidebar';
import Food from 'components/Organisms/Food/Food';
import Profile from 'components/Organisms/Profile/Profile';
import Weather from 'components/Organisms/Weather/Weather';
import Workout from 'components/Organisms/Workout/Workout';
import CustomizedRoutes from 'components/Templates/CustomizedRoutes/CustomizedRoutes';
import { auth, db } from 'firebase-cfg/firebase-config';
import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { Wrapper } from './Dashboard.styled';

const Dashboard = () => {
  const [sidebarList, setSidebarList] = useState<string[]>([]);
  const {
    user: { email },
    pages: { mainPage, subPage },
  } = useAppSelector((state: RootState) => state);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (window.location.pathname === '/dashboard') return setSidebarList([]);
    const uid = auth.currentUser?.uid;
    if (email && mainPage && uid) {
      const dbRef = ref(db, `users/${uid}`);

      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        const sidebarData = data[mainPage];

        if (sidebarData) {
          const sidebarListItems = Object.keys(sidebarData).map((key) => sidebarData[key].name);

          setSidebarList(sidebarListItems);
        } else setSidebarList([]);
      });
    }
  }, [email, mainPage, navigate, dispatch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (mainPage) navigate(`/dashboard/${mainPage}/${subPage}`);
    }, 200);

    return () => clearTimeout(timeout);
  }, [navigate, mainPage, subPage]);

  return (
    <Wrapper>
      <Navbar />
      <Sidebar sidebarList={sidebarList} />
      <CustomizedRoutes>
        <Route path="/" element={<></>} />
        <Route path="/workout/*" element={<Workout />} />
        <Route path="/food/*" element={<Food />} />
        <Route path="/weather/*" element={<Weather />} />
        <Route path="/profile/*" element={<Profile />} />
      </CustomizedRoutes>
    </Wrapper>
  );
};

export default Dashboard;
