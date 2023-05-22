/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React,{useState,useContext } from 'react'
import '../static/css/management.css'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import imgs from '../static/images/body.jpg' 
import Chart from 'chart.js/auto';
import Axios from 'axios'
import ContUser from './contuser'
import swal from 'sweetalert';
import {Link} from 'react-router-dom'
import {useNavigate } from 'react-router-dom'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import Authcontext from './authcontext.js'
import {motion} from 'framer-motion'
import { List } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);






function Management() {

  let {user} = useContext(Authcontext)
  const [api,setApi] = useState("")
  const [uid,setUid] = useState("")
  const [datapie,setDatapie]=useState([11,21])

  const data = {
    labels: [
      'In Gym',
      'Out Gym',
      
    ],
    datasets: [{
      label: 'My First Dataset',
      data: datapie,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        
      ],
      hoverOffset: 4
    }]
  };
  
  const config = {
    type: 'pie',
    data: data,
  };
  

  var object =[]

  let history = useNavigate();
    
  


  // componentDidMount(){
  //   fetch("http://127.0.0.1:8000/managementapi",{
  //       method: 'GET',
  //       headers: {
  //           'Content-type': "application/json"
  //       },
  //   }).then(res=>res.json()).then(dataa=>{
  //     for(var i =0; i<dataa.length;i++){
        
  //       object= dataa
  //       console.log(object,dataa)
  //     }
  //   })
  
  // }
  const getapi = ()=>{
    Axios.get("http://127.0.0.1:8000/managementapi").then((respo)=>{
      setApi(respo.data.list[user.username])
      setDatapie([respo.data.inout[user.username].ingym,respo.data.inout[user.username].outgym])
      
      console.log(respo.data.uid)
      if(respo.data.uid != "error occured" && respo.data.uid !== "limited"){
        swal("successfully accessed", "New rfid scanned!"+respo.data.uid, "success");
      }
      if(respo.data.uid === "limited"){
        swal("limited access", "try Tomorow!", "error");
      }
      if(respo.data.uid === "not exist"){
        swal("Hmmm ", "Athlete not exist!", "error");
      }
      // else{
      //   swal("user Doesn't exist", "New rfid scanned!"+respo.data.uid, "error");
      // }
      
      setUid(respo.data.uid)
      
     
    })
  }
  
  getapi();

  for(let il=0;il<api.length;il++){
   
    if(api[il].ingym){
      object.push(
        <ContUser id={api[il].id} ingym={api[il].ingym} key={il} imgs={imgs} api={api} il={il} />
      )
    }
    

  }
 


  return (
    <motion.div className='managecont' 
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity:0, transition:{duration:0.1}}}
      >
      <div className="leftmanag">
        <div className='chartmanage'>
        <Pie data={data} />
        </div>
        <div className='adduser'>
          
          <div className='addusertogym' onClick={()=>{
            history('user/add');
          }}>
              <PersonAddIcon  />
           
          </div>
         
          <div className='morestatic' onClick={()=>{
            swal("successfully accessed", "New rfid scanned & stored in DB!", "success");
            history('/hall');
          }}>
              <PersonAddIcon  />
          </div>
        </div>
      </div>
      <div className="rightmanag">
      <div className='searchathletes'>
        <input type="text" />
        </div>
        <div className='listsmanage'>
        {object}
        </div>
      </div>
    </motion.div>
  )
}

export default Management