import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import ChatScreen from "../ChatScreen";
import ChatList from "../components/ChatList";
import Layout from "../Layout";

const Homepage = () => {
  return (
    <Layout>
      <Box sx={{ display: "flex" }}>
        <Box width={"30%"}>
          <ChatList />
        </Box>
        <Box width={"70%"}>
          <ChatScreen />
        </Box>
      </Box>
    </Layout>
  );
};

export default Homepage;
