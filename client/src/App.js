import "./App.css";
import { Typography } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Chatpage from "./Pages/Chatpage";
import Test from "./Pages/Test";
import LoginAndRegister from "./Pages/Auth/LoginAndRegister";
import Homepage from "./Pages/Homepage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginAndRegister />} />
      <Route path="/home" element={<Homepage />} />
      {/* <Route path="/test" element={<Test />} /> */}
    </Routes>
  );
}

export default App;
