import chatModel from "../models/chatModel.js";
import messageModel from "../models/messageModel.js";
import userModel from "../models/userModel.js";

export const sendMessageController = async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    return res.status(500).send("bhk");
  }
  var newMessaage = {
    sender: req.user._id,
    content,
    chat: chatId,
  };
  try {
    var message = await messageModel.create(newMessaage);
    message = await message.populate("sender");
    message = await message.populate("chat");
    message = await userModel.populate(message, {
      path: "chat.users",
    });
    await chatModel.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });
    res.json(message);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

export const getMessageController = async (req, res) => {
  try {
    const messages = await messageModel
      .find({ chat: req.params.chatId })
      .populate("sender")
      .populate("chat");

    res.status(200).send(messages);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
