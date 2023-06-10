/* eslint-disable no-template-curly-in-string */
/* eslint-disable jsx-a11y/alt-text */
import React,{useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import {Link} from 'react-router-dom'
import axios from 'axios'
function ContUser(props) {

  
  const sendDataToDjango1 = async (valll) => {
      try {
        const url = `http://127.0.0.1:8000?fullnamedelete=${String(valll)}`; // URL with parameters
  
        const response = await axios.get(url);
        console.log(response.data); // Handle the response data
      } catch (error) {
        console.error(error);
      }
    };
  
     



  const linkk = `/user/detail/${props.id}`
  const [showDiv, setShowDiv] = useState(true);

  const handleDelete = (e) => {

    const vall=document.getElementsByClassName("icon")[0].parentElement.parentElement.children[0].children[1].children[0].textContent;
    setShowDiv(false);
    
 
   
    
    sendDataToDjango1(vall);
  };
  
  return (
    <div>
    {showDiv && (
      <div className='listmanage' key={props.li}  style={{"margin-top":7+"px"}}>
      <div className='leftlist'>
        <div className='imglist'><img src={"http://127.0.0.1:8000/media/"+props.api[props.il]["athlete_info"].image} /></div>
        <div className='usernamelist'>
          <h4>{props.api[props.il].fullname}</h4>
          {props.ingym?<p className="ingym">in the gym</p>:<p className='outgym'>out of the gym</p>}
          {props.api[props.il].accessed?<p className='outgym'>accessed:{props.api[props.il].accessed}/{props.api[props.il].limitation}</p>:""}
          {props.api[props.il].last_access?<p className='outgym'>Last access:{props.api[props.il].last_access} </p>:""}
        </div>
      </div>
      <div className='rightlist'>
        <div className='seemore'><Link to={linkk}>see more</Link></div>
        <div className='icon' onClick={handleDelete} ><DeleteIcon /></div>
      </div>
    </div>
    )} 
    </div>
    
   

  )
}

export default ContUser