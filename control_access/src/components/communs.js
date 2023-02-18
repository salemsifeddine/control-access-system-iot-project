import React from 'react'

function Communs(props) {

    
  return (
   
        
        <option key={props.id} value={props.commun}>
          {props.commun}
        </option>
      
        
  )
}

export default Communs