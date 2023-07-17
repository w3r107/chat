import {
  Container,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Input,
  InputLabel,
  FormControl,
  Alert,
  Snackbar,
} from "@mui/material";
import React, { useState } from "react";
import {
  PasswordOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import axios from "axios";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);

  const handleImageChange = (event) => {
    setPic(event.target.files[0]);
    const x = event.target.files[0];
    setSelectedImage(URL.createObjectURL(x));
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPass, setConPass] = useState("");
  const [pic, setPic] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("ge");
    console.log(name, email, password, conPass);
    if (!name || !email || !password || !conPass) {
      setOpen(true);
    }
    const formData = new FormData();
    if (password !== conPass) {
      return (
        <Alert severity="danger" color="info">
          Passwords do not match
        </Alert>
      );
    }

    try {
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("pic", pic);
      const { data } = await axios.post("/api/v1/user/register", formData);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <form onSubmit={handleRegister}>
        <TextField
          fullWidth
          label="Name"
          variant="standard"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <FormControl
          variant="standard"
          sx={{ width: "100%" }}
          margin="normal"
          value={conPass}
          onChange={(e) => setConPass(e.target.value)}
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Confirm Password
          </InputLabel>
          <Input
            type={showPassword2 ? "text" : "password"}
            autoComplete="false"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => {
                    setShowPassword2(!showPassword2);
                  }}
                  edge="end"
                >
                  {showPassword2 ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <div>
          <TextField
            type="file"
            variant="standard"
            margin="normal"
            InputProps={{
              inputComponent: Input,
              inputProps: {
                accept: "image/*",
                onChange: handleImageChange,
              },
            }}
            fullWidth
          />
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected"
              style={{ marginTop: "10px", maxWidth: "50%" }}
            />
          )}
        </div>
        <Button
          variant="contained"
          fullWidth
          type="submit"
          sx={{ marginTop: "10px" }}
        >
          Sign up
        </Button>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="warning"
          color="info"
          sx={{ width: "100%" }}
        >
          Please fill all the fields
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Register;
