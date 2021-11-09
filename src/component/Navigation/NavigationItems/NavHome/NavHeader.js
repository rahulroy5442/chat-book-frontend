import React from 'react'
import NavBar from './NavBar/NavBar'
import cssClass from './NavHeader.module.css'
const NavHeader=(props)=>{

    return(
        <ul className={cssClass.NavigationItems}>
            <NavBar link="/">Home</NavBar>
            <NavBar link="/careSupport">Support</NavBar>
            <NavBar link="/aboutUs">About Us</NavBar>
            <NavBar link="/service">Service</NavBar>
            </ul>
    )
}
export default NavHeader