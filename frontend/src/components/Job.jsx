import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {

  const navigate=useNavigate();
//   const jobId="fdsuhkhysafupoopio";


const [isSaved, setIsSaved] = useState(false);

  // Check if job is already saved when component mounts
  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    setIsSaved(savedJobs.some(savedJob => savedJob._id === job._id));
  }, [job._id]);


  const daysAgoFunction=(mongodbTime)=>{
    // simple maths lg rhi h yah par bas
      const createdAt= new Date(mongodbTime);
      const currentTime= new Date();
      const timeDifference= currentTime-createdAt;
      return Math.floor(timeDifference/(1000*24*60*60)) // convert 1 day to milisecond 
  }

  const handleSaveJob = () => {
    try {
      const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
      
      if (isSaved) {
        // Remove from saved jobs
        const updatedSavedJobs = savedJobs.filter(savedJob => savedJob._id !== job._id);
        localStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobs));
        setIsSaved(false);
      } else {
        // Add to saved jobs
        const updatedSavedJobs = [...savedJobs, job];
        localStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobs));
        setIsSaved(true);
      }
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
        <div className='flex items-center justify-between'>
            <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt)===0 ? "Today" :`${daysAgoFunction(job?.createdAt)} days ago`}</p>
            <Button 
          variant="outline" 
          className={`rounded-full ${isSaved ? 'bg-purple-50 border-purple-200 text-purple-600 hover:bg-purple-100' : ''}`}
          size="icon"
          onClick={handleSaveJob}
          title={isSaved ? 'Remove from saved' : 'Save for later'}
        >
          {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
        </Button>

        </div>
        <div className='flex items-center gap-2 my-2'>
              
            <Button className="p-6" variant="outline" size="icon">
            <Avatar>
                <AvatarImage src={job?.company?.logo}/>
            </Avatar>
           </Button>
           <div>
            <h1 className='font-bold text-lg'>{job?.company?.name}</h1>
            <p className='text-sm text-gray-500'>India</p>
           </div>

        </div>
        <div>
            <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
            <p className='text-sm text-gray-600'>{job?.description}</p>

        </div>
                <div className='flex items-center gap-2 mt-4'>
                   <Badge className="text-[#b10ac7] font-bold" variant="ghost">{job?.position} Positions</Badge>
                   <Badge className="text-[#de790e] font-bold" variant="ghost">{job?.jobType}</Badge>
                   <Badge className="text-[#48a808] font-bold" variant="ghost">{job?.salary} LPA</Badge>
                </div>
                <div className='flex items-center gap-4 mt-4'>
                    <Button onClick={() => navigate(`/description/${job?._id}`) } className="text-white bg-[#2971de] hover:bg-[#2990de]">Details</Button>
                    <Button 
          className={`text-white transition-colors ${
            isSaved 
              ? 'bg-[#7209b7] hover:bg-[#7209c9] opacity-90' 
              : 'bg-[#7209b7] hover:bg-[#7209c9]'
          }`}
          onClick={handleSaveJob}
        >
          {isSaved ? 'Saved' : 'Save For Later'}
        </Button>
                </div>

         </div>
  )
}

export default Job 


