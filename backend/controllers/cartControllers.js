import ProductModel from "../Model/productModel.js";

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
    res
      .status(500)
      .json({
        staus: 500,
        success: false,
        message: "failed to fetch cart products",
        body: error,
      });
  }
};
