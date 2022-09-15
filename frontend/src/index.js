import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import ContextProvider from './Context/AuthContext';




const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   
 
    <ContextProvider>
  
      
        <App />
      
   
    </ContextProvider>


  </React.StrictMode>
);




