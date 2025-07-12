// now make job schema after user schema

import { application } from "express";
import mongoose from "mongoose";
const jobSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
       type:String,
       required:true
    },
    requirements:[{    // requirements me generally skills hi aayngi toh requirements array me store krenge aur uska item type string hoga
       type:String
    }],
    salary:{
        type:Number,
        required:true
    },
    experienceLevel:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    jobType:{     
        type:String,
        required:true
    },
    position:{      // IS JOB ME KITNI OPENINGS H(NO OF POSITIONS)
        type:Number,
        required:true
    },
    company:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'Company',
        required:true
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'User', // jo job create krega woh bhi toh ek aadmi hi hoga isliye ref=>user liya(admin create kr rha hoga)
        required:true
    }, 
    // isko array me store krenge aur isko required true nhi krenge kyuki yeh job create krte time required nhi hoga .jab koi apply krega tab required hoga
    applications:[
       { 
           type:mongoose.Schema.Types.ObjectId, 
           ref:'Application'
       }
    ]

},{timestamps:true});
export const Job=mongoose.model('Job',jobSchema);