/* eslint-disable no-template-curly-in-string */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import {Link} from 'react-router-dom'

function ContUser(props) {
  const linkk = `/user/detail/${props.id}`
  return (
    
    <div className='listmanage' key={props.li}>
      <div className='leftlist'>
        <div className='imglist'><img src={props.image} /></div>
        <div className='usernamelist'>
          <h4>{props.api[props.il].fullname}</h4>
          {props.ingym?<p className="ingym">in the gym</p>:<p className='outgym'>out of the gym</p>}
        </div>
      </div>
      <div className='rightlist'>
        <div className='seemore'><Link to={linkk}>see more</Link></div>
        <div className='icon'><DeleteIcon onClick={()=>{
          
        }}/></div>
      </div>
    </div>

  )
}

export default ContUser