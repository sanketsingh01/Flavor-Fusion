import express from "express";
import { DbConnect } from "./DbConnect/DbConnect.js";
import fileUpload from "express-fileupload";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const App = express();

App.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
App.use(express.json());

DbConnect();
App.use(fileUpload());
App.use("/user", userRoutes);
App.use("/admin", adminRoutes);

const Port = 3000;
App.listen(Port, () => {
  console.log(`App is running on Port: ${Port}`);
});
