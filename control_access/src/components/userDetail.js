/* eslint-disable jsx-a11y/alt-text */
import React,{useState,useEffect} from 'react'
import imgh from '../static/images/body.jpg' 
import '../static/css/user.css'
import { useParams } from 'react-router-dom';
import axios from "axios"


function UserDetail() {
    const [myData, setMyData] = useState({});
    const [myData2, setMyData2] = useState({});
    const { id } = useParams(); // replace with the ID of the object you want to retrieve
   
    const fft =() => {
      axios(`http://127.0.0.1:8000/managementapi/${id}/`).then(response => {
        setMyData(response.data);
        setMyData2(response.data.athlete_info)
        
      })
      .catch(error => {
        console.log(error.code);
        
      })
    };
    fft();
    if(!myData.athlete_info){
        return <div>Loading</div>
    }else{

    console.log(myData2)


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
                <h3>User id:{myData.fullname}</h3>
                <h3>User phone:{myData2.user_phone}</h3>
                <h3>Date registration:{myData2.subscription_delay_from}</h3>
                <h3>subscription delay:{myData2.subscription_delay}</h3>
                <h3>limitation per day:1</h3>
                
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
}

export default UserDetail