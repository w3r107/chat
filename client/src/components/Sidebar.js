import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search } from "@mui/icons-material";
import { useChat } from "../context/chat";
import { useRealChat } from "../context/realchat";
const Sidebar = ({ openDrawer, setOpenDrawer }) => {
  const x = JSON.parse(localStorage.getItem("userInfo"));
  const [user, selectedChat] = useChat();
  const [chats, setChats] = useRealChat();
  const [search, setSearch] = useState("");
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUserList = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `${user ? user.token : x.token}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/api/v1/user/get-all-users?search=${search}`,
        config
      );
      setUserList(data?.users);
      setLoading(false);
    } catch (e) {
      setLoading(false);

      console.log(e);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, [search, user]);

  const handleClick = async (userId) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/api/v1/chat/access-chat`,
        { userId },
        { headers: { Authorization: `${user?.token}` } }
      );
      // setChats(data.FullChat);
      // console.log(chats);
      // console.log(data);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      // setChats([...chats, data.FullChat]);

      console.log(chats);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Box sx={{ marginTop: "10px", padding: "10px" }}>
          <Box sx={{ padding: "10px" }}>
            <TextField
              label={
                <>
                  <IconButton>
                    <Search />
                    <Typography>Search Here</Typography>
                  </IconButton>
                </>
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              variant="standard"
            ></TextField>
          </Box>
        </Box>
        <List>
          {loading ? (
            <Skeleton variant="rectangular" width={210} height={118} />
          ) : search ? (
            userList?.map((val, idx) => {
              return (
                <div key={val._id}>
                  <ListItem onClick={() => handleClick(val._id)}>
                    <ListItemIcon>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography>{val?.name}</Typography>
                      <Typography>{val?.email}</Typography>
                    </ListItemText>
                  </ListItem>
                  <Divider />
                </div>
              );
            })
          ) : (
            <></>
          )}
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
