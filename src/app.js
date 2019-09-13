import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import './index.scss'
import './index.less'
import logo from './a.jpg';
const App = () => {
  return ( <div>
      <p > React here! </p> 
      < img src = {logo}/>
      <div className='image'></div>

    </div>
  )
}

export default App;

ReactDOM.render( <App /> , document.getElementById("app"));