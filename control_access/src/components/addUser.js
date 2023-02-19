/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React ,{useContext, useState,useEffect} from 'react'
import imgh from '../static/images/profile.jpg' 
import '../static/css/user.css'
import { json,useNavigate } from 'react-router-dom';
import $ from 'jquery'
import swal from 'sweetalert'


function AddUser() {

  let history = useNavigate();

  let [fullname,setFullname]=useState()
  let [user_id,setUser_id]=useState()
  let [user_phone,setUser_phone]=useState()
  let [subscription_delay,setSubscription_delay]=useState()
  let [access_code,setAccess_code]=useState()
  let [datat,setDatat]=useState({})

  const inputHandler = (event)=>{

    if(event.target.name==="image" ){
      console.log("image",event.target.files[0])
      setDatat({
        ...datat,
        [event.target.name]:event.target.files[0].name
      })
    }else{
      setDatat({
        ...datat,
        [event.target.name]: event.target.value
      })
      console.log(datat,event.target.value)
    }
    
  }
  
  return (
    <div className='layer1'>
        <form onSubmit={(e)=>{
          e.preventDefault();
          function getCookie(name) {
            var cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = cookies[i].trim();
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
          }
          
          var csrftoken = getCookie('csrftoken');
          
          
          
          // setDatat({ 
          //   "fullname": e.target.fullname.value, 
          //   "user_id":e.target.user_id.value, 
          //   "user_phone":e.target.user_phone.value, 
          //   "subscription_delay":e.target.user_subscription_delay.value, 
          //   "access_code":e.target.user_access_code.value, 
             
          //   })
          
          
          
          fetch("http://127.0.0.1:8000/edit/",
          {
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
                  "X-CSRFToken": csrftoken
              },
              body: JSON.stringify(datat)
          }
      ).then(ress=>{
        ress.json();

        if(ress.status === 200){
                  swal("successfully accessed", "New rfid scanned & stored in DB!", "success");
                  document.getElementsByClassName("swal-button")[0].style.opacity =0
                  setTimeout(() => {
                    history("/management")
                    document.getElementsByClassName("swal-modal")[0].style.display = "none"
                   }, 3000);
        }else{
          swal(
            'Recheck your network ',
            'and send it again,please!',
            'error'
          )
          document.getElementsByClassName("swal-button")[0].style.opacity =0
          setTimeout(() => {
            history("/management")
            document.getElementsByClassName("swal-modal")[0].style.display = "none"
           }, 3000);
        }
        console.log(ress)
        
      }).catch(error=>console.log(error))


    
         
        }}>
        <div className='layer2'>
         <div className='layertop' style={{"position":"relative"}}>
            <div className='img'>
              <input name="image" onChange={inputHandler}  type='file' style={{
                "opacity":0,
                "width":100+'%',
                "height":100+'%',
                "position": "absolute"
              }}/>
              <img src={imgh} />
              </div>
        </div>
        <div className='layercenter'>

            <div className='fullname'>
                <h2 style={{"line-height": 80 +'px'}}>full Name</h2>
                <input value={fullname} onChange={inputHandler}  name="fullname" type="text" />
            </div>
            <div className='otherinfos'>
                <h3>User id:</h3>
                <input onChange={inputHandler} name="user_id" value={user_id} type="text" />
                <h3>User phone:</h3>
                <input onChange={inputHandler} name="user_phone" value={user_phone} type="text" />
               
                <h3>subscription delay:</h3>
                <input onChange={inputHandler} name="user_subscription_delay" value={subscription_delay} type="date" />
                <h3>User Access Code:</h3>
                <input  onChange={inputHandler} name="user_access_code" value={access_code} type="text" />
            </div>
            
            
        </div>
        <div className='layerbottom'>
            <div   className='btnprofile'>
                <button 
               
                 
                 
                 type="submit"  style={{
                  "background": "none",
                  "border": 2.5+"px solid #ffea20",
                  "color": "#ffea20",
                  "font-family": "BebasNeue",
                  "font-size": 24+"px",
                  "height": 100+"%",
                  "text-transform": "uppercase",
                  "width": 70+"%",
                  "margin-top":"90vh"
                }}>Submit Addition</button>
                
            </div>
        </div>
        </div>
        </form>
    </div>
  )
}

export default AddUser