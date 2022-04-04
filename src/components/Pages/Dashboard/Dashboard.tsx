import Navbar from 'components/Molecules/Navbar/Navbar';
import Food from 'components/Organisms/Food/Food';
import Profile from 'components/Organisms/Profile/Profile';
import Weather from 'components/Organisms/Weather/Weather';
import Workout from 'components/Organisms/Workout/Workout';
import CustomizedRoutes from 'components/Templates/CustomizedRoutes/CustomizedRoutes';
import { Route } from 'react-router-dom';
import { Wrapper } from './Dashboard.styled';

const Dashboard = () => {
  return (
    <Wrapper>
      <Navbar />
      <CustomizedRoutes>
        <Route path="/" element={<></>} />
        <Route path="workout" element={<Workout />} />
        <Route path="food" element={<Food />} />
        <Route path="weather" element={<Weather />} />
        <Route path="profile" element={<Profile />} />
      </CustomizedRoutes>
    </Wrapper>
  );
};

export default Dashboard;
