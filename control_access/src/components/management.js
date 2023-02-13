/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import '../static/css/management.css'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import imgs from '../static/images/body.jpg' 
import Chart from 'chart.js/auto';




const data = {
  labels: [
    'Red',
    'Blue',
    'Yellow'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
};

const config = {
  type: 'pie',
  data: data,
};


const chart = new Chart(ctx,config)
function Management() {
  return (
    <div className='managecont'>
      <div className="leftmanag">
        <div className='chartmanage'>
        <canvas id="myChart"></canvas>
        </div>
        <div className='adduser'>
          <div className='addusertogym'>
              <PersonAddIcon/>
          </div>
          <div className='morestatic'>
              <StackedLineChartIcon/>
          </div>
        </div>
      </div>
      <div className="rightmanag">
        <div className='listsmanage'>

          <div className='listmanage'>
            <div className='leftlist'>
              <div className='imglist'><img src={imgs} /></div>
              <div className='usernamelist'>
                <h4>salem sif eddine</h4>
                <p>in the gym</p>
              </div>
            </div>
            <div className='rightlist'>
              <div className='seemore'>see more</div>
              <div className='icon'><DeleteIcon/></div>
            </div>
          </div>
          <div className='listmanage'>
            <div className='leftlist'>
              <div className='imglist'><img src={imgs} /></div>
              <div className='usernamelist'>
                <h4>salem sif eddine</h4>
                <p>in the gym</p>
              </div>
            </div>
            <div className='rightlist'>
              <div className='seemore'>see more</div>
              <div className='icon'><DeleteIcon/></div>
            </div>
          </div>
          <div className='listmanage'>
            <div className='leftlist'>
              <div className='imglist'><img src={imgs} /></div>
              <div className='usernamelist'>
                <h4>salem sif eddine</h4>
                <p>in the gym</p>
              </div>
            </div>
            <div className='rightlist'>
              <div className='seemore'>see more</div>
              <div className='icon'><DeleteIcon/></div>
            </div>
          </div>
          <div className='listmanage'>
            <div className='leftlist'>
              <div className='imglist'><img src={imgs} /></div>
              <div className='usernamelist'>
                <h4>salem sif eddine</h4>
                <p>in the gym</p>
              </div>
            </div>
            <div className='rightlist'>
              <div className='seemore'>see more</div>
              <div className='icon'><DeleteIcon/></div>
            </div>
          </div>
          <div className='listmanage'>
            <div className='leftlist'>
              <div className='imglist'><img src={imgs} /></div>
              <div className='usernamelist'>
                <h4>salem sif eddine</h4>
                <p>in the gym</p>
              </div>
            </div>
            <div className='rightlist'>
              <div className='seemore'>see more</div>
              <div className='icon'><DeleteIcon/></div>
            </div>
          </div>
          <div className='listmanage'>
            <div className='leftlist'>
              <div className='imglist'><img src={imgs} /></div>
              <div className='usernamelist'>
                <h4>salem sif eddine</h4>
                <p>in the gym</p>
              </div>
            </div>
            <div className='rightlist'>
              <div className='seemore'>see more</div>
              <div className='icon'><DeleteIcon/></div>
            </div>
          </div>
          <div className='listmanage'>
            <div className='leftlist'>
              <div className='imglist'><img src={imgs} /></div>
              <div className='usernamelist'>
                <h4>salem sif eddine</h4>
                <p>in the gym</p>
              </div>
            </div>
            <div className='rightlist'>
              <div className='seemore'>see more</div>
              <div className='icon'><DeleteIcon/></div>
            </div>
          </div>
          <div className='listmanage'>
            <div className='leftlist'>
              <div className='imglist'><img src={imgs} /></div>
              <div className='usernamelist'>
                <h4>salem sif eddine</h4>
                <p>in the gym</p>
              </div>
            </div>
            <div className='rightlist'>
              <div className='seemore'>see more</div>
              <div className='icon'><DeleteIcon/></div>
            </div>
          </div>
          <div className='listmanage'>
            <div className='leftlist'>
              <div className='imglist'><img src={imgs} /></div>
              <div className='usernamelist'>
                <h4>salem sif eddine</h4>
                <p>in the gym</p>
              </div>
            </div>
            <div className='rightlist'>
              <div className='seemore'>see more</div>
              <div className='icon'><DeleteIcon/></div>
            </div>
          </div>
          <div className='listmanage'>
            <div className='leftlist'>
              <div className='imglist'><img src={imgs} /></div>
              <div className='usernamelist'>
                <h4>salem sif eddine</h4>
                <p>in the gym</p>
              </div>
            </div>
            <div className='rightlist'>
              <div className='seemore'>see more</div>
              <div className='icon'><DeleteIcon/></div>
            </div>
          </div>
          <div className='listmanage'>
            <div className='leftlist'>
              <div className='imglist'><img src={imgs} /></div>
              <div className='usernamelist'>
                <h4>salem sif eddine</h4>
                <p>in the gym</p>
              </div>
            </div>
            <div className='rightlist'>
              <div className='seemore'>see more</div>
              <div className='icon'><DeleteIcon/></div>
            </div>
          </div>
          


        </div>
      </div>
    </div>
  )
}

export default Management