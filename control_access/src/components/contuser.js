/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import {Link} from 'react-router-dom'

function ContUser(props) {
  return (
    
    <div className='listmanage' key={props.li}>
      <div className='leftlist'>
        <div className='imglist'><img src={props.imgs} /></div>
        <div className='usernamelist'>
          <h4>{props.api[props.il].first_name} {props.api[props.il].last_name}</h4>
          {props.ingym?<p className="ingym">in the gym</p>:<p className='outgym'>out of the gym</p>}
        </div>
      </div>
      <div className='rightlist'>
        <div className='seemore'><Link to='user/detail'>see more</Link></div>
        <div className='icon'><DeleteIcon/></div>
      </div>
    </div>

  )
}

export default ContUser