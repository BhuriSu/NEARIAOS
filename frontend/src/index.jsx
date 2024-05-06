import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import { UserAuthContextProvider } from './Context';
import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const root = createRoot(document.getElementById('root'));
root.render(

 
  <PersistGate persistor={persistor}>
    <Provider store={store}>
    <UserAuthContextProvider>
        <App />
    </UserAuthContextProvider>
    </Provider>
  </PersistGate>
  

);




