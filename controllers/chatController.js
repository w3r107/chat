import userModel from "../models/userModel.js";
import messageModel from "../models/messageModel.js";
import chatModel from "../models/chatModel.js";

export const accessChat = async (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  if (!userId) {
    res.status(301).send({ success: "false", msg: "not proivded with userID" });
  }
  try {
    var existingChat = await chatModel
      .find({
        isGroupChat: false,
        $and: [
          { users: { $elemMatch: { $eq: req.user._id } } },
          {
            users: { $elemMatch: { $eq: userId } },
          },
        ],
      })
      .populate("users", "-password")
      .populate("latestMessage");

    existingChat = await userModel.populate(existingChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });
    if (existingChat.length > 0) {
      return res.status(200).send(existingChat[0]);
    } else {
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };
      try {
        const createdChat = await chatModel.create(chatData);
        const FullChat = await chatModel
          .findOne({ _id: createdChat._id })
          .populate("users", "-password");
        res.status(200).json(FullChat);
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .send({ success: "false", msg: "error in creating chat", error });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
export const fetchChat = async (req, res) => {
  try {
    chatModel
      .find({
        users: { $elemMatch: { $eq: req.user._id } },
      })
      .populate("users", "-pic")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        //yha tk ho gya, ab jaada advance krne ke loye hum log lateset msg dikha rhe h
        // aur ye bhi dikha rhe ko wo msg kon bheja h...
        results = await userModel.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: "false", msg: "error in fetchChatController" });
  }
};
export const createGroupChat = async (req, res) => {
  const userArray = req.body.users;

  if (!req.body.users || !req.body.name) {
    return res
      .status(301)
      .send({ success: "false", message: "Please Fill all the fields" });
  }
  userArray.push(req.user._id);
  if (userArray.length < 2) {
    return res.status(301).send({
      success: "false",
      msg: "More than 2 users are required to form a group chat",
    });
  }
  try {
    const groupChat = await chatModel.create({
      chatName: req.body.name,
      users: userArray,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await chatModel
      .findOne({ _id: groupChat._id })
      .populate("users", "-pic")
      .populate("groupAdmin", "-pic");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};
export const renameChatGroup = async (req, res) => {
  const { chatName, chatId } = req.body;
  console.log(chatName, chatId);
  const updatedChat = await chatModel
    .findByIdAndUpdate(
      chatId,
      {
        chatName,
      },
      { new: true }
    )
    .populate("users", "-pic")
    .populate("groupAdmin", "-pic");
  res.send({ success: "true", updatedChat });
};
export const removeFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin
  try {
    const removed = await chatModel
      .findByIdAndUpdate(
        chatId,
        {
          $pull: { users: userId },
        },
        {
          new: true,
        }
      )
      .populate("users", "-pic")
      .populate("groupAdmin", "-pic");
    res.status(200).send({ removed });
  } catch (error) {
    res
      .status(404)
      .send({ success: "false", msg: "error in removing...", error });
    console.log(error);
  }
};
export const addToGroup = async (req, res) => {
  try {
    const { chatId, userId } = req.body;

    // check if the requester is admin

    const added = await chatModel
      .findByIdAndUpdate(
        chatId,
        {
          $push: { users: userId },
        },
        {
          new: true,
        }
      )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    if (added) {
      res.status(200).send({ success: "true", added });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: "false", msg: "error in addToGroup", error });
  }
};
