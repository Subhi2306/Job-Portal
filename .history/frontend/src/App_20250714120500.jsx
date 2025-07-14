
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/Home';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import Companies from './components/admin/Companies';
import CompanyCreate from './components/admin/CompanyCreate';
import CompanySetup from './components/admin/CompanySetup';
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from './components/admin/PostJob';
import Applicants from './components/admin/Applicants';
import ProtectedRoute from './components/admin/ProtectedRoute';
import SavedJobs from './components/SavedJobs';
import EditJob from './components/admin/EditJob';


const appRouter=createBrowserRouter([
  {
    // 3 CHHEZE DAALNI HOTI H => PATH,ELEMENT AND CHILDREN YAH PAR CHILDREN KI JRURAT NHI H 
    path:'/',
    element:<Home/>
  },
  {
    // 3 CHHEZE DAALNI HOTI H => PATH,ELEMENT AND CHILDREN YAH PAR CHILDREN KI JRURAT NHI H 
    path:'/login',
    element:<Login/>
  },
  {
    // 3 CHHEZE DAALNI HOTI H => PATH,ELEMENT AND CHILDREN YAH PAR CHILDREN KI JRURAT NHI H 
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:"/description/:id",
    element:<JobDescription/>
  },
  {
    path:'/browse',
    element:<Browse/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },
  {
   path:"/saved-jobs",
    element:<SavedJobs/>
  },
  // admin ke liye yah se start hoga 
  {
    path:'/admin/companies',
    element:<ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:'/admin/companies/create',
    element:<ProtectedRoute><CompanyCreate/></ProtectedRoute>
  },
  {
    path:'/admin/companies/:id',
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute>
  },
  {
    path:'/admin/jobs',
    element:<ProtectedRoute><AdminJobs/></ProtectedRoute>
  },
  {
    path:'/admin/jobs/create',
    element:<ProtectedRoute><PostJob/></ProtectedRoute>
  },
  {
    path:'/admin/jobs/:id',
    element:<ProtectedRoute><EditJob/></ProtectedRoute>
  },
  {
    path:'/admin/jobs/:id/applicants',
    element:<ProtectedRoute><Applicants/></ProtectedRoute>
  },


])
function App() {

  return (
    <div>
     <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App
