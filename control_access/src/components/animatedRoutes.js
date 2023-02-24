/* eslint-disable no-unused-vars */


import Home from './home.js';
import Management from './management.js';
import Statistics from './statistics.js';
import Login from './login.js';
import Register from './register.js';
import PrivateRoute from './privateRoute.js';


import UserDetail from './userDetail.js'
import AddUser from './addUser.js'
import {AnimatePresence} from 'framer-motion'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
    useLocation
} from 'react-router-dom';

function AnimatedRoutes() {
    const location = useLocation()
  return (
    <AnimatePresence>
 <Routes location={location} key={location.pathname}>  
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

    </AnimatePresence>
   
  )
}

export default AnimatedRoutes