import { StrictMode } from 'react'
import { createRoot,ReactDOM } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.jsx'
import LoginPage from './components/loginPage.jsx';
import RegisterPage from './components/registerPage.jsx';
import Something from './components/something.jsx';

import HomePage from './components/homePage.jsx';
import ChatPage from './components/chatPage.jsx';
import TestPage from './components/test.jsx';
import AuthCheckPre from './components/authCheckPre.jsx';
import AuthCheckMain from './components/authCheckMain.jsx';
const root = document.getElementById("root");
createRoot(root).render(
  <BrowserRouter>
   
    <Routes>
          <Route path="/" element={<App />} />
          <Route path={`${import.meta.env.VITE_VERSION}`} element={<AuthCheckPre />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
          </Route>
          <Route path={`${import.meta.env.VITE_VERSION}/me`}element={<AuthCheckMain />}>
                <Route path="chat" element={<ChatPage />} />
          </Route>

    </Routes>
    </BrowserRouter>




)
