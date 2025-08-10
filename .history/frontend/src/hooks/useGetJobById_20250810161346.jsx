import { setSingleJob } from '@/redux/jobSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetJobById = (jobId) => {

    const dispatch=useDispatch();

    useEffect(() => {
        const fetchSingleJob= async () => {
            try {
                const res=await axios.get(`https://job-portal-z56b.onrender.com/api/v1/job/get/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                }
            } catch (error) {
                console.log(error); 
            }
        }
        fetchSingleJob();
        // yah par array dependency bhi provide krni pdegi
    },[jobId,dispatch])
};

export default useGetJobById;