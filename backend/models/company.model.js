import mongoose from "mongoose";
const companySchema=new mongoose.Schema({
    // company ka name jruri h isliye sirf usi me required true krenge
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String
    },
    website:{
        type:String
    },
    location:{
        type:String
    },
    logo:{
        type:String,  // URL to company logo(idhar apan company ka url rkhenge)
    },
    // us user ki id jo company create krega yeh required h
    userid:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'User',
       required:true
    }
},{timestamps:true});
export const Company=mongoose.model('Company',companySchema);
