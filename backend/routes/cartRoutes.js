import express from "express";
import { productDetails } from "../controllers/cartControllers.js";

const cartRoutes = express.Router();

cartRoutes.post("/products", productDetails);

export default cartRoutes;
