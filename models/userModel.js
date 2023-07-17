import mongoose from "mongoose";

const userModel = new mongoose.Schema({
  name: { type: String, trim: true },
  email: { type: String, trim: true },
  password: { type: String },
  pic: {
    data: Buffer,
    contentType: String,
  },
});

export default mongoose.model("User", userModel);
