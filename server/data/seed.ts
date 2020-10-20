import mongoose from "mongoose";
import dotenv from "dotenv";
import "colorts/lib/string";
import connectDB from "./../util/connect-db";
import User from "./../models/User";
import Product from "./../models/Product";
import Order from "./../models/Order";
import mockUsers from "./users";
import mockProducts from "./products";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // 1. Delete collections completely
    await Order.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});

    // 2. Insert users
    const userDocs: mongoose.Document[] = await User.insertMany(mockUsers);

    const adminUserId: mongoose.Schema.Types.ObjectId = userDocs[0]._id;

    // 3. Insert products
    const sampleProducts = mockProducts.map((product) => {
      return { ...product, user: adminUserId };
    });

    await Product.insertMany(sampleProducts);

    console.log("Data imported!".green.underline);
    process.exit();
  } catch (error) {
    console.error(`Error in import! ${error}`.red.inverse);
    process.exit(1);
  }
};

const dropData = async () => {
  try {
    // 1. Delete collections completely
    await Order.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});

    console.log("Data dropped!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error in drop! ${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  dropData();
} else {
  importData();
}
