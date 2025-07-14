import { Job } from "../models/job.model.js";

// admin post krega job(pehle job ko post kro)
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        }
        const job = await Job.create({
            title,
            description,
            // requirements ko comma se split kro
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully",
            // also return  job
            job,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}
//student ke liye(now get all jobs)
export const getAllJobs = async (req, res) => {
    try {
        // filter krne ke liye tumhe keyord ki jrurat hoti h toh pehle mai woh nikalunga fir filter krunga
        const keyword = req.query.keyword || ""; // agar keyword aata h toh thik h warna empty string lelenge

        // now do filter 
        const query = {
            // $or isliye lgaya kyuki yah par multiple cheeze hone wali h 
            $or: [
                // ek toh regex daalna hota h aur i isliye kyuki casesensitive hota h
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        // populate isliye use krte h to get information of object(companyid) by using their object id
        // populate() is used in Mongoose to get the full details of a referenced document (like companyId) by using its ObjectId stored in another document.
        // populate me path pass krna hota h 
        const jobs = await Job.find(query).populate({
            path: "company",
            // mujhe sorted order me chahiye 
        }).sort({ createdAt: -1 });  // populate method use krenge baad me dhyan dena h is line mai taaki company ki id se company ki info nikaal saku


        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            })
        }
        // agar mil gyi toh
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
// student ke liye
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        }); // yah bhi populate use hoga is par bhi dhyan dena h
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            })
        };
        // agar mil jaata h toh
        return res.status(200).json({
            job,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
// admin kitne job create kra h abhi tak
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({  // isse saari jobs mil jayngi jitni admin ne create kri h abhi tak // yah par bhi populate use hoga jo baad me krenge dhyan rkhna h 
            path:'company',
            createdAt:-1
        }); 
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            });
        };
        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}
export const updateJob = async (req, res) => {
    try {
        const { title, description, requirements, salary,experienceLevel,location,jobType,position,companyId} = req.body;

        const updateData = { title, description, requirements,salary,experienceLevel,location,jobType,position,companyId};

        const job = await Job.findByIdAndUpdate(req.params.id, updateData, { new: true }); // aapko object me true daal dena h taaki aapko saara updated data mile

        if (!job) {
            return res.status(404).json({
                // 404=> isliye kyuki company found hi nhi hui
                message: "Job not found",
                success: false
            })
        }
        // agar mil jaati h toh 
        return res.status(200).json({
            message: "Job informaton updated",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}