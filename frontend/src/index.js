import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import ContextProvider from './Context';
import { CookiesProvider } from 'react-cookie';



const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   
    <CookiesProvider>
    <ContextProvider>
  
      
        <App />
      
   
    </ContextProvider>
    </CookiesProvider>

  </React.StrictMode>
);




