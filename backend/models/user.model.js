//   models ke andar hum schema mtlb kya kya field aap insert krne wale h woh daalte h
// total 4 schema banenge 1=> user wala 2=> job wala(aapke pass job hogi toh uska schema) 3=> company wala (companies registered kroge job create krne se pehle) 4=> application wala (jab user apply krenge )

import mongoose from "mongoose";
const userSchema= new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        // email should be unique so for that we add below line
        unique:true
    },
    phoneNumber:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        // jab login page par student or recruiter kisi ek me se select krna pdega tab enum use krte h(jab options aa jaate h tab us case me enum use kr lete h)
        enum:['student','recruiter'],
        required:true
    },
    // profile required nhi h
    profile:{
        // bio me required true nhi rkhenge kyuki user chahe toh bio rakh bhi skta h aur nhi bhi compulsory nhi h 
        // skills ek array me store hongi aur uske andar jo item aayga woh string hogi
        bio:{
            type:String
        },
        skills:{
          type:[{type:String}]
        },
        resume:{
            type:String // resume ka url hoga jo string hoga(url of resume file)
        },
        resumeOriginalname:{
             type:String   // to achieve username.pdf like subhi.pdf
        },
        company:{
            type:mongoose.Schema.Types.ObjectId, // company schema ki id store kr lunga ek table banakar between company and user
            ref:'Company'// and refernce is company model 
        },
        profilePhoto:{
            type:String,
            default:""   // initially sayad aap photo na lagaye isliye empty string daali h 
        }
    }


},{timestamps:true});
export const User=mongoose.model('User',userSchema); // pass modelname i.e User and pass that variable in which you store all things i.e=> userSchema