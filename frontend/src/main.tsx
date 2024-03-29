import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import App from "./App.tsx";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";
import "./index.css";

import "react-toastify/dist/ReactToastify.css";
import { ConversationsContextProvider } from "./contexts/ConversationsContext.tsx";
import { SocketContextProvider } from "./contexts/SocketContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <SocketContextProvider>
          <ConversationsContextProvider>
            <App />
          </ConversationsContextProvider>
        </SocketContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
    <ToastContainer />
  </React.StrictMode>
);
