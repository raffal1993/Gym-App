import Navbar from 'components/Molecules/Navbar/Navbar';
import Sidebar from 'components/Molecules/Sidebar/Sidebar';
import CustomizedRoutes from 'components/Templates/CustomizedRoutes/CustomizedRoutes';
import { Route } from 'react-router-dom';
import { Wrapper } from './Dashboard.styled';

const Dashboard = () => {
  return (
    <Wrapper>
      <Navbar />
      <Sidebar />
      <CustomizedRoutes>
        <Route path="" element={<></>} />
        <Route path="workout" element={<div> workoutPlan</div>} />
        <Route path="food" element={<div> food</div>} />
        <Route path="weather" element={<div> weather</div>} />
        <Route path="profile" element={<div> profile</div>} />
      </CustomizedRoutes>
    </Wrapper>
  );
};

export default Dashboard;
