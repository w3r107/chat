import React, { useState } from "react";
import { Box, Container, styled, Typography } from "@mui/material";
import Login from "./Login";
import Register from "./Register";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const LoginAndRegister = () => {
  const [value, setValue] = useState("1");
  return (
    <Container
      mt={4}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          width: "60%",
          borderRadius: "30px",
          height: "80px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" textAlign={"center"}>
          TALK-A-TIVE
        </Typography>
      </Box>
      <br />

      <Box
        sx={{
          backgroundColor: "white",
          width: "60%",
          borderRadius: "30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <TabList
              onChange={(e, val) => setValue(val)}
              aria-label="lab API tabs example"
            >
              <Tab
                label={<Typography variant="h6">Login</Typography>}
                value="1"
              />
              <Tab
                label={<Typography variant="h6">Register</Typography>}
                value="2"
              />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ width: "100%" }}>
            <Login />
          </TabPanel>
          <TabPanel value="2" sx={{ width: "100%" }}>
            <Register />
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
};

export default LoginAndRegister;
