import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useChat } from "./chat";

const RealChatContext = createContext();
const RealChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [user, setUser] = useChat();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const fetchChats = async () => {
    if (userInfo) {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/api/v1/chat/fetch-chat`,

        { headers: { Authorization: `${userInfo.token}` } }
      );
      console.log(data);
      setChats(data);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <RealChatContext.Provider value={[chats, setChats]}>
      {children}
    </RealChatContext.Provider>
  );
};

const useRealChat = () => useContext(RealChatContext);
export { RealChatProvider, useRealChat };
