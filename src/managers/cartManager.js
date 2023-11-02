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

  async deleteCart(idCart) {
    try {
      const cartDeleted = await cartsModel
        .findByIdAndDelete({ _id: idCart })
        .populate("products.product", "title");

      return cartDeleted;
    } catch (error) {
      console.error(error);
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
