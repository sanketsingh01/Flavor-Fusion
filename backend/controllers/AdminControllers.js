import ProductModel from "../Model/productModel.js";

export const addProduct = async (req, res) => {
  try {
    const newProduct = await ProductModel.create(req.body);
    console.log("New Product: ", newProduct);

    return res.status(201).json({
      status: 201,
      success: true,
      message: "Product added successfully",
      body: newProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: 400,
      success: false,
      message: error,
      body: {},
    });
  }
};

export const allProducts = async (req, res) => {
  try {
    const Products = await ProductModel.find(req.body);
    if (Products.length <= 0) {
      return res.status(200).json({
        status: 200,
        success: false,
        message: "NO product is added yet",
      });
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: "All products fetched successfully",
      body: Products,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: 400,
      success: false,
      message: error,
      body: {},
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updateProduct) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Product updated successfully",
      body: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: 400,
      success: false,
      message: error,
      body: {},
    });
  }
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  if (!productId) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Product id required",
    });
  }

  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Product deleted Successfully",
      body: deletedProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: 400,
      success: false,
      message: error,
      body: {},
    });
  }
};
