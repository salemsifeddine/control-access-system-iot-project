import React,{useState,useEffect,useContext} from 'react'
import imgh from '../static/images/body.jpg' 
import '../static/css/user.css'
import { useParams } from 'react-router-dom';
import axios from "axios"
import Authcontext from './authcontext.js';


function HallDetail() {
   
    const {user} = useContext(Authcontext)

  return (
    <div className='layer1'>
         <div className='layer2'>
         <div className='layertop'>
            <div className='img'><img src={imgh} /></div>
        </div>
        <div className='layercenter'>

            <div className='fullname'>
                <h2>{user.username}</h2>
            </div>
            <div className='otherinfos'>
                <h3>Hall name:</h3>
                <h3>Description:</h3>
                <h3>N° of athletes:</h3>
                <h3>Schedule:</h3>
                
                
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


export default HallDetail