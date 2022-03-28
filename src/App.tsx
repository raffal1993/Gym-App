import { Wrapper } from 'App.styled';
import Dashboard from 'components/Pages/Dashboard/Dashboard';
import { Route } from 'react-router-dom';
import LoginPanel from 'components/Pages/LoginPanel/LoginPanel';
import CustomizedRoutes from 'components/Templates/CustomizedRoutes/CustomizedRoutes';
import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';

function App() {
  const userEmail = useAppSelector((state: RootState) => state.user.email);

  return (
    <Wrapper>
      {userEmail !== null && (
        <CustomizedRoutes>
          <Route path="/*" element={<LoginPanel />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </CustomizedRoutes>
      )}
    </Wrapper>
  );
}

export default App;
