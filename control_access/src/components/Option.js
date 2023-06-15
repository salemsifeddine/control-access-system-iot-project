


import React,{useState } from 'react'
 
function Optioncomp( props) {

    


  
  return (
    <option key={Math.random} value={props.value}>{props.value}</option>
    
   

  )
}

export default Optioncomp