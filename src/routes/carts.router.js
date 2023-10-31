import { Router } from "express";
import { cartsManager } from "../managers/cartManager.js";

const router = Router();

router.get("/:idCart", async (req, res) => {
  const { idCart } = req.params;

  const cart = await cartsManager.findCartById(idCart);

  res.json({ cart });
});

router.post("/:idCart/products/:idProduct", async (req, res) => {
  const { idCart, idProduct } = req.params;

  const cart = cartsManager.addProductToCart(idCart, idProduct);

  res.json({ cart });
});

router.post("/", async (req, res) => {
  const cart = cartsManager.createCart();

  res.json({ cart });
});

export default router;
