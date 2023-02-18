/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import imgh from '../static/images/body.jpg' 
import '../static/css/user.css'

function UserDetail() {
  return (
    <div className='layer1'>
         <div className='layer2'>
         <div className='layertop'>
            <div className='img'><img src={imgh} /></div>
        </div>
        <div className='layercenter'>

            <div className='fullname'>
                <h2>salem sif eddine</h2>
            </div>
            <div className='otherinfos'>
                <h3>User id:</h3>
                <h3>User phone:</h3>
                <h3>Date registration:</h3>
                <h3>subscription delay:</h3>
                
            </div>
            
            
        </div>
        <div className='layerbottom'>
            <div  className='btnprofile'>
                <button>Save changes</button>
                <button>delete user</button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default UserDetail