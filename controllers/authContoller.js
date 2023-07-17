import JWT from "jsonwebtoken";
import fs from "fs";
import { comparePassword, hashPassword } from "../helper/authHelper.js";

import userModel from "../models/userModel.js";

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(301)
        .send({ success: false, msg: "all fields requires" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(301)
        .send({ success: false, msg: "user does not exist" });
    }

    const result = await comparePassword(password, user.password);
    if (!result) {
      return res
        .status(301)
        .send({ success: false, msg: "email or password incorrect" });
    }
    user.password = null;

    const token = await JWT.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    const sendUser = {
      name: user.name,
      email: user.email,
      _id: user._id,
      token,
    };

    return res.status(200).send({ success: "true", sendUser, token });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "error in login controller",
    });
    console.log(error);
  }
};

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.fields;
    const { pic } = req.files;

    if (!name || !email || !password) {
      return res
        .status(301)
        .send({ success: false, msg: "all fields requires" });
    }

    const hashedPass = await hashPassword(password);

    const dupUser = await userModel.findOne({ email });
    if (dupUser) {
      return res.status(301).send({
        success: false,
        msg: "user already exists",
      });
    } else {
      const user = new userModel({
        name,
        email,
        password: hashedPass,
      });
      if (pic) {
        (user.pic.data = fs.readFileSync(pic.path)),
          (user.pic.contentType = pic.type);
      }
      await user.save();
      res.status(200).send({ success: "true", user });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "error in register controller",
    });
    console.log(error);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const users = await userModel
      .find(keyword)
      .find({ _id: { $ne: req.user._id } });
    res.status(200).send({ success: true, users });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, msg: "error in getAllUsersContoller" });
    console.log(error);
  }
};

export const getPic = async (req, res) => {
  try {
    console.log(req.params.userId);
    const product = await userModel.findById(req.params.userId).select("pic");
    // console.log(pic.data);
    // res.send(product);
    if (product.pic.data) {
      res.set("Content-type", product.pic.contentType);
      return res.status(200).send(product.pic.data);
    }
  } catch (error) {
    res.status(500).send("error in getPic Controller");
    console.log(error);
  }
};
