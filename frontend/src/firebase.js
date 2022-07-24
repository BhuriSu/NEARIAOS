import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your web app"s Firebase configuration
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
// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const storage = getStorage(firebase);
const database = getDatabase(firebase);
const analytics = getAnalytics(firebase);
const auth = getAuth(firebase);

export {
  firebase, storage, database, analytics, auth as default,
};
