/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion } from 'framer-motion';


// const randomJobs=[1,2,3,4,5];

const Browse = () => {
    useGetAllJobs();
    const {allJobs}=useSelector(store=>store.job);
    const dispatch=useDispatch();
    // clean up krenge yah par jisse jo purana input set h woh hat jaaye aur new input ke hissab se aaye
    useEffect(()=>{
      return()=>{
        dispatch(setSearchedQuery(""));
      }
    },[])
  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl my-10 mx-auto'>
            <h1 className='font-bold text-xl my-10'>Search Results ({allJobs.length})</h1>
            <div className='grid grid-cols-3 gap-4'>
  {
    allJobs.map((job, index) => (
      <motion.div
        key={job._id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.4 }}
      >
        <Job job={job} />
      </motion.div>
    ))
  }
</div>

        </div>
    </div>
  )
}

export default Browse