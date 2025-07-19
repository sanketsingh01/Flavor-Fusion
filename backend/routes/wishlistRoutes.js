import express from "express";
import { addToWishlist } from "../controllers/wishlistController.js";

const wishlistRoutes = express.Router();

wishlistRoutes.post("/addToWishlist/:id", addToWishlist);

export default wishlistRoutes;
