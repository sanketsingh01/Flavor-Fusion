import express from "express";
import {
  addProduct,
  allProducts,
  deleteProduct,
  updateProduct,
} from "../controllers/AdminControllers.js";

const adminRoutes = express.Router();

adminRoutes.post("/addProduct", addProduct);
adminRoutes.get("/allProducts", allProducts);
adminRoutes.put("/updateProduct/:id", updateProduct);
adminRoutes.delete("/deleteProduct/:id", deleteProduct);

export default adminRoutes;
