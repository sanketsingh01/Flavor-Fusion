import mongoose from "mongoose";

const cartItemSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const userSchema = mongoose.Schema(
  {
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    password: { type: String, default: "" },
    phone: { type: Number, default: 0 },
    address: { type: String, default: "" },
    imageUrl: { type: String, default: "" },

    cart: {
      type: [cartItemSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);
export default User;
