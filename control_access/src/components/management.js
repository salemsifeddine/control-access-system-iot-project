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

ChartJS.register(ArcElement, Tooltip, Legend);


const data = {
  labels: [
    'Red',
    'Blue',
    'Yellow'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
};

const config = {
  type: 'pie',
  data: data,
};




function Management() {

  let {user} = useContext(Authcontext)
  const [api,setApi] = useState("")

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
      setApi(respo.data[user.username])
   
     
    })
  }
  
  getapi();

  for(let il=0;il<api.length;il++){
    
    object.push(
      <ContUser ingym={api[il].ingym} key={il} imgs={imgs} api={api} il={il} />
    )

  }
 


  return (
    <div className='managecont'>
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
          }}>
              <StackedLineChartIcon/>
          </div>
        </div>
      </div>
      <div className="rightmanag">
        <div className='listsmanage'>
        {object}
        </div>
      </div>
    </div>
  )
}

export default Management