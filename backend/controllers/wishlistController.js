import Wishlist from "../Model/wishlistModel.js";

export const addToWishlist = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Product ID is required",
      });
    }

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({
        userId,
        items: [{ productId }],
      });
    } else {
      const exists = wishlist.items.find(
        (item) => item.productId.toString() === productId
      );

      if (exists) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "Item already in wishlist",
        });
      }

      wishlist.items.push({ productId });
    }

    await wishlist.save();

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Item added to Wishlist",
      body: wishlist,
    });
  } catch (error) {
    console.error("Error while adding to wishlist: ", error);
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Error while adding to wishlist",
      body: error.message,
    });
  }
};

export const getWishlistItems = async (req, res) => {
  try {
    const { id: userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        status: 400,
        success: aflse,
        message: "User id required",
      });
    }

    const wishlist = await Wishlist.findOne({ userId });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "wislist fetched succesfullt",
      body: wishlist,
    });
  } catch (error) {}
};

export const removeFromWishlist = async (req, res) => {
  // console.log("Request body: ", req.body);
  // console.log("Params: ", req.params);
  const { id: userId } = req.params;
  const { productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Both user and product Id's are required",
    });
  }

  try {
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "WishList Not Found",
      });
    }

    wishlist.items = wishlist.items.filter(
      (item) => item.productId.toString() !== productId.toString()
    );

    await wishlist.save();

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Item removed from WishList",
      body: wishlist,
    });
  } catch (error) {
    console.log("Error while removing from Wishlist: ", error);
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Error while removing from wishlist",
      body: error,
    });
  }
};
