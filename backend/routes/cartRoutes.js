import express from "express";
import {
  decreaseQuantity,
  increaseQuantity,
  productDetails,
} from "../controllers/cartControllers.js";

const cartRoutes = express.Router();

cartRoutes.post("/products", productDetails);
cartRoutes.post("/increaseQuantity/:id", increaseQuantity);
cartRoutes.post("/decreaseQuantity/:id", decreaseQuantity);

export default cartRoutes;
