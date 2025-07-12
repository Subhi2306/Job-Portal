import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact,Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

// const skills=["Html","Css","Javascript","Reactjs","Nodejs"];

const isResume=true;

const Profile = () => {

  useGetAppliedJobs();

  const [open,setOpen]=useState(false);

  const {user}=useSelector(store => store.auth);

  return (
    <div>
      <Navbar/>
      <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
        <div className='flex justify-between'>
              <div className='flex items-center gap-4'>
              <Avatar className="h-24 w-24">
          <AvatarImage src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA5L2pvYjExMzctZWxlbWVudC0wMDEtcC5wbmc.png" alt="profile"/>
        </Avatar>
        <div>
           
          <h1 className='font-bold text-xl'>{user?.fullName}</h1>
           <p>{user?.profile?.bio}</p>
        </div>
       
        </div>
         <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen/></Button>

        </div>
        <div className='my-5'> 
          <div className='flex items-center gap-3 my-2'>
            <Mail/>
            <span>{user?.email}</span>
          </div>
          <div className='flex items-center gap-3'>
             <Contact/>
             <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className='my-6'>
          <h1 className='font-bold text-blue-900 my-2 text-lg'>Skills</h1>
          <div className='flex items-center gap-1'>
               {
                user?.profile?.skills.length!=0 ?  user?.profile?.skills.map((item,index) => <Badge className="text-white bg-[#056217]" key={index}>{item}</Badge>) : <span>NA</span>
               }
          </div>
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label className="text-md font-bold">Resume</Label>
          {
            isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-700 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalname}</a> : <span>NA</span>
          }
        </div>
      </div>
       <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
          <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
          {/* Applied Job Table */}
          <AppliedJobTable/>
        </div>
        <UpdateProfileDialog open={open} setOpen={setOpen}/>
    </div>
  )
}

export default Profile