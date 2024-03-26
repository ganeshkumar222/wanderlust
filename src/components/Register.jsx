import React, { useState } from "react";
import { Topbar } from "./Topbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AxiosService from "../utils/AxiosService";
import ApiRoutes from "../utils/ApiRoutes";

export const Register = () => {
    let [name,setName] = useState()
    let [email,setEmail] = useState()
    let [password,setPassword] = useState()
    let [mobile,setMobile] = useState()
    let [code,setCode] = useState()
    let navigate = useNavigate()
    const handleSubmit = async ()=>{
        try {
            event.preventDefault()
            console.log(name,email,password,mobile,code)
            if(code==="456"){
                let role = "admin"
                let value = {
                    name,
                    email,
                    password,
                    mobile,
                    role 
                }
                let res = await AxiosService.post(`${ApiRoutes.Register.path}`,value,{
                    authenticate:ApiRoutes.Register.authenticate
                })
                if(res.status===200){
                    toast.success("Admin registered successfully")
                    navigate("/signin")
                }
            }
            else{
                let value = {
                    name,
                    email,
                    password,
                    mobile
                }
                let res = await AxiosService.post(`${ApiRoutes.Register.path}`,value,{
                    authenticate:ApiRoutes.Register.authenticate
                })
                if(res.status===200){
                    toast.success("user registered successfully")
                    navigate("/signin")
                }

            }
        
           
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
  return (
    <>
      <Topbar></Topbar>
      <div className="container col-lg-4 col-sm-12 mt-5">
        <h5 className="h5 text-center">Wanderlust Registration</h5>
        <form onSubmit={()=>{handleSubmit()}}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">
             Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              onChange={() => {
                setName(event.target.value)
              }}
            />
          </div>
        <div className="mb-3">
            <label htmlFor="mobile" className="form-label">
              mobile
            </label>
            <input
              type="text"
              required
              className="form-control"
              id="mobile"
              onChange={() => {
                setMobile(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              required
              className="form-control"
              id="Email"
              onChange={() => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Password" className="form-label">
              Password
            </label>
            <input
              type="password"
              required
              className="form-control"
              id="Password"
              onChange={() => {
                setPassword(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Email" className="form-label">
              Register code
            </label>
            <input
              type="password"
              required
              className="form-control"
              id="code"
              onChange={() => {
                setCode(event.target.value);
              }}
            />
            <div className="form-text">
              <p >Use 123 as register code</p>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <div className="form-text">
              <a onClick={()=>{navigate("/signin")}}>already registered?</a>
            </div>
        </form>
      </div>
    </>
  );
};
