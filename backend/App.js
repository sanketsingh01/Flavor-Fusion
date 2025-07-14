import express from "express";
import { DbConnect } from "./DbConnect/DbConnect.js";
import fileUpload from "express-fileupload";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const App = express();

DbConnect();
App.use(fileUpload());
App.use("/user", userRoutes);
App.use("/admin", adminRoutes);

const Port = 3000;
App.listen(Port, () => {
  console.log(`App is running on Port: ${Port}`);
});
