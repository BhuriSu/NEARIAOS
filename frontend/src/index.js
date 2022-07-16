import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import createSagaMiddleware from 'redux-saga';
import {  legacy_createStore as createStore, compose, applyMiddleware } from 'redux';
import App from './App';
import rootSaga from './redux/sagas/sagas';
import rootReducer from './redux/root-reducer';

const initialSagaMiddleware = createSagaMiddleware();
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  storeEnhancers(applyMiddleware(initialSagaMiddleware)),
);
initialSagaMiddleware.run(rootSaga);

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
   
    <CookiesProvider>

      <Provider store={store}>
        <App />
      </Provider>
      
    </CookiesProvider>

  </React.StrictMode>
);




