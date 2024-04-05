import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name Cannot Exceed 30 Characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please Enter Your Email"],
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter a password"],
    minLength: [8, "Password should be greater than 8n characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
const User = mongoose.model("User", userSchema);
export default User;
