import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import AuthHandler from './store/reducer/Auth';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { AuthSaga,UserSaga } from './store/saga';
import User from './store/reducer/User'
const composeEnhancers =process.env.NODE_ENV==='development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:null || compose;

const rootReducer=combineReducers({
  Auth:AuthHandler,
  User:User
})
const SagaMiddleWare=createSagaMiddleware()
const store=createStore(rootReducer,composeEnhancers(
  applyMiddleware(thunk,SagaMiddleWare)
))
SagaMiddleWare.run(AuthSaga)
SagaMiddleWare.run(UserSaga)
ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
