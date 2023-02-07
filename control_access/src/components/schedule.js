/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import img1 from '../static/images/Screenshot.png' 


function Schedule() {
  return (
    <div>
        <div className='select'>
        <select>
            <option value="bodyforce">body force</option>
            <option value="bodyforce">body mma</option>
        </select>
    </div>
    <div className='schedule'>
        <h3>Program of the week</h3>
      <div className="imgschd">
      <img src={img1} />
        </div>
    </div>
    </div>
  )
}

export default Schedule