import React, { Component } from 'react'
import Toolbar from '../../component/Navigation/ToolBar/ToolBar'
import Aux from '../Auxiliary'
import cssClass from './Layout.module.css'
import Footer from '../../component/Navigation/Footer/Footer'
import {connect} from 'react-redux'
class AuthHadler extends Component
{
    render()
    {
        return(
           
          <Aux>
          <div className={cssClass.controler}>
          
          
          <div className={cssClass.container}>
                {this.props.children}
          </div>

          {this.props.Auth?null:<Footer/>}
          </div>
          </Aux>
          
        )
    }
}
const states=(state)=>{
  return {
    Auth:state.Auth.token
  }
}
export default connect(states,null)(AuthHadler)