import {
  AppBar,
  Avatar,
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
  Modal,
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
import { useNavigate } from "react-router-dom";
import { Search } from "@mui/icons-material";
import Sidebar from "./Sidebar";
import { useChat } from "../context/chat";

const Navbar = () => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [user] = useChat();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenProfile(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpenProfile(!openProfile);
    console.log(openProfile);
  };

  const [openModal, setOpenModal] = useState(false);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box flex={1}>
            <IconButton onClick={() => setOpenDrawer(true)}>
              <SearchIcon />
              <Typography variant="h5">Search User</Typography>
            </IconButton>
          </Box>
          <Box flex={1}>
            <Typography variant="h5"> TALK_A_TIVEa</Typography>
          </Box>
          <Box>
            <IconButton>
              <NotificationsIcon></NotificationsIcon>
            </IconButton>
            <IconButton onClick={handleClick}>
              <FaceIcon />
            </IconButton>

            <Box>
              <Menu
                onClose={handleClose}
                anchorEl={anchorEl}
                open={openProfile}
              >
                <MenuItem onClick={() => setOpenModal(true)}>Profile</MenuItem>
                <MenuItem
                  onClick={() => {
                    localStorage.removeItem("userInfo");
                    //   setUser(null);
                    navigate("/");
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
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
              <Avatar
                alt="user=pic"
                src={`${process.env.REACT_APP_BACKEND_API}/api/v1/user/get-pic/${user?._id}`}
              />

              <Typography id="modal-modal-title" variant="h6" component="h2">
                {user?.name}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {user?.email}
              </Typography>
            </Box>
          </Modal>
          <Sidebar openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
