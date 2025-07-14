import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, default: "" },
  email: { type: String, default: "" },
  password: { type: String, default: "" },
  phone: { type: Number, default: 0 },
  address: { type: String, default: "" },
  imageUrl: { type: String, default: "" },
});

const User = mongoose.model("user", userSchema);
export default User;
