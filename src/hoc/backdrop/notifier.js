import React from "react"
import Aux from "../Auxiliary"
import cssClass from './notifier.module.css'
const notifier=(props)=>{
    let cssLoader=null
    cssLoader=props.shoulddrop?cssClass.loadDrop:null
    let resetFun=props.shoulddrop?props.resetFun:null

    console.log(cssClass.notificationBox)
    
    let notifierLoader=[cssClass.notificationBox,cssClass.Close]
    if(props.shoulddrop)
    {
        notifierLoader=[cssClass.notificationBox,cssClass.Open]
    }
    
    return(
        <div >
            
        <div className={cssLoader} onClick={resetFun}>

        

        </div>

        <div className={notifierLoader.join(' ')}>
                <div className={cssClass.textbox} > Notification has been sent to {props.email}.<br/>Please check your mail</div> 
            </div>
        

        {props.children}
        </div>
    )
}
export default notifier