import express from "express";
import {
  addToWishlist,
  getWishlistItems,
  removeFromWishlist,
} from "../controllers/wishlistController.js";

const wishlistRoutes = express.Router();

wishlistRoutes.post("/addToWishlist/:id", addToWishlist);
wishlistRoutes.get("/:id", getWishlistItems);
wishlistRoutes.delete("/removeFromWishlist/:id", removeFromWishlist);

export default wishlistRoutes;
