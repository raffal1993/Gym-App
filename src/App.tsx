import AppProviders from './providers/AppProviders';
import LoginPanel from './components/LoginPanel/LoginPanel';

function App() {
  return (
    <AppProviders>
      <LoginPanel />
    </AppProviders>
  );
}

export default App;
