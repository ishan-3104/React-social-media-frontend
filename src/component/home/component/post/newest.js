import { Avatar, Button, Card, CircularProgress, IconButton, ImageList, ImageListItem, Typography } from '@mui/material'
import{Link, Navigate, useNavigate} from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import './newest.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import RedoRoundedIcon from '@mui/icons-material/RedoRounded';
import axios from 'axios'
import Comment from '../comment/Comment';
import io from 'socket.io-client'
// import { useDispatch } from 'react-redux';
// import { fatchUser } from '../../../../featurs/UserSlice'; 
import { useSelector } from 'react-redux';


const ENDPOINT = "https://socialmediabackend-v5o5.onrender.com"
var socket;


export default function Newest() {
    // const dispatch = useDispatch()
    const flag = useSelector((state)=>state.user.flag)
    const navigate = useNavigate()

    const [post, setpost] = useState([])
    const [likebtnColor, setlikebtnColor] = useState(false)
    const [followFlag, setfollowFlag] = useState(true)
    const [userdata, setuserdata] = useState([])
    const [commentflafID, setcommentflafID] = useState('')
    const [commentflag, setcommentflag] = useState(false)

    useEffect(()=>{
        socket = io(ENDPOINT)
    },[])

    

    //---------------LIKE POST-------------
    const likepost =(postid)=>{
        
        axios.post('https://socialmediabackend-v5o5.onrender.com/likepost',{id:postid,userId:localStorage.getItem('id')},
        {headers:{
            "Authorization":  localStorage.getItem('token')
        }})
        .then(()=>{
            setlikebtnColor(!likebtnColor)
            console.log('in like');
           })
            .catch((err)=>console.log(err))
            
        
    }
    //---------------FOLLOW USER--------------
    const followUser =(followuser)=>{
        axios.post('https://socialmediabackend-v5o5.onrender.com/follow',{sender:localStorage.getItem('id'),followuser:followuser},
        {headers:{
            "Authorization":  localStorage.getItem('token')
        }})
        .then((response)=>{
            setfollowFlag(!followFlag)
            console.log(response)})
        .catch((err)=>console.log('err',err))
        
    }
    //------------HANDLE COMMENT---------------
    const CommentonPost =(id)=>{
        setcommentflafID(id)
        setcommentflag(!commentflag)
    }
    //-------------SEND NOTIFICATION---------------
    const onSendNotification=(postid,receiver)=>{
        axios.post('https://socialmediabackend-v5o5.onrender.com/notification/addtonotification',{
            sender:localStorage.getItem('id'),
            receiver:receiver,
            postid:postid,
            like:true,
            Comment:false,
            commentText:'',
        },
        {headers:{
            "Authorization":  localStorage.getItem('token')
        }})
        .then((response)=>{
            setfollowFlag(!followFlag)
            console.log('notification send',response)
            socket.emit("new notification",response.data)
        })
        .catch((err)=>{console.log(err)})
        
    }
    //-------------SEND FOLLOW REQUEST--------------------------
    const onFollowrequest =(receiver)=>{
        axios.post('https://socialmediabackend-v5o5.onrender.com/notification/addtonotification',{
            sender:localStorage.getItem('id'),
            receiver:receiver,
           
            like:false,
            Comment:false,
            commentText:'',
            followRequest:true,
        },
        {headers:{
            "Authorization":  localStorage.getItem('token')
        }})
        .then((response)=>{
            
            socket.emit("new notification",response.data)            
            })
        .catch((err)=>{console.log(err)})

        axios.post('https://socialmediabackend-v5o5.onrender.com/follow/addtorequest',{userId:localStorage.getItem('id'),followuser:receiver},
            {headers:{
                "Authorization":  localStorage.getItem('token')
            }})
        .then((response)=>{
            setfollowFlag(!followFlag)
            console.log('last change',followFlag);
            console.log(response)})
        .catch((err)=>console.log('err',err))
       
    }

    const onClacelRequest =(receiver)=>{
        axios.post('https://socialmediabackend-v5o5.onrender.com/follow/addtorequest',{userId:localStorage.getItem('id'),followuser:receiver},
            {headers:{
                "Authorization":  localStorage.getItem('token')
            }})
        .then((response)=>{
            setfollowFlag(!followFlag)
            console.log(response)})
        .catch((err)=>console.log('err',err))
        
    }
    useEffect(()=>{
            
            axios.post('https://socialmediabackend-v5o5.onrender.com/getalluser/userprofile',{userId:localStorage.getItem('id')},{headers:{
                "Authorization":  localStorage.getItem('token')
            }})
            .then((response)=>{
                
                setuserdata(response.data.data[0])})
            .catch((err)=>{console.log('err for geting user data',err)})

            axios.get('https://socialmediabackend-v5o5.onrender.com/getalluser/post', {headers:{
                "Authorization":  localStorage.getItem('token')
            }})
            .then((response)=>{
                
                setpost(response.data.data)
            })
            .catch((err)=>{
                console.log(err);
            })
        },[likebtnColor,followFlag,flag])
  return (
    <div className='post-card' >
        {post && userdata
            ?
            ([...post].reverse().map((i,index)=>{
                return(
                    <div key={index}>
                    <Card >
                        <div className='card-Header'>
                            <Button onClick={()=>{
                                localStorage.setItem('searchuser',i.userId._id)
                                navigate('/profile')
                                }} 
                                sx={{height: 'fit-content'}}    
                            >
                                <Avatar src={`https://socialmediabackend-v5o5.onrender.com/static/${i.userId.profileImage}`} sx={{width:'80px',height:'80px',border:'3px solid #2E7D32'}}/>
                            </Button>
                            <div className='card-title'>
                                <Typography   sx={{fontSize:'19px' ,fontWeight:600}}>{i.caption}</Typography>
                                <span>{i.userId.username}</span>
                                <span><CalendarMonthIcon sx={{fontSize:'17px'}}/> {i.postTime}</span><br/>
                                {/* <IconButton sx={{marginLeft:'-10px'}}>
                                    <FavoriteIcon sx={{color:'red',}}/>
                                </IconButton>
                                <span><CalendarMonthIcon sx={{fontSize:'17px'}}/> {i.postTime}</span>
                                <span>
                                    <IconButton sx={{fontSize:'13px',color:'black'}} onClick={()=>CommentonPost(i._id)}>
                                        <ModeCommentOutlinedIcon sx={{color:'green',fontSize:'17px'}}/>Comment
                                    </IconButton>
                                </span> */}
                                
                            </div>
                            <div>
                                {
                                    userdata?._id != i.userId._id && 
                                    (
                                        <>
                                        {
                                            userdata?.followrequest?.includes(i.userId._id)
                                            ?(<>
                                                <Button sx={{border:'1px solid green',height:'30px',color:'black'}} onClick={()=>onClacelRequest(i.userId._id)}>Requested</Button>
                                            </>)
                                            :(<>
                                                {
                                                    !userdata?.following?.includes(i.userId._id) 
                                                    ?(<Button sx={{border:'1px solid green',height:'30px',color:'black'}} onClick={()=>onFollowrequest(i.userId._id)}>Follow</Button>)
                                                    :(<Button sx={{border:'1px solid green',height:'30px',color:'black'}} onClick={()=>followUser(i.userId._id)}>UnFollow</Button>)
                                                }
                                            </>)
                                        }
                                        </>
                                    )
                                }
  
                            </div>
                        </div> 
                        <div className='card-content'>
                            <div >
                            
                                    {i.postimage.includes('.mp4')
                                    ?( <video style={{maxHeight:'416px',maxWidth:'450px'}} controls>
                                            <source src={`https://socialmediabackend-v5o5.onrender.com/static/${i.postimage}`} type="video/mp4"/>
                                        </video>)
                                    :(<img src={`https://socialmediabackend-v5o5.onrender.com/static/${i.postimage}`}  alt='post' style={{maxHeight:'416px',maxWidth:'450px'}}></img>)
                                    }
                            
                                    { 
                                        commentflafID==i._id && commentflag
                                        ?(<Comment postId ={i._id} receiver={i.username} />)
                                        :(<></>)
                                        
                                    }
                            </div>
                            <div className='like-comment-btn'>
                                
                                    {!i.postLike?.includes(localStorage.getItem('id')) 
                                    ? (<><IconButton onClick={()=>{
                                        onSendNotification(i._id,i.userId._id)
                                        likepost(i._id)}}>
                                            <FavoriteIcon  sx={{fontSize:'30px'}}/>
                                        </IconButton><br/>
                                        </>)
                                    :(<><IconButton onClick={()=>likepost(i._id)}>
                                            <FavoriteIcon  sx={{fontSize:'30px',color:'red'}}/>
                                        </IconButton><br/>
                                        </>)} 
                                
                                <p>{i.postLike.length}</p>
                                <IconButton onClick={()=>CommentonPost(i._id)}>
                                    <CommentRoundedIcon sx={{color:'rgba(75, 167, 75, 0.874)'}}/>
                                </IconButton><br/>
                                <p>{i.cmtArray.length}</p>
                                <IconButton>
                                    <RedoRoundedIcon/>
                                </IconButton><br/>
                                <p>152</p>

                            </div>
                        </div> 
                    </Card><br/>
                    </div>
                )

            }))
            :(<CircularProgress color="success" sx={{marginTop:'60px'}} />)
        }
    </div>
  )
}
