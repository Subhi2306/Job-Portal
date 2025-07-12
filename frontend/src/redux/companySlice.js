import { createSlice } from "@reduxjs/toolkit";

const companySlice=createSlice({
    name:"company",
    initialState:{
        // jab tumhe single cheez rkhi ho (single object) toh us case me null rkhte h lekin jab array ki format me rkhni ho cheezen toh us case me array rkhte h 
        singleCompany:null,
        companies:[],
        searchCompanyByText:""
    },
    reducers:{
       // iske andar actions 
        setSingleCompany:(state,action) => {
            state.singleCompany=action.payload;
        },
        setCompanies:(state,action)=>{
            state.companies=action.payload;
        },
        setSearchCompanyByText:(state,action)=>{
            state.searchCompanyByText=action.payload;
        }
    }
});
export const {setSingleCompany,setCompanies,setSearchCompanyByText} =companySlice.actions;
export default companySlice.reducer;