import { takeEvery } from "redux-saga/effects";
import * as actionType from '../action/actionType'

import {Reload,Login} from './Auth'
import {Getuser,userChat,FetchChatArray} from './User'
export function* AuthSaga(){
    yield takeEvery(actionType.Reload,Reload)
    yield takeEvery(actionType.Login,Login)
}

export function* UserSaga(){
    yield takeEvery(actionType.GetUser,Getuser)
    yield takeEvery(actionType.FetchUserChat,userChat)
    yield takeEvery(actionType.FetchArray,FetchChatArray)
}