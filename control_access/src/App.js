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


import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate
} from 'react-router-dom';

function App() {
  const auth=false

  
  return (

   
    <div className="App">
      
       <Router>
        <Authprovider>
          <Navbar/>
          <Routes>  
            <Route element={<PrivateRoute />}>
              <Route  path='management' element={< Management />}></Route>
              <Route  path='statistics' element={< Statistics />}></Route>
              <Route  path='management/user/detail' element={< UserDetail />}></Route>
              <Route  path='management/user/add' element={< AddUser />}></Route>
            </Route>

            <Route  path='home' element={< Home />}></Route>
            <Route  path='login' element={< Login />}></Route>
            <Route  path='register' element={< Register />}></Route>
          </Routes>
     
        </Authprovider>
      </Router>

    </div>
   
  );
}

export default App;
