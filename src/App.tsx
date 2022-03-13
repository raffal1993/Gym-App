import AppProviders from './providers/AppProviders';
import LoginPanel from './components/LoginPanel/LoginPanel';
import { Wrapper } from './App.styled';

function App() {
  return (
    <AppProviders>
      <Wrapper className="app">
        <LoginPanel />
      </Wrapper>
    </AppProviders>
  );
}

export default App;
