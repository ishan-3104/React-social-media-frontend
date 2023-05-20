import { Avatar, Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useNavigate} from'react-router-dom'

export default function SearchPeople() {
  const navigate= useNavigate()
  const [userdata, setuserdata] = useState([])
  const [alldata, setalldata] = useState([])


  useEffect(()=>{
    axios.get('http://localhost:5000/getalluser',
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

  return (
    <div>
      <TextField label='search' size='small' fullWidth onChange={(e)=>searchUser(e.target.value)}></TextField><br/>
      {
        userdata.map((i,index)=>{
          return(
            <Box sx={{ borderBottom: 1, borderColor: '#cecece',display:'flex', margin:1}} key={index}>
              <div onClick={()=>{
                localStorage.setItem('searchuser',i.username)
                navigate('/profile')
                }} >
                  <Avatar src={`http://localhost:5000/static/${i.profileImage}`}  alt='profile' sx={{height:'60px',width:'60px',border : ' 3px solid #2E7D32',margin:'5px'}}></Avatar>
              </div> 
              <div onClick={()=>{
                localStorage.setItem('searchuser',i._id)
                setTimeout(() => {
                  navigate('/profile')
                }, 2000);
                }} >
                  <span style={{fontSize:'21px',fontWeight:500}}>{i.username}</span>
                  {/* <span style={{fontSize:'19px'}}>View you post</span> */}
                  <p style={{fontSize:'13px',margin:0}}>{i.bio}</p><br/>
                  {/* <p style={{fontSize:'13px',fontWeight:500}}>10 min ago</p> */}
              </div>     
            </Box>
          )
        })
      }
    </div>
  )
}
