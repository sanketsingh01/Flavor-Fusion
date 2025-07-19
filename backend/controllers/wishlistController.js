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
