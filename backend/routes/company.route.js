import express from "express";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router=express.Router();

// authentication hona jruri h sab me 
router.route("/register").post(isAuthenticated,registerCompany);
router.route("/get").get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated,getCompanyById);
// updateCompany me hum findByIdAndUpdate use kr rhe h toh isliye put use hoga nah ki post
router.route("/update/:id").put(isAuthenticated,singleUpload,updateCompany);

export default router;