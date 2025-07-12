// middlewares request aur response ke beech me kaam karta h agar req shi hoti h toh woh next controller me bhej deta h(parse karta h req ko)
// authentication ka mtlb hi yehi hota h ki aapke pass cookies or token hona chahiye agar aapne logout kr dia h toh aapke pass cookies nhi h toh aap authenticated bhi nhi h
import jwt from "jsonwebtoken";

// isme next bhi pass krna pdta h next ka kaam h aange badhana agar sab shi h toh woh next route par behj deta h 
const isAuthenticated=async(req,res,next) => {
       try {
         const token=req.cookies.token;
         if(!token){
            // 401 ka mtlb unauthorized
            return res.status(401).json({
                message:"User not authenticated",
                success:false
            })
         }
         // agar token shi h toh fir usko decode kro
         const decode= jwt.verify(token, process.env.SECRET_KEY);
         if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
         }
        //  agar decode ho jaata h toh usme aapko kuch information milti h i.e=> aapko userid milegi 
        req.id=decode.userId;
        // call next if above all info is correct and passed then send it to the next route
        next();
       } catch (error) {
          console.log(error);
       }
}
export default isAuthenticated;
