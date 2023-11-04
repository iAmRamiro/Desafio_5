import { cartsModel } from "../db/models/carts.model.js";

class CartsManager {
  async createCart() {
    const newCart = { products: [] };

    const response = await cartsModel.create(newCart);
    return response;
  }

  async findCartById(idCart) {
    const response = await cartsModel
      .findById(idCart)
      .populate("products.product", ["title", "price"]);
    return response;
  }

  async addProductToCart(idCart, idProduct) {
    const cart = await cartsModel.findById(idCart);

    // buscamos el producto por indice si existe
    const productIndex = cart.products.findIndex((prod) =>
      prod.product.equals(idProduct)
    );

    if (productIndex === -1) {
      cart.products.push({ product: idProduct, quantity: 1 });
    } else {
      cart.products[productIndex].quantity++;
    }

    return cart.save();
  }

  async deleteAllProducts(idCart) {
    try {
      const updatedCart = await cartsModel.findByIdAndUpdate(
        idCart,
        { $set: { products: [] } },
        { new: true }
      );

      if (!updatedCart) {
        throw new Error("Cart not found");
      }

      return { deleted: true, updatedCart };
    } catch (error) {
      console.error(error.message);
      return { deleted: false, error: error.message };
    }
  }

  async deleteProductInCart(idCart, idProduct) {
    try {
      const result = await cartsModel.findByIdAndUpdate(
        idCart,
        { $pull: { products: { product: idProduct } } },
        { new: true }
      );

      if (!result) {
        throw new Error("Cart not found.");
      }

      return { deleted: true };
    } catch (error) {
      console.error(error);
      return { deleted: false, error: error.message };
    }
  }

  async updateCart(idCart, newProducts) {
    try {
      const cart = await cartsModel.findById(idCart);

      if (!cart) {
        throw new Error("Cart Not Found");
      }

      cart.products = newProducts.products;

      return cart.save();
    } catch (error) {
      console.error(error);
    }
  }

  async updateProductQuantity(idCart, idProduct, newQuantity) {
    try {
      const cart = await cartsModel.findById(idCart);

      if (!cart) {
        throw new Error("cart not found");
      }

      const productIndex = cart.products.findIndex((prod) =>
        prod.product.equals(idProduct)
      );

      if (productIndex === -1) {
        throw new Error("product not found");
      }

      cart.products[productIndex].quantity = newQuantity;

      const updatedProductQuantity = await cart.save();

      return updatedProductQuantity;
    } catch (error) {
      console.error(error);
    }
  }
}

export const cartsManager = new CartsManager();
