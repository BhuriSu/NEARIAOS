import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  sendSignInLinkToEmail,
  isSignInWithEmailLink, 
} from 'firebase/auth';
import auth from '../Firebase';

export const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('Auth', currentUser);
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email, {
      url: `http://localhost:5173/startForm`,
    });
  }

  // Function to send sign-in link to email
  function sendSignInLink(email) {
    return sendSignInLinkToEmail(auth, email, {
      url: 'http://localhost:5173/completeSignIn',
      handleCodeInApp: true,
    });
  }

  // Function to complete sign-in with email link
  async function completeSignInWithEmailLink() {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }
      await signInWithEmailAndPassword(auth, email, window.location.href);
      window.localStorage.removeItem('emailForSignIn');
    }
  }

  useEffect(() => {
    completeSignInWithEmailLink();
  }, []); // Run once on component mount

  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut, googleSignIn, forgotPassword, sendSignInLink }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
