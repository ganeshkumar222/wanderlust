import React, { useEffect, useState } from "react";
import { Topbar } from "./Topbar";
import { toast } from "react-toastify";
import AxiosService from "../utils/AxiosService";
import ApiRoutes from "../utils/ApiRoutes";
import { useNavigate, useParams } from "react-router-dom";
export const UserPlaces = () => {
  let [data, setData] = useState({});
  let { id } = useParams();
  let [day1,setDay1] = useState([])
  let [day2,setDay2] = useState([])
  let navigate = useNavigate();

  let getData = async () => {
    try {
      console.log(id);
      let res = await AxiosService.get(
        `${ApiRoutes.getplacesbyid.path}/${id}`,
        {
          authenticate: ApiRoutes.getplacesbyid.authenticate,
        }
      );
      if(res.status===200){
        console.log(res.data.data);
        setData(res.data.data);
        setDay1(data.day1.split("->"))
        setDay2(data.day2.split("->"))
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
 


  useEffect(() => {
    getData();
  }, [data]);
  return (
    <>
      <Topbar></Topbar>
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-2 d-flex flex-column">
            <div className="card flex-grow-1 shadow sidecard">
             
            </div>
          </div>
          <div className="col-8">
            <div className=" d-flex mt-4 justify-content-between">
              <h2 className="text-center h2 mt-3">{data.name}</h2>
              <button className="btn btn-primary m-2" onClick={()=>{navigate(`/user/Booking/${id}`)}}>Book this package</button>
            </div>
            <div
              id="carouselExampleControls"
              className="carousel slide mb-5 shadow"
              data-bs-ride="carousel"
              style={{ maxWidth: "900px", height: "300px", margin: "auto" }}
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src={data.image1}
                    className="d-block w-100 shadow"
                    alt="Slide 1"
                    height={300}
                    width={900}
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h3>{data.name}</h3>
                  </div>
                </div>
                <div className="carousel-item">
                  <img
                    src={data.image2}
                    className="d-block w-100 "
                    alt="Slide 2"
                    height={300}
                    width={900}
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h3>{data.name}</h3>
                  </div>
                </div>
                {/* Add more carousel items for additional destinations */}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            <div className="mt-2">
              <h5 className="h5">About {data.name}</h5>
              <p>{data.description}</p>
            </div>
            <div className="mt-2">
              <p><b>price</b>: {data.price} per person</p>
            </div>
            <div className="mt-2">
              <h5 className="text-center">Itinerary</h5>
              <div className="mt-2 mb-2">
              <h6 className="h6  mb-2"> Day 0 </h6>
              {data.day0}
            </div>
            <div className="mt-2 mb-2">
              <h6 className="h6  mb-2"> Day 1 : SightSeeing in {data.name}</h6>
             <ul>
              {
                day1.map((e,i)=>{
                  return <li key={i}>{e}</li>
                })
              }
             </ul>
              <p>overnight stay in {data.name}</p>
            </div>
            <div className="mt-2 mb-2">
              <h6 className="h6  mb-2"> Day 2 : SightSeeing in {data.name} and travel towards to bangalore</h6>
             <ul>
              {
                day2.map((e,i)=>{
                  return <li key={i}>{e}</li>
                })
              }
             </ul>
            </div>

            </div>
           
            <div className="mt-3">
            <h3 className="text-center">Inclusion/exclusions</h3>

            <h6 className="h6">Inclusions</h6>
            <ul>
              <li>Accommodation in selected category hotel (NA for Day Trips)</li>
              <li> Breakfast during stay, unless mentioned in Hotel Details section for selected hotel</li>
              <li> Sightseeing as per Itinerary by Private Cab</li>
              <li>Parking & Toll Charges</li>
              <li> Driver Allowance</li>
              <li>Inter-state Entry Tax, if applicable</li>
              <li>Ferry Tickets & Airport Transfers (for Andamans)</li>
              <li> Pickup & Drop from Your Origin City (Optional)</li>
              <li>Total fare includes GST</li>
            </ul>

            <h6 className="h6">Exclusions</h6>
            <ul>
              <li>Airfare</li>
              <li>Lunch, Dinner, Snacks & Beverages</li>
              <li>Entry Fees & Local Guide Charges</li>
              <li>Activity Fees / Jeep Safari / Rafting / Adventure Sport Charges</li>
              <li>Hotel Early Check-in / Late Check-out Charges, if applicable</li>
              <li>Mandatory Gala Dinner for Christmas and New Year eve</li>
              <li>Other items not mentioned in Inclusions</li>

             </ul>

             <h6>optional</h6>
             <ul>
              <li>Homestays / Resorts / Choice of Hotels</li>
              <li>Dinner</li>
              <li>Tour guide (for selected destinations)</li>
              <li>Honeymoon decoration, cake, candle light dinner (for selected destinations)</li>
              <li>Airport Pickup & Drop (select by clicking Customize button while calculating price)</li>
              <li>Visa assistance (for selected International destinations)</li>
              <li>Travel insurance</li>
             </ul>

          </div>
          </div>
          <div className="col-2 d-flex flex-column ">
            <div className="card flex-grow-1 shadow sidecard">
              {/* <img
                src="https://media.istockphoto.com/id/547436912/photo/bungee-jumping.jpg?s=612x612&w=0&k=20&c=yGAdtv_o5h9uzsLhHFxU9al_H-3EzgSCuqRiJ9Hq08A="
                className="card-img-top"
                alt="Advertisement"
              /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
