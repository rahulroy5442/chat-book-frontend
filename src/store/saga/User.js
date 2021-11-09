import { put, call,delay } from "redux-saga/effects";
/* import axios from "axios"; */
import * as actions from '../action/Action' 
import axios from "../../axios";
export function* Getuser(action){
    yield put(actions.FetchStart())
      
    

        let Auth='/user/getall'
        
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('token')
          }
        try
        { 
        const response= yield axios.get(Auth,{headers})
    
     
    
        
        yield put(actions.FetchSuccess(response.data.UpdatedUsers)) 
        }
    catch(error)
    {
    
        yield put(actions.AuthError(error))
    }


}

export function* userChat(action){
   
    
    const params={
        limit:action.UserId.limit,
        pagefrom:action.UserId.pagefrom,
        pageto:action.UserId.pageto
    }
    
    const url='/user/findchat/'+action.UserId.room
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('token')
      }
      try
    {
       
        const res=yield axios.get(url, {
         headers,
         params
      })
     
            if(action.Fetchchat)
            {
                yield put(actions.ChatCleanUp())
                yield put(actions.FetchChatSucces([...res.data.chatMessages].reverse())) 

            }

            if(!action.Fetchchat)
            {
                action.seenNotifier()
            }
            yield put(actions.getUser())
    }
    catch(err){
     
        yield put(actions.FetchChatFail(err))
    }
}

export function* FetchChatArray(action)
{
    const url='/user/setStatus/'+action.id
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('token')
      }

      try
    {
       
        yield axios.get(url, {
         headers
      })
     
          

            
        action.callback()
            
    }
    catch(err){
     
        yield put(actions.FetchChatFail(err))
    }
}

/* export function* FetchChatArray(action)
{
    const url='/user/findchat/'+action.id
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('token')
      }

      try
    {
       
        yield axios.get(url, {
         headers
      })
     
          

            
        action.callback()
            
    }
    catch(err){
     
        yield put(actions.FetchChatFail(err))
    }
} */