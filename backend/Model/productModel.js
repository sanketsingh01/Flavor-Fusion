import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: { type: String, default: "" },
  description: { type: String, default: "" },
  price: { type: Number, default: 0 },
  imageUrl: { type: String, default: "" },
  category: { type: String, default: "" },
  ingredients: { type: [String], default: [] },
});

const ProductModel = mongoose.model("product", productSchema);
export default ProductModel;
