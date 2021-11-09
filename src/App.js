import logo from './logo.svg';
import './App.css';

import { Component } from 'react';
import Aux from './hoc/Auxiliary';
import {Switch,Route,Redirect} from 'react-router-dom'
import Login from './container/AuthHandler/Login/Login';
import Layout from './hoc/Layout/Layout'
import Home from './container/Home/Home'
import Errorpage from './container/Error/Error'
import Signup from './container/AuthHandler/Signup/Signup';
import {connect} from 'react-redux'
import * as action from './store/action/Action'

class App extends Component{
 
  state={
    loading:true
  }
  
  
  componentWillMount(){
   
    this.props.Renew()
  }

  render()
  {
    
    let Routes=<Switch>
  
    <Route path="/login" exact component={Login}/>
    <Route path='/signup' exact component={Signup}/>
    <Route path='/login/verify/:token'exact component={Login}/>
     <Route path="/" component={Errorpage}/>  
  </Switch>
 
  if(this.props.Auth)
  {
   
    Routes=<Switch>
    
    <Route path='/' exact component={Home}/>
    <Route path='/login'  component={Login}/> 
     <Route path='/:id'  component={Home}/> 
    </Switch>
  }

    return(
      <Layout>
    
        <Aux>
         
            {this.props.Initialloading?null:Routes}
      
        
        </Aux>
        </Layout>
    )
  }
}

const states=(state)=>{
  return {
    Auth:state.Auth.token,
    Initialloading:state.Auth.Initialloading
  }
}
const dispatchs=(dispatch)=>{
  return{
    Renew:()=>dispatch(action.LoginAFReload())
  }
}
export default connect(states,dispatchs)(App);
