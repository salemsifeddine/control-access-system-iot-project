/* eslint-disable eqeqeq */
/* eslint-disable no-loop-func */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React,{useState,useContext } from 'react'
import '../static/css/management.css'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
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
import SearchList from './searchlist'

ChartJS.register(ArcElement, Tooltip, Legend);






function Management() {
  const [api2,setApi2] = useState("")
  const [api3,setApi3] = useState("")
  const [renderr,setRenderr] = useState(false)
  
  const  [listsearch,setListsearch]= useState([])
  const  [listsearch1,setListsearch1]= useState([])


  const changeSearch = (e)=>{
    setListsearch([])
    Axios.get("http://127.0.0.1:8000/managementapi").then((respo)=>{
      setApi2(respo.data.list[user.username])
      setApi3([])
     
 
      

      if (e.target.value !== '') {
        

        for( var userlist=0; userlist < respo.data.list[user.username].length; userlist++){
          if(respo.data.list[user.username][userlist].fullname.includes(e.target.value)){
        const newComponent = (
          <SearchList datalist={respo.data.list[user.username][userlist]} />
        );
        const isComponentAlreadyAdded = listsearch.some(
          (component) => component.props.datalist.fullname === e.target.value
        );
        if (!isComponentAlreadyAdded) {
          setListsearch((prevList) => [...prevList, newComponent]);
        }
      }
      }
    }
    

     

      
      
    
    });

    

  }

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
  //        
  //     }
  //   })
  
  // }
  const getapi = ()=>{
    Axios.get("http://127.0.0.1:8000/managementapi").then((respo)=>{
      setApi(respo.data.list[user.username])
      setDatapie([respo.data.inout[user.username].ingym,respo.data.inout[user.username].outgym])
      
       console.log(respo.data.uid)
      if(respo.data.uid != "error occured" && respo.data.uid != "none" && respo.data.uid !== "limited" && respo.data.uid !== "not exist"){
       if(respo.data.uid === "access"){
        swal("successfully accessed", "New rfid scanned!"+respo.data.uid, "success");
       }else{
        swal("successfully removed ", "New rfid scanned!", "success");
       }
      }
      if(respo.data.uid === "limited"){
        swal("limited access", "try Tomorow!", "error");
       
      }
      if(respo.data.uid === "not exist"  ){
        
        swal("Hmmm ", "Athlete not exist!", "error");
      }
      if(respo.data.uid === "error occured"){
        swal("Hmmm ", "please, place your equipement !", "error");
      }
      // else{
      //   swal("user Doesn't exist", "New rfid scanned!"+respo.data.uid, "error");
      // }
      
      setUid(respo.data.uid)
      
     
    });

  }
  
  getapi();

  for(let il=0;il<api.length;il++){
   
    if(api[il].ingym){
      object.push(
        <ContUser id={api[il].id}  ingym={api[il].ingym} key={il} imgs={imgs} api={api} il={il} />
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

           
              <PersonAddIcon />
           
          </div>
         
          <div className='morestatic' onClick={()=>{
             
            history('/hall');
          }}>
              <AddModeratorIcon  />
          </div>
        </div>
      </div>
      <div className="rightmanag">
      <div className='searchathletes'>
        <input type="text" onChange={changeSearch} />
        <div style={{"position":"absolute","width":59+"%"}}>
        {listsearch.map((component, index) => (
        <div key={index}>{component}</div>
      ))}
        </div>
         
        </div>
        <div className='listsmanage'>
        {object}
        </div>
      </div>
    </motion.div>
  )
}

export default Management