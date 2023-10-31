import { Router } from "express";
import { messageManager } from "../managers/messagesManager.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allMessages = await messageManager.getAll();
    res.render("chat", { message: allMessages });
  } catch (error) {
    res.status(500).send("Error interno del servidor");
  }
});

export default router;
