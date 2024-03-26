import React, { useEffect, useState } from 'react'
import { Topbar } from './Topbar'
import { useNavigate, useParams } from 'react-router-dom'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'
import {toast} from 'react-toastify'
export const EditPlaces = () => {
    let {id} = useParams()
    let [name,setName] = useState()
  let [price,setPrice] = useState()
  let [description,setDescription] = useState()
  let [image1,setImage1] = useState()
  let [image2,setImage2] = useState()
  let [day0,setDay0] = useState()
  let [day1,setDay1] = useState()
  let [day2,setDay2] = useState()
    
    let navigate = useNavigate()
    let getData = async () => {
        try {
          console.log(id);
          let res = await AxiosService.get(
            `${ApiRoutes.getplacesbyid.path}/${id}`,
            {
              authenticate: ApiRoutes.getplacesbyid.authenticate,
            }
          );
          console.log(res.data.data);
          setName(res.data.data.name)
          setPrice(res.data.data.price)
          setDescription(res.data.data.description)
          setDay0(res.data.data.day0)
          setDay1(res.data.data.day1)
          setDay2(res.data.data.day2)
          setImage1(res.data.data.image1)
          setImage2(res.data.data.image2)
         
        } catch (error) {
          if (error.response.status === 402) {
            toast.error(error.response.data);
            navigate("/signin");
          } else {
            toast.error("Internal server error");
          }
        }
      };
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
            let res = await AxiosService.put(`${ApiRoutes.editplacebyid.path}/${id}`,value,{
                authenticate:ApiRoutes.editplacebyid.authenticate
            })
            if(res.status===200){
                toast.success("Edited successfully")
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
    useEffect(()=>{
      getData()
    },[])
  return <>
  <Topbar></Topbar>
  <div className='container col-lg-4 mt-5 col-sm12 '>
    <h3 className='mb-3 text-center'>Add Place</h3>
  <form onSubmit={()=>{handleSubmit()}} >
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" value={name}onChange={()=>{setName(event.target.value)}} />
  </div>
  <div className="mb-3">
    <label htmlFor="price" className="form-label">Price</label>
    <input type="text"value={price}className="form-control" id="price"  onChange={()=>{setPrice(event.target.value)}}/>
  </div>
  <div className="mb-3">
  <label htmlFor="description" className="form-label">Description</label>
  <textarea className="form-control" id="description" rows="3" value={description}  onChange={()=>{setDescription(event.target.value)}}></textarea>
</div>
<div className="mb-3">
    <label htmlFor="image1" className="form-label">Image1</label>
    <input type="text" className="form-control" value={image1} id="image1" onChange={()=>{setImage1(event.target.value)}}/>
  </div>
  <div className="mb-3">
    <label htmlFor="image2" className="form-label">Image2</label>
    <input type="text" className="form-control" id="image2" value={image2} onChange={()=>{setImage2(event.target.value)}}/>
  </div>
  <div className="mb-3">
  <label htmlFor="day0" className="form-label">day 0 </label>
  <textarea className="form-control" id="day0" rows="3" value={day0} onChange={()=>{setDay0(event.target.value)}}></textarea>
</div>
<div className="mb-3">
  <label htmlFor="day1" className="form-label">day 1</label>
  <textarea className="form-control" id="day1" rows="3" value={day1} onChange={()=>{setDay1(event.target.value)}}></textarea>
</div>
<div className="mb-3">
  <label htmlFor="day2" className="form-label">day 2</label>
  <textarea className="form-control" id="day2" rows="3" value={day2}onChange={()=>{setDay2(event.target.value)}}></textarea>
</div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
  </div>
  </>
}
