import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setSidebarList } from 'app/slices/pagesSlice';
import { RootState } from 'app/store';
import Navbar from 'components/Molecules/Navbar/Navbar';
import Sidebar from 'components/Molecules/Sidebar/Sidebar';
import { SidebarListProps } from 'components/Molecules/Sidebar/SidebarProps';
import Food from 'components/Organisms/Food/Food';
import Profile from 'components/Organisms/Profile/Profile';
import Weather from 'components/Organisms/Weather/Weather';
import Workout from 'components/Organisms/Workout/Workout';
import CustomizedRoutes from 'components/Templates/CustomizedRoutes/CustomizedRoutes';
import { auth, db } from 'firebase-cfg/firebase-config';
import { onValue, ref } from 'firebase/database';
import { sortedArrayByTimestamp } from 'helpers/sortArrayByTimestamp';
import { useEffect } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { Wrapper } from './Dashboard.styled';

const Dashboard = () => {
  const {
    pages: { mainPage, subPageID, sidebarList },
  } = useAppSelector((state: RootState) => state);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const uid = auth.currentUser?.uid;

    if (mainPage && uid) {
      const dbRef = ref(db, `users/${uid}/${mainPage}`);

      return onValue(dbRef, (snapshot) => {
        const data = snapshot.val();

        if (data && mainPage) {
          const newArray = [] as SidebarListProps[];

          for (const key in data) {
            if (data[key].timestamp) {
              newArray.push({
                id: key,
                name: data[key].name,
                timestamp: data[key].timestamp,
              });
            }
          }

          const sortedArray = sortedArrayByTimestamp(newArray as Required<SidebarListProps>[]);

          const sidebarListItems: SidebarListProps[] = sortedArray.map((value) => ({
            id: value.id,
            name: value.name,
          }));

          dispatch(setSidebarList({ sidebarList: sidebarListItems }));
        } else dispatch(setSidebarList({ sidebarList: [] }));
      });
    }
  }, [mainPage, dispatch]);

  useEffect(() => {
    if (!sidebarList) return;
    if (sidebarList.length === 0) return;
    const timeout = setTimeout(() => {
      if (mainPage && subPageID) navigate(`/dashboard/${mainPage}/${subPageID}`);
    }, 100);

    return () => clearTimeout(timeout);
  }, [navigate, mainPage, subPageID, sidebarList]);

  return (
    <Wrapper>
      <Navbar />
      <Sidebar />
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
