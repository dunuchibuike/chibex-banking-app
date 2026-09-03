import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
const Private = () => {
  const Token = localStorage.getItem("token");
  return Token ? <Outlet/> : <Navigate to="/" />
  
}

export default Private
