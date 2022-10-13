import React from 'react';
import './App.css';
import {
  BrowserRouter as Router ,Routes ,Route
} from 'react-router-dom';
import Home from './pages/main';
import PremiumPage from './pages/premium';
import ContactPage from './pages/contact';
import CreatingAccountPage from './pages/process';
import ProfileEditPage from './pages/profile';
import ChatPage from './pages/chat';
import ListPage from './pages/listUsers';
import PrivacyPage from './pages/privacy';
import LogInAndSignUpPage from './pages/startForm';
import ForgotPassPage from './pages/forgotPass';


function App() {

  return (

    <Router>
      
        <Routes>
          <Route path='/' element={<Home/>} exact />
          <Route path='/premium' element={<PremiumPage/>} />
          <Route path='/contact' element={<ContactPage/>} />
          <Route path='/startForm' element={<LogInAndSignUpPage/>} />
          <Route path='/process' element={<CreatingAccountPage/>} />
          <Route path='/profile' element={<ProfileEditPage/>} />
          <Route path='/chat' element={<ChatPage/>} />
          <Route path='/listUsers' element={<ListPage/>} />
          <Route path='/privacy' element={<PrivacyPage/>} />
          <Route path='/forgotPass' element={<ForgotPassPage/>} />
        </Routes>
      
    </Router>
   

  );
}

export default App;
