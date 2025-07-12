/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection.jsx'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllJobs();
  const {user}= useSelector(store=>store.auth);
  const navigate=useNavigate();
  // jsx return krne se pehle useEffect call hota h react ka ek lifecycle hota h jo woh follow krta h 
  useEffect(()=>{
    if(user?.role==="recruiter"){
        navigate("/admin/companies");
    }
  // yah par array dependency me kuch provide nhi krna h kyuki is ko ek hi baar call krna h 
  },[]);
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <CategoryCarousel/>
        <LatestJobs/>
        <Footer/>
    </div>
  )
}

export default Home