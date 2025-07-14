import { setSingleJob } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetJobById = (JobId) => {

    const dispatch=useDispatch();

    useEffect(() => {
        const fetchSingleJob= async () => {
            try {
                const res=await axios.get(`${JOB_API_END_POINT}/get/${JobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                }
            } catch (error) {
                console.log(error); 
            }
        }
        fetchSingleJob();
        // yah par array dependency bhi provide krni pdegi
    },[JobId,dispatch])
}

export default useGetJobById;