import { Avatar } from '@mui/material'
import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import{isSameSenderMargin,isSameUser,isSameSender,isLastMessage} from './function/DisplayMessageLogic'
import './message.css'

export default function Message({messages}) {
  const userId = localStorage.getItem('id')
  // console.log(messages,"all msg");
  return (
    <ScrollableFeed className='message-box'>
      {
        messages && messages.map((m,i)=>{
          return(
            <div style={{display:'flex'}} key={m._id}>
              <div>
                {(
                  (isSameSender(messages,m,i,userId) 
                  || isLastMessage(messages,i,userId))
                  && (
                    <>
                    <Avatar src={`http://localhost:5000/static/${m.sender.profileImage}`} sx={{height:'30px',width:'30px',border:'2px solid #2E7D32',margin: "5px 0px"}}/>
                    {/* {m.sender.profileImage} */}
                    </>
                  )
                  )
                }
                </div>
                <span style={{
                  backgroundColor: `${
                    m.sender._id === userId ? "#BEE3F8" : "#B9F5D0"
                  }`,
                  marginLeft: isSameSenderMargin(messages, m, i, userId),
                  marginTop: isSameUser(messages, m, i, userId) ? 3 : 10,
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "75%",
                }}>

                  {m.content}
                </span>
                
            </div>
          )
        })
      }
    </ScrollableFeed>
  )
}
