import { setAllAdminJobs } from '@/redux/jobSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJobs = () => {

    const dispatch=useDispatch();

    useEffect(() => {
        const fetchAllAdminJobs= async () => {
            try {
                const res=await axios.get(`https://job-portal-z56b.onrender.com/api/v1/job/getadminjobs`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setAllAdminJobs(res.data.jobs));

                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAdminJobs();
        // yah par array dependency bhi provide krni pdegi
    },[])
}

export default useGetAllAdminJobs;