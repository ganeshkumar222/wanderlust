import React from 'react'
import { Topbar } from './Topbar'
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from "react-toastify";
import { useParams,useNavigate } from 'react-router-dom';
export const Booking = () => {
    let [data, setData] = useState({});
    let { id } = useParams();
    let navigate = useNavigate();
    let [persons,setPersons] = useState()
    let [startDate,setStartDate] = useState()
    let [info,setInfo] = useState()
    let [bookingFlag,setBookingFlag] = useState(false)
    let [bookingDetails,setBookingDetails] = useState({})
    


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
          setData(res.data.data);
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
            let userid = sessionStorage.getItem("id")
            let vehicle ;

            if(persons<=4){
              console.log("inside mini")
              vehicle = "sedan"
            }
            else if(persons<=7)
            {
              vehicle = "Xuv"
            }
            else{
              vehicle = "tempo"
            }
        let placeid = id
        let value = {
            userid,
            placeid,
            persons,
            startDate,
            info,
            vehicle
        }
        let currentdate = new Date()
        let entereddate = new Date(startDate)
        if(entereddate>currentdate){
          console.log(value)
          let res = await AxiosService.put(ApiRoutes.booking.path,value,{
            authenticate:ApiRoutes.booking.authenticate
        })
        if(res.status===200){
           
            console.log(res.data.booking_details)
            setBookingFlag(true)
            setBookingDetails(res.data.booking_details)
        }
        }
        else{
          toast.error("please enter a future date")

        }
        
            
        } catch (error) {
            if (error.response.status === 402) {
                toast.error(error.response.data.message);
                navigate("/signin");
              } else {
                toast.error(error.response.data.message);
              }
        }
        

    }
    let handleSubmit2 = async ()=>{
      try {
        console.log("uhgjuiuhguihy")
        let userid = sessionStorage.getItem("id")
        let value = {
          userid,
          bookingDetails
        }
        let res = await AxiosService.put(ApiRoutes.conformpayment.path,value,{
          authenticate:ApiRoutes.conformpayment.authenticate
        })
        console.log("received response")
        if(res.status===200){
          toast.success("booking success")
          navigate("/user/payment")
        }
        
      } catch (error) {
        if (error.response.status === 402) {
          toast.error(error.response.data.message);
          navigate("/signin");
        } else {
          toast.error(error.response.data.message);
        }
      }
    }
     
    
    
      useEffect(() => {
        getData();
      }, []);
  
  return <>
  <Topbar></Topbar>
  {
    bookingFlag?<>
    <div className='container col-lg-4 mt-5  col-sm-12'>
    <div className="card mt-5 shadow text-white bg-secondary mb-3" >
  
  <div className="card-body">
    <h5 className="card-title text-center">Booking Conformation</h5>
    <p className="card-text">package Name:{bookingDetails.name}</p>

    <p className="card-text">No.of.Persons:{bookingDetails.persons}</p>
    <p className="card-text">total-price:{bookingDetails.total}</p>
    <p className='card-text'>vehicle:{bookingDetails.vehicle}</p>
    <a href="#" className="btn btn-primary m-1" onClick={()=>{handleSubmit2()}}>Proceed to Checkout</a>
  </div>
</div>
    </div>
    </>:<>
    <div className='container col-lg-4 mt-5 col-sm12 '>
    <h3 className='mb-3 text-center'>Booking a {data.name} Package</h3>
  <form onSubmit={()=>{handleSubmit()}} >
  
  <div className="mb-3">
    <label htmlFor="price" className="form-label">No of persons:</label>
    <input type="text" className="form-control" id="price"  onChange={()=>{setPersons(event.target.value)}}/>
    <div  className="form-text">Maximum number of persons:12.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="price" className="form-label">Start date:</label>
    <input type="date" className="form-control" id="price"  onChange={()=>{setStartDate(event.target.value)}}/>
  </div>
  <div className="mb-3">
  <label htmlFor="description" className="form-label">Additional Info</label>
  <textarea className="form-control" id="description" rows="3"  onChange={()=>{setInfo(event.target.value)}}></textarea>
</div>

  <div className='mb-3'>

  </div>
 

  
  <button type="submit" className="btn btn-primary">Book</button>
</form>
  </div>
    </>
  }
  
  </>
}
