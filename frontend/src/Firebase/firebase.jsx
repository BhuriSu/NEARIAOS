
import { initializeApp } from 'firebase/app';
import { getStorage }  from 'firebase/storage';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.VITE_DB_API,
  authDomain: process.env.VITE_authDomain,
  projectId: process.env.VITE_projectId,
  databaseURL: process.env.VITE_databaseURL,
  storageBucket: process.env.VITE_storageBucket,
  messagingSenderId: process.env.VITE_messagingSenderId,
  appId: process.env.VITE_database_AppId,
  measurementId: process.env.VITE_measurementId,
};

 const firebase = initializeApp(firebaseConfig);
 const storage = getStorage(firebase);
 const database = getDatabase(firebase);
 const auth = getAuth(firebase);
 

export { firebase, storage, database, auth as default };