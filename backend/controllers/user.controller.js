// isme login,updateprofile,register,LOGOUT karne ka logic likenge
// CONTROLLER ME BAISCALLY USER KA REGISTRATION KARANE KE LIYE KYA KYA USE HOTA H WOH AATA H(BUSINESS LOGIC)


// pehle register ke liye logic 


import  { User }  from "../models/user.model.js";   // .js (extension) lagana nhi bhoolna h jab bhi import karao
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, password, role } = req.body;
        // agar isme se koi bhi ek khaali hoga toh
        if (!fullName || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({         // status let say 400 daal dete h tum kuch aur bhi daal skte ho
                message: "Something is missing",
                success: false
            });
        };
        // yah par cloudinary aayga

       let cloudResponse = null;
        if (req.file) {
            const fileUri = getDataUri(req.file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        }



        // ab mai yeh check krunga ki jab koi user register krne aa rha ho toh woh jo email id daal rha h wohi email id se koi aur user pehle se toh exist nhi krta
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exist with this email",
                success: false
            });
        };
        // ab mai jo password aa rha h usko hash me convert krunga
        const hashedPassword = await bcrypt.hash(password, 10); // kitni length ka password aapka hash hona chahiye=>salt number=> i.e here 10

        await User.create({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: cloudResponse ? cloudResponse.secure_url : "https://static.vecteezy.com/system/resources/previews/026/619/142/original/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg"
            }
            // yah par profile bhi daal skte ho but profile humne required true nhi kra h isliye yah par nhi daala h
        });
        // id create huyi h registration successfull ho gya h isliye required true krna h(200,201=>successfull hone par,400=>bad response(unsuccessfull hone par))
        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


// ab login wala logic likhna h 


export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body; // role mtlb as a student or recruiter
        // missing wala toh daalna hi h
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        }
        // check email is correct or not
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false
            })
        }
        // check password is correct or not
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false
            })
        }
        // check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with this current role.",
                success: false
            })
        }

        // generate token
        // mai token me sirf userid rkhunga
        const tokenData = {
            userId: user._id  // database se mil jayga
        }
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            Id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        // store token in cookies(pass token name or variable name i.e=>token and pass token,maxage,httpsOnly=>true and samesite=>strict we do this due to security reasons) ,convert 1d(1day) to miliseconds in maxage
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'Strict' }).json({
            message: `Welcome back ${user.fullName}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// ab logout waala likho

export const logout= async(req,res) =>{
    try {
        return res.status(200).cookie("token","",{maxAge:0,}).json({
            message:"Logged out successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

// ab update profile wala

export const updateProfile=async(req,res) =>{
    try {
        const {fullName,email,phoneNumber,bio,skills}=req.body;
        const file=req.file;

        
        // cloudinary aayga idhar
        let cloudResponse=null;
        if(file){
             const fileUri=getDataUri(file);
             cloudResponse=await cloudinary.uploader.upload(fileUri.content,{
            resource_type:"raw",
            access_mode:"public"
        });
        }
       


        // jo skills aayngi woh string format me aayngi toh usko array me convert krne ke liye neeche wali line likh rha hu
        let skillsArray;
        if(skills){
             skillsArray=skills.split(",");
        }
        // user authenticated hona chahiye yeh nhi ki aap login ho nhi paa rhe ho aur profile update kr rhe ho koi sense hi nhi is baat ka
        const userId=req.id;   // middleware authentication se aayga yeh => req.id

        // yah par tum findByIdAndUpdate bhi use kr skte ho iska use kaise krna h company controller wali file me bataya aur karaya gya h 
        let user=await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message:"User not found.",
                success:false
            })
        }
        // updating data
        if(fullName)  user.fullName=fullName;
        if(email)   user.email=email;
        if(phoneNumber)  user.phoneNumber=phoneNumber;
        if(bio)   user.profile.bio=bio;
        if(skills)   user.profile.skills=skillsArray;

        // resume comes later here... => using cloudinary
        if(cloudResponse){
            user.profile.resume=cloudResponse.secure_url // save the cloudinary url
            // ab jo pdf ka name h woh view profile wale page par show bhi toh hona chahiye(subhi.pdf ese) isliye ab woh krenge 
            user.profile.resumeOriginalname=file.originalname  // save the original file name 
        }




        // save the data
        await user.save();
        // new user banao kyuki jo data update kiya h uske hisaab se new user ka data banega
        user = {
            Id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:"Profile updated successfully.",
            // user bhi return krna h yeh nhi bhoolna 
            user,
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}