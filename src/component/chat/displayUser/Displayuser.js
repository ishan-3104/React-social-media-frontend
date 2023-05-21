import { Avatar, IconButton, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './displayUser.css'
import VideocamIcon from '@mui/icons-material/Videocam';
import {useNavigate} from 'react-router-dom'

export default function Displayuser({handlechatUser}) {
  const navigate = useNavigate()
  const [userdata, setuserdata] = useState([])
  const [alldata, setalldata] = useState([])
  const [selectChat, setselectChat] = useState('')
  const [chatuser, setchatuser] = useState('')



  useEffect(()=>{
    axios.get('https://socialmediabackend-v5o5.onrender.com/getalluser',
    {headers:{
      "Authorization":  localStorage.getItem('token')
    }})
    .then((response)=>{
      setuserdata(response.data.data)
      setalldata(response.data.data)
     
    })
    .catch((err)=>{
      console.log('err in fatching data',err);
    })
  },[])

  const searchUser =(value)=>{
    var result = alldata.filter((item)=>{
      if(item.username.includes(value)){
        return item
      }
    })
    // if(value == '')
    setuserdata(result)
  }
  const handleselectuser =(index,user)=>{
    setselectChat(index)
    handlechatUser(user)
  }

  return (
    <div className='chat-user-container'><br/>
      <TextField label='search' size='small' fullWidth 
      sx={{borderRadius:'20px'}}
      onChange={(e)=>searchUser(e.target.value)}
      ></TextField><br/>
      {
        userdata.map((i,index)=>{
          return(
            <div key={index}>
            {i.username != localStorage.getItem('username') && (
              <Box className={`user-box-${
                index === selectChat ? "selected" : ""
              }`}
              onClick={()=>{handleselectuser(index,i)}}
              
              >
              <div><Avatar src={`https://socialmediabackend-v5o5.onrender.com/static/${i.profileImage}`}  alt='profile' sx={{height:'40px',width:'40px',border : ' 3px solid #2E7D32',margin:'5px'}}></Avatar></div>
              <div className='dispaly-username-chatbox'>
                  <div>
                    <p style={{fontSize:'18px',fontWeight:500,marginTop:'5px',marginBottom:'0px'}}> @{i.username}</p>
                  </div>
                  <div>
                      <IconButton onClick={()=>navigate('/videocall')}>
                          <VideocamIcon/>
                      </IconButton>
                  </div>
              </div>
            </Box>
            )}
            </div>
          )
        })
      }
      
     
    </div>
  )
}
