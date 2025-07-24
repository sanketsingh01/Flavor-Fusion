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

const orderItemSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  name: { type: String, required: true, default: "" },
  quantity: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true, default: 0 },
});

const orderSchema = mongoose.Schema({
  items: {
    type: [orderItemSchema],
    required: true,
    default: [],
  },
  totalAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  orderAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "Delivered",
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

    history: {
      type: [orderSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);
export default User;
