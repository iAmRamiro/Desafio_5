import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { __dirname } from "./utils.js";

import productsRouter from "./routes/products.router.js";
import viewsRouter from "./routes/views.router.js";
import cartsRouter from "./routes/carts.router.js";
import chatRouter from "./routes/chat.router.js";

import { messageManager } from "./managers/messagesManager.js";

//db
import "./db/configDB.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/static", express.static("public"));

app.use("/api/products", productsRouter);
app.use("/views", viewsRouter);
app.use("/api/carts", cartsRouter);
app.use("/views/chat", chatRouter);

const httpServer = app.listen(8080, () =>
  console.log("escuchando puerto 8080")
);

const socketServer = new Server(httpServer);

const users = [];

socketServer.on("connection", async (socket) => {
  console.log("cliente conectado: ", socket.id);
  await messageManager.getAll();

  socket.on("message", async (info) => {
    console.log(info);
    await messageManager.createOne(info.user, info.email, info.message);
    const messages = await messageManager.getAll();
    console.log(messages);
    socketServer.emit("chat", messages);
  });

  socket.on("userConnected", (user) => {
    users.push(user);
    socket.broadcast.emit("users", users);
  });

  socket.on("disconnect", () => {
    const disconnectedUser = users.find((u) => u.socketId === socket.id);
    if (disconnectedUser) {
      users.splice(users.indexOf(disconnectedUser), 1);
      socket.broadcast.emit("userDisconnected", disconnectedUser);
    }
  });
});
