/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar.js';
import Home from './components/home.js';
import Management from './components/management.js';
import Statistics from './components/statistics.js';
import Login from './components/login.js';
import Register from './components/register.js';
import Footer from './components/footer.js';
import './static/css/navbar.css'
import './static/css/main.css'
import './static/css/footer.css'


import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';

function App() {
  return (

   
    <div className="App">
      
       <Router>
       <Navbar/>
    <Routes>  
      <Route  path='home' element={< Home />}></Route>
      <Route  path='management' element={< Management />}></Route>
      <Route  path='statistics' element={< Statistics />}></Route>
      <Route  path='login' element={< Login />}></Route>
      <Route  path='register' element={< Register />}></Route>
    </Routes>
     
    
      </Router>

    </div>
   
  );
}

export default App;
