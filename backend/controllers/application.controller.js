import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob=async(req,res) => {
    try {
        const userId=req.id;
        const jobId=req.params.id; // yeh id use hogi applyjob wale route me
        if(!jobId){
            return res.status(400).json({
                message:"Job id is required",
                success:false
            });
        };
       // check if the user has already applied for the job
       const existingApplication= await Application.findOne({job:jobId, applicant:userId});
       if(existingApplication){
        return res.status(400).json({
            message:"You have already applied for this job",
            success:false
        });
       };
       // check if the jobs exists
       const job=await Job.findById(jobId);
       if(!job){
        return res.status(404).json({
            message:"Job not found",
            success:false
        });
       };
       // create a new application
       const newApplication=await Application.create({
           job:jobId,
           applicant:userId
       });

       job.applications.push(newApplication._id);
       await job.save();
       return res.status(201).json({
          message:"Job applied successfully",
          success:true
       });
    } catch (error) {
        console.log(error);
    }
};
// mujhe ab saari applied jobs chahiye jitni bhi maine apply kri h
export const getAppliedJobs=async(req,res) => {
    try {
        // pehle mujhe userid chahiye
        const userId=req.id;
        const application=await Application.find({applicant:userId}).sort({createdAt:-1}).populate({  // muujhe ascending order me chahiye sab isliye sort use kiya aur populate bhi use krunga
            path:"job",
            // yah par options bhi daal skte ho agar tumko sort krna h toh
            options:{sort:{createdAt:-1}},
            // yah par nested populate use krunga kyuki job model ke andar company h toh mujhe company ki info bhi chahiye 
            populate:{
               path:"company",
               options:{sort:{createdAt:-1}},
            }
        });
        if(!application){
            return res.status(404).json({
                message:"No applications",
                success:false
            });
        };
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
// admin dekhega kitne user ne apply kiya h 
export const getApplicants=async(req,res) => {
    try {
        const jobId=req.params.id; // yeh id use hogi getapplicants wale route me 

        const job=await Job.findById(jobId).populate({  // yah par mere ko job mil jaygi aur populate bhi use krunga
            path:"applications",
            options:{sort:{createdAt:-1}},
            // nested populate use krunga kyuki application model ke andar mujhe applicant ki bhi info chahiye isliye
            populate:{
                path:"applicant",
                options:{sort:{createdAt:-1}}
            }

        });
        if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:false
            });
        };
        return res.status(200).json({
            job,
            success:true
        });
    } catch (error) {
        console.log(error);
    }
};
// ab mujhe status ka banana h ki accepted hua yah rejected hua
export const updateStatus=async(req,res) => {
    try {
        const {status}=req.body;
        // ab kis application yah user ka status update krna h uski id bhi toh chahiye 
        const applicationId=req.params.id; // yeh id use hogi updatestatus wale route me 
        if(!status){
            return res.status(400).json({
                message:"Status is required",
                success:false
            }); 
        };
        // find the application by application id
        const application=await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message:"Application not found",
                success:false
            });
        };

        // update the status
        application.status=status.toLowerCase();
        // save the updated status
        await application.save();

        return res.status(200).json({
            message:"Status updated successfully",
            success:true
        });

    }catch (error) {
        console.log(error);
    }
}