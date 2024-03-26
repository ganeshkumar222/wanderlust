import React from 'react'
import { Navigate } from 'react-router-dom'

export const UserProtectedRoute = ({children}) => {
 let role = sessionStorage.getItem("role")
  return <>
   {
    
    role==="user"?children:<Navigate to="/signin"></Navigate>
  }
  
  </>
}
