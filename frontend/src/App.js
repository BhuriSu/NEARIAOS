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
import MessagePage from './pages/message';
import ListPage from './pages/listUsers';
import PrivacyPage from './pages/privacy';
import ProtectedRoute from './LogInAndSignIn/ProtectedRoute';

function App() {

  return (

    <Router>

        <Routes>
          <Route path='/' element={<Home/>} exact />
          <Route path='/premium' element={<PremiumPage/>} />
          <Route path='/contact' element={<ContactPage/>} />
          <Route 
          path='/process' 
          element={
          <ProtectedRoute>
          <CreatingAccountPage/>
          </ProtectedRoute>
          } 
          />
          <Route path='/profile' element={<ProfileEditPage/>} />
          <Route path='/chat' element={<ChatPage/>} />
          <Route path='/message' element={<MessagePage/>} />
          <Route path='/listUsers' element={<ListPage/>} />
          <Route path='/privacy' element={<PrivacyPage/>} />
        </Routes>

    </Router>
   

  );
}

export default App;
