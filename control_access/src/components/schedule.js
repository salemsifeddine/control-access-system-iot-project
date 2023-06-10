/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React,{useState} from 'react'
import img1 from '../static/images/Screenshot.png' 
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import { ReactTabulator } from 'react-tabulator';
import Axios from 'axios'


function Schedule() {

  let days=["saturday","sunday","monday",'tuesday',"wednesday","thursday","friday"]
  var daysobj={"saturday":[],"sunday":[],"monday":[],'tuesday':[],
  "wednesday":[],"thursday":[],"friday":[]}
  

  let [sched, setSched] = useState([])
  let [prgrm, setPrgrm] = useState([])
  let [fetchedsched, setFetchedsched] = useState(false)
  let [total, setTotal] = useState([])
  let [que, setQue] = useState("salem")
  var contentth=[]
  var contenttr=[]
  let schedapi = ()=>{
    setFetchedsched(true)
    fetch("http://127.0.0.1:8000/scheduleapi",{
     
      method:"GET",
      headers:{
        'Content-type': "application/json"
      }
    }).then(resp=>resp.json()).then(data=>{
      
      setPrgrm(data[que])
      
    
    });
    // fetch("http://127.0.0.1:8000/programsch",{
    //   method:"GET",
    //   headers:{
    //     'Content-type': "application/json"
    //   }
    // }).then(resp=>resp.json()).then(data=>{
      
    //   setPrgrm(data)
      
    
    // });
    
  }
  for(var k=0;k<days.length;k++){
   
    contentth.push(<th>{days[k]}</th>)
    if(prgrm[days[k]]){
      daysobj[days[k]].push(<td>{days[k]}</td>)
      for(var j=0;j<prgrm[days[k]].length;j++){
        daysobj[days[k]].push(<><td>{prgrm[days[k]][j].program}<br></br>{prgrm[days[k]][j].time}</td></>)
  
      }
    }else{
      for(var kk=0;kk<8;kk++){
      daysobj[days[k]].push(<td></td>)
       
      }
    }
    
  
}

  
   if(!fetchedsched){
    schedapi();
   }

  const getapii = ()=>{
    Axios.get("http://127.0.0.1:8000/managementapi").then((respo)=>{
       
      
      
      setTotal(respo.data.inout[que].ingym )
      // set(respo.data.uid)
      
     
    })
  }
  
  getapii();

  return (
    <div>
         <div className='select'>
        <select onChange={(e)=>{
          setQue(document.getElementsByTagName("select")[0].value)
          
          
        }}>
            <option value="salem">body force</option>
            <option value="salem1111">body mma</option>
        </select>
        <h3>Status:{total} person in Gym</h3>
    </div>
    <div className='schedule'>
        <h3>Program of the week</h3>
      {/* <div className="imgschd">
      <img src={img1} />
        </div> */}
        <br></br>
        <br></br>
        <br></br>
        <br></br>
          <table>
 

 <tr>
   
   {daysobj.saturday}
 </tr>
 <tr>
  
   {daysobj.sunday}
 </tr>
 <tr>
  
   {daysobj.monday}
 </tr>
 <tr>
 
   {daysobj.tuesday}
 </tr>
 <tr>
   
   {daysobj.wednesday}
 </tr>
 <tr>
   
   {daysobj.thursday}
 </tr>
 <tr>
  
   {daysobj.friday}
 </tr>
 
 
 
 
 
 
 
 
 
  

 
</table> 
    </div> 
  
    </div>
  )
}

export default Schedule
