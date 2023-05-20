import { Avatar, Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import './comment.css'
import axios from 'axios'
import moment from 'moment'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function Comment({postId,receiver}) {
    const [comment, setcomment] = useState('')
    const [allcomment, setallcomment] = useState([])
    const [commentflaf, setcommentflaf] = useState(false)
    const [morecommentflag, setmorecommentflag] = useState(false)

    useEffect(()=>{
        axios.post('http://localhost:5000/comment/getallcomment',{postId :postId},{headers:{
            "Authorization":  localStorage.getItem('token')
        }})
        .then((response)=>{
            setallcomment(response.data.data[0].cmtArray);
            console.log('helooooooo',response.data.data[0].cmtArray);

        })
        .catch((err)=>console.log(err))

    },[commentflaf])

    const sendComment =()=>{
        axios.post('http://localhost:5000/comment',
        {
            postId :postId,
            userId : localStorage.getItem('id'),
            comment:comment,
            commentTime: new Date(),
        },
        {headers:{
            "Authorization":  localStorage.getItem('token')
        }}
        )
        .then((response)=>{
            setcommentflaf(true)
            console.log(response)
            setcomment('')
            axios.post('http://localhost:5000/notification/addtonotification',{
                sender:localStorage.getItem('id'),
                receiver:receiver,
                postid:postId,
                like:false,
                comment:true,
                commentText:comment,
            },
            {headers:{
                "Authorization":  localStorage.getItem('token')
            }})
            .then(()=>{console.log('notification send')})
            .catch((err)=>{console.log(err)})

        })
        .catch((err)=>{
            
            console.log(err);
        })
        console.log('send',postId);
    }

    const loadmoreComment=()=>{
        setmorecommentflag(!morecommentflag)
    }

  return (
    <div className='comment-box'>
        
        <TextField label='comment' size='small' fullWidth onChange={(e)=>setcomment(e.target.value)} sx={{background:'white',borderRadius:'5px'}}/>
        <InputAdornment className='send-comment'>
               <IconButton onClick={sendComment}>
                <SendIcon fontSize='small' />
               </IconButton>
        </InputAdornment>
       
        {
            morecommentflag 
            ? (allcomment.map((i,index)=>{
                return(
                    <Box className='comment-container'key={index}>
                        <div>
                                <Avatar src={`http://localhost:5000/static/${i.userId.profileImage}`} sx={{border:'2px solid #2E7D32'}}></Avatar>
                        </div>
                        <div className='comment-time'>
                                <div>
                                    <Typography sx={{fontWeight:500}}>@{i.userId.username}</Typography>
                                    <Typography sx={{fontSize:'14px',width:'190px'}}>{i.comment}</Typography>
                                </div> 
                                <div>
                                    <Typography sx={{fontSize:'13px',texAlign:'right'}}>{moment(i.commentTime).startOf('ss').fromNow()}</Typography>
                                </div>
                        </div>
                    </Box>
                )
            }))
            : (allcomment?.slice(0,3).map((i)=>{
                return(
                    <Box className='comment-container'>
                        <div>
                                <Avatar src={`http://localhost:5000/static/${i.userId.profileImage}`} sx={{border:'2px solid #2E7D32'}}></Avatar>
                        </div>
                        <div className='comment-time'>
                                <div>
                                    <Typography sx={{fontWeight:500}}>@{i.userId.username}</Typography>
                                    <Typography sx={{fontSize:'14px'}}>{i.comment}</Typography>
                                </div> 
                                <div>
                                        <Typography sx={{fontSize:'13px',texAlign:'right'}}>{moment(i.commentTime).startOf('ss').fromNow()}</Typography>
                                </div>
                        </div>
                    </Box>
                )
            }))
        }
        {allcomment.length>3 && <>
            {
                morecommentflag 
                ? ( <IconButton onClick={loadmoreComment}>
                    <MoreHorizIcon/>
                    <Typography sx={{fontSize:'14px'}}>show less</Typography>
                </IconButton>)
                : ( <IconButton onClick={loadmoreComment}>
                    <MoreHorizIcon/>
                    <Typography sx={{fontSize:'14px'}}>more comments</Typography>
                </IconButton>)
            }
           
           </>
        }
        
        
        
    </div>
  )
}
