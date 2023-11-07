import { Router } from "express";
import { productsManager } from "../managers/productsManager.js";

const router = Router();

router.get("/home", (req, res) => {
  res.render("home");
});

router.get("/products", async (req, res) => {
  let products = await productsManager.findAll(req.query);

  const { payload: ProductsDB, ...rest } = products;

  const productObject = ProductsDB.map((p) => p.toObject());

  res.render("products", { products: productObject, paging: rest });
});

export default router;
