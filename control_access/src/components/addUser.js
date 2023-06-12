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
import {motion} from 'framer-motion'
import Axios from 'axios'

function AddUser() {

  let history = useNavigate();

  let [fullname,setFullname]=useState()
  let [user_id,setUser_id]=useState()
  let [user_phone,setUser_phone]=useState()
  let [subscription_delay,setSubscription_delay]=useState()
  let [access_code,setAccess_code]=useState()
  let [datat,setDatat]=useState({})
  const [imgprev,setImgprev]=useState()
 


  const getapi1 = ()=>{
    

    Axios.get("http://127.0.0.1:8000/edit/").then((respo)=>{
     
     if(respo.data.uid != "none"){
      document.getElementById("user_access_code").value = respo.data.uid.replace("UID: ","");
      setDatat({
        ...datat,
        [document.getElementById("user_access_code").name]:respo.data.uid.replace("UID: ","")
      })
     }
     //setInterval()
     
    })
  }
  
 

  setInterval(()=>{
    if(window.location.pathname === "/management/user/add"){
      if(! document.getElementById("user_access_code").value){
        getapi1()
        console.log("yesss")
      }
    }
    
    } , 1000);



 

  const btnsubmit1 = (event)=>{
    event.preventDefault();
     
    const formData = new FormData();
    formData.append("image",  document.getElementById("imgfileinput").files[0]);
    formData.append("fullname", document.getElementsByName("fullname")[0].value);
    formData.append("user_id", document.getElementsByName("user_id")[0].value);
    formData.append("user_phone", document.getElementsByName("user_phone")[0].value);
    formData.append("subscription_delay", document.getElementsByName("subscription_delay")[0].value);
    formData.append("access_code", document.getElementsByName("access_code")[0].value);
    console.log(formData)
    
    
    var csrftoken = getCookie('csrftoken');
    
    
    let Axiosconfig = {
      headers: {
        "Content-Type": "multipart/form-data",
          "X-CSRFToken": csrftoken
      }
         };

  Axios.post("http://127.0.0.1:8000/edit/",formData,Axiosconfig).then(ress=>{
  console.log(ress)
  

  if(ress.status == 200){
            swal("successfully accessed", "New user registered!", "success");
            document.getElementsByClassName("swal-button")[0].style.opacity =0
            setTimeout(() => {
               history("/management")

              document.getElementsByClassName("swal-modal")[0].style.display = "none";
              document.getElementsByClassName("swal-overlay")[0].remove()
             }, 3000);
  }else{
    swal(
      'Recheck your form ',
      'and send it again,please!',
      'error'
    )
    document.getElementsByClassName("swal-button")[0].style.opacity =0
    setTimeout(() => {
      
      document.getElementsByClassName("swal-modal")[0].style.display = "none"
     }, 3000);
  }
  
  
}).catch(error=>console.log(error))

  }
  const inputHandler = (event)=>{
    

    
    if(event.target.name==="image" ){
       
      setImgprev(event.target.files[0])
      document.getElementById("imgfile").src =URL.createObjectURL(event.target.files[0])
      
      setDatat({
        ...datat,
        [event.target.name]:event.target.files[0]
      })
      
    }else{
      setDatat({
        ...datat,
        [event.target.name]: event.target.value
      })
      
    }


    
  }

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
  
  return (
    <motion.div className='layer1'
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity:0, transition:{duration:0.1}}}
    >
        <form   >
        <div className='layer2'>
         <div className='layertop' style={{"position":"relative"}}>
            <div className='img'>
              <input id="imgfileinput" name="image" onChange={inputHandler}  type='file' style={{
                "opacity":0,
                "width":100+'%',
                "height":100+'%',
                "position": "absolute"
              }}/>
              <img src={imgh} id="imgfile"  />
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
                <input onChange={inputHandler} name="subscription_delay" value={subscription_delay} type="date" />
                <h3>User Access Code:</h3>
                <input  onChange={inputHandler} name="access_code" id="user_access_code" value={access_code} type="text" />
            </div>
            
            
        </div>
        <div className='layerbottom'>
            <div   className='btnprofile'>
                <button 
                id='btnsubmit1'
                onClick={btnsubmit1}
                 
                 
                 type="submit"  style={{
                  "background": "transparent",
                  "border": 2.5+"px solid #ffea20",
                  "color": "#ffea20",
                  "font-family": "BebasNeue",
                  "font-size": 24+"px",
                  "height": 100+"%",
                  "text-transform": "uppercase",
                  "width": 70+"% !important",
                  "margin-top":"120px"
                }}>Submit Addition</button>
                
            </div>
        </div>
        </div>
       
        </form>
    </motion.div>
  )
}

export default AddUser