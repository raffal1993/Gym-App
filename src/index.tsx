import React from 'react';
import ReactDOM from 'react-dom';
import 'style/fonts.css';
import { BrowserRouter } from 'react-router-dom';
import App from 'App';
import { Provider } from 'react-redux';
import { setupStore } from 'app/store';
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import theme from 'style/theme';
import globalStyle from 'style/globalStyles';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={setupStore()}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles styles={globalStyle} />
          <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
