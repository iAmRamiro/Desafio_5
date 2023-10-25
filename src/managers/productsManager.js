import { productsModel } from "../db/models/products.model.js";

class ProductsManager {
  async findAll() {
    const resolve = await productsModel.find();
    return resolve;
  }

  async findById(id) {
    const resolve = await productsModel.findById(id);
    return resolve;
  }

  async createOne(obj) {
    const resolve = await productsModel.create(obj);
    return resolve;
  }

  async updateOne(id, obj) {
    const resolve = await productsModel.updateOne({ _id: id }, obj);
    return resolve;
  }

  async delteOne(id) {
    const resolve = await productsModel.deleteOne(id);
    return resolve;
  }
}

export const productsManager = new ProductsManager();
