/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import imgg from '../static/images/body.jpg' 
import {motion} from 'framer-motion'

function Page1() {
  return (
   <motion.div 
   initial={{opacity:0}}
   animate={{opacity:1}}
   exit={{opacity:0, transition:{duration:0.1}}}
   >
     <div className='page1_1'>
        <div className='text'>
            <h2>GYM website</h2>
            <h3>Management system</h3>
            <h4>Build your body <br></br> transform your life</h4>

            <div className='input'>
                <input type="text" placeholder='enter your code for fast qr code access'/>
            </div>
        </div>
        
        <div className='images'>
                <div className='img image1'>
                    <img src={imgg} />
                </div>
                <div className='img image2'>
                    <img src={imgg} />
                </div>
        </div>
        
    </div>
    <div className='tape'>
    sport       sport       sport       sport       sport       sport       sport       sport       sport       sport       sport       sport       sport       sport       sport       sport
    </div>

    
   </motion.div>
  )
}

export default Page1