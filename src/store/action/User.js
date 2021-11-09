import axios from "../../axios"
import * as action from './actionType'
export const FetchStart=()=>{
    return {
        type:action.Fetch_Start
    }
}
export const FetchSuccess=(Users)=>{
    
    return{
        type:action.Fetch_Succ,
        allUsers:Users
    }
}

export const ErrorLoadUser=(error)=>{
    return{
        type:action.Fetch_Fail,
        error
    }
}
export const FetchChatSucces=(chat)=>{
    return{
        type:action.FetchChat_Succes,
        chat

    }
}
export const FetchChatArray=(id,callback)=>{
    return{
        type:action.FetchArray,
        id,
        callback
    }

}
export const FetchChatFail=(error)=>{
    return{
        type:action.FetchChat_Fail,
        error

    }
}

export const UpdateChatBox=(chats)=>{
    //console.log(chats)
    return{
        type:action.UpdateChatBox,
        chats
    }
}
export const Updatingboxstarted=()=>{
    return{
        type:action.boxupdateStarted
    }
}

export const FetchChatOnly=(id,pagefrom,pageto,limit)=>{
    return dispatch=>{
       
        const params={
            limit,
            pagefrom,
            pageto
        }
   
        const url='/user/Onlyfindchat/'+id
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('token')
          }
          dispatch(Updatingboxstarted()) 
           
        axios.get(url, {
             headers,
             params
          }).then(res=>{


                 dispatch(UpdateChatBox([...res.data.chatMessages].reverse())) 

            
          }).catch(err=>{
         
                    
        })
            
    }
}
export const pushchatToDB=(userId,Nmessage)=>{
    return dispatch=>{
       
        const url='/user/store/'+userId
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('token')
          }
        axios.post(url,Nmessage, {
             headers
          }).then(res=>{
            
            if(Nmessage.messages["Sender"]!==undefined)
            {
                dispatch(FetchChatSucces([{Sender:res.data.chatMessages.Sender}]))
            }
            else{
                dispatch(FetchChatSucces([{Recieve:res.data.chatMessages.Recieve}]))
            }

        }).catch(err=>{
          
            dispatch(FetchChatFail(err))
        })
    }
} 
export const ChatCleanUp=()=>{
    return{
        type:action.chat_CleanUp
    }
}
export const FetchStartChat=()=>{
    return{
        type:action.ChatLoader
    }
}
export const userChat=(UserId,Fetchchat,seenNotifier)=>{

    return {
        type:action.FetchUserChat,
        UserId,
        Fetchchat,
        seenNotifier
    }
    
}
export const  getUser=()=>{
    
    return {
        type:action.GetUser
    }
  
}



