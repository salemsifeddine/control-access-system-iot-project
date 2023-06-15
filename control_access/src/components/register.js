/* eslint-disable eqeqeq */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-const-assign */
/* eslint-disable no-loop-func */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/alt-text */
import React , {useState}from 'react'
import hdaydi from '../static/images/hdaydi.png' 
import '../static/css/register.css'
import cities from './cities.json'
import Cities from './cities.js'
import Communs from './communs.js'
import {useNavigate } from 'react-router-dom'
import {motion} from 'framer-motion'


function Register() {
  let [register, setRegister] = useState({})
  let [username,setUsername]=useState()
  let [email,setEmail]=useState()
  let [password,setPassword]=useState()
  let [city,setCity]=useState()

  let history = useNavigate();
  

  const inputHandler = (e)=>{
 

   

    // if(e.target.name==="image" ){
    //   console.log("image",e.target.files[0])
    //   setRegister({
    //     ...register,
    //     [e.target.name]:e.target.files[0].name
    //   })
    // }else{
      if(e.target.name == "city"){
        
        setRegister({
          ...register,
          [e.target.name]:document.getElementById("selectcity").children[document.getElementById("selectcity")["selectedIndex"]].text 
        })
        
      }else{
        
        setRegister({
          ...register,
          [e.target.name]: e.target.value
        })
      }
      
    // }
    
  }

  const [cityselected, setCityselected] = useState(null)
  
  const [objcom, setObjcomm] = useState([])


  var object=[]
  var communsObj =[]
  var objcomarray=[]

  for(let ii=0;ii<cities.length;ii++){
  
    object.push(
      < Cities city={cities[ii]} id={ii} />
    )

  }
  
  // const communs = ()=>{
    // for(let id=0;id<cities.length;id++){
    //   console.log(communs)
    //   communsObj.push(
    //     < Communs commun={communs[ii]} id={id} />
    //   )
  
    // }
  // }


  const app = ()=>{
    fetch("https://raw.githubusercontent.com/Revln9/Algeria-Json/master/Algeria-wilayas.json",{
      method:"GET",
    headers: {
      'Content-type': "application/json"
  }
    }).then(reponse=> console.log(reponse))
  }
  return (
    <motion.div className='register' initial={{width:0+'%'}}
    animate={{width:100+'%'}}
    exit={{x:window.innerWidth, transition:{duration:0.1}}}
    >
      <div className='leftside'>
      <h1>Register</h1>

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
  
 fetch("http://127.0.0.1:8000/registerapi/",
    {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
            "X-CSRFToken": csrftoken
        },
        body: JSON.stringify(register)
    }
).then(ress=>{
  ress.json();
  console.log(ress)

  if(ress.status === 200){
                swal("CONGRATS", "Account created successfully!", "success");
                document.getElementsByClassName("swal-button")[0].style.opacity =0
                setTimeout(() => {
                  history("/login")
                  document.getElementsByClassName("swal-modal")[0].style.display = "none"
                }, 3000);
      }else{
        swal(
          'Recheck your form ',
          'and register again,please!',
          'error'
        )
        document.getElementsByClassName("swal-button")[0]?document.getElementsByClassName("swal-button")[0].style.opacity =0:''
        setTimeout(() => {
          history("/register")
          document.getElementsByClassName("swal-modal")[0].style.display = "none"
        }, 3000);
      }
      console.log(ress)
      
    }).catch(error=>console.log(error))
    
        

      }}>
      <label>hall name</label>
      <br></br>
      <input value={username} onChange={inputHandler} type="text" name="username"/>
      <br></br>
      <label>email</label>
      <br></br>
      <input value={email} onChange={inputHandler} type="email" name="email"/>
      <br></br>
      <label>password</label>
      <br></br>
      <input value={password} onChange={inputHandler} type='password' name="password"/>
      

      <div className='selectselect'>
      <select value={city} name="city" id='selectcity' onChange={inputHandler} onClick={(e)=>{
       
        
        setObjcomm([])
          var idd=e.target.value;
          setCityselected(idd)
          
          
          for(let id=0;id<cities[idd-1].communes.length;id++){
           
            
            var communename =cities[idd-1].communes[id]

            
            
           

            objcomarray.push(< Communs  commun={communename} id={id} />)
            
           
         

        
          }
          setObjcomm(objcomarray)

        }}> 
      {object}
    </select>
   
   {cityselected? <select name="commun" id="communscity" onChange={inputHandler}>
   {objcom}
   </select>:""}
   

   </div>
   <br></br>
            <br></br>
      <div className='buttonlogin'>
               <button onClick={()=>{
                console.log("clicked")
               }} type="submit">sign up</button>
            </div>
      </form>
   
            <br></br>
            <br></br>
            <p>Have an account? <a href="login">login</a></p>
      </div>

      
      <div className='rightside'>
        <img src={hdaydi} />
      </div>
    </motion.div>
  )
}

export default Register