import React from 'react'
import cssClass from './SideDrawer.module.css'
import NavLS from '../../NavigationItems/NavLoginSignIn/NavHeader'
import MenuBar from '../MenuBar/MenuBar'
import BackDrop from '../BackDrop/BackDrop'
import Aux from '../../../../hoc/Auxiliary'
const SideDrawer =(props)=>{

    let transitionCss=[cssClass.container,cssClass.Close]
    if(props.isClicked)
    {
        transitionCss=[cssClass.container,cssClass.Open]
    }
    return(
       <Aux>
            <BackDrop show={props.isClicked} clicked={props.button}/>
        <div className={transitionCss.join(" ")}>
            <div className={cssClass.content}>
            <MenuBar clicked={props.button}/>
            </div>
            <nav></nav>
            <NavLS/>   
        </div>
      </Aux>
    )
}

export default SideDrawer