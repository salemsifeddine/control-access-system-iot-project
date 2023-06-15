/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React,{useEffect, useState,useContext} from 'react'
import img1 from '../static/images/Screenshot.png' 
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import { ReactTabulator } from 'react-tabulator';
import Axios from 'axios'
import axios from "axios"
import Authcontext from './authcontext.js'
import Optioncomp from './Option';

function Schedule() {



  let {user} = useContext(Authcontext)
  let days=["saturday","sunday","monday",'tuesday',"wednesday","thursday","friday"]
  var daysobj={"saturday":[],"sunday":[],"monday":[],'tuesday':[],
  "wednesday":[],"thursday":[],"friday":[]}
  

  let [sched, setSched] = useState([])
  let [prgrm, setPrgrm] = useState([])
  let [fetchedsched, setFetchedsched] = useState(false)
  let [total, setTotal] = useState({"ingym":0,"outgym":0})
  let [que, setQue] = useState("salem")
  let [userhalls, setUserhalls] = useState([])
  const [selectedOption, setSelectedOption] = useState('');
  var contentth=[]
  var contenttr=[]
  var listhalls=[]
  var jjsn=[]
  
    
    useEffect(()=>{
       
      let schedapi = ()=>{
      axios.get("http://127.0.0.1:8000/scheduleapi").then(resp=>{
      setPrgrm(resp.data[que])
      
       
      
      if(!fetchedsched){
        setUserhalls(Object.keys(resp.data))
        

        setUserhalls([])
        
        for(var hall=0;hall<Object.keys(resp.data).length ; hall++){
          
        
          
            setUserhalls(Object.keys(resp.data));
            listhalls= Object.keys(resp.data)
             
        }
        
        setFetchedsched(true)
      }
    
      
      


    
   
    })
    }

    if(!fetchedsched){  schedapi(); }  

  },[fetchedsched])
  for(var k=0;k<days.length;k++){
   
    contentth.push(<th>{days[k]}</th>)
    if(prgrm[days[k]]){
      daysobj[days[k]].push(<td>{days[k]}</td>)
      for(var j=0;j<prgrm[days[k]].length;j++){
        daysobj[days[k]].push(<><td>{prgrm[days[k]][j].program}<br></br>{prgrm[days[k]][j].time}</td></>)
        
      }
    }else{
      
      daysobj[days[k]].push(<td></td>)
       
      
    }
    
  
  }

 



  const getapii = (selectedque)=>{
    Axios.get("http://127.0.0.1:8000/managementapi").then((respo)=>{
      setTotal({})
       
    if(respo.data.inout[selectedque]){
      setTotal(respo.data.inout[selectedque] )
      
    }else{
      setTotal({"ingym":0,"outgym":0})
    }
    
    
      // set(respo.data.uid)
      
     
    })
  }
  

  


  const selectChange = (e)=>{
     
    // schedapi();
    setFetchedsched(false)
  
     
    // useEffect(() => {
    
    //   setQue(document.getElementsByTagName("select")[0].value);
    //   console.log(que,document.getElementsByTagName("select")[0].value)
  
    // }, [selectedOption]);

    const selectedValue = e.target.value;
    setSelectedOption(selectedValue, () => {
      setQue(selectedValue);
    });
    getapii(selectedValue);
    setQue(selectedValue);
   
    
  }
  
 
  

  return (
    <div>
         <div className='select'>
        <select  value={selectedOption} id="slctslct" onChange={selectChange}>
          {userhalls.map((userhall, index) => (
        <option key={index} value={userhall}>
          {userhall}
        </option>
      ))}
        </select>
        <br></br>
        <br></br>
        <h3>Status:  {total != 0 ? total.ingym + "/" : "no one"}{total != 0? total.outgym+total.ingym +"in Gym" : "yet"}</h3>
    </div>
    <div className='schedule'>
        <h3>Program of the week</h3>
     
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
