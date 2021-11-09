import {React,useEffect, useState,useRef,useCallback,useMemo} from 'react'

import cssClass from './Home.module.css'

import Input from '../UI/Input/Input';
import Aux from '../../hoc/Auxiliary';
import {connect} from 'react-redux'
import User from './UserList/User';
import * as action from '../../store/action/Action'
import Chats from './ChatRender/Chat';
import send from '../../Asset/send1.png'
import UnselectedImg from '../../Asset/NotSelectedChat.png'

const Home=(props)=>{
    

    const [room,setroom]=useState([])
    
    const [len,setLen]=useState([])
    
    let newUnseen=useRef(0)

    const [newUnseenRef,setnewUnseenRef]=useState(0)
    let chatRef=useRef(null)
    let UnseenRef=useRef()
    
    let messageHolder=useRef(0)

    const pageCount=useRef(0)
    let executeRef=useRef(false)
    let pageUploader=useRef(false)
    
    const limit=12
    
    const pagefrom=0


    const [replyHolder,setReplyHolder]=useState(null)
    const [MessageSend,setMessage]=useState(
        {
                            value:'',
                            typeOfField:"input",
                            configureFile:{type:'text',placeholder:'Send'},
                            validation:
                            {
                                required:true,
                                minLength:1
                            },
                            valid:false,
                            touched:false,
                            error:''

        }
    ) 
 
    const myroom=props.User
    const Visitunseen = useCallback(  (node) => {
        let elementDetail=null
        if (props.chat.length==0) return
        if (UnseenRef.current) UnseenRef.current.disconnect()
        UnseenRef.current = new IntersectionObserver(entries => {
            
        elementDetail=  entries[0].target.offsetTop-chatRef.current.offsetHeight
    
            if(executeRef.current)
            {
         
            chatRef.current.scrollTop=elementDetail
            executeRef.current=false
            }
          if (entries[0].isIntersecting) {
               
            
                
                if(newUnseen.current!=0)
                { 

                    
                    props.FetchUserChat({room:room[0],Unseen:newUnseen.current,limit,pagefrom,pageto:pageCount.current},false,()=>seenNotifier(room[0],newUnseen.current,props.User)) 
                
                }
          
            newUnseen.current=0
          }
        })
    
        if (node) UnseenRef.current.observe(node)

       
      }, [props.chat])



     useEffect(()=>{
        
        
        props.socket.on('Notify-Succes',(values)=>{
            props.GetUser()
                if(values.senderId==room[0])
                {setnewUnseenRef(0)}
            
         
            
    
            

           })

           props.socket.emit('join',{myroom},(error)=>{
   
            if(error)
            {
    
                console.log(error)
            }
            })

            props.socket.on('message', (field)=>
            {
      


                messageHolder.current=field.room
           if(room[0]==field.room)  
              {
                  
               let result=scrollbar()
           
                  if (result.containerHeight - result.newMessageHeight <= Math.round(result.scrollOffset+100)) {
            ///Same function #A operation setting 0 to unseen and (unseenref of the other field to whom chatting) and sending notification
                          newUnseen.current= 0
                        
                    }  
                else{
                    newUnseen.current= newUnseen.current+1
                 }
                

                 const senderObj={
                    Recieve:field.message,createdAttime:new Date()
                }

                if(field.reply)
                {
                    senderObj.reply=field.reply.message;
                    senderObj.replyIndex=field.reply.index
                    senderObj.owner=field.reply.receiver
                }

                    props.pushTOchatArray([senderObj])
              }
              else
                {
                    props.GetUser()
                }

                 })




  
            props.socket.on('Refresh',(newJoine)=>{
      
    
                props.GetUser();
                })
                chatRef.current.addEventListener("scroll", scrollTrackFunc);

                    props.GetUser();

  
        },[])
        

       



        const scrollbar= ()=>{
            let messages= chatRef.current
        
             if(messages==null)
             {
                 return null
             }
              const newMessage = messages.lastElementChild
             
              if(newMessage==null)
              {
                  return null
              }
         
         
            const newMessageStyles = getComputedStyle(newMessage)
            const newMessageMargin = parseInt(newMessageStyles.marginBottom)
             const newMessageHeight = newMessage.offsetHeight + newMessageMargin 
         
             
              const visibleHeight = messages.offsetHeight
         
           
           const containerHeight = messages.scrollHeight
          
         const scrollOffset = messages.scrollTop + visibleHeight

         return {containerHeight,newMessageHeight,scrollOffset,messages}
        }
        const scrollbarTray=()=>{
            
             
            const result=scrollbar()
            if(!result)
            {
                return 
            }


             if (result.containerHeight - result.newMessageHeight <= Math.round(result.scrollOffset+100)) {
               
                ScrolToButtom(result.messages)
               
             }  
              
         
         }
         const ScrolToButtom=(message)=>{
           
             message.scrollTop=message.scrollHeight
         }
         
////////////////////////////////////////////////////////////
        useEffect(async()=>{
            props.GetUser()
            
            
        
            if(props.chat.length>0 && newUnseen.current==0 )
            { 
            
               props.chatArrayLoader(room[0],()=>seenNotifier(room[0],newUnseen.current,props.User))
                
                
                    
                
                   
                           
                        newFunction(pageUploader.current)
                    
                    

                     //   pageUploader.current=true
            }
          
            },[props.chat])






            useEffect(()=>{


                scrollbarTray()
            
            },[replyHolder])
///////////////////////////////////////////////////////////////////////////////////////

        const newFunction=async (b)=>{
     
            
         if(!b)
         {
       
       
             pageUploader.current=true
             return

         }

      
                scrollbarTray() 
               
  

    

            //It's asyn function so i have given await
               let messages=  await chatRef.current
            
                if(messages==null)
                {
                    return 
                }
            
                if(props.chat.length>len[0]+1 && messages.lastElementChild)
                {
                    
              
                  ScrolToButtom(messages)
                
                  
                }
                if(messages.lastElementChild==null)
                {
                  
                    len[0]=0
                  

                }
                else{
                    len[0]=props.chat.length
                }
            
        }
        const seenNotifier=(SelectedChat,Unseen,myId)=>{
            

            props.socket.emit('Seen-Notifier',{SelectedChat,Unseen,myId},()=>{
           
            })
        }
    



            useEffect(()=>{
            
              if(props.UserList.length!=0 && props.myStatus)
              {
                
                props.ResetStatus()
                props.socket.emit('FriendsListner',props.UserList,(error)=>{
                      if(error)
                      {
                          console.log(error)
                      }
                  })
              } 
            },[props.UserList])


        const sender=(event)=>{
           
            
            const Form={...MessageSend}
            Form.value=event.target.value
            setMessage(Form)
           
        }

        
        
        const chatblock=(event)=>{
            
            
            event.preventDefault()
            const Form={...MessageSend}
            if(Form.value==null || Form.value=='')
            {
                return
            }
            const MessageDate=new Date()
            props.socket.emit('New-message',{room:room[0],Sroom:localStorage.getItem('userId'),message:Form.value,createdAttime:MessageDate,reply:replyHolder},(Nmessage,isreply)=>
            {
               
            
                  newUnseen.current=0
                  pageUploader.current=true
                    setnewUnseenRef(prev=>{
                        return prev+1
                    })
                    const senderObj={
                        "Sender":Nmessage,createdAttime:new Date()
                    }

                    if(isreply)
                    {
                        senderObj.reply=isreply.message;
                        senderObj.replyIndex=isreply.index
                        senderObj.owner=isreply.owner
                    }

                ///Same function #A operation setting 0 to unseen and (unseenref of the other field to whom chatting)  and sending notification
                    props.pushTOchatArray([senderObj])

               
              
                Form.value=''
                setMessage(Form)
          
             
        
            })
            
        }
    
         


        const Users=async (id,Name,temUnseen,temUnseenRef)=>{
        
            room.pop()
            room.pop()
            room.push(id)
            room.push(Name)
            
            len[0]=0
            newUnseen.current=temUnseen
        
            setnewUnseenRef(temUnseenRef)
             if(newUnseen.current!=0)
             {
                 executeRef.current=true
             }
            
             pageUploader.current=true
         

             pageCount.current=Math.ceil((newUnseen.current)/limit)+1
             


             props.FetchUserChat({room:id,Unseen:newUnseen.current,limit,pagefrom,pageto:pageCount.current},true,(a,b)=>seenNotifier(a,b))
             
        }

     const replyattachment=(value)=>{




        setReplyHolder(value)
        
     }

     const resetReply=()=>{
         setReplyHolder(null)
     }
        const cssHolder=[cssClass.reply]
        const chatHolder=[cssClass.scrollbar,cssClass.chatboxfull]
    if(replyHolder)
    {
        
        chatHolder.push(cssClass.chatbox)
        cssHolder.push(cssClass.replyActive)
       
    }

   
    
    const getItems=()=>{

      
        pageUploader.current=false  
    
       props.FetchChatOnly(room[0],pageCount.current,pageCount.current+1,limit) 

        pageCount.current=pageCount.current+1 
           
        
    }

    const scrollTrackFunc = () => {
        
        if (
          chatRef.current!==null && chatRef.current.scrollTop == 0
        ) {
            
          getItems();
        }
      }
      const runFun=async()=>{
        console.log("jk")
          if(chatRef.current && !pageUploader.current)
            {
              
                let counter=0
                
                const currentdiv= await chatRef.current
                const arrayNode=currentdiv.childNodes
            
             if(arrayNode.length>=limit)
                 {
               
                     for(let i=0;i<limit;i++)
                    {
                        
                        counter=arrayNode[i].clientHeight+counter
                   
                    } 
                }
                currentdiv.scrollTop=counter+120
        
            }
        }
    const sourceCode=<div style={{backgroundColor:'#fff',marginBottom:'50px',width:'850px',height:'780px',display:'flex',alignItems:'center',flexDirection:'column', boxShadow: ' 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)'}}>
   
    <div style={{display:'flex',flexDirection:'row',width:'830px',marginTop:'5px'}}>
        <div style={{height:"680px",width:'550px',boxShadow: ' 0 10px 38px rgba(0,0,0,0.30), 0 10px 12px rgba(0,0,0,0.22)'}}>



         <div ref={chatRef}  className={chatHolder.join(' ')} > 
    
      { useMemo(()=><Chats onChange={runFun()} itself={props.itself} replyFun={replyattachment} image={UnselectedImg} UnseenMessageRef={newUnseenRef} UnseenMessage={newUnseen.current} visitTillUnseen={Visitunseen} /* pageEndReach={pageExtendCall} */  name={room[1]} chatMessage={props.chat}/>,[props.chat,newUnseenRef])}
  
             </div>  

        </div>
        <div className={cssClass.scrollbar+' '+cssClass.chatholder} style={{display:'flex',flexDirection:'column',height:'100%',overflowY:'auto',width:'280px'}}>
         
            {props.UserList.map(res=>{
                let id=res.id
                let Name=res.Name
                let cssMarker=[cssClass.UserContainer]
                let checker=false
                if(room[0]==id)
                {
                    checker=true
                    cssMarker.push(cssClass.activeLink)
                }
            
        
                return(<User name={Name} Unseen={checker?newUnseen.current:res.Unseen} status={res.status} cssCl={cssMarker.join(' ')} clicked={()=>Users(id,Name,res.Unseen,res.UnseenRef)}/>)
            })}
        </div>
    </div>
            <div style={{width:'830px',height:'100%',position:'relative'}}>
                 
               
            <div className={cssHolder.join(' ')}>
                    {replyHolder?<div className={cssClass.MessageContainer}><span style={{color:'#00C301',fontWeight:'bold',display:'block'}}>{replyHolder['owner']}</span>{replyHolder['message']}</div>:null}
                    <button onClick={resetReply} className={cssClass.closebuttom}></button>
                </div> 
        <form style={{width:'830px',top:'0px',position:'absolute',backgroundColor:'#F0F0F0',height:'100%'}} onSubmit={chatblock}>

       <div style={{display:'flex',marginBottom:'10px',marginTop:'10px'}}>  <Input cssFile={cssClass.inputField} configureFile={MessageSend.configureFile} value={MessageSend.value} typeOfField={MessageSend.typeOfField} changed={(event)=>sender(event)}/>
      
        <button className={cssClass.buttonStyle}><img src={send} style={{width:"30px",height:"30px"}} /></button>
        </div>
        </form> 
        
            </div>
      
        </div>
     
   
    return (
        <Aux>
         
        {sourceCode}</Aux>
    )
}
const states=(state)=>{
    return{
        UserList:state.User.allusers,
        chat:state.User.chatbox,
        chatLoader:state.User.chatLoad,
        chatboxloader:state.User.chatboxloader
    }
}
const dispatchs=(dispatch)=>{
    return{
        
        GetUser:()=>dispatch(action.getUser()),
        FetchUserChat:(userId,isFetchChat,seenNotifier)=>dispatch(action.userChat(userId,isFetchChat,seenNotifier)),
        pushTOchatArray:(message)=>dispatch(action.FetchChatSucces(message)),
        cleanUpChat:()=>dispatch(action.ChatCleanUp()),
        FetchChatOnly:(id,pagefrom,pageto,limit)=>dispatch(action.FetchChatOnly(id,pagefrom,pageto,limit)),
        chatArrayLoader:(chatId,callBack)=>dispatch(action.FetchChatArray(chatId,callBack))
    }
}
export default connect(states,dispatchs)(Home)