import React, { Component } from 'react'

import Aux from '../../hoc/Auxiliary'
class Login extends Component
{
    componentWillMount(){
        console.log("sssssssss")
        if(this.props.location.pathname=='/')
        {
            this.props.history.replace('/login')
        }
    }
   componentWillUnmount(){
       console.log("unmount")
   }
    render()
    {
        
   
 
    return (
        <Aux>
              <div id="wrapper">
            <img src="https://i.imgur.com/qIufhof.png" />
            <div id="info">
                <h3>This page could not be found</h3>
            </div>
        </div >
        </Aux>
      
    )
    }
}


export default Login