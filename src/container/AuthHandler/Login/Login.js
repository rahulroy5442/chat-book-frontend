import React, { Component } from 'react'

import Input from '../../../component/UI/Input/Input'
import checkValidity from '../ValidityCheck'
import cssClass from './Login.module.css'
import Button from '../../../component/UI/Button/Button'
import Aux from '../../../hoc/Auxiliary'
import {connect} from 'react-redux'
import * as action from '../../../store/action/Action'


class Login extends Component
{

    state={
        FormDetail:{
        Email:{
            typeOfField:"input",
            value:'',
            error:'',
            configureFile:{
                type:'text',
                placeholder:'Email'
            },
            validation:
            {
                require:true
                ,isEmail:true
            },
            valid:false,
            touched:false
        },
        Password:{
            typeOfField:"password",
            value:'',
            error:'',
            configureFile:{
                type:'password',
                placeholder:'Password'  
            },
            validation:
            {
                require:true,
                minLength:1},
            valid:false
            ,touched:false
        }
        },
        isFormValid:false,
        
    }
    FormValidity=(Form)=>{

        let isValid=true
    
        for(let q in Form)
        {
        
            isValid=isValid && Form[q].valid
        }
        
        return isValid
    }
    componentDidMount()
    {
        console.log()
    }
    inputChange=(event,id)=>{
        const Form={...this.state.FormDetail}    
        const Value=event.target.value
        
        Form[id].value=Value

        const [validation,error]=checkValidity(Value,Form[id].validation)
        Form[id].valid=validation
        Form[id].touched=true
        Form[id].error=error
        const FormValidity=this.FormValidity(Form)
        this.setState({FormDetail:Form,isFormValid:FormValidity})
    }
    /* LoginFirst=(userForm)=>{
        return new Promise((resolve,error)=>{
            try
            {
                this.props.login(userForm.Email.value,userForm.Password.value)

                resolve('Loing success')
            }
            catch(e){
                console.log('errorororor')
                error(e)
            }
        })
    } */
    Authenticate=async (event)=>{
        event.preventDefault()
        const userForm={...this.state.FormDetail}
        const mytoken=this.props.match.params.token
        if(mytoken!=undefined)
        {
            this.props.newlogin(userForm.Email.value,userForm.Password.value,mytoken)
        }
        else{
            this.props.login(userForm.Email.value,userForm.Password.value)
        }
      /*  alert(this.props.AuthError) */

     /* 
        this.LoginFirst(userForm).then(res=>{
            
        this.props.history.replace('/')
           
        }).catch(error=>{
            alert('error',error)
        }) */
       
        
     
        
    }
    render()
    {
        
     console.log(this.props.location)
        let InputField=[]

        let Field={...this.state.FormDetail}

        for(let q in Field)
        {
        InputField.push(<div style={{marginTop:"20px"}}><Input 
            key={q}
        typeOfField={Field[q].typeOfField} 
        
        value={Field[q].value}
        
        istouched={Field[q].touched}
        
        isValid={Field[q].valid}
        
        validation={Field[q].validation}

        configureFile={Field[q].configureFile} changed={(event)=>{this.inputChange(event,q)}}/></div>)
        
        }
        
            const ButtonStyle={
                border:"none",
                width:"200px",
                height:"40px",
                backgroundColor:"rgb(12, 190, 12)",
                fontWeight:"bold",
                color:"white",
                borderRadius:"8px",
                margin:"75px",
                cursor: "pointer"
            }

            // this.props.history.replace('/')

            const LoginElement=  <div>  {(this.props.isLogin && !this.props.AuthError)?this.props.history.replace('/'):<div></div>}
            <div className={cssClass.container}>
        <div style={{margin:"20px",width:"350px",height:"500px",borderRadius:"10px",backgroundColor:"white"}}>
          
        </div>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:"20px",width:"350px",height:"450px",borderRadius:"10px",backgroundColor:"white"}}>
         {this.props.Loading?<div style={{height:'100px',width:'100px'}}><div className={cssClass.ldsdualring}></div></div>:<div><form style={{margin:"16px"}} >
                {this.props.AuthError?<div style={{fontSize:"12px",color:'red'}}>*{this.props.AuthError}</div>: null}
               {InputField}
             
               <Button btnType="Success" disabled={!this.state.isFormValid} clicked={this.Authenticate}>Login</Button>
             </form>
             <a href={"/forgotpass"} className={cssClass.forgotPass}>Forgot password?</a>
         <button style={ButtonStyle} onClick={()=>{this.props.history.replace('/signup')}} >Create Account</button></div>}
        </div>
       
        </div>
        </div>
    
        return(
            <Aux>
              
            {LoginElement}
            </Aux>
        )
    }
}
const states=(statesManager)=>{
    return {
        AuthError:statesManager.Auth.error,
        isLogin:statesManager.Auth.isLogin,
        Loading:statesManager.Auth.Loading
    }
}
const dispatchFun=(dispatch)=>{
    return{
        login:(email,password)=>dispatch(action.Login(email,password)),
        newlogin:(email,password,token)=>dispatch(action.newlogin(email,password,token))
    }
}

export default connect(states,dispatchFun)(Login)