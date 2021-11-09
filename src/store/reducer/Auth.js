import * as actionTypes from '../action/actionType'
const initialState={
    token:null,
    FirstName:'',
    LastName:'',
    userId:null,
    email:null,
    error:null,
    Initialloading:true,
    status:false,
    Loading:false,
    isLogin:false
} 

const SetStatus=(state,action)=>{
    return{
        ...state,
        status:action.status
    }
}

const authStart = ( state, action ) => {
    return {
        ...state, 
        error: null,
        Loading:true,
        isLogin:false
     };
};

const authSuccess = (state, action) => {
    return  {...state, 
        token: action.idToken,
        userId: action.userId,
        email:action.email,
        FirstName:action.FirstName,
        LastName:action.LastName,
        error: null,
        Initialloading: false,
        isLogin:true,
        Loading:false
    };
};

const Path_RE=(state,action)=>{
    return{
        ...state,
        Redirect:action.path
    }
}

const authFail = (state, action) => {
    return {...state, 
        error: action.error,
        isLogin:false,
        Initialloading: false,
        Loading:false,
        token: null, 
        userId: null ,
        FirstName:'',
        LastName:'',
        email:null,
        status:false
    }
    ;
};
//**have to use in redux saga */
const authLogout = (state) => {

    return {...state, token: null, userId: null ,FirstName:'',LastName:'',email:null,Initialloading:false,error:null,isLogin:false,Loading:false,status:false};
};
const LoadAppFirst=(state)=>{
    return {...state,shouldLoad:true}
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.Auth_Start: return authStart(state, action);
        case actionTypes.Auth_Succ: return authSuccess(state, action);
        case actionTypes.Auth_Fail: return authFail(state, action);
        case actionTypes.AuthLogOut: return authLogout(state);
        case actionTypes.SET_PATH:return Path_RE(state,action);
      /*   case actionTypes.LD_APP_BE_AUTH:return LoadAppFirst(state); */
        case actionTypes.setStaus:return SetStatus(state,action);
       
        default:
            return state;
    }
};

export default reducer