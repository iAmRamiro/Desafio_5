import mongoose from "mongoose";

const URI =
  "mongodb+srv://iAmRamiro:lafamilia123@cluster0.q4vycww.mongodb.net/ecommerceDB?retryWrites=true&w=majority";

mongoose
  .connect(URI)
  .then(() => console.log("conectado a la db"))
  .catch((e) => console.log(e));
