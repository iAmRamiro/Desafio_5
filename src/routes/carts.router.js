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

router.delete("/:idCart", async (req, res) => {
  const { idCart } = req.params;

  try {
    const cartDeleted = await cartsManager.deleteCart(idCart);

    res.status(200).json({ message: "cart deleted", cartDeleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:idCart/products/:idProduct", async (req, res) => {
  const { idCart, idProduct } = req.params;

  try {
    const response = await cartsManager.deleteProductInCart(idCart, idProduct);
    res.status(200).json({ message: "product deleted", response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:idCart/products/:idProduct", async (req, res) => {
  const { idCart, idProduct } = req.params;
  const { quantity } = req.body;

  if (!quantity) {
    return res.status(400).json({ error: "Not quantity sent" });
  }

  try {
    const response = await cartsManager.updateProductQuantity(
      idCart,
      idProduct,
      quantity
    );
    res.status(200).json({ message: "quantity updated", response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
