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
  styled,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useChat } from "./context/chat";

const ChatScreen = () => {
  const [msgBox, setMsgBox] = useState("");
  const [messages, setMessages] = useState([]);
  const [user, setUser, selectedChat, setSelectedChat] = useChat();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [grpName, setGrpName] = useState(`${selectedChat?.chatName}`);
  const [groupMembers, setGroupMembers] = useState([]);
  const [userList, setUserList] = useState([]);

  var senderName;
  const whatIsName = (val) => {
    return val[0]._id === user._id ? val[1].name : val[0].name;
  };
  if (selectedChat?._id) {
    senderName = whatIsName(selectedChat?.users);
  }

  const sendMsg = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/api/v1/message/send`,
        {
          content: msgBox,
          chatId: selectedChat._id,
        },
        { headers: { Authorization: `${user.token}` } }
      );
      // setMessages([...messages,data]);
      setMsgBox("");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/api/v1/message/get-messagesfrom/${selectedChat._id}`,
        { headers: { Authorization: `${user.token}` } }
      );
      setMessages(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  const ScrollableContainer = styled(Box)(({ theme }) => ({
    height: "400px",
    overflow: "auto",
    scrollbarWidth: "thin",
    scrollbarColor: `${theme.palette.primary.main} ${theme.palette.background.paper}`,
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track": {
      background: theme.palette.background.paper,
    },
    "&::-webkit-scrollbar-thumb": {
      background: theme.palette.primary.main,
      borderRadius: "4px",
    },
  }));
  const [openGcModal, setOpenGcModal] = useState(false);

  const handleClick = (val) => {
    if (!groupMembers.find((c) => c._id === val._id))
      setGroupMembers([...groupMembers, val]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      groupMembers.users.map((val) => {
        val.pic = undefined;
      });
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
      setLoading(false);
    } catch (e) {
      setLoading(false);

      console.log(e);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, [search, user]);

  return (
    <Container height="100px">
      <Typography variant="h4" component="div" textAlign={"center"}>
        {selectedChat?.isGroupChat ? (
          <Typography>{selectedChat?.chatName}</Typography>
        ) : (
          <Typography>{senderName ? senderName : `Start Chatting`}</Typography>
        )}
      </Typography>
      <ScrollableContainer>
        <List>
          {messages.length > 0 &&
            messages?.map((val) => {
              return (
                <ListItem key={val._id}>
                  <ListItemText
                    align={val?.sender?._id === user?._id ? "right" : "left"}
                  >
                    <Typography
                      component="span"
                      backgroundColor={
                        val?.sender?._id === user?._id ? "blue" : "green"
                      }
                    >
                      <Typography> {val?.sender.name}</Typography>

                      {val?.content}
                    </Typography>
                  </ListItemText>
                </ListItem>
              );
            })}
        </List>
      </ScrollableContainer>
      <form onSubmit={sendMsg}>
        <TextField
          fullWidth={true}
          placeholder="Send a message"
          autoComplete="off"
          value={msgBox}
          onChange={(e) => setMsgBox(e.target.value)}
        />
      </form>
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
            userList?.map((val, idx) => {
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

export default ChatScreen;
