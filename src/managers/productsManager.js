import { productsModel } from "../db/models/products.model.js";

class ProductsManager {
  async findProducts() {
    const resolve = await productsModel.find();
    return resolve;
  }

  async findAll(obj) {
    const { limit = 10, page = 1, sort, ...query } = obj;

    //default sort
    const defaultSort = { price: 1 };

    const sortConfig = sort === "desc" ? { price: -1 } : defaultSort;

    const response = await productsModel.paginate(query, {
      limit,
      page,
      sort: sortConfig,
    });
    const info = {
      status: response.status,
      payload: response.docs,
      totalPages: response.totalPages,
      prevPage: response.prevPage,
      nextPage: response.nextPage,
      page: response.page,
      hasPrevPage: response.hasPrevPage,
      hasNextPage: response.hasNextPage,
      prevLink: response.hasPrevPage
        ? `http://localhost:8080/api/products?page=${response.prevPage}`
        : null,
      nextLink: response.hasNextPage
        ? `http://localhost:8080/api/products?page=${response.nextPage}`
        : null,
    };
    return info;
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

  async deleteOne(id) {
    const resolve = await productsModel.deleteOne({ _id: id });
    return resolve;
  }
}

export const productsManager = new ProductsManager();
