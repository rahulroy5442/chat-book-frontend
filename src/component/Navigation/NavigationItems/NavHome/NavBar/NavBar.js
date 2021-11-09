import React from 'react'
import {NavLink} from 'react-router-dom'
import cssClass from './NavBar.module.css'
const NavBar=(props)=>{

    return(
        <li className={cssClass.NavigationItem}>
           <NavLink to={props.link}
           exact activeClassName={cssClass.active}>{props.children}</NavLink> 
        </li>
    )
}

export default NavBar