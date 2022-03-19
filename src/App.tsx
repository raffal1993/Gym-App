import { Wrapper } from 'App.styled';
import Dashboard from 'components/Dashboard/Dashboard';
import LoginPanel from 'components/LoginPanel/LoginPanel';
import PageNotFound from 'components/PageNotFound/PageNotFound';
import AppProviders from 'providers/AppProviders';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <AppProviders>
      <Wrapper>
        <Routes>
          <Route path="/*" element={<LoginPanel />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/page-not-found" element={<PageNotFound />} />
        </Routes>
      </Wrapper>
    </AppProviders>
  );
}

export default App;
