
import { initializeApp } from 'firebase/app';
import { getStorage }  from 'firebase/storage';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_DB_API,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  databaseURL: import.meta.env.VITE_databaseURL,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_database_AppId,
  measurementId: import.meta.env.VITE_measurementId,
};

 const firebase = initializeApp(firebaseConfig);
 const storage = getStorage(firebase);
 const database = getDatabase(firebase);
 const auth = getAuth(firebase);
 

export { firebase, storage, database, auth as default };