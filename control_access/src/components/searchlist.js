/* eslint-disable no-template-curly-in-string */
/* eslint-disable jsx-a11y/alt-text */
import React,{useState } from 'react'
 
import {Link} from 'react-router-dom'
import axios from 'axios'
function SearchList( props) {

    const linkk = `/user/detail/${props.datalist.id}`



  
  return (
    <div style={{"width":97+"%","padding":4+"px", "background":"#2d2a2a", "z-index":999}}>
  
      <div className='listmanage' key={props.datalist.id}  style={{"margin-top":7+"px","height":10+"vh ", "width":98+"%"}}>
      <div className='leftlist'>
      
        <div className='imglist' style={{"width":50+"px","height":50+"px "}}><img src={"http://127.0.0.1:8000/media/"+ props.datalist.athlete_info.image }  /></div>
        <div className='usernamelist'>
          <h4>{props.datalist.fullname}</h4>
          
        </div>
      </div>
      <div className='rightlist'>
         <div className='seemore' style={{"lineHeight":10+"vh"}}><Link to={linkk}>see more</Link></div>
      
      </div>
    </div>
    
    </div>
    
   

  )
}

export default SearchList