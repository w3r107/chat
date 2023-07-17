import axios from "axios";
import { useContext, createContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();
const ChatProvider = ({ children }) => {
  //auth credentials
  const [user, setUser] = useState([]);
  const x = useRef(0);

  if (x > 0) {
    console.log("meri wajh se");

    window.location.reload();
    console.log("meri wajh se");
  }

  //jiski chats hum log ko chahiye,mtlb jispe click krenge....
  const [selectedChat, setSelectedChat] = useState([]);
  // const [chats, setChats] = useState([]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    x.current = x.current + 1;
    // eslint-disable-next-line
  }, []);

  return (
    <ChatContext.Provider
      value={[user, setUser, selectedChat, setSelectedChat]}
    >
      {children}
    </ChatContext.Provider>
  );
};
const useChat = () => useContext(ChatContext);
export { useChat, ChatProvider };
