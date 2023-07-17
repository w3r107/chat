import express from "express";
import formidable from "express-formidable";
import {
  loginController,
  registerController,
  getAllUsers,
  getPic,
} from "../controllers/authContoller.js";
import { requireSign } from "../middleware/authMiddleware.js";

const router = express.Router();

//AUTH ROUTES
router.post("/login", loginController);
router.post("/register", formidable(), registerController);

//GET-ALL-USERS
//ye ek tarah se post req hai ,iske aage query kii tarah data lenge...
router.get("/get-all-users", requireSign, getAllUsers);

router.get("/get-pic/:userId", getPic);

export default router;
