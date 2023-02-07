import React from 'react'
import arnold1 from '../static/images/arnold1.png'
import arnold2 from '../static/images/arnold2.png'
function Footer() {
  return (
    <div className='footer'>
        <div className="contactus">
        <div className="left-contactus images-contactus">
            <div className='imgimg'>
                <img src={arnold1}/>
            </div>
            <div className='imgimg'>
                <img src={arnold1}/>
            </div>
        </div>
        <div className="right-contactus">
            <h3>Contact us</h3>
            <textarea></textarea>
            <button className="submitcontact" type='submit'>Send</button>
        </div>
        </div>
        <div className="bluredtxt">
            <h2 className="bluredh1">Gym website</h2>
            <h2 className="bluredh2">Gym website</h2>
        </div>
       
    </div>
  )
}

export default Footer