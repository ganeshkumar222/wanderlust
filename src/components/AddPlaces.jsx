import React, { useState } from 'react'
import { Topbar } from './Topbar'
import { toast } from 'react-toastify'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'
import { useNavigate } from 'react-router-dom'

export const AddPlaces = () => {
  let [name,setName] = useState()
  let [price,setPrice] = useState()
  let [description,setDescription] = useState()
  let [image1,setImage1] = useState()
  let [image2,setImage2] = useState()
  let [day0,setDay0] = useState()
  let [day1,setDay1] = useState()
  let [day2,setDay2] = useState()
  let navigate = useNavigate()
  
  

  let handleSubmit = async ()=>{
   
    try {
      event.preventDefault()
      
     let value = {
      name,
      price,
      description,
      image1,
      image2,
      day0,
      day1,
      day2
     }
     console.log(value)
     let res = await AxiosService.post(`${ApiRoutes.addplaces.path}`,value,{
      authenticate:ApiRoutes.addplaces.authenticate
     })
     if(res.status===200){
      toast.success("places added successfully")
      navigate("/admin")
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
  return <>
  <Topbar></Topbar>
  <div className='container col-lg-4 mt-5 col-sm12 '>
    <h3 className='mb-3 text-center'>Add Place</h3>
  <form onSubmit={()=>{handleSubmit()}} >
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" onChange={()=>{setName(event.target.value)}} />
  </div>
  <div className="mb-3">
    <label htmlFor="price" className="form-label">Price</label>
    <input type="text" className="form-control" id="price"  onChange={()=>{setPrice(event.target.value)}}/>
  </div>
  <div className="mb-3">
  <label htmlFor="description" className="form-label">Description</label>
  <textarea className="form-control" id="description" rows="3"  onChange={()=>{setDescription(event.target.value)}}></textarea>
</div>
<div className="mb-3">
    <label htmlFor="image1" className="form-label">Image1</label>
    <input type="text" className="form-control" id="image1" onChange={()=>{setImage1(event.target.value)}}/>
  </div>
  <div className="mb-3">
    <label htmlFor="image2" className="form-label">Image2</label>
    <input type="text" className="form-control" id="image2" onChange={()=>{setImage2(event.target.value)}}/>
  </div>
  <div className="mb-3">
  <label htmlFor="day0" className="form-label">day 0 </label>
  <textarea className="form-control" id="day0" rows="3" onChange={()=>{setDay0(event.target.value)}}></textarea>
</div>
<div className="mb-3">
  <label htmlFor="day1" className="form-label">day 1</label>
  <textarea className="form-control" id="day1" rows="3" onChange={()=>{setDay1(event.target.value)}}></textarea>
</div>
<div className="mb-3">
  <label htmlFor="day2" className="form-label">day 2</label>
  <textarea className="form-control" id="day2" rows="3" onChange={()=>{setDay2(event.target.value)}}></textarea>
</div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
  </div>
  </>
}
