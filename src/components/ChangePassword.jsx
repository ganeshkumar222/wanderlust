import React, { useEffect, useState } from 'react'
import { Topbar } from './Topbar'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import AxiosService from "../utils/AxiosService";
import ApiRoutes from "../utils/ApiRoutes";
import { BallTriangle } from 'react-loader-spinner';

export const ChangePassword = () => {
    let [newPassword,setNewPassword] = useState()
    let [confirmPassword,setConfirmPassword] = useState()
    let params = useParams()
    let [match,setMatch] = useState(false)
    let navigate = useNavigate()
    
    let linkCheck = async ()=>{
      try {
        let id = params.id
        let password = params.string
        let value = {
          id,
          password
        }
        let res = await AxiosService.post(`${ApiRoutes.Check_password.path}`,value,{
          authenticate:ApiRoutes.Check_password.authenticate
        })
        if(res.status===200){
            setMatch(true)
        }
        
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }

    let handleSubmit = async ()=>{
      try {
        event.preventDefault()
        let id = params.id
        if(newPassword===confirmPassword){
          let value = {
            id,
            newPassword
          }
          let res = await AxiosService.put(`${ApiRoutes.Change_forget_password.path}`,value)
          if(res.status===200){
            toast.success("password changed successfully try logging in")
            navigate("/")
          }
        }
        else{
          toast.error("password doesnt match")
        }
        
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }

    useEffect(()=>{
        linkCheck()
    })
  return <>
  <Topbar></Topbar>
  {
    match?<> <div className='container col-lg-4 col-sm-12 mt-5 text-center'>
    <h5 className='h5'>Change your password</h5>
   <form  className='mt-5' onSubmit={()=>{handleSubmit()}}>

    <div className="mb-3">
<label htmlFor="newPassword" className="form-label">New Password</label>
  <input
    type="password"
    className="form-control"
    id="newpassword"
    onChange={() => {
      setNewPassword(event.target.value);
    }}
  />
      </div>

    <div className="mb-3">
<label htmlFor="cPassword" className="form-label">Confirm Password</label>
  <input
    type="password"
    className="form-control"
    id="cpassword"
    onChange={() => {
      setConfirmPassword(event.target.value);
    }}
  />
      </div>
<button className="btn btn-primary">submit</button>
</form>
   </div></>:<><BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  /></>
  }
  
  
  </>
   
}
