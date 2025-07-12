import React, { useState } from 'react'
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query,setQuery]=useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const searchJobHandler=()=>{
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }

  return (
    <div className='text-center'>
        <div className='flex flex-col gap-5 my-10'>
        <span className=' mx-auto px-4 py-2 rounded-full bg-gray-700 text-[#4bf2dc] font-extrabold'> NO.1 JOB HUNT WEBSITE</span>
        <h1 className='text-5xl font-bold my-2'>Search,Apply & <br/> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
        <p className='text-xl font-bold text-[#13d594]'>“Don't chase jobs. Let the right job find you.”</p>
        <div className='flex w-[40%] shadow-lg border-3 border-blue-900 pl-3 rounded-full items-center gap-4 mx-auto'>
            <Input
            type="text"
            placeholder="Find your dream jobs"
            onChange={(e)=> setQuery(e.target.value)}
            className="w-full py-2 bg-transparent border-none ring-0 focus:outline-none focus:ring-0 focus:border-none focus-visible:ring-0 shadow-none"
            />
            <Button onClick={searchJobHandler} className=" text-white rounded-r-full bg-[#053f79] hover:bg-[#053f70]">
                <Search className="h-5 w-5"/>
            </Button>
        </div>
        </div>

    </div>
  )
}

export default HeroSection;