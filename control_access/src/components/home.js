import React from 'react'
import Schedule from './schedule.js';
import '../static/css/page1.css'
import Page1 from './page1.js';
import Navbar from './navbar.js';
import Footer from './footer.js';

function Home() {
  return (
    <div>
        
        <Page1/>
        <Schedule/>
        <Footer/>
    </div>
  )
}

export default Home