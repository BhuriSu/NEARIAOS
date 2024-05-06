import React from 'react';
import './App.css';
import {
  BrowserRouter as Router ,Routes ,Route
} from 'react-router-dom';
import Home from './pages/main';
import PremiumPage from './pages/premium';
import ContactPage from './pages/contact';
import ProfilePage from './Profile';
import NewAccount from './NewAccount';
import ChatPage from './pages/chat';
import ListPage from './pages/listUsers';
import PrivacyPage from './Privacy';
import LogInAndSignUpPage from './LogInAndSignUp';
import ForgetPassPage from './ForgetPassword';
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
          <Route path='/listUser' element={<ListPage/>} />
          <Route path='/privacy' element={<PrivacyPage/>} />
          <Route path='/forgotPass' element={<ForgetPassPage/>} />
        </Routes>
    </Router>
   
  );
}

export default App;
