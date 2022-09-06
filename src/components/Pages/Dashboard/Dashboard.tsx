import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setSidebarList } from 'app/slices/pagesSlice';
import EditModeButton from 'components/Commons/Buttons/EditModeButton/EditModeButton';
import Navbar from 'components/Molecules/Navbar/Navbar';
import Sidebar from 'components/Molecules/Sidebar/Sidebar';
import { SidebarListProps } from 'components/Molecules/Sidebar/SidebarTypes';
import Food from 'components/Organisms/Food/Food';
import Settings from 'components/Organisms/Settings/Settings';
import Weather from 'components/Organisms/Weather/Weather';
import Workout from 'components/Organisms/Workout/Workout';
import CustomizedRoutes from 'components/Templates/CustomizedRoutes/CustomizedRoutes';
import DashboardContent from 'components/Templates/DashboardContent/DashboardContent';
import { sidebarListDBListener } from 'firebase-cfg/database/dashboard/listener';
import { auth } from 'firebase-cfg/firebase-config';
import { pagesPaths } from 'utils/staticVariables/pages';
import { useEffect } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { Wrapper } from './Dashboard.styled';

const Dashboard = () => {
  const {
    pages: { mainPage },
  } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const dispatcher = (list: SidebarListProps[]) => dispatch(setSidebarList(list));
    return sidebarListDBListener(mainPage, dispatcher);
  }, [mainPage, dispatch]);

  useEffect(() => {
    if (!auth.currentUser) navigate('/');
  }, [navigate]);

  return (
    <Wrapper>
      <Navbar />
      <Sidebar />
      <DashboardContent>
        {mainPage !== pagesPaths.settings.name && <EditModeButton />}
        <CustomizedRoutes>
          <Route path={`/${pagesPaths.workout.name}`} element={<Workout />} />
          <Route path={`/${pagesPaths.food.name}`} element={<Food />} />
          <Route path={`/${pagesPaths.weather.name}`} element={<Weather />} />
          <Route path={`/${pagesPaths.settings.name}/*`} element={<Settings />} />
        </CustomizedRoutes>
      </DashboardContent>
    </Wrapper>
  );
};

export default Dashboard;
