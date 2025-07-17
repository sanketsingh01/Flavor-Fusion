import User from "../Model/userModel.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { name, email, password, phone, address, imageUrl } = req.body;

  if (!name || !email || !password || !phone || !address) {
    return req.status(400).json({
      status: 400,
      success: false,
      messagge: "ALL FIELDS ARE REQUIRED",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Mail aleardy registered",
      });
    }

    const HashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: HashedPassword,
      phone,
      address,
      imageUrl,
    });

    return res.status(201).json({
      status: 201,
      success: true,
      message: "User registered successfully",
      body: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Error while registring user",
      body: error,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json(400).json({
      status: 400,
      success: false,
      message: "ALL FIELDS ARE REQUIRED",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Passowrd is Incorrect",
      });
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: "User loggedIn successfully",
      body: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Error while login user",
      body: error,
    });
  }
};

export const allUsers = async (req, res) => {
  try {
    const Users = await User.find(req.body);
    if (Users.length <= 0) {
      return res.status(200).json({
        status: 200,
        success: false,
        message: "None user is registered yet!",
      });
    }

    return res.status(200).json({
      status: 200,
      success: false,
      message: "All users fetched successfully",
      body: Users,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Error while fetching all users",
      body: error,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "User not Found",
      });
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: "User updated Successfully",
      body: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Error while updating user",
      body: error,
    });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "User id required",
    });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deleteUser) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: "User deleted successfully",
      body: deletedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Error while deleting user",
      body: error,
    });
  }
};

export const addToCart = async (req, res) => {
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
      message: "Item added to cart Successfully",
      body: user,
    });
  } catch (error) {
    console.log("Error while adding itenn to cart: ", error);
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Error in adding item to cart",
      body: error,
    });
  }
};
