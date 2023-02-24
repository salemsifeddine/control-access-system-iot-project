/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/alt-text */
import React, { createContext,useContext, useState } from 'react'
import hdaydi from '../static/images/hdaydi.png' 
import '../static/css/register.css'
import Authcontext from './authcontext.js'
import axios from "axios"
import {motion} from 'framer-motion'



function Login() {
  const baseurl=""

  let {loginuser} = useContext(Authcontext)
 

  const [logindata, setLoginData]=useState({
    "username":"",
    "password":""
  })

  const inputHandler = (event)=>{
        setLoginData({
          ...logindata,
          [event.target.name]:event.target.value
        })
  }

// const submitHandler = (event)=>{
//   const formdata = new FormData();
//   formdata.append('username',logindata.username);
//   formdata.append('password',logindata.password);
//   axios.post("",formdata).then(function(response){
//     console.log(response)
//   }).catch(function(error){
//     console.log(error)
//   })
// }
const buttonenable = (logindata.username == '') && (logindata.password == '')

  return (
    <motion.div className='register' 
    initial={{width:0+'%'}}
   animate={{width:100+'%'}}
   exit={{x:window.innerWidth, transition:{duration:0.1}}}
    >
      <div className='leftside'>
      <h1>Register</h1>
      
      <form onSubmit={loginuser}>
        <label>Username</label>
        <br></br>
        <input type="text"  name="username" id="username" />
        <br></br>
        <label>Username</label>
        <br></br>
        <input type='password' name="password" id="pwd" />
        <div className='buttonlogin'>
          
               {/* <input   type='submit' /> */}
               <button type="submit">login</button>
              </div>
      </form>
            <br></br>
            <br></br>
            <p>You don't Have an account? <a href="register">signup</a></p>
      </div>

      
      <div className='rightside'>
        <img src={hdaydi} />
      </div>
    </motion.div>
  )
}

export default Login