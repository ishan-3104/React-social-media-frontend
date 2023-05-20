import { Avatar, CircularProgress, IconButton } from '@mui/material'
import axios from 'axios'
import React,{ useEffect, useState } from 'react'
import './viewOnePost.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Comment from '../../comment/Comment';


function ViewOnePost({postId}) {
    const [post, setpost] = useState([])
    const [likebtnColor, setlikebtnColor] = useState(false)
    const [followFlag, setfollowFlag] = useState(true)
    const [commentflafID, setcommentflafID] = useState(false)

    
    //---------------LIKE POST-------------
    const likepost =(postid)=>{
        
        axios.post('http://localhost:5000/likepost',{id:postid,userId:localStorage.getItem('id')},
        {headers:{
            "Authorization":  localStorage.getItem('token')
        }})
        .then(()=>{
            setlikebtnColor(!likebtnColor)
            console.log('in like');
           })
            .catch((err)=>console.log(err))
              
    }
    //-------------SEND NOTIFICATION---------------
    const onSendNotification=(postid,receiver)=>{
        axios.post('http://localhost:5000/notification/addtonotification',{
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
            
        })
        .catch((err)=>{console.log(err)})
        
    }
    //------------HANDLE COMMENT---------------
    const CommentonPost =(id)=>{
        setcommentflafID(!commentflafID)
    }

    useEffect(()=>{

        axios.post('http://localhost:5000/getalluser/singlepost',{postId:postId},{
            headers:{
                "Authorization":  localStorage.getItem('token')
        }})
        .then((response)=>{
            
            setpost(response.data.data[0])
        })
    },[followFlag,likebtnColor])
  return (
    <div style={{ width:'500px'}}>
        {
             post.postimage 
             ?(<>
                <div className='single-post-header'>
                <Avatar src={`http://localhost:5000/static/${post?.userId?.profileImage}`} sx={{width:'50px',height:'50px',border:'3px solid #2E7D32'}}/>
                <p>{post?.userId?.username}</p>
                </div>
                <div className='single-post-image'>
                    {post?.postimage?.includes('.mp4')
                        ?( <video style={{maxHeight:'416px',maxWidth:'450px'}} loop autoPlay>
                                <source src={`http://localhost:5000/static/${post.postimage}`} type="video/mp4"/>
                            </video>)
                        :(<img src={`http://localhost:5000/static/${post.postimage}`}  alt='post' style={{maxHeight:'416px',maxWidth:'450px'}}></img>)
                    }
                    
                </div>
                <div style={{background:'rgb(54, 54, 54)'}}>
                <div className='single-post-footer'>
                    {
                        post.postLike?.includes(localStorage.getItem('id')) 
                        ?(<IconButton>
                            <FavoriteIcon 
                                onClick={()=>likepost(post._id)}
                                sx={{color:'red',marginLeft:'15px'}} 
                            />
                        </IconButton>)
                        :(<IconButton>
                            <FavoriteIcon onClick={()=>{
                                onSendNotification(post._id,post.userId._id)
                                likepost(post._id)}} 
                                sx={{color:'white',marginLeft:'15px'}} 
                            />
                        </IconButton>)
                    }
                
                    <IconButton>
                        <CommentRoundedIcon 
                            onClick={()=>CommentonPost()}
                            sx={{color:'white',marginLeft:'15px'}}
                        />
                    </IconButton>
                    <IconButton>
                        <BookmarkIcon sx={{color:'white',marginLeft:'15px'}}/>
                    </IconButton>
                    
                </div>
                <div className='single-post-comment'>
                    { 
                        commentflafID &&
                        (<Comment postId ={post._id} receiver={post.username} style={{width:'90%'}}/>)
                    }
                </div>
                </div>
             </>)
             :(<><CircularProgress color="success" sx={{marginTop:'60px',marginBottom:'60px',marginLeft:'45%'}} /></>)
        }
        
    </div>
  )
}

export default ViewOnePost