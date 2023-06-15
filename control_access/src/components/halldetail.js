import React,{useState,useEffect,useContext} from 'react'
import imgh from '../static/images/body.jpg' 
import '../static/css/user.css'
import { useParams } from 'react-router-dom';
import axios from "axios"
import Axios from "axios"
import Authcontext from './authcontext.js';
import swal from 'sweetalert'
import { json,useNavigate } from 'react-router-dom';

function HallDetail() {
    const [Nathletes,setNathletes]=useState(0)
    const {user} = useContext(Authcontext)

    const fetchNumber = ()=>{

        axios.get("http://127.0.0.1:8000/managementapi").then((res)=>{
            
        setNathletes(res.data.list[user.username].length)
        }).catch((res)=>console.log())
    }

    fetchNumber();
    let history = useNavigate();
   
    const btnsubmit1 = (event)=>{
        event.preventDefault();
         
        const formData = new FormData();
        formData.append("day", document.getElementsByName("day")[0].value);
        formData.append("duration1", document.getElementsByName("duration1")[0].value);
        formData.append("duration2", document.getElementsByName("duration2")[0].value);
        formData.append("program", document.getElementsByName("program")[0].value);
       
        console.log(formData)
        
        
        var csrftoken = getCookie('csrftoken');
        
        
        let Axiosconfig = {
          headers: {
            "Content-Type": "application/json",
              "X-CSRFToken": csrftoken
          }
             };
    
      Axios.post("http://127.0.0.1:8000/schedulePost/",formData,Axiosconfig).then(ress=>{
      console.log(ress)
      
    
      if(ress.status == 200){
                swal("successfully Modified", "Gym infos modified!", "success");
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
                <h3>Hall name:<input type='text' name="descriphallnametion" /></h3>
                <h3>Description:<input type='text' name="description" /></h3>
                <h3>N° of athletes: {Nathletes}</h3>
                <h3>Schedule:</h3>
                <select name="day" style={{
                    "width": 98+"%",
                    "height": 30+"px",
                    "letter-spacing": 1.3+"px",
                    "line-height": 30+"px",
                    
                }}>
                    <option>Saturday</option>
                    <option>Sunday</option>
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                </select>
                <h3 style={{"margin-top":12+"px"}}>
                    from:
                <input type='time' name="duration1" style={{"width": 155+"px"}} />  
                    to:
                <input type='time' name="duration2" style={{"width": 155+"px"}} />
                </h3>

                <h3>
                <input style={{"width":96+"%"}} type='text' name="program" placeholder='Program name' />
                </h3>
                
            </div>
            
            
        </div>
        <div className='layerbottom'>
            <div  className='btnprofile'>
                <button onClick={btnsubmit1}>Save changes</button>
                <button>delete user</button>
            </div>
        </div>
        </div>
    </div>
  )
}


export default HallDetail