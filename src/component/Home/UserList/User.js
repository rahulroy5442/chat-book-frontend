import {React} from 'react'


import Aux from '../../../hoc/Auxiliary';
import cssClass from './User.module.css'
const User=(props)=>{
        
    
  
       const name=props.name
       const arr=name.split(' ')
       const FirstName=arr[0]
       const LastName=arr[arr.length-1]
       //First Name First Word
       const FNFW=FirstName[0].toUpperCase()
       //Last Name First Word
       const LNFW=LastName[0].toUpperCase()
       const statusCSS=[cssClass.status]
       if(props.status)
       {
        statusCSS.push(cssClass.statustrue)
       }


    return (<Aux>
        <div className={props.cssCl} onClick={props.clicked}>
            
            <div className={cssClass.ShortNameHolder} >
             
             <div style={{display:'inline-block'}}>{FNFW}</div>
             <div style={{display:'inline-block'}}>{LNFW}</div>
             <div className={statusCSS.join(' ')}></div>
            
            </div>
            
            
            <p>{props.name}</p>
            

            <div  style={{marginLeft:'10px',display:"flex",flexDirection:'column',justifyContent:"center"}}>
            {props.Unseen==0 || props.Unseen==undefined?null:<div className={cssClass.UnseenClasss}>{props.Unseen}</div>}
            </div>

            
        </div>
        </Aux>)
}
export default User