import React, { Component } from 'react'
import HomeComponent from '../../component/Home/Home'


import {connect} from 'react-redux'
import cssClass from './Home.module.css'
import socketClient  from "socket.io-client";
import Aux from '../../hoc/Auxiliary'
import * as action from '../../store/action/Action'
import axios from '../../axios'
import withErrorHandler from '../../hoc/ErrorHandler/ErrorHandlerWrapper'


class Home extends Component
{
    
    constructor()
    {
        super()
        this.ItemListToOperate=React.createRef()
        this.alternater=React.createRef(false)
        this.arrowButtom=React.createRef()
    }
    state={
        socket:null,
        status:false
    }
    
    componentDidMount()
    {
       

        
            this.setState({socket:socketClient(process.env.REACT_APP_DOMAIN,{
            auth: {
              token: localStorage.getItem('token')
            },transports: ["websocket"],upgrade: false
    
          })
          
          ,status:true})

          this.props.setStatu({status:true})
    }
    ResetStatus=()=>{
        this.setState({status:false})
    }
    Logout=()=>{
        
        this.state.socket.disconnect()
        this.setState({socket:null})
        this.ResetStatus()
        this.props.Logout()

    }
    MenuList=(option)=>{
        
        switch(option)
        {
            case 1: 
                break;
            case 2:
                break;
            case 3:this.Logout()
                break;
            default:return
        }
        this.OpenTheBox(true)
    }
    OpenTheBox=(a)=>{
        if(!a)
        {
            this.ItemListToOperate.current.className=cssClass.displaNone
            this.arrowButtom.current.className=cssClass.ArrowbuttomUp
            this.alternater.current=false
            return
        }
        if(!this.alternater.current)
            {
                this.ItemListToOperate.current.className=cssClass.selectBox
                this.arrowButtom.current.className=cssClass.ArrowbuttomDown
                console.log(this.ItemListToOperate)
                this.alternater.current=true
            }
            else
            {
                this.arrowButtom.current.className=cssClass.ArrowbuttomUp
                this.ItemListToOperate.current.className=cssClass.displaNone
                this.alternater.current=false
            }
        
    }
   
    render()
    {
       
        return(
            <Aux>
                
           <div className={cssClass.userNameContainer}>
               <div  className={cssClass.userName} >
                 <div className={cssClass.icon}>{this.props.FirstName[0]}{this.props.LastName[0]}</div>
                 
                  <div style={{display:"flex",flexDirection:'column',justifyContent:'center',paddingLeft:'10px'}}>{this.props.FirstName+' '+this.props.LastName}</div>
                  
               </div>


               <div className={cssClass.parentSelectBox}>
                   <div ref={this.arrowButtom} onClick={()=>this.OpenTheBox(true)} className={cssClass.ArrowbuttomUp}/>

                   <div  ref={this.ItemListToOperate} className={cssClass.displaNone}>
                        <div  onClick={()=>this.MenuList(1)} className={cssClass.element}>Account</div>
                        <div  onClick={()=>this.MenuList(2)} className={cssClass.element}>Setting</div>
                        <div  onClick={()=>this.MenuList(3)} className={cssClass.element}>Logout</div>
                    </div>

               </div>

              
                </div>
               

            
            
           <div onClick={()=>this.OpenTheBox(false)} style={{display:'flex',justifyContent:'right',marginRight:'15px'}}>
               <div style={{marginTop:'15px'}}>
                   
            {(this.state.socket && this.props.status)?<HomeComponent itself={this.props.FirstName+' '+this.props.LastName} ResetStatus={this.ResetStatus} myStatus={this.state.status} socket={this.state.socket} User={this.props.userId} pushInDB={(userId,Message)=>this.props.chatDb(userId,Message)}/>:null}
            
            
            </div>
            </div>
        
                    </Aux>
        )
    }
}

const states=(state)=>{
   return{
       FirstName:state.Auth.FirstName,
       LastName:state.Auth.LastName,
       userId:state.Auth.userId,
       status:state.Auth.status
    }
}
const dispatcher=(dispatch)=>{
    return{
        setStatu:(value)=>dispatch(action.setStatus(value)),
        chatDb:(userid,Message)=>dispatch(action.pushchatToDB(userid,Message)),
        Logout:()=>dispatch(action.logOut())
    }
}
export default connect(states,dispatcher)(withErrorHandler(Home,axios))