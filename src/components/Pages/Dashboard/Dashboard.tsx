import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setSidebarList } from 'app/slices/pagesSlice';
import { RootState } from 'app/store';
import EditModeButton from 'components/Atoms/Buttons/EditModeButton/EditModeButton';
import Navbar from 'components/Molecules/Navbar/Navbar';
import Sidebar from 'components/Molecules/Sidebar/Sidebar';
import { SidebarListProps } from 'components/Molecules/Sidebar/SidebarProps';
import Food from 'components/Organisms/Food/Food';
import Profile from 'components/Organisms/Profile/Profile';
import Weather from 'components/Organisms/Weather/Weather';
import Workout from 'components/Organisms/Workout/Workout';
import CustomizedRoutes from 'components/Templates/CustomizedRoutes/CustomizedRoutes';
import DashboardContent from 'components/Templates/DashboardContent/DashboardContent';
import { sidebarListDBListener } from 'firebase-cfg/database/dashboard/listener';
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
    const dispatcher = (list: SidebarListProps[]) => dispatch(setSidebarList(list));
    return sidebarListDBListener(mainPage, dispatcher);
  }, [mainPage, dispatch]);

  useEffect(() => {
    if (!sidebarList || sidebarList.length === 0) return;
    const timeout = setTimeout(() => {
      if (mainPage && subPageID) navigate(`/dashboard/${mainPage}/${subPageID}`);
    }, 100);

    return () => clearTimeout(timeout);
  }, [navigate, mainPage, subPageID, sidebarList]);

  return (
    <Wrapper>
      <Navbar />
      <Sidebar />
      <DashboardContent>
        <EditModeButton />
        <CustomizedRoutes>
          <Route path="/" element={<></>} />
          <Route path="/workout/*" element={<Workout />} />
          <Route path="/food/*" element={<Food />} />
          <Route path="/weather/*" element={<Weather />} />
          <Route path="/profile/*" element={<Profile />} />
        </CustomizedRoutes>
      </DashboardContent>
    </Wrapper>
  );
};

export default Dashboard;
