import React, { useEffect, useState } from 'react'
import { Topbar } from './Topbar'
import { Carousel } from './Carousel'
import { toast } from 'react-toastify'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'
import { useNavigate } from 'react-router-dom'
import AppRoutes from '../utils/AppRoutes'

export const Home = () => {
    let [data,setData] = useState([

    ])
    let navigate = useNavigate()
  let getData = async () =>{
    try {
      let res = await AxiosService.get(`${ApiRoutes.getuserplaces.path}`,{
         authenticate:ApiRoutes.getuserplaces.authenticate
      })
      if(res.status===200){
        console.log(res.data.places)
        setData(res.data.places)
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
     getData()
  },[])
  return <>
  <Topbar></Topbar>
  <div className='container-fluid mt-2'>
    <div className='row'>
    <div className="col-1 d-flex flex-column ">
            <div className="card flex-grow-1 shadow sidecard">
              {/* <img
                src="https://media.istockphoto.com/id/547436912/photo/bungee-jumping.jpg?s=612x612&w=0&k=20&c=yGAdtv_o5h9uzsLhHFxU9al_H-3EzgSCuqRiJ9Hq08A="
                className="card-img-top"
                alt="Advertisement"
              /> */}
            </div>
          </div>
          <div className='col-10'>
          <Carousel></Carousel>         
    {
      data.map((e,i)=>{
        return <div key={i} className='row mt-3'>
         <div className="card mb-3  shadow p-2" onClick={()=>{navigate(`/user/viewplaces/${e._id}`)}} >
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
            <p className='card-text mt-5'></p>
            <p className="card-text mt-5">&#8377;{e.price}<small className="text-muted ">per person</small></p>
            </div>

          </div>
 
  
</div>

        </div>
      })
    }
          </div>

          <div className="col-1 d-flex flex-column ">
            <div className="card flex-grow-1 shadow sidecard">
              
            </div>
          </div>
    </div>
         
   
   
    
   
    
  </div>
  
  </>
    
  
}
