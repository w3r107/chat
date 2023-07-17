import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ChatProvider } from "./context/chat";
import { RealChatProvider } from "./context/realchat";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChatProvider>
    <RealChatProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RealChatProvider>
  </ChatProvider>
);
