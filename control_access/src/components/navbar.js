import React from 'react'

function Navbar() {
  return (
    <div className='navbar'>
        <ul>
            <li> 
                <a>
                    Home
                </a>
            </li>
            <li>
                <a>
                    management
                </a>
            </li>
            <li>
                <a>
                    statistics
                </a>
            </li>
            <li className='buttonlogin'>
               <button>logout</button>
            </li>
        </ul>
         
    </div>
  )
}

export default Navbar