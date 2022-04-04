import { Wrapper } from 'App.styled';
import Dashboard from 'components/Pages/Dashboard/Dashboard';
import { Route } from 'react-router-dom';
import LoginPanel from 'components/Pages/LoginPanel/LoginPanel';
import CustomizedRoutes from 'components/Templates/CustomizedRoutes/CustomizedRoutes';
import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import PageNotFound from 'components/Organisms/PageNotFound/PageNotFound';

function App() {
  const { isUserChecked } = useAppSelector((state: RootState) => state.user);

  return (
    <Wrapper>
      {isUserChecked && (
        <CustomizedRoutes>
          <Route path="/*" element={<LoginPanel />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/page-not-found" element={<PageNotFound />} />
        </CustomizedRoutes>
      )}
    </Wrapper>
  );
}

export default App;
