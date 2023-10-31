import { chatModel } from "../db/models/messages.model.js";

class MessagesManager {
  async createOne(user, email, message) {
    try {
      const newMessage = new chatModel({ user, email, message });
      const savedMessge = await newMessage.save();
      return savedMessge;
    } catch (error) {
      return error;
    }
  }

  async getAll() {
    try {
      const allMessages = await chatModel.find();

      return allMessages;
    } catch (error) {
      return error;
    }
  }
}

export const messageManager = new MessagesManager();
