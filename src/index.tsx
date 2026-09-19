import React from 'react';
import ReactDOM from 'react-dom/client';
import './shared/i18n/i18n';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root') as HTMLElement;

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
