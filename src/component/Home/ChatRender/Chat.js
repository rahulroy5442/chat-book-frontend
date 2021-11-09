import React, { useRef } from "react";
import Aux from "../../../hoc/Auxiliary";
import cssClass from './Chat.module.css'
import seen from '../../../Asset/seen.png'
import deliverd from '../../../Asset/delivered.png'
const Chat=(props)=>{
    
    
    
    const actionList=useRef([])
    actionList.current=[]

    const actionListR=useRef([])
    actionListR.current=[]

    const chat=[]
    let preViousholder=-1;
    let preViousholderR=-1
    const chatLength=props.chatMessage.length-1
    const lengthChat= props.UnseenMessage==0?chatLength+1:props.chatMessage.length-props.UnseenMessage+1
    let DonotRun=false
    if(props.UnseenMessage==0)
    {
        DonotRun=true
    }
    const tConvert =(time)=> {
        // Check correct time format and split into components
        time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
      
        if (time.length > 1) { // If time format correct
          time = time.slice (1);  // Remove full string match value
          time[5] = +time[0] < 12 ? ':AM' : ':PM'; // Set AM/PM
          time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join (''); // return adjusted time or original string
      }


  
      
    const displayList=(currentSelection)=>{
     
     closeOpenactionR()

     if(preViousholder!=-1)
     {
    
        actionList.current[preViousholder].className=cssClass.ListOfactionNone
        if(preViousholder==currentSelection)
        {
            preViousholder=-1
            return
        }
     }
     actionList.current[currentSelection].className=cssClass.ListOfaction
        //currentSelection.className=cssClass.ListOfaction
        preViousholder=currentSelection
    }

    const displayListR=(currentSelection)=>{
        
        closeOpenaction()

        const cssholder=[cssClass.ListOfaction]
        cssholder.push(cssClass.adjustListofaction)
        if(preViousholderR!=-1)
        {
            
           actionListR.current[preViousholderR].className=cssClass.ListOfactionNone
           if(preViousholderR==currentSelection)
           {
               preViousholderR=-1
               return
           }
        }
        actionListR.current[currentSelection].className=cssholder.join(' ')
           //currentSelection.className=cssClass.ListOfaction
           preViousholderR=currentSelection
       }

    const storeRefSe=(reference)=>{
        if(reference && !actionList.current.includes(reference))
        {
            actionList.current.push(reference)
        }

        
    }

    const storeRefRe=(reference)=>{
        
        if(reference && !actionListR.current.includes(reference))
        {
            actionListR.current.push(reference)
        }

       
    }

    const reply=(value,messageIndex,owner,receiver)=>{

        props.replyFun({message:value,index:chatLength-messageIndex,owner,receiver})
    }
    const Delete=()=>{
    }
    const Forward=()=>{
    }
    const takeaction=(indexVal,message,chatIndex,owner,receiver)=>{
      
        switch(indexVal)
        {
            case 0:reply(message,chatIndex,owner,receiver);
            break;
            case 1:Delete();
            break;
            case 2:Forward();
            break
        }
        closeOpenaction()
    }

        
    const takeactionR=(indexVal,message,chatIndex,owner,receiver)=>{
      
        switch(indexVal)
        {
            case 0:reply(message,chatIndex,owner,receiver);
            break;
            case 1:Delete();
            break;
            case 2:Forward();
            break
        }

        closeOpenactionR()
    }
    const closeOpenaction=()=>{
        if(preViousholder!=-1)
            {
        actionList.current[preViousholder].className=cssClass.ListOfactionNone
            preViousholder=-1
            
            }
    }
    const closeOpenactionR=()=>{
        if(preViousholderR!=-1)
            {
        actionListR.current[preViousholderR].className=cssClass.ListOfactionNone
            preViousholderR=-1
            
            }
    }



    let senderCounter=-1;
    let receivedcounter=-1
   props.chatMessage.map((res,index)=>{
    const Dateforchat=new Date(props.chatMessage[index].createdAttime).toTimeString().slice(0, 8)
    const DateString=tConvert(Dateforchat)
    const DateArray=DateString.split(':')
    const RealDateString=DateArray[0]+':'+DateArray[1]+' '+DateArray[3]
    

        if(res['Sender']!==undefined)
        {
            senderCounter=1+ senderCounter
            
            const val=senderCounter
            chat.push(
                
                <div /* ref={(index==0)?props.pageEndReach:null}  */ align='right' style={{marginRight:'10px',position:'relative'}}>
                <div ref={storeRefSe} className={cssClass.ListOfactionNone}>
                       <div onClick={()=>takeaction(0,res.Sender,index,'You',props.itself)} className={cssClass.replytext}> <div style={{margin:'5px',textAlign:'left',padding:'2px', fontSize: '15px'}}>Reply</div></div>
                       <div onClick={()=>takeaction(1,res.Sender,index,'You',props.itself)} className={cssClass.replytext}><div style={{margin:'5px',textAlign:'left',padding:'2px',fontSize: '15px'}} >Delete</div></div>
                       <div onClick={()=>takeaction(2,res.Sender,index,'You',props.itself)} className={cssClass.replytext}><div style={{margin:'5px',textAlign:'left',padding:'2px',fontSize: '15px'}} >Forward</div></div>
                    </div>
                   
            <div  className={cssClass.containerS}>


               
            <div className={cssClass.Sender}>

           
                
                 <div className={cssClass.chatStyleS} style={{color:"#7d917d"}}> <div className={cssClass.menuList} onClick={()=>displayList(val)} />    <div>You</div>  </div>
                 {res.reply?<div align="left" className={cssClass.replybox}><div style={{color:"#2f55a4",fontWeight:'bold',fontSize:'13px'}}>{res.owner}</div>{res.reply}</div>:null}
               
                

                <div>{res.Sender}</div>

                <div style={{fontSize:'10px',display:"flex",justifyContent:'left'}}>{RealDateString}</div>

                </div>
                {index+1>lengthChat-props.UnseenMessageRef?<div><img style={{height:"15px",width:"15px"}} src={deliverd}/></div>:<div><img style={{height:"15px",width:"15px"}}  src={seen}/></div>}
            </div></div>
            )
            
        }
        else
        {
            
            receivedcounter++
            const val=receivedcounter
            chat.push(<div /* ref={(index==0)?props.pageEndReach:null} */>
                {(lengthChat==index+1 && !DonotRun)?<div className={cssClass.UnseenNotifier}>----------------------------Unseen-Messages----------------------------</div>:null}
                <div ref={(lengthChat==index+1 && !DonotRun)?props.visitTillUnseen:null} align='left' style={{ margin:'10px',position:'relative'}}>
                    
                <div ref={storeRefRe} className={cssClass.ListOfactionNone}>
                       <div onClick={()=>takeactionR(0,res.Recieve,index,props.name,'You')} className={cssClass.replytext}> <div style={{margin:'5px',textAlign:'left',padding:'2px', fontSize: '15px'}}>Reply</div></div>
                       <div onClick={()=>takeactionR(1,res.Recieve,index,props.name,'You')} className={cssClass.replytext}><div style={{margin:'5px',textAlign:'left',padding:'2px',fontSize: '15px'}} >Delete</div></div>
                       <div onClick={()=>takeactionR(2,res.Recieve,index,props.name,'You')} className={cssClass.replytext}><div style={{margin:'5px',textAlign:'left',padding:'2px',fontSize: '15px'}} >Forward</div></div>
                    </div>


                         <div  className={cssClass.Receiver} >

                            
        
                            <div className={cssClass.chatStyleR}><div>~{props.name}</div>  <div className={cssClass.menuList} onClick={()=>displayListR(val)} /> </div>
                            {res.reply?<div align="left" className={cssClass.replybox}><div style={{color:"#2f55a4",fontWeight:'bold',fontSize:'13px'}}>{res.owner}</div>{res.reply}</div>:null}
               
                                <div>{res.Recieve}</div>
                                <div  style={{fontSize:'10px',display:"flex",justifyContent:'right'}}>{RealDateString}</div>
                         </div>
                
                     </div></div>)
        } 
    }) 

    const NotSelectedChat=lengthChat!=0?chat:<div style={{textAlign:"center"}}><img style={{width:"300px",height:"300px"}} src={props.image}></img>
    <div style={{fontWeight:"bold"}}>Please Select a Chat</div>
    </div>
   
    const newFunction=()=>{
        //actionListHolder.current.children[0].className=cssClass.ListOfactionNone
    }

    return(
      
        <Aux>    
        {NotSelectedChat}
           </Aux>
      
    )
}


/* onScroll={props.scrollEvent} */
export default Chat