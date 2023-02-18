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


function Register() {


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
    <div className='register'>
      <div className='leftside'>
      <h1>Register</h1>
      <label>hall name</label>
      <br></br>
    
   
      <input type="text" name="username"/>
      <br></br>
      <label>email</label>
      <br></br>
      <input type="email" name="email"/>
      <br></br>
      <label>password</label>
      <br></br>
      <input type='password' name="password"/>
      

      <div className='selectselect'>
      <select id='selectcity' onChange={(e)=>{
        
        setObjcomm([])
          var idd=e.target.value;
          setCityselected(idd)
          
          
          for(let id=0;id<cities[idd-1].communes.length;id++){
           
            
            var communename =cities[idd-1].communes[id]

            
            
            // console.log(< Communs commun={communename} id={id} />)

            objcomarray.push(< Communs commun={communename} id={id} />)
            
           
            
            // document.getElementById("communscity").append(<option key={id} value={id}>
            //   communename
            // </option>)

        
          }
          setObjcomm(objcomarray)

        }}> 
      {object}
    </select>
   
   {cityselected? <select id="communscity">
   {objcom}
   </select>:""}
   

   </div>
   <br></br>
            <br></br>
      <div className='buttonlogin'>
               <button>sign up</button>
            </div>
            <br></br>
            <br></br>
            <p>Have an account? <a href="login">login</a></p>
      </div>

      
      <div className='rightside'>
        <img src={hdaydi} />
      </div>
    </div>
  )
}

export default Register