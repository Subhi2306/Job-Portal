import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
  useGetAllCompanies();
  // BELOW LINE IS FOR FILTER FILTER KE LIYE MUJHE INPUT PTA HONA CHAHIYE PEHLE ISLIYE MAINE SHURUAAT ME EMPTY STRING DAAL DIYA H 
  const [input,setInput]=useState("");
  const navigate=useNavigate();
  const dispatch=useDispatch();

  useEffect(()=>{
      dispatch(setSearchCompanyByText(input));
  },[input]) // useeffect tab tab call krna h jab input hoga change

  return (
    <div>
        <Navbar/>
        <div className='max-w-6xl mx-auto my-10'>
            <div className='flex items-center justify-between my-7'>
                <Input
                  className="w-fit"
                  placeholder="Filter By Name"
                  onChange={(e)=> setInput(e.target.value)}
                />
                <Button className="bg-[#410ed9] hover:bg-[#410eb9]" onClick={()=>navigate("/admin/companies/create")}>New Company</Button>

            </div>
            <CompaniesTable/>
        </div>
    </div>
  )
}

export default Companies