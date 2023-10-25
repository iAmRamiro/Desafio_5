import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  stock: {
    type: Number,
    default: 0,
  },

  thumbnails: {
    type: Array,
    default: [],
  },
});

export const productsModel = mongoose.model("Products", productSchema);
