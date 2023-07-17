import { Box, Container, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useChat } from "../../context/chat";

const MyChats = () => {
  const [user, setUser, chats, setChats, selectedChat, setSelectedChat] =
    useChat();
  const [loggedUser, setLoggedUser] = useState();

  const getName = (loggedUser, users) => {
    return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
  };

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `${user?.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:5000/api/v1/chat/fetch-chat`,
        config
      );
      setChats(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));

    fetchChats();
  }, []);

  return (
    <>
      <Box width={"40%"} style={{ height: "100vh" }}>
        {chats?.map((val) => {
          const nameToDisplay = getName(user, val.users);
          console.log(nameToDisplay);
          return (
            <>
              <Typography>{nameToDisplay}</Typography>
            </>
          );
        })}
      </Box>
    </>
  );
};

export default MyChats;
