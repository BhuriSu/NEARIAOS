import React from "react";
import "./App.css";
import {
  BrowserRouter , Routes, Route 
} from "react-router-dom";
import Home from "./pages";
import SerranoPage from "./pages/serrano";
import ContactPage from "./pages/contact";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import CreatingAccountPage from "./pages/process";
import ProfileEditPage from "./pages/profile";
import AllChatPage from "./pages/allChat";
import ChatPage from "./pages/chat";
import MessagePage from "./pages/message";
import ListPage from "./pages/listUsers";
import PrivacyPage from "./pages/privacy";
import ForgotPasswordPage from "./pages/forgotPassword";
import ResetPasswordPage from "./pages/resetPassword";
import AuthContextProvider from "./context";

function App() {
  
 
  return (

    <AuthContextProvider>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} exact />
          <Route path="/serrano" element={<SerranoPage/>} />
          <Route path="/contact" element={<ContactPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/process" element={<CreatingAccountPage/>} />
          <Route path="/profile" element={<ProfileEditPage/>} />
          <Route path="/allChat" element={<AllChatPage/>} />
          <Route path="/chat" element={<ChatPage/>} />
          <Route path="/message" element={<MessagePage/>} />
          <Route path="/listUsers" element={<ListPage/>} />
          <Route path="/privacy" element={<PrivacyPage/>} />
          <Route path="/forgotPassword" element={<ForgotPasswordPage/>} />
          <Route path="/resetPassword" element={<ResetPasswordPage/>} />
        </Routes>
        </BrowserRouter>
    </AuthContextProvider>

  );
}

export default App;
