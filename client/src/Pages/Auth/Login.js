import {
  Container,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Input,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

import { useChat } from "../../context/chat";

const Login = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useChat();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/login", {
        email,
        password,
      });
      console.log(data);
      if (data?.success) {
        setUser(data?.sendUser);
        localStorage.setItem("userInfo", JSON.stringify(data?.sendUser));
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <TextField
          fullWidth
          label="Email"
          variant="standard"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormControl
          variant="standard"
          sx={{ width: "100%" }}
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <Input
            type={showPassword ? "text" : "password"}
            autoComplete="false"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Button
          variant="contained"
          fullWidth
          sx={{ marginTop: "10px" }}
          type="submit"
        >
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
