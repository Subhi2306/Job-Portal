import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";
const router=express.Router();
router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
// kyuki logout me hum koi data nhi bhej rhe h isliye get kiya
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile); // profile yeh update sirf authenticated user ke liye hi kar payga toh uske liye middleware banana pdega
export default router; // ab is router ko index.js wali me bhejna h