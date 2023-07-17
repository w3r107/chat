import express from "express";
import {
  getMessageController,
  sendMessageController,
} from "../controllers/messageController.js";
import { requireSign } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/send", requireSign, sendMessageController);

router.get("/get-messagesfrom/:chatId", requireSign, getMessageController);

export default router;
