/* eslint-disable no-unused-vars */
import React ,{useContext} from 'react'
import {Outlet,Navigate} from 'react-router-dom'
// import { Navigate as Redirect } from 'react-router-dom';
import Authcontext from './authcontext.js';
import Home from './home.js';
 
function PrivateRoute({children, ...rest}) {
    
  const {user} = useContext(Authcontext)
  
  return (
    
       user? < Outlet /> : <Navigate to="login" />
    
    
  )
}

export default PrivateRoute