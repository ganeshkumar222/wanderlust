import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { useLocation, useNavigate } from 'react-router-dom'
export const Topbar = () => {
    let navigate = useNavigate()
    let [flag,setFlag] = useState(false)
    let [path,setPath] = useState("")
    let location = useLocation()
   
     let flagSetter = ()=>{
      let role = sessionStorage.getItem("role")
      if(role){
        setFlag(true)
        setPath(location.pathname.split("/")[1])

      }
      else{
        setFlag(false)
        
      }
     }
    useEffect(()=>{
      flagSetter()
    },[])
  return <>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Wanderlust</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          {path===("admin")?<> <a className="nav-link active" aria-current="page" onClick={()=>{navigate("/admin/places")}}>Add</a></>:<> <a className="nav-link active" aria-current="page" href="#">Destinations</a></>}  
        </li>
        <li className="nav-item">
          {path===("admin")?<> <a className="nav-link active" aria-current="page" onClick={()=>{navigate("/admin/users")}}>users</a></>:<> <a className="nav-link active" aria-current="page" href="#">Activities</a></>}  
        </li>
      </ul>

      <FontAwesomeIcon icon={faUser} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"/>
      

        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header">
                 <h5 id="offcanvasRightLabel">WanderLust</h5>
             <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            {
              flag?<> <div className="offcanvas-body">
                <ul>
                  <li><h5 className='h5 d-flex m-1' onClick={()=>{navigate("/profile")}}> Profile</h5></li>
                  <li><h5 className='h5 d-flex m-1' onClick={()=>{navigate("/signin")}}>Logout</h5></li>
                </ul>
                   
                  
                  
              </div></>:<> <div className="offcanvas-body">
              <div className='d-flex justify-content-around'>
                  <h5 className='h5 d-flex' onClick={()=>{navigate("/signin")}}><FontAwesomeIcon icon={faUser}  />Signin</h5>
                  <h5 className='h5 d-flex' onClick={()=>{navigate("/register")}}><FontAwesomeIcon icon={faUser}/>Signup</h5></div>
              </div></>
            }

           
            
        </div>
      

    </div>
  </div>
</nav>
  </>
}
