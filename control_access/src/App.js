/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar.js';
import Page1 from './components/page1.js';
import Schedule from './components/schedule.js';
import Schedule from './components/footer.js';
import './static/css/navbar.css'
import './static/css/page1.css'
import './static/css/main.css'

function App() {
  return (
    <div className="App">
     <Navbar/>
     <Page1/>
     <Schedule />
     <Footer />
    </div>
  );
}

export default App;
