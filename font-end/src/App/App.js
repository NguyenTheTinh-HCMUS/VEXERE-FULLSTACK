import React from 'react'
import './App.css'

import { BrowserRouter , Switch } from 'react-router-dom';
import HomeTemplate from '../templates/home.template'
import {routeHome} from '../router'
const showMenuHome=route=>{
    if(route && route.length>0 ){
      return  route.map((item,index)=> <HomeTemplate
      key={index}
      path={item.path} 
      exact={item.exact} 
      Component={item.component} />)
    }
  }
export default function App() {

    return (
        <div>
             <BrowserRouter>
     <div className='App'>
      
      <Switch>
        {showMenuHome(routeHome)}
   
      </Switch>
     
    
   
    
     
    </div>
   
    </BrowserRouter>
         
           
          
         
        </div>
    )
}
