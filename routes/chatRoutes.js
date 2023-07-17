import express from "express";
import {
  accessChat,
  addToGroup,
  createGroupChat,
  fetchChat,
  removeFromGroup,
  renameChatGroup,
} from "../controllers/chatController.js";
import { requireSign } from "../middleware/authMiddleware.js";

const router = express.Router();

//IF EXIST RETURN THE CHAT OTHERWISE ,CREATE THE CHAT...
router.post("/access-chat", requireSign, accessChat);

//FETCH-ALL-CHATS FOR ONE PARTICULAR USER
//jitni bhi conversations wo banda hai wo saaro chats nikal
// ke dikha do
// it is like a post request,we are extracting user._id with
// the help of req.user instead of passing in the body.
router.get("/fetch-chat", requireSign, fetchChat);

//CREATE-GROUP
router.post("/create-group", requireSign, createGroupChat);

//RENAME-GROUP
router.put("/rename-group", renameChatGroup);

//REMOVE-FROM-GROUP
router.put("/remove-from-group", removeFromGroup);

//ADD-TO-GROUP
router.put("/add-to-group", addToGroup);

export default router;
