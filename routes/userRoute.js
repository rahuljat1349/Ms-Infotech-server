import { Router } from "express";

import {isAuthenticated,authorizeRoles} from "../middleware/"

import {registerUser,loginUser,getUserDetails,UpdatePassword,UpdateProfile,getAllUsers,getSingleUser,UpdateUserRole,deleteUser}
from "../controllers/userController"




Router.route("/register").post(registerUser);

Router.route("/login").post(loginUser);

Router.route("/me").get(isAuthenticated, getUserDetails);

Router.route("/password/update").put(isAuthenticated, UpdatePassword);

Router.route("/me/update").put(isAuthenticated, UpdateProfile);

Router
  .route("/admin/users")
  .get(isAuthenticated, authorizeRoles("admin"), getAllUsers);

Router
  .route("/admin/users/:id")
  .get(isAuthenticated, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticated, authorizeRoles("admin"), UpdateUserRole)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteUser);

// Router.route("/password/forgot").post(forgotPassword);

module.exports = Router;