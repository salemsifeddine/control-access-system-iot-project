/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar.js';
import Home from './components/home.js';
import Management from './components/management.js';
import Statistics from './components/statistics.js';
import Login from './components/login.js';
import Register from './components/register.js';
import PrivateRoute from './components/privateRoute.js';
import {Authprovider} from './components/authcontext.js'
import Footer from './components/footer.js';
import './static/css/navbar.css'
import './static/css/main.css'
import './static/css/footer.css'
import UserDetail from './components/userDetail.js'
import AddUser from './components/addUser.js'
import AnimatedRoutes from './components/animatedRoutes';


import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
    useLocation
} from 'react-router-dom';

function App() {
  const auth=false

  

  
  return (

   
    <div className="App">
      
       <Router>
        <Authprovider>
          <Navbar/>
         
     <AnimatedRoutes  />
        </Authprovider>
      </Router>

    </div>
   
  );
}

export default App;
