import React, { useEffect } from 'react'
import Header from './Header'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Camera from './Camera'

import Home from './Home.js'


import Heading from './Heading.js'



const Browse = () => {

  const user= useSelector(store=>store.app.user)

  const navigate= useNavigate();

  useEffect(()=>{

    if(!user){

      navigate("/browse");
      
    
    }

  },[]);

 
  return (
    <div>
      

      <Heading/>
      <Home/>

        {/* <Camera/> */}
    </div>
  )
}

export default Browse