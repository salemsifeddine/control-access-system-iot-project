import React from 'react'
import {
    Link,Router
} from 'react-router-dom';

function Navbar() {
  return (
   
    <div className='navbar'>
        <ul>
            <li> 
            <Link to="/home">Home</Link>
               
            </li>
            <li>
                <Link to="/management">management</Link>
            </li>
            <li>
                <Link to="statistics">statistics</Link>
            </li>
            <li className='buttonlogin'>
               <button>logout</button>
            </li>
        </ul>
         
    </div>
    
  )
}

export default Navbar