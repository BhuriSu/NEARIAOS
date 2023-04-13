import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import { UserAuthContextProvider } from './Context/UserAuthContext';


const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <UserAuthContextProvider>

        <App />

  </UserAuthContextProvider>
  </React.StrictMode>
);




