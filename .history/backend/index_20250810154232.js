                                                   // first make server //
                                                   // and then connect with mongodb

// old way=> const express=require('express');
// but we have to use in react style
import express from "express";

// cookie-parser is a middleware for Express.js used to parse cookies from incoming HTTP requests and make them easily accessible in your server code.
// isko isliye use krte h kyuki jo aapke browser me cookies h usko backend me parse or pass krne ke liye jisse hum use backend me bhi use kar ske
import cookieParser from "cookie-parser";

// also import cors
import cors from "cors";

// also import connectDB from utils ke andar se db.js wali file me
import connectDB from "./utils/db.js";   // file ka extension bhi dena pdega dhyan rkhna h jab bhi import karao

// import dotenv
import dotenv from"dotenv";
dotenv.config({});  //  call empty object

import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";


// call express
const app = express();

// api making or browser me data lena h toh ese krenge 
//API to handle get request from browser to the server
//but iski abhi need nhi h isko hata skte ho yah par iski need nhi h 
// app.get("/home",(req,res)=>{  // request and response
//     return res.status(200).json({      // API KO FETCH KRKE JO DATA MILTA H USE JSON ME STORE KARATE H JSON=>JAVASCRIPT OBJECT NOTATION
//         message:"I am coming from backend",
//         success:true
//     })
// });

// add middleware
  app.use(express.json()); // hum jab request bhejenge toh jo apna data hoga woh json format me hoga isliye humne json pass kra h
  app.use(express.urlencoded({extended: true}));
  app.use(cookieParser());
  const corsoptions={
          origin: 'https://job-portal-z56b.onrender.com',
          credentials:true
  } 
  app.use(cors(corsoptions));
 
// create no of ports
const PORT= process.env.PORT || 5000;

// for deployment
const _dirname= path.resolve();



// API'S
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application",applicationRoute);

// for deployment
app.use(express.static(path.join(_dirname,"/frontend/dist")));
app.get('/*',( _ ,res)=>{
  res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"));
});

// smjne ke liye h yeh 
// "http://localhost:8000/api/v1/user/register"; // yeh ek register ke liye api hogyi
// "http://localhost:8000/api/v1/user/login";    // yeh login ke liye
// "http://localhost:8000/api/v1/user/logout";    // yeh logout ke liye api hogyi
// "http://localhost:8000/api/v1/user/profile/update"; // yeh update profile ke liye


// listen function me do cheezen deni h 1. no. of ports 2. callback function 

app.listen(PORT,()=>{
     //if you want you can call connectdb
     connectDB();

     // in next line we use template literal => use of backtick which is below esc button in keyboard
     console.log(`Server running at port ${PORT}`);
})
