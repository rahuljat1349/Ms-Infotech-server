import express from "express";
const router = express.Router();
import { isAuthenticated, authorizeRoles } from "../middleware/";

import {
  registerUser,
  loginUser,
  getUserDetails,
  UpdatePassword,
  UpdateProfile,
  getAllUsers,
  getSingleUser,
  UpdateUserRole,
  deleteUser,
} from "../controllers/userController";

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/me").get(isAuthenticated, getUserDetails);

router.route("/password/update").put(isAuthenticated, UpdatePassword);

router.route("/me/update").put(isAuthenticated, UpdateProfile);

router
  .route("/admin/users")
  .get(isAuthenticated, authorizeRoles("admin"), getAllUsers);

router
  .route("/admin/users/:id")
  .get(isAuthenticated, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticated, authorizeRoles("admin"), UpdateUserRole)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteUser);

// router.route("/password/forgot").post(forgotPassword);

export default router;
