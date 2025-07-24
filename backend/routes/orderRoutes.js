import express from "express";
import { storeOrder } from "../controllers/historyControllers.js";

const orderRoutes = express.Router();

orderRoutes.post("/storeOrder/:id", storeOrder);

export default orderRoutes;
