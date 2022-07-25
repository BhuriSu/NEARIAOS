
import  initializeApp  from "firebase/app";
import  getStorage  from "firebase/storage";
import  getDatabase  from "firebase/database";



const firebaseConfig = {
  apiKey: process.env.REACT_APP_DB_API,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  databaseURL: process.env.REACT_APP_databaseURL,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_database_AppId,
  measurementId: process.env.REACT_APP_measurementId,
};

export const firebase = initializeApp(firebaseConfig);
export const storage = getStorage(firebase);
export const database = getDatabase(firebase);
