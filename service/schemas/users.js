import mongoose from "mongoose";
import bCrypt from "bcrypt";

const { Schema } = mongoose;

const user = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  avatarURL: { type: String },
  token: {
    type: String,
    default: null,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
});

user.methods.setPassword = async function (password) {
  this.password = await bCrypt.hash(password, 10);
};

user.methods.validatePassword = async function (password) {
  return bCrypt.compare(password, this.password);
};

const User = mongoose.model("user", user);

export default User;
