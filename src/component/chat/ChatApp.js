import React, { useEffect, useState } from 'react'
import './chatapp.css'
import Message from './chatBox/Message'
import Displayuser from './displayUser/Displayuser'
import Picker from 'emoji-picker-react'
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsRoundedIcon from '@mui/icons-material/EmojiEmotionsRounded';
import { Button, IconButton, TextField } from '@mui/material';
import axios from 'axios';
import io from 'socket.io-client'
import Lottie from 'react-lottie'
import animationData from './animation/typing.json'
import socket from '../Socket/Socket';


// const ENDPOINT = "https://socialmediabackend-v5o5.onrender.com"
var  selectedChatCompare;
const user ={
    _id : localStorage.getItem('id'),
    username:localStorage.getItem('username'),
    profileImage:localStorage.getItem('profileImage')
}
export default function ChatApp() {
   
    const [chatuser, setchatuser] = useState('')
    const [emojiFlag, setemojiFlag] = useState(false)
    const [msg, setmsg] = useState('')
    const [chatId, setchatId] = useState('')
    const [startConversation, setstartConversation] = useState(false)
    const [allmsgFlag, setallmsgFlag] = useState(false)
    const [allmsg, setallmsg] = useState([])
    const [socketConnection, setsocketConnection] = useState(false)
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };

    useEffect(()=>{
        console.log(user);
        // socket = io(ENDPOINT)
        socket.emit('setup',user)
        socket.on("connected",()=>{setsocketConnection(true)})
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));
    },[])

    const handleEmoji =()=>{
        setemojiFlag(!emojiFlag)
    }

    const addemoji=(event,emoji)=>{
        setmsg(msg+emoji.emoji)
    }
    const typingHandler = (e) => {
        setmsg(e.target.value);
    
        if (!socketConnection) return;
    
        if (!typing) {
          setTyping(true);
          socket.emit("typing", chatId);
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
          var timeNow = new Date().getTime();
          var timeDiff = timeNow - lastTypingTime;
          if (timeDiff >= timerLength && typing) {
            socket.emit("stop typing", chatId);
            setTyping(false);
          }
        }, timerLength);
      };

    const handlechatUser=(value)=>{
        setchatuser(value)
        axios.post('https://socialmediabackend-v5o5.onrender.com/chat/creatchat',{
            userid:localStorage.getItem('id'),
            chatuserid: value._id,
            },
            {headers:{
                "Authorization":  localStorage.getItem('token')
            }}
        ).then((response)=>{
            setchatId(response.data._id)
            console.log('chat created',response)
        })
        .catch((err)=>{console.log('chat not created',err);})
        console.log(chatId,'chat id');
    }
    
    
    const onSendmessage=()=>{
       
        setallmsgFlag(!allmsgFlag)
        socket.emit("stop typing", chatId);
        axios.post('https://socialmediabackend-v5o5.onrender.com/chat/sendmessage',{
            userid:localStorage.getItem('id'),
            chatId: chatId,
            content: msg
        },
        {headers:{
            "Authorization":  localStorage.getItem('token')
        }})
        .then((response)=>{
            setmsg('')
            
            var data =response.data
            console.log(data);
            socket.emit("new message",data)
        }

        )  
        .catch((err)=>{console.log('err to send message',err);}) 
    }

   


    useEffect(()=>{
        axios.post('https://socialmediabackend-v5o5.onrender.com/chat/fetchmessage',{chatId:chatId},
        {headers:{
            "Authorization":  localStorage.getItem('token')
        }})
        .then((response)=>{
            setallmsg(response.data)
            console.log(response.data);
        })

        socket.emit('join chat',chatId)
        selectedChatCompare = chatId

    },[chatId,allmsgFlag])

    useEffect(()=>{
        // console.log("chat");
        socket.on("message recieved",(newMeesageRecieved)=>{
            // console.log("1",selectedChatCompare._id);
            // console.log('2',newMeesageRecieved.chat._id);
            if((!selectedChatCompare) || (selectedChatCompare != newMeesageRecieved.chat._id)){
                //give notification 
                console.log("in if");
            }
            else{
                
                setallmsg([...allmsg,newMeesageRecieved])
            }
        })
    })

  

  return (
    <div className='chat-app'>
        <div className='display-user'>
            <Displayuser handlechatUser={handlechatUser}/>
        </div>
        <div className='chat-box'>
            {!chatuser 
            ?(<h1>Welcome</h1>)
            :(<>
               
                <Message messages={allmsg}/>
                <div className='typing-msg-box'>
                    {istyping ? (
                        <div>
                        <Lottie
                            options={defaultOptions}
                            height={50}
                            width={70}
                            style={{ marginBottom: 10, marginLeft: 19,}}
                        />
                        </div>
                    ) : (
                        <><div>hello</div></>
                    )}
                </div>
                <div className='chat-input-container'>
                    <div>
                        <IconButton onClick={handleEmoji}>
                            <EmojiEmotionsRoundedIcon className='chat-emoji'/>
                        </IconButton>
                            {emojiFlag && (<Picker onEmojiClick={addemoji}/>)}
                    </div>
                    <div className='input-box'>
                        <input type='text' className='chat-input-tag' placeholder='Type a message' value={msg}
                            onChange={typingHandler}
                            // onChange={(e)=>setmsg(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && onSendmessage()}
                        />
                        <IconButton onClick={onSendmessage}>
                            <SendIcon/>
                        </IconButton>
                    </div>
                </div>
                
            </>)
            }
        </div>
    </div>
  )
}
