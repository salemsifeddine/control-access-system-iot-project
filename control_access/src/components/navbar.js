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
                <li>
                    <Link to="statistics">statistics</Link>
                </li>
            </>
        :
        ''
        }
            
            <li className='buttonlogin'>
               
                {user? <button  onClick={logout}>logout </button>:  <Link to='/login' ><button>Login</button></Link>  }
              
            </li>
        </ul>
         
    </div>
    
  )
}

export default Navbar