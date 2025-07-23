import ProductModel from "../Model/productModel.js";
import User from "../Model/userModel.js";

export const productDetails = async (req, res) => {
  try {
    const { productIds } = req.body;

    const products = await ProductModel.find({
      _id: { $in: productIds },
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Product details fetched Successfully",
      body: products,
    });
  } catch (error) {
    console.error("Failed to fetch cart products:", err);
    res.status(500).json({
      status: 500,
      success: false,
      message: "failed to fetch cart products",
      body: error,
    });
  }
};

export const increaseQuantity = async (req, res) => {
  const userId = req.params.id;
  const { productId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "User Not Found",
      });
    }

    const ItemIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (ItemIndex > -1) {
      user.cart[ItemIndex].quantity += 1;
    } else {
      user.cart.push({ productId, quantity: 1 });
    }

    await user.save();

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Quantity Increased!",
      body: user,
    });
  } catch (error) {
    console.log("Error while increasing quantity: ", error);
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Error to increase quantitty",
    });
  }
};

export const decreaseQuantity = async (req, res) => {
  const userId = req.params.id;
  const { productId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "User Not Found",
      });
    }

    const itemIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      // If quantity is 1, remove the item completely
      if (user.cart[itemIndex].quantity === 1) {
        user.cart.splice(itemIndex, 1);
      } else {
        user.cart[itemIndex].quantity -= 1;
      }
    } else {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Item not in cart",
      });
    }

    await user.save();

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Item's quantity updated",
      body: user,
    });
  } catch (error) {
    console.log("Error while decreasing item's quantity", error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Error while decreasing item's quantity",
      body: error,
    });
  }
};
