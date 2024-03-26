import React, { useEffect, useState } from 'react'
import { Topbar } from './Topbar'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'

export const Signin = () => {
    let [email,setEmail] = useState()
    let [password,setPassword] = useState()
    let navigate = useNavigate()


    useEffect(()=>{
       sessionStorage.clear()
    },[])
    let handleSubmit = async () =>{
        try {
            event.preventDefault()
            let value = {
                email,
                password
            }
            let res = await AxiosService.post(`${ApiRoutes.Login.path}`,value,{
                authenticate:ApiRoutes.Login.authenticate
            })
            if(res.status===200){
                sessionStorage.setItem("role",res.data.role)
                sessionStorage.setItem("token",res.data.token)
                sessionStorage.setItem("id",res.data.id)
                toast.success("login success")
                if(res.data.role==="admin"){
                    navigate("/admin")
                }
                else if(res.data.role==="user"){
                    navigate("/")
                }
                
            }
        } catch (error) {

            toast.error(error.response.data.message)
            
        }
    }
  return <>
   <Topbar></Topbar>
    <div className='container col-lg-4 col-sm-12 mt-5 '>
        <h5 className='h5 text-center'>Login to Continue</h5>
    <form onSubmit={()=>{handleSubmit()}} >
  <div className="mb-3">
    <label htmlFor="Email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="Email" onChange={()=>{setEmail(event.target.value)}}/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="Password" className="form-label">Password</label>
    <input type="password" className="form-control" id="Password" onChange={()=>{setPassword(event.target.value)}}/>
    <div  className="form-text"><a href="" onClick={()=>{navigate("/forgetpassword")}}>Forget password?</a></div>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
  <div  className="form-text" onClick={()=>{navigate("/register")}}><a href="">New user?</a></div>
</form>
    </div>
  </>
}
