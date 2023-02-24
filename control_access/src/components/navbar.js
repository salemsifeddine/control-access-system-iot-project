/* eslint-disable no-unused-vars */
import React,{useContext} from 'react'
import {Link} from 'react-router-dom';
import Authcontext from './authcontext.js';


function Navbar() {
    let {user,logout} = useContext(Authcontext)
  return (
   
    <div className='navbar'>
      
        <ul>
            <li> 
            <Link to="/home">Home</Link>
               
            </li>
            {user?
            <>
                <li>
                    <Link to="/management">management</Link>
                </li>
                {/* <li>
                    <Link to="statistics">statistics</Link>
                </li> */}
            </>
        :
        ''
        }
            
            
               
                {user? <li className='buttonlogin'> <button  onClick={logout}>logout </button> </li>:<><li className='buttonlogin'>  <Link to='/login'><button>Login</button></Link> </li><li className='buttonlogin btnreg'> <Link to='/register'><button>Register</button></Link> </li></> }
              
            
            
               
                
              
            
            
        </ul>
         
    </div>
    
  )
}

export default Navbar