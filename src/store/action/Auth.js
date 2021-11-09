import axios from "../../axios"
import * as action from './actionType'
export const AuthStart=()=>{
    return {
        type:action.Auth_Start
    }
}

export const statusSet=(status)=>{
    return{
        type:action.setStaus,
        status
    }
}
export const setStatus=(value)=>{
    console.log(value)
    return dispatch=>{
        const url='/user/status'
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('token')
          }

        axios.post(url,value,{
            headers
         }).then(res=>{
        
             dispatch(statusSet(value.status))
         }).catch(res=>{
             console.log(res)
         })
    }
}

export const AuthSucces=(token,UserId,Email,FirstName,LastName)=>{
    return{
        type:action.Auth_Succ,
        idToken:token,
        userId:UserId,
        email:Email,
        FirstName,
        LastName,
        error:null
    }
}
export const AuthError=(error)=>{
    return{
        type:action.Auth_Fail,
        error
    }
}
export const LoadAppFirst=()=>{
    return{
        type:action.LD_APP_BE_AUTH
    }
}
/* export const AuthSuccesNewLogin=()=>{
    return {
        type:action.newLogin,

        ,

    }
} */
export const newlogin=(Email,password,token)=>{
    return dispatch=>{
        axios.post('/users/verification/'+token,{Email,password}).then(response=>{
             localStorage.setItem('token', token);
             localStorage.setItem('userId', response.data._id);
             localStorage.setItem('Email',response.data.Email);
             localStorage.setItem('FirstName',response.data.FirstName)
             localStorage.setItem('LastName',response.data.LastName)

            dispatch(AuthSucces(token,response.data._id,Email,response.data.FirstName,response.data.LastName))
        }).catch(e=>{
            console.log(e.response.data.error)
            dispatch(AuthError(e.response.data.error))
        })
    }
}
export const logOut=()=>{
  
        localStorage.removeItem('token');   
        localStorage.removeItem('userId');
        localStorage.removeItem('Email');
        localStorage.removeItem('FirstName')
        localStorage.removeItem('LastName')
        return{
        type:action.AuthLogOut}
}

export const TokenExpire=(expirationTime)=>{
   
    return dispatch=>{
        setTimeout(() => {
            dispatch(logOut())
        }, expirationTime*1000);
    }
}
export const newSignIn=(email)=>{
    return {
        type:action.newSingUp,
        email
    }
}

export const  Signup=(UserForm)=>{
    
    return dispatch=>{
        dispatch(AuthStart())
      
    
        //login
        let Auth='/user'
    
    axios.post(Auth,UserForm).then(response=>{
        
    
        /* localStorage.setItem('token', response.body.token);
       
          localStorage.setItem('userId', response.body._Id);
          localStorage.setItem('Email',response.body.Email);
          localStorage.setItem('UserName',response.body.userName) */

        dispatch(newSignIn(response.data.email))

  
    }).catch(error=>{
        
        dispatch(AuthError(error))
    })
    
    }
  
}

export const  Login=(Email,password)=>{
    
    return {
      type:action.Login,
      Email,
      password

    
    }
  
}

export const LoginAFReload=()=>{

    return{
        type:action.Reload
    }
    
}