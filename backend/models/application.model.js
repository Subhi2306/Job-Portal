import mongoose from "mongoose";

const applicationSchema=new mongoose.Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',                        // job me reference generate kr rha hu mtlb yah par application aur job ke beech ek relation generate kr rha hu
        required:true
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',                       // applicant=> user hi toh hoga that's why ref=>user
        required:true
    },
    status:{
        type:String,
        // isme options h pending ka , accepted ka aur rejected ka isliye enum use krenge
        enum:['pending','accepted','rejected'],
        default:'pending'   // default me pending hi rkhenge
    }

},{timestamps:true});
export const Application=mongoose.model('Application',applicationSchema);