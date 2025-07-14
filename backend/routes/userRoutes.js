import express from "express";
import {
  allUsers,
  deleteUser,
  login,
  signup,
  updateUser,
} from "../controllers/userControllers.js";

const userRoutes = express.Router();

userRoutes.post("/signup", signup);
userRoutes.post("/login", login);
userRoutes.get("/allUsers", allUsers);
userRoutes.put("/updateUser/:id", updateUser);
userRoutes.delete("/deleteUser/:id", deleteUser);

export default userRoutes;
