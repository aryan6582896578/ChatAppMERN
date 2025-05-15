import { createRoot, ReactDOM } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import LoginPage from "./components/loginPage.jsx";
import RegisterPage from "./components/registerPage.jsx";
import ChatPage from "./components/chatPage.jsx";
import AuthCheckPre from "./components/Auth/authCheckPre.jsx";
import AuthCheckMain from "./components/Auth/authCheckMain.jsx";
import AuthCheckRoute from "./components/Auth/authCheckRoute.jsx";
import ErrorPage from "./components/errorPage.jsx";
import MainChatPage from "./components/MainChatPage.jsx";


let container = null;
document.addEventListener("DOMContentLoaded", function (event) {
  if (!container) {
    container = document.getElementById("root");
    const root = createRoot(container);
    root.render(
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<App />} />
          <Route path="*" element={<ErrorPage />} />

          <Route path={`${import.meta.env.VITE_VERSION}`} element={<AuthCheckPre />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>

          <Route path={`${import.meta.env.VITE_VERSION}/@me`} element={<AuthCheckMain />}>
            <Route path="chat" element={<ChatPage />} />
            <Route path="chat/:serverId/" element={<AuthCheckRoute/>} >
             <Route path=":channelId?" element={<MainChatPage />} />
            </Route>
          </Route>

        </Routes>
      </BrowserRouter>
    );
  }
});

// const root = document.getElementById("root");
// createRoot(root).render(
//   <BrowserRouter>

//     <Routes>
//           <Route path="/" element={<App />} />
//           <Route path={`${import.meta.env.VITE_VERSION}`} element={<AuthCheckPre />}>
//                 <Route path="login" element={<LoginPage />} />
//                 <Route path="register" element={<RegisterPage />} />
//           </Route>
//           <Route path={`${import.meta.env.VITE_VERSION}/me`}element={<AuthCheckMain />}>
//                 <Route path="chat" element={<ChatPage />} />
//           </Route>
//           <Route path="*" element={<ErrorPage />} />

//     </Routes>
//     </BrowserRouter>
// )
