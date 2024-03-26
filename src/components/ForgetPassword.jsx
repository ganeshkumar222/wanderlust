import React, { useState } from "react";
import { Topbar } from "./Topbar";
import { toast } from "react-toastify";
import AxiosService from "../utils/AxiosService";
import ApiRoutes from "../utils/ApiRoutes";
import { useNavigate } from "react-router-dom";

export const ForgetPassword = () => {
    let [email,setEmail] = useState()
    let  navigate = useNavigate()

     let handleSubmit = async ()=>{
        try {
            event.preventDefault()
            // console.log(ApiRoutes.Forget_password.path)
            let value = {
                email:email
            }
            let res = await AxiosService.put(`${ApiRoutes.Forget_password.path}`,value,{
                authenticate:ApiRoutes.Forget_password.authenticate
            })
            // console.log(res.status)
            if(res.status===200){
                toast.success("email sent successfully")
                navigate("/signin")
            }
            
        } catch (error) {
            toast.error(error.resoponse.data.message)
        }
     }
  return (
    <>
      <Topbar></Topbar>
      <div className="container col-lg-5 col-sm-12 mt-5 text-center">
        <h5 className="h5 text-center mt-3 mb-3">Enter your registered Email</h5>

        <form onSubmit={()=>{handleSubmit()}}>

        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            id="Email"
            onChange={() => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <button className="btn btn-primary">submit</button>
        </form>

        
      </div>
    </>
  );
};
