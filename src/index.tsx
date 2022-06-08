import React from 'react';
import ReactDOM from 'react-dom';
import 'style/fonts.css';
import { BrowserRouter } from 'react-router-dom';
import App from 'App';
import AppProviders from 'providers/AppProviders';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProviders>
        <App />
      </AppProviders>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
