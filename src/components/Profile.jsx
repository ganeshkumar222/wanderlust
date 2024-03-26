import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AxiosService from "../utils/AxiosService";
import ApiRoutes from "../utils/ApiRoutes";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  let [data, setData] = useState({});
  let [bookings, setBookings] = useState([]);
  

  let navigate = useNavigate();
  let getData = async () => {
    try {
      let id = sessionStorage.getItem("id");
      let res = await AxiosService.get(`${ApiRoutes.getuserbyid.path}/${id}`, {
        authenticate: ApiRoutes.getuserbyid.authenticate,
      });
      console.log(res.data.user);
      if (res.status === 200) {
        setData(res.data.user);
        setBookings(res.data.user.bookings);
        console.log(data);
      }
    } catch (error) {
      if (error.response.status === 402) {
        toast.error(error.response.data);
        navigate("/signin");
      } else {
        toast.error("Internal server error");
      }
    }
  };
  let cancelbooking = async (bookingid) => {
    let id = sessionStorage.getItem("id")
    let value = {
      bookingid,
      id
    }
    try {
       let  res  = await AxiosService.put(ApiRoutes.cancelbooking.path,value,{
        authenticate:ApiRoutes.cancelbooking.authenticate
       })
       if(res.status===200){
        toast.success("booking cancelled successfully")
        navigate("/profile")
       }
    } catch (error) {
      if(error.response.status===402){
        toast.error(error.response.data.message)
        navigate("/signin")
      }
      else{
        toast.error(error.response.data.message)
      }
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" onClick={()=>{navigate("/")}}>Wanderlust</a>
          <form className="d-flex">
            {/* <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"> */}
            <button
              className="btn btn-outline-success"
              type="submit"
              onClick={() => {
                navigate("/signin");
              }}
            >
              logout
            </button>
          </form>
        </div>
      </nav>
      <div className="container-fluid   ">
        <div className="d-flex justify-content-center">
          <div>
            <img
              src="data:image/jpeg;base64,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"
              alt=""
              className="mt-5 "
              height={200}
              width={200}
            />
            <p>Name: {data.name}</p>
            <p>email: {data.email}</p>
            <p>mobile: {data.mobile}</p>
          </div>
        </div>
        <div>
          <div className="row mt-5">
            <h6 className="h6 text-center">Booking history</h6>
            {bookings.map((e, i) => {
              return (
                <div key={i} className="col m-2 ">
                  <div className="card  shadow" style={{width: "15rem" ,height : "20rem"}}>
                    <div className="card-header">
                    <h6 className="card-title text-center">{e.name}</h6>
                    <img src={e.image} className="card-img-top" alt="..." />
                   
                    </div>
                   
                    <div className="card-body overflow-scroll ">
                      
                      <p className="card-text">no.of.persons:{e.persons}</p>
                      <p className="card-text">date:{e.startdate}</p>
                      <p className="card-text">bookingId:{e.bookingid}</p>
                      <p className="card-text">vehicle:{e.vehicle}</p>
                      
                      
                   
                    </div>
                    <div className="card-footer">
                    {new Date(e.startdate) > new Date() ? 
                        <>
                          <button className="btn btn-primary" onClick={()=>{cancelbooking(e.bookingid)}}>
                            Cancel Booking
                          </button>
                        </>
                       : 
                        <>Completed</>
                      }
                    </div>
                   
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
