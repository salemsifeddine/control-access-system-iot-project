/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import imgg from '../static/images/body.jpg' 
import {motion} from 'framer-motion'
import axios from 'axios';

function Page1() {
    const [inputValue, setInputValue] = useState('');
    const sendDataToDjango = async () => {
        try {
          const url = `http://127.0.0.1:8000?name=${inputValue}`; // URL with parameters
    
          const response = await axios.get(url);
          console.log(response.data); // Handle the response data
        } catch (error) {
          console.error(error);
        }
      };
    
      const handleInputChange = (event) => {
        setInputValue(event.target.value);
      };

      
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
                <input type="text" value={inputValue} onChange={handleInputChange} placeholder='enter your code for fast qr code access'/>
                <button className='styledsendbtn' onClick={sendDataToDjango}>Send</button>
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