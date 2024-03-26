import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
  CardElement
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'
import { toast } from "react-toastify";

export const PaymentForm = () => {
  let stripe = useStripe();
  let elements = useElements();
  let [upiId,setUpiId] = useState()
    let handlesubmit = async () =>{
      try {
        event.preventDefault()
        let value = {
          amount:100
        }
        let res = await AxiosService.post(ApiRoutes.getpayment.path,value,{
          authenticate:ApiRoutes.getpayment.authenticate
        })
        console.log(res.data)
        let clientsecret = res.data.client_secret
       let result = await  stripe.confirmCardPayment(clientsecret,{
          payment_method:{
            type:"card",
            card:elements.getElement(CardElement),
           
            billing_details: {
              name:"ganesh",
              email:"ganesh.gmv004@gmail.com"
            }   
          }
        })
        if(result.error){
          console.log(result.error.message)
          toast.error(result.error.message)
        }
        else{
          if(result.paymentIntent.status==="succeeded"){
            toast.success("payment success")
          }
          else{
            toast.error("please try again")
          }
        }
      } catch (error) {
         console.log(error)
      }
    }
  
  return (
    <>
      <div className="container-fluid col-4">
        <form
          onSubmit={() => {
            handlesubmit();
          }}
        >
          <div className="mb-3">
            <label htmlFor="cardnumber1" className="form-label">
              Card Number
            </label>
            <CardElement
              type="text"
              className="form-control"
            ></CardElement>
          </div>
          
          {/* <div className="mb-3">
            <label htmlFor="cardnumber1" className="form-label">
              Card Number
            </label>
            <CardNumberElement
              type="text"
              className="form-control"
            ></CardNumberElement>
          </div>

          <div className="mb-3">
            <label htmlFor="cardnumber1" className="form-label">
              Card Number
            </label>
            <CardExpiryElement
              type="text"
              className="form-control"
            ></CardExpiryElement>
          </div>
          <div className="mb-3">
            <label htmlFor="cardnumber1" className="form-label">
              Card Number
            </label>
            <CardCvcElement
              type="text"
              className="form-control"
            ></CardCvcElement>
          </div> */}

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
