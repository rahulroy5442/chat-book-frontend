import React, { Component } from 'react'

import Input from '../../../component/UI/Input/Input'
import checkValidity from '../ValidityCheck'
import cssClass from './Signup.module.css'
import Button from '../../../component/UI/Button/Button'
import Aux from '../../../hoc/Auxiliary'
import {connect} from 'react-redux'
import  axios from '../../../axios'
import Notifier from '../../../hoc/backdrop/notifier'
import * as action from '../../../store/action/Action'

class SignUp extends Component
{

    state={
        FormDetail:{
        FirstName:{
            Name:'',
            typeOfField:"input",
            value:'',
            configureFile:{
                type:'text',
                placeholder:'First Name'
            },
            validation:
            {
                required:true,
                minLength:1
            },
            valid:false,
            touched:false,
            error:''
        },
        LastName:{
            Name:'',
            typeOfField:"input",
            value:'',
            configureFile:{
                type:'text',
                placeholder:'Last Name'
            },
            validation:
            {
                
            },
            valid:true,
            touched:false,
            error:''
        },
        Email:{
            Name:'',
            typeOfField:"input",
            value:'',
            configureFile:{
                type:'text',
                placeholder:'E-Mail address'
            },
            validation:
            {
                required:true,
                isEmail:true
            },
            valid:false,
            touched:false,
            error:''
        },
        password:{
            Name:'',
            typeOfField:"password",
            value:'',
            configureFile:{
                type:'password',
                placeholder:'Password'  
            },
            validation:
            {
                required:true,
                minLength:6},
            valid:false
            ,touched:false,
            error:''
        },
        ReTypePassword:{
            Name:'',
            typeOfField:"password",
            value:'',
            configureFile:{
                type:'password',
                placeholder:'Re Enter Passsword'  
            },
            validation:
            {
                required:true,
                minLength:6},
            valid:false
            ,touched:false,
            error:''
        },
        DateOfBirth:{
            Name:'Date of Birth',
            typeOfField:"Date",
            value:'',
            configureFile:{
                type:'date',
                placeholder:'yyyy-mm-dd'  
            },
            validation:
            {
                required:true,
            },
            valid:false
            ,touched:false,
            error:''
        }
        ,
        Gender:{
            Name:'Gender',
            typeOfField:"Radio",
            value:'',
            configureFile:{
                type:'radio',
                Wraper:{
                    total:3,
                    name:'gender',
                    display:["Male","Female","Other"],
                    value:['male','female','other']
                }
            },
           
            validation:
            {
                required:true,
            },
            valid:false
            ,touched:false,
            error:''
        }
        },
        isFormValid:false,
        loading:false,
        notification:null,
        error:null
    }

    componentWillMount(){
        console.log("USISI")
    }
    FormValidity=(Form)=>{

        let isValid=true
        for(let q in Form)
        {
            isValid=isValid && Form[q].valid
        }
        
        return isValid
    }
    inputChange=(event,id)=>{
        const Form={...this.state.FormDetail}    
        const Value=event.target.value
        
        Form[id].value=Value

        const [validation,Err]=checkValidity(Value,Form[id].validation,id)
    
        Form[id].valid=validation
        Form[id].touched=true
        Form[id].error=Err
        const FormValidity=this.FormValidity(Form)
        this.setState({FormDetail:Form,isFormValid:FormValidity,error:null})
    }
    SubmitForm=(Form)=>{
        return new Promise((resolve,error)=>{
            const FormValidity=this.FormValidity(Form)
            this.setState({FormDetail:Form,isFormValid:FormValidity})
            resolve(FormValidity)
        })
    }
    selectedDate=(event)=>{
         const Form={...this.state.FormDetail}
        let value=event.target.value
       
       
        const d = new Date(value)
        let month = d.getMonth() + 1
        let day = d.getDate()
        const year = d.getFullYear();
        
        if (month < 10) 
        {
            month = '0' + month;
        }
        if (day < 10) 
        {
            day = '0' + day;
        }
        value=[year, month, day].join('-').toString();
        
       
        Form['DateOfBirth'].value=value 
        const [validation,Err]=checkValidity(value,Form['DateOfBirth'].validation,'DateOfBirth')
        Form['DateOfBirth'].valid=validation
        Form['DateOfBirth'].touched=true
        Form['DateOfBirth'].error=Err
       
       
        const FormValidity=this.FormValidity(Form)  


      this.setState({FormDetail:Form,isFormValid:FormValidity,error:null})

    }




     Signupfunction=(UserForm)=>{
            this.setState({loading:true,error:null,notification:null})
            let Auth='/user'
        axios.post(Auth,UserForm).then(response=>{
        
        
            this.setState({notification:response.data.email,loading:false})
        }).catch(e=>{
            this.setState({error:e.response.data.error,loading:false})
            
        })
      
    }

    resetNotification=()=>{
        this.setState({notification:null})
    }



    Authenticate=async (event)=>{
        event.preventDefault()
        const Form={...this.state.FormDetail}
        
        for(let keys in Form)
        {
            const Value=Form[keys].value
            if(!Form[keys].valid)
            {
                const [validation,Err]=checkValidity(Value,Form[keys].validation,keys)
                Form[keys].valid=validation
                Form[keys].error=Err
                this.setState({FormDetail:Form,isFormValid:false})
            }
        }
                const i=Form["ReTypePassword"]
        
                if(Form["password"].value!==i.value)
                {
                    
                    Form["ReTypePassword"].error="*Password not matching"
                    Form["ReTypePassword"].valid=false
                    
                }

                
                await this.SubmitForm(Form).then(res=>{
                    if(res)
                    {
                        const form={...this.state.FormDetail}
                        const userForm={}
                        for(let key in form)
                        {
                            userForm[key]=form[key].value
                        }



                         
                        this.Signupfunction(userForm)

                        //this.props.SignUp(userForm)
                       
                        
                    }
                }).catch(res=>{
                    //Error Caught
                })

               
              //  this.props.SignUp()
        
    }
    render()
    {
        
  
        let InputField=[]

        let Field={...this.state.FormDetail}

        for(let q in Field)
        {
        InputField.push(
        <div style={{marginTop:"20px"}}>
            
            <div>
                <div style={{fontWeight:"bold",fontSize:"15px"}}>{Field[q].Name}</div>
                
                <div style={{color:"red",float:"right",fontSize:"12px"}}>{Field[q].error}</div>
            </div>
                <br/>
            <Input 
            key={q}
            typeOfField={Field[q].typeOfField} 
            value={Field[q].value} 
            istouched={Field[q].touched}
            isValid={Field[q].valid}
            validation={Field[q].validation}
            configureFile={Field[q].configureFile} changed={q=="DateOfBirth"?(event)=>{this.selectedDate(event)}:(event)=>{this.inputChange(event,q)}}/>
        </div>)
        
        }
        
        return(
            <Aux>
             <Notifier email={this.state.notification} shoulddrop={this.state.notification?true:false} resetFun={this.resetNotification}>
            <div className={cssClass.container}>
        <div style={{margin:"20px",width:"700px",height:"500px",borderRadius:"10px",backgroundColor:"white"}}>
          
        </div>
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',boxShadow:"5px 10px",margin:"20px",width:"450px",height:"100%",borderRadius:"10px",backgroundColor:"white"}}>
           <div style={{width:'400px',height:'700px'}}>
           {this.state.error?<div style={{fontSize:"12px",color:'red'}}>*{this.state.error}</div>: null}
            <form style={{margin:"16px"}} onSubmit={this.Authenticate}>
               {InputField}
             
               <Button btnType="Success" >Submit</Button>
             </form>
             </div>

            <button className={cssClass.Login} onClick={()=>{
                    this.props.history.replace('/login')
            }}>Login</button> 
        </div>
        </div>
        </Notifier>
            </Aux>
        )
    }
}
const dispatchFun=(dispatch)=>{
    return{
        SignUp:(UserForm)=>dispatch(action.Signup(UserForm))
    }
}


export default connect(null,dispatchFun)(SignUp)