import React, { useEffect, useState } from 'react'
import { Topbar } from './Topbar'
import { toast } from 'react-toastify'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'

export const UserDashboard = () => {
    let [data,setData] = useState([])
    

    let getData = async ()=>{
        try {
            let res = await AxiosService.get(`${ApiRoutes.getusers.path}`,{
                authenticate:ApiRoutes.getusers.authenticate
            })
            setData(res.data.data)
        } catch (error) {
            console.log(error.response.data.message)
           toast.error(error.response.data.message) 
        }
    }

    useEffect(()=>{
        getData()
    },[])
  return <>
  <Topbar></Topbar>
  <div className='container mt-5 col-lg-6 col-sm-12'>
    <h3 className='h3 mt-2 mb-2 text-center'>User Details</h3>
  <table className='table table-dark'>
    <thead>
        <tr>
            <td>#</td>
            <td>Name</td>
            <td>Email</td>
            <td>Role</td>
        </tr>
    </thead>
    <tbody>
        {
            data.map((e,i)=>{
                return <tr key={i}>
                    <td>{i+1}</td>
                    <td>{e.name}</td>
                    <td>{e.email}</td>
                    <td>{e.role}</td>

                </tr>
            })
        }
    </tbody>
  </table>
  </div>
 
  </>
   
  
}
