// utils ke andar hum generally multer and cloudinary rakhte h and in this  we connect database to the server

// import mongoose file
import mongoose from "mongoose";
const connectDB= async()=>{
    // use try and catch block
    try {
       await mongoose.connect(process.env.MONGO_URI); // JO MONGODB KI URI H DOTENV FILE ME ISME DAALDO
       console.log("mongodb connected successfully");
    } catch (error) {
        console.log(error);
    }
}
export default connectDB;