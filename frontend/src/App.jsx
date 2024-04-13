import React from 'react';
import './App.css';
import {
  BrowserRouter as Router ,Routes ,Route
} from 'react-router-dom';
import Home from './pages/main';
import PremiumPage from './pages/premium';
import ContactPage from './pages/contact';
import ProfilePage from './pages/profiles';
import NewAccount from './pages/NewAccount';
import ChatPage from './pages/chat';
import ListPage from './pages/listUsers';
import PrivacyPage from './pages/privacy';
import LogInAndSignUpPage from './pages/startForm';
import ForgotPassPage from './pages/forgotPass';
import { initiateSocketConnection } from "./socketHelper";

function App() {
  initiateSocketConnection();
  return (

    <Router>
        <Routes>
          <Route path='/' element={<Home/>} exact />
          <Route path='/premium' element={<PremiumPage/>} />
          <Route path='/contact' element={<ContactPage/>} />
          <Route path='/startForm' element={<LogInAndSignUpPage/>} />
          <Route path='/newAccount' element={<NewAccount/>} />
          <Route path='/profile' element={<ProfilePage/>} />
          <Route path='/chat' element={<ChatPage/>} />
          <Route path='/listUsers' element={<ListPage/>} />
          <Route path='/privacy' element={<PrivacyPage/>} />
          <Route path='/forgotPass' element={<ForgotPassPage/>} />
        </Routes>
    </Router>
   
  );
}

export default App;
