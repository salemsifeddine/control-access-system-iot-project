/* eslint-disable no-const-assign */
/* eslint-disable jsx-a11y/alt-text */
import React,{useState,useEffect} from 'react'
import imgh from '../static/images/body.jpg' 
import '../static/css/user.css'
import { useParams } from 'react-router-dom';
import axios from "axios"
import swal from 'sweetalert'
import Axios from 'axios'
import { json,useNavigate } from 'react-router-dom';


function UserDetail() {

  let history = useNavigate();
  const [myData, setMyData] = useState({});
  const [myData2, setMyData2] = useState({});
  const { id } = useParams(); // replace with the
  const [fetchedform,setFetchedform] = useState(false)

  const handleInputChange = (event) => {

    const varff={
      ...myData2,
      [event.target.name] : event.target.value
    }
    const varff1={
      ...myData,
      [event.target.name] : event.target.value
    }

    // if( event.target.name === "limitation" || event.target.name === "last_access" ){
         
    //   setMyData(varff1);
    //   setMyData2(varff);
    // }else{
    //   setMyData2(varff);
    // }
    setMyData(varff1);
      setMyData2(varff);
    
     console.log(myData2)
  };


  
  const btnsubmit1 = (event)=>{
    event.preventDefault();
     
    const formData = new FormData();
    
    formData.append("fullname", document.getElementsByName("fullname")[0].value);
    formData.append("subscription_delay", document.getElementsByName("subscription_delay")[0].value);
    formData.append("limitation", document.getElementsByName("limitation")[0].value);
    formData.append("subscription_delay", document.getElementsByName("subscription_delay")[0].value);
    formData.append("subscription_delay_from", document.getElementsByName("subscription_delay_from")[0].value);
    formData.append("access_code", document.getElementsByName("access_code")[0].value);
    formData.append("last_access", document.getElementsByName("last_access")[0].value);
    formData.append("user_phone", document.getElementsByName("user_phone")[0].value);
   

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
    
    
    let Axiosconfig = {
      headers: {
        "Content-Type": "multipart/form-data",
          "X-CSRFToken": csrftoken
      }
         };

  Axios.post(`http://127.0.0.1:8000/managementapi/${id}/`,formData,Axiosconfig).then(ress=>{
  console.log(ress)
  

  if(ress.status == 200){
            swal("successfully changed", "Athlete modified!", "success");
            document.getElementsByClassName("swal-button")[0].style.opacity =0
            setTimeout(() => {
               history("/management")

              document.getElementsByClassName("swal-modal")[0].style.display = "none";
              document.getElementsByClassName("swal-overlay")[0].remove()
             }, 3000);
  }else{
    swal(
      'Recheck your network ',
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


    // ID of the object you want to retrieve
   
    const fft =() => {
      axios(`http://127.0.0.1:8000/managementapi/${id}/`).then(response => {
        setMyData(response.data);
        setMyData2(response.data.athlete_info)
  

        
        
      })
      .catch(error => {
        console.log(error.code);
        
      })
    };

    if(!fetchedform){
      fft();
      setFetchedform(true);
      console.log("again")
    }
    
    if(!myData.athlete_info){
        return <div>Loading</div>
    }else{

     


    

  return (
    <div className='layer1'>
         <div className='layer2'>
         <div className='layertop'>
            <div className='img'><img src={"http://127.0.0.1:8000/media/"+myData2.image} /></div>
        </div>
        <div className='layercenter'>

            <div className='fullname'>
                <h2><input onChange={handleInputChange}  name="fullname" type='text' value={myData2.fullname} /> </h2>
            </div>
            <div className='otherinfos'>
                <h3>athlete access code: <input onChange={handleInputChange}  name="access_code" type='text' value={myData2.access_code} /> </h3>
                <h3>athlete phone:<input onChange={handleInputChange}  name="user_phone" type='text' value={myData2.user_phone} /></h3>
                <h3>registration date:<input onChange={handleInputChange} name="subscription_delay_from"  type='date' value={myData2.subscription_delay_from} /></h3>
                <h3>subscription delay:<input onChange={handleInputChange}  name="subscription_delay" type='date' value={myData2.subscription_delay} /></h3>
                <h3>last access:<input onChange={handleInputChange}  name="last_access" type='date' value={myData.last_access} /></h3>
                <h3>limitation per day:<input onChange={handleInputChange}  name="limitation" type='number' value={myData.limitation} /></h3>
                
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
}

export default UserDetail