import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css'; // We use App.css for global styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);