import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
  const navigate=useNavigate();
  return (
    <div onClick={()=>navigate(`/description/${job._id}`)} className='p-5 rounded-2xl shadow-xl bg-white border-1 border-blue-700 cursor-pointer'>
        <div>
             <h1 className='font-bold text-lg'>{job?.company?.name}</h1>
             <p className='text-small text-gray-500'>India</p>
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
    
    </div>
  )
}

export default LatestJobCards