import express from "express";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router=express.Router();

// applyjob wale me koi data nhi bhej rhe h isliye get use kr rhe h isme id job ki id h nah ki user ki (kaise?=> see the application controller)
router.route("/apply/:id").get(isAuthenticated,applyJob);

router.route("/get").get(isAuthenticated,getAppliedJobs);

//yah par bhi job ki id pass krni h aur applicants kaise see the application conroller
router.route("/:id/applicants").get(isAuthenticated,getApplicants);

// neeche wale me post use kra h kyuki findByIdAndUpdate nhi use kr rhe h updateStatus wale me
// yah par status fir application id aur fir update
router.route("/status/:id/update").post(isAuthenticated,updateStatus);

export default router;


// ab backend ka almost khtam ho gya h bas logo aur resume, profile photo daalne ke liye multer or cloudinary use krenge
