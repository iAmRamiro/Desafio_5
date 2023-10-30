import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { __dirname } from "./utils.js";

import productsRouter from "./routes/products.router.js";
import viewsRouter from "./routes/views.router.js";
import cartsRouter from "./routes/carts.router.js";
import chatRouter from "./routes/chat.router.js";

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
app.use("/", viewsRouter);
app.use("/api/carts", cartsRouter);
app.use("/views/chat", chatRouter);

const httpServer = app.listen(8080, () =>
  console.log("escuchando puerto 8080")
);

const socketServer = new Server(httpServer);
const messages = [];

socketServer.on("connection", (socket) => {
  console.log("cliente conectado: ", socket.id);

  socket.on("newUser", (user) =>
    //emitir el evento a todos menos al usuario que se conecta
    socket.broadcast.emit("userConnected", user)
  );

  socket.on("message", (info) => {
    messages.push(info);
    socketServer.emit("chat", messages);
  });
});
