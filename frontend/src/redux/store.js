import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import conversationReducer from './conversationSlice';

const rootReducer = combineReducers({
  conversation: conversationReducer,
  user: userReducer,
  // other reducers can be added here
});

// Configuration for persisting the root reducer
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create and export the Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Create and export the persistor
export const persistor = persistStore(store);