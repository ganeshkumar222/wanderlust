import React, { useEffect, useState } from 'react'
import { Topbar } from './Topbar'
import { useNavigate } from 'react-router-dom'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'
import { useStripe } from '@stripe/react-stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { PaymentForm } from './PaymentForm'
import { loadStripe } from '@stripe/stripe-js'
export const Checkout = () => {
    let navigate = useNavigate()
    let [publicKey,setPublicKey] = useState("")
    // let stripekey = useStripe(publicKey)
    
    let getKey = async ()=>{
      try {
        let res = await AxiosService.get(ApiRoutes.getkey.path,{
          authenticate:ApiRoutes.getkey.authenticate
        })
        console.log(res.data.publickey)
        setPublicKey(res.data.publickey)
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(()=>{
      getKey()
    },[])
  return <>
  <Topbar></Topbar>
  <div className='container col-lg-4 col-sm-12 mt-5'>
    <p className='text-center mt-3'>Thanks for booking a package with us.</p>
    <p className='mt-2 text-center'>Looking forward to see you</p>
    <p className='text-center'>
    <a   onClick={()=>{navigate("/")}}>Go to homepage</a>
    </p>
    
  </div>
  <Elements stripe={loadStripe(publicKey)}>
    <PaymentForm></PaymentForm>
  </Elements>
  </>
}
