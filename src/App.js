import './App.css';

import React, {useState} from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default function App(){
  
  const apiKey = process.env.REACT_APP_API_KEY
  
  const [progress, setprogress] = useState(0);

    return (
      <Router>
      <div>
      <LoadingBar
        color='#f11946'
        progress={progress}
      />
        <NavBar/>
        
            <Routes>
              <Route exact path = "/" element = {<News setProgress = {setprogress} apiKey = {apiKey}   key="general" pageSize = {5} country = "in" category = "general"/>}/>
              <Route exact path = "/business" element = {<News setProgress = {setprogress} apiKey = {apiKey}   key="business" pageSize = {5} country = "in" category = "business"/>}/>
              <Route exact path = "/entertainment" element = {<News setProgress = {setprogress} apiKey = {apiKey}   key="entertainment" pageSize = {5} country = "in" category = "entertainment"/>}/>
              {/* <Route exact path = "/general" element = {<News setProgress = {setprogress} apiKey = {apiKey}   key="general" pageSize = {5} country = "in" category = "general"/>}/> */}
              <Route exact path = "/health" element = {<News setProgress = {setprogress} apiKey = {apiKey}   key="health" pageSize = {5} country = "in" category = "health"/>}/>
              <Route exact path = "/science" element = {<News setProgress = {setprogress} apiKey = {apiKey}   key="science" pageSize = {5} country = "in" category = "science"/>}/>
              <Route exact path = "/sports" element = {<News setProgress = {setprogress} apiKey = {apiKey}   key="sports" pageSize = {5} country = "in" category = "sports"/>}/>
              <Route exact path = "/technology" element = {<News setProgress = {setprogress} apiKey = {apiKey}   key="technology" pageSize = {5} country = "in" category = "technology"/>}/>  
            </Routes>                      
        
      </div>
      </Router>
    )
  
}



