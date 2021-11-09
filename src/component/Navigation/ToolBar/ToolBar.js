import React, { useState,useEffect } from 'react'
import NavHome from '../NavigationItems/NavHome/NavHeader'
import NavLS from '../NavigationItems/NavLoginSignIn/NavHeader'
import cssClass from './ToolBar.module.css'
import MenuBar from './MenuBar/MenuBar'
import SideDrawer from './SideDrawer/SideDrawer'
import Aux from '../../../hoc/Auxiliary'
const Toolbar=()=>{
const [checkStatus,setStatus]=useState(false)

    const SideDrawerFunction=()=>{
    
        setStatus(!checkStatus)
    }
    console.log(checkStatus)
    return(
      
        <Aux>
            <div className={cssClass.container1}>
        <div className={cssClass.container}>
            <MenuBar clicked={SideDrawerFunction.bind(this)}/>

        <div style={{width:"100%",height:"100%"}}>  
        
        <NavHome/>
        </div>
        </div>

        <div className={cssClass.disableBar}>
         <NavLS/>
      
        </div>

        </div>
      

     

        <SideDrawer isClicked={checkStatus} button={SideDrawerFunction.bind(this)}/>
        </Aux>
    )
}

export default Toolbar