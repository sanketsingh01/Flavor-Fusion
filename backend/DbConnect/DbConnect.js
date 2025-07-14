import mongoose from "mongoose";

export const DbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Sanket:Sanket@cluster0.rfivk.mongodb.net/Sanket"
    );
    console.log("Your database is connected Successfully");
  } catch (error) {
    console.log("Error while connecting to database: ", error);
  }
};
