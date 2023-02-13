/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import hdaydi from '../static/images/hdaydi.png' 
import '../static/css/register.css'
function Register() {
  return (
    <div className='register'>
      <div className='leftside'>
      <h1>Register</h1>
      <label>Username</label>
      <br></br>
      <input type="text" name="username"/>
      <br></br>
      <label>email</label>
      <br></br>
      <input type="email" name="email"/>
      <br></br>
      <label>Username</label>
      <br></br>
      <input type='password' name="password"/>
      <div className='buttonlogin'>
               <button>logout</button>
            </div>
            <br></br>
            <br></br>
            <p>Have an account? <a href="login">login</a></p>
      </div>

      
      <div className='rightside'>
        <img src={hdaydi} />
      </div>
    </div>
  )
}

export default Register