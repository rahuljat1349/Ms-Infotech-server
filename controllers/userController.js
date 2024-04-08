import User from "../models/userModel";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Registration of user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // checking if the email exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(409).json({ error: "Email already exists!" });
    }
    // creating user
    let secPass = await bcrypt.hash(password, 10);
    user = await User.create({
      name: name,
      email: email,
      password: secPass,
      avatar: {
        public_id: "sample id",
        url: "profileurl",
      },
    });
    // sending token
    const data = user.id;
    const authToken = jwt.sign(data, process.env.JWT_SECRET);
    // return res.cookie("token", authToken, {
    //   expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    // });
    return res.status(201).json({ authToken });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // checking if the user exists
    let user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ error: "email or password is wrong" });
    }

    // checking if the password is right
    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      return res.status(401).json({ error: "email or password is wrong" });
    }
    // sending token
    const data = user.id;
    const authToken = jwt.sign(data, process.env.JWT_SECRET);
    // return res.cookie("token", authToken, {
    //   expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    // });
    return res.json({ authToken });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get User Details

const getUserDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user,
    });
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//  Update User Password

const UpdatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordMatched = await bcrypt.compare(
      req.body.oldPassword,
      user.password
    );
    if (!isPasswordMatched) {
      return res.status(400).json({ message: "old password is in correct" });
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return res.status(400).json({ message: "Password does not match" });
    }
    let secPass = await bcrypt.hash(req.body.newPassword, 10);

    user.password = secPass;
    await user.save();
    res.status(200).json({
      success: true,
      message: "password updated successfully",
    });
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//  Update User Profile

const UpdateProfile = async (req, res, next) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };
    // TODO - cloudinary
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
    });
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Users --Admin
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users,
    });
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Sigle User Details -- Admin

const getSingleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: `user does not exist with id ${req.params.id}`,
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update User Role -- Admin

const UpdateUserRole = async (req, res, next) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
    let user = await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    if (!user) {
      return res.status(404).json({
        message: `user does not exist with id ${req.params.id}`,
      });
    }
    res.status(200).json({
      success: true,
    });
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete User --Admin

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: `user does not exist with id ${req.params.id}`,
      });
    }

    // TODO -- remove cloudinary
    res.status(200).json({
      success: true,
    });
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//

module.exports = {registerUser,loginUser,getUserDetails,UpdatePassword,UpdateProfile,getAllUsers,getSingleUser,UpdateUserRole,deleteUser}