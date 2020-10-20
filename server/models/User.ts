import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema: mongoose.Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const User: mongoose.Model<mongoose.Document, {}> = mongoose.model(
  "User",
  userSchema
);

export default User;
