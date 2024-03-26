import React, { useEffect, useState } from 'react'
import { Topbar } from './Topbar'
import { toast } from 'react-toastify'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'
import { useNavigate } from 'react-router-dom'

export const AdminDashboard = () => {
  let [data,setData] = useState([])
  let navigate = useNavigate()

  let getData = async ()=>{
    try {
      let res = await AxiosService.get(`${ApiRoutes.getPlaces.path}`,{
        authenticate:ApiRoutes.getPlaces.authenticate
      })
      if(res.status===200){
        console.log(res.data.places)
        setData(res.data.places)
      }
      
    } catch (error) {
      
      if(error.response.status===402){
        toast.error(error.response.data)
        navigate("/signin")
      }
      else{
        toast.error("Internal server error")
      }
     
      
    }
  }
  useEffect(()=>{
         getData()
  },[])
  return <>
  <Topbar></Topbar>
  <div className='container mt-3'>
    {
      data.map((e,i)=>{
        return <div key={i} className='row'>
         <div className="card mb-3  shadow p-2" onClick={()=>{navigate(`/admin/viewplaces/${e._id}`)}} >
          <div className='row'>
            <div className='col-3'>
            <img src={e.image2} className="card-img-top  shadow card-image" alt="Kodaikanal" />
            </div>
            <div className='col-6 '>
            <div className="card-body">
    <h5 className="card-title">{e.name}</h5>
    <p className="card-text">{e.description}</p>
    
    {/* <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
  </div>
            </div>
            <div className='col-3'>
            <p className='card-text mt-5'>Price per person:{e.price}</p>
            </div>

          </div>
 
  
</div>

        </div>
      })
    }
  </div>
  </>
    
  
}
