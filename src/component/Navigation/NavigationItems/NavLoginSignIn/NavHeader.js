import React from 'react'
import NavBar from './NavBar/NavBar'
import cssClass from './NavHeader.module.css'
const NavHeader=(props)=>{

    return(
        <ul className={cssClass.NavigationItems}>
           
            <NavBar link="/login">Login</NavBar>
            <NavBar link="/signup">SignUp</NavBar>
        
            </ul>
    )
}
export default NavHeader