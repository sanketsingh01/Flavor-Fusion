import User from "../Model/userModel.js";
import mongoose from "mongoose";

export const storeOrder = async (req, res) => {
  const userId = req.params.id;
  const { itemsArray, totalAmount } = req.body;

  console.log("Received itemsArray:", itemsArray);

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const formattedItems = itemsArray.map((item) => ({
      productId: new mongoose.Types.ObjectId(item.productId),
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    user.history.push({
      items: formattedItems,
      totalAmount,
    });

    user.cart = [];

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Order stored successfully",
      body: user,
    });
  } catch (error) {
    console.error("Error storing order:", error);
    return res.status(500).json({
      success: false,
      message: "Error storing order",
      error: error.message,
    });
  }
};
