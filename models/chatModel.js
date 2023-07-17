import mongoose from "mongoose";

const chatModel = new mongoose.Schema(
  {
    chatName: {
      type: String,
      trim: "true",
    },
    isGroupChat: {
      type: Boolean,
      default: "false",
    },
    //it is an array agar grp nahi hoga tab bhi do log to honge hi ...
    users: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: mongoose.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timeStamps: true }
);

export default mongoose.model("Chat", chatModel);
