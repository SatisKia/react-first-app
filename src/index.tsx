import './index.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';

console.log("index.js");
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
//  <React.StrictMode>
    <App />
//  </React.StrictMode>
);
