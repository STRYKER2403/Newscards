import React from 'react'
import loading from './loading.gif'


function Spinner(){
  
    return (
      <div className = "text-center container-fluid min-vh-100">
        <img className='my-3' src={loading} alt='loading'/>
      </div>
    )
  }

export default Spinner
