//import { delay } from "redux-saga";
import { put, call,delay } from "redux-saga/effects";
/* import axios from "axios";
 */
import * as actions from "../action/Action";

import globalaxios from '../../axios'
export function* Reload(action) {

    
    const token=localStorage.getItem('token')
    const userId=localStorage.getItem('userId')
    const email=localStorage.getItem('Email')
    const FirstName=localStorage.getItem('FirstName')
    const LastName=localStorage.getItem('LastName')
    if(!token)
    {
        yield put(actions.logOut())
       
    }else
    {   
        try{
            let Auth='/user/Reload'

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+localStorage.getItem('token')
              }
        const response=yield globalaxios.get(Auth,{headers})
         //  console.log(response)
        yield localStorage.setItem('token', token);
        yield localStorage.setItem('userId', response.data.user._id);
        yield localStorage.setItem('Email',response.data.user.Email);
        yield localStorage.setItem('FirstName',response.data.user.FirstName)
        yield localStorage.setItem('LastName',response.data.user.LastName)
        yield put(actions.AuthSucces(token,response.data.user._id,response.data.user.Email,response.data.user.FirstName,response.data.user.LastName))
        }
        catch(e)
        {  
            yield put(actions.AuthError(e.response.data.error))
        } 
        /* yield put(actions.AuthSucces(token,userId,email,FirstName,LastName)) */
       // dispatch(TokenExpire((expirationDate.getTime()-new Date().getTime())/1000))
    }
  
}

export function* Login(action) {
    
    yield put(actions.AuthStart())  
        //login
        try
    {let Auth='/user/login'
    
      const AuthLog={
          Email:action.Email,
          password:action.password
      }
    const response=yield globalaxios.post(Auth,{...AuthLog})
    
    
       // console.log(response)
        yield localStorage.setItem('token', response.data.token);
        yield localStorage.setItem('userId', response.data.user._id);
        yield localStorage.setItem('Email',response.data.user.Email);
        yield localStorage.setItem('FirstName',response.data.user.FirstName)
        yield localStorage.setItem('LastName',response.data.user.LastName)
       // console.log(response.data.user._id,response.data.user.Email)
       
        yield put(actions.AuthSucces(response.data.token,response.data.user._id,response.data.user.Email,response.data.user.FirstName,response.data.user.LastName))
    }
    catch(e){
      console.log("Auth",e.response.data.error) 
    if(e)
        yield put(actions.AuthError(e.response.data.error))
    }
  
}

