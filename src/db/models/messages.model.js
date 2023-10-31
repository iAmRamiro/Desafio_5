import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  message: {
    type: String,
    required: true,
  },
});

export const chatModel = new mongoose.model("Chat", chatSchema);
