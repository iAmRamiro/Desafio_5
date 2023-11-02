import { Router } from "express";
import { productsManager } from "../managers/productsManager.js";

const router = Router();

router.get("/home", (req, res) => {
  res.render("home");
});

/* router.get("/products", async (req, res) => {
  const products = await productsManager.findProducts();
  res.render("products", products);
});
 */
export default router;
