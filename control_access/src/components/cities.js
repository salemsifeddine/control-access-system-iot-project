import React from 'react'

function Cities(props) {

    
  return (
   
        
        <option key={props.id} value={props.city.id}>
          {props.city.name}
        </option>
      
        
  )
}

export default Cities