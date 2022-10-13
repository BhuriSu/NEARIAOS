import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import { UserAuthContextProvider } from './Context/UserAuthContext';
import { ChatContextProvider } from './Context/ChatContext';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <UserAuthContextProvider>
  <ChatContextProvider>
        <App />
  </ChatContextProvider>
  </UserAuthContextProvider>
  </React.StrictMode>
);




