import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Skeleton from "@mui/material/Skeleton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FaceIcon from "@mui/icons-material/Face";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useChat } from "../../context/chat";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const openn = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [state, setState] = React.useState({
    top: false,
    left: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.key === "Tab" || event.key === "Shift") {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const accessChat = async (userId) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/chat/access-chat",
        {
          userId,
        }
      );
      console.log(data);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      setSelectedChat(data);
    } catch (error) {
      console.log(error);
    }
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      // onClick={toggleDrawer(anchor, false)}
      onClose={toggleDrawer(anchor, false)}
    >
      <List>
        <Box ml={4} mb={2}>
          <TextField
            variant="standard"
            size="normal"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            label={
              <IconButton>
                {" "}
                <SearchIcon />
                <Typography>Search</Typography>
              </IconButton>
            }
          ></TextField>
        </Box>
        {loading ? (
          <Skeleton variant="rectangular" width={210} height={60} />
        ) : (
          search &&
          userList.map((val, index) => (
            <ListItem
              key={index}
              disablePadding
              //click krte hi ek nayi chat ban jaaegi...
              onClick={() => accessChat(val._id)}
            >
              <ListItemButton>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <Stack>
                  <ListItemText primary={val.name} />
                  <ListItemText primary={val.email} />
                  <Divider />
                </Stack>
              </ListItemButton>
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );

  const [userList, setUserList] = useState([]);
  const [search, setSearch] = useState("");

  const [user, setUser, chats, setChats, selectedChat, setSelectedChat] =
    useChat();

  const fetchUserList = async (req, res) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `${user?.token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/user/get-all-users?search=${search}`,
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
  }, [search]);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <IconButton onClick={toggleDrawer("left", true)}>
              <SearchIcon />
              <Typography variant="h5">Search User</Typography>
            </IconButton>
          </Box>
          <Box>
            <Typography variant="h5"> TALK_A_TIVE</Typography>
          </Box>
          <Box>
            <IconButton>
              <NotificationsIcon></NotificationsIcon>
            </IconButton>
            <IconButton onClick={handleClick}>
              <FaceIcon />
              <Menu
                anchorEl={anchorEl}
                open={openn}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={(e) => setOpen(true)}>Profile</MenuItem>
                <MenuItem
                  onClick={() => {
                    setUser(null);
                    localStorage.removeItem("userInfo");
                    navigate("/");
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </IconButton>
          </Box>
          <Box>
            <Drawer
              anchor={"left"}
              open={state["left"]}
              onClose={toggleDrawer("left", false)}
            >
              {list("left")}
            </Drawer>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Sidebar;
