import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import { useChat } from "../context/chat";
import Navbar from "./design/Navbar";
import FaceIcon from "@mui/icons-material/Face";
import MyChats from "./design/MyChats";
import ChatBox from "./design/ChatBox";

const Chatpage = () => {
  const [user, setUser] = useChat();
  const [open, setOpen] = useState(false);

  console.log(user);

  return (
    <Box>
      <Box>
        <Navbar open={open} setOpen={setOpen} />
      </Box>
      <div>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" component="h2">
              {user?.name}
            </Typography>
            <Typography sx={{ mt: 2 }}>{user?.email}</Typography>
          </Box>
        </Modal>
      </div>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {user && <MyChats />}
        {/* {user && <ChatBox />}  */}
      </Box>
    </Box>
  );
};

export default Chatpage;
