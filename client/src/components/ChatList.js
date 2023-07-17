import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";

import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useChat } from "../context/chat";
import { useRealChat } from "../context/realchat";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

const ChatList = () => {
  const [user, setUser, selectedChat, setSelectedChat] = useChat();
  const [chats, setChats] = useRealChat();
  console.log(chats);

  const whatIsName = (val) => {
    console.log("asfsfds kjn");
    if (val) {
      return val[0]._id === user._id ? val[1].name : val[0].name;
    } else return "laalu";
  };
  const [userList, setUserList] = useState([]);
  const [openGcModal, setOpenGcModal] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [grpName, setGrpName] = useState("");

  const fetchUserList = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `${user?.token}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/api/v1/user/get-all-users?search=${search}`,
        config
      );
      setUserList(data?.users);
      console.log(chats);
      setLoading(false);
    } catch (e) {
      setLoading(false);

      console.log(e);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, [search, user]);

  const [groupMembers, setGroupMembers] = useState([]);
  const handleClick = (val) => {
    if (!groupMembers.find((c) => c._id === val._id))
      setGroupMembers([...groupMembers, val]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/api/v1/chat/create-group`,
        {
          users: groupMembers,
          name: grpName,
        },
        { headers: { Authorization: `${user?.token}` } }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4">My Chats</Typography>
        <IconButton onClick={() => setOpenGcModal(true)}>
          <AddIcon />
          <Typography> New Group Chat</Typography>
        </IconButton>
      </Box>
      <Divider />
      <List>
        {chats[0] && (
          <>
            {chats?.map((val) => {
              console.log(val);
              return (
                <div key={val?._id}>
                  <ListItem
                    sx={{ backgroundColor: "#758283" }}
                    onClick={() => setSelectedChat(val)}
                  >
                    <ListItemText>
                      <Typography>
                        {val?.isGroupChat
                          ? `${val?.chatName}`
                          : whatIsName(val.users)}
                        {/* some random name */}
                      </Typography>
                      <Typography>{val?.latestMessage?.content}</Typography>
                    </ListItemText>
                  </ListItem>
                  <Divider />
                  <Divider />
                  <Divider />
                </div>
              );
            })}
          </>
        )}
      </List>
      <Dialog open={openGcModal} onClose={() => setOpenGcModal(false)}>
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h3" component="div" align="center">
            {" "}
            Create Group
          </Typography>
        </DialogTitle>
        <Stack spacing={1} direction="row">
          {groupMembers?.map((val) => {
            return (
              <Chip
                label={val.name}
                key={val._id}
                onDelete={() => {
                  const xx = groupMembers.filter((x) => x._id !== val._id);
                  setGroupMembers(xx);
                }}
              />
            );
          })}
        </Stack>

        <DialogContent>
          <TextField
            label="Group Name"
            variant="outlined"
            fullWidth={true}
            margin="normal"
            value={grpName}
            onChange={(e) => setGrpName(e.target.value)}
          />

          <TextField
            label="Enter members"
            variant="outlined"
            fullWidth={true}
            margin="normal"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </DialogContent>
        <Button type="submit" fullWidth={true} onClick={handleSubmit}>
          Create Group
        </Button>
        <List>
          {loading ? (
            <Skeleton variant="rectangular" width={210} height={118} />
          ) : search ? (
            userList?.map((val) => {
              return (
                <div key={val._id} onClick={() => handleClick(val)}>
                  <ListItem>
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
      </Dialog>
    </Container>
  );
};

export default ChatList;
