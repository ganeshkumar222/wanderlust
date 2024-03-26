import React from 'react'
import { Navigate } from 'react-router-dom'

export const AdminProtectedRoute = ({children}) => {
    let role = sessionStorage.getItem("role")
  return <>
  {
    
    role==="admin"?children:<Navigate to="/signin"></Navigate>
  }
  </>
}
