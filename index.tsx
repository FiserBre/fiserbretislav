import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Prevent browser from restoring scroll position automatically
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);