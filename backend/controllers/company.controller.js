import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";


export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false
            })
        }
        // find companyname kyuki company ka name unique hone chahiye
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "You can't register same company",
                success: false
            })
        }
        // agar company unique h toh usko create krdo ab
        company = await Company.create({
            name: companyName,
            userid: req.id   // yeh authentication se mil jayga
        })
        return res.status(201).json({
            message: "Company registered successfully.",
            //  return company
            company,
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}
// ab company ko get bhi krna hoga
export const getCompany = async (req, res) => {
    try {
        // user id lekar aao
        const userId = req.id;  // logged in userid
        // toh jo user logged in hai usi ki company chahiye na jo usne khud create kri h sabki thodi chahiye
        const companies = await Company.find({ userid:userId });
        if (!companies) {
            // 404=> not found
            return res.status(404).json({
                message: "Companies not found.",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success: true

        })
    } catch (error) {
        console.log(error);

    }
}
// get company by Id
export const getCompanyById = async (req, res) => {
    // params is also  called as route parameters. params is used to access id(route parameters) in express route
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        }
        // agar mil jaati h toh 
        return res.status(200).json({
            // return company
            company,
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}
export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
       
        // aapko file bhi mil rhi hogi agar logo wagera update krne jaoge toh
        const file = req.file;
        // idhar cloudinary aayga 
        const fileUri=getDataUri(file);
        const cloudResponse=await cloudinary.uploader.upload(fileUri.content);
        const logo=cloudResponse.secure_url;

        const updateData = { name, description, website, location,logo};

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true }); // aapko object me true daal dena h taaki aapko saara updated data mile

        if (!company) {
            return res.status(404).json({
                // 404=> isliye kyuki company found hi nhi hui
                message: "Company not found",
                success: false
            })
        }
        // agar mil jaati h toh 
        return res.status(200).json({
            message: "Company informaton updated",
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}