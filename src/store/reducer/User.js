import * as actionTypes from '../action/actionType'
import { addToArray } from '../action/User';
const initialState={
    allusers:[],
    
    error:null,
    loading:false,
    shouldLoad:null,
    chatbox:[],
    chatLoad:false,
    chatboxloader:false
} 

const FetchStart = ( state, action ) => {
    return {
        ...state, 
        error: null, 
        loading: true 
     };
};
const pushFunction=(value,chat)=>{

    value.map(val=>{
        chat.push(val)
    })
    //chat.push(value)
    return [...chat]
}
 const FetchChatStart=(state,action)=>{
    return{
        ...state,
        chatbox:pushFunction(action.chat,state.chatbox),
        chatLoad:false
    }
} 

const FetchSuccess = (state, action) => {
    return  {...state, 
    
        allusers: action.allUsers,
        error: null,
        loading: false
    };
};


const FetchFail = (state, action) => {
    return {...state, 
        error: action.error,
        loading: false}
    ;
};
const FetchChatCleanUp=(state)=>{
    return {
        ...state,
        chatbox:[],
        chatLoad:true
    }
}
const LoadChat=(state)=>{
    return{
        ...state,
        chatLoad:true
    }
}
const UpdateChatBox=(state,action)=>{
    
    return{
        ...state,
        chatbox:appendTochatBox(action.chats,state.chatbox),
        chatboxloader:false
    }
}
const UpdateChatBoxStarted=(state)=>{
    return{
        ...state,
        chatboxloader:true
    }
}
const appendTochatBox=(message,chat)=>{
    
 /* message.map(res=>{
        
        chat.unshift(res)
    }) */ 
    return [...message,...chat]
}
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.Fetch_Start: return FetchStart(state, action);
        case actionTypes.Fetch_Succ: return FetchSuccess(state, action);
        case actionTypes.Fetch_Fail: return FetchFail(state, action);
        case actionTypes.FetchChat_Succes:return FetchChatStart(state,action);
        case actionTypes.chat_CleanUp:return FetchChatCleanUp(state);
        case actionTypes.ChatLoader:return LoadChat(state);
        case actionTypes.UpdateChatBox:return UpdateChatBox(state,action)
        case actionTypes.boxupdateStarted:return UpdateChatBoxStarted(state)
        default:
            return state;
    }
};

export default reducer