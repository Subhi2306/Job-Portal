/* eslint-disable react-hooks/exhaustive-deps */
// maine src ke andar hooks ke andar custom hooks banaunga for getting jobs and other things uske liye pehle use keyword istemaal krunga file create krne ke liye(in hooks folder)
// isme use keyword istemal hoga  
import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {

    const dispatch=useDispatch();
    const {searchedQuery}=useSelector(store=>store.job);

    useEffect(() => {
        const fetchAllJobs= async () => {
            try {
                const res=await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs));

                }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchAllJobs();
        // yah par array dependency bhi provide krni pdegi
    },[])
}

export default useGetAllJobs;