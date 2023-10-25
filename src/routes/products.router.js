import { Router } from "express";
import { productsManager } from "../managers/productsManager.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await productsManager.findAll();
    res.status(200).json({ message: "products found", products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const { title, price, stock, description } = req.body;

  if (!title || !price || !stock || !description) {
    return res.status(400).json({ message: "some data is missing" });
  }
  try {
    const createdProduct = await productsManager.createOne(req.body);
    res
      .status(200)
      .json({ message: "product created", product: createdProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:idProduct", async (req, res) => {
  try {
    const { idProduct } = req.params;

    const deleted = await productsManager.delteOne(idProduct);
    res.status(200).json({ message: "product deleted", deleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
