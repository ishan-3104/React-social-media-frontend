import { Avatar, Box, Button, List } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import io from 'socket.io-client'
import {useDispatch} from 'react-redux';
import { getnotification } from '../../featurs/UserSlice' 
import socket from '../Socket/Socket';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Notification() {
    const dispatch= useDispatch()

    const navigate= useNavigate()
    const [notification, setnotification] = useState([])
    const [flag, setflag] = useState(false)

    
         //end drawer implimentation

    //  useEffect(()=>{
    //     socket = io(ENDPOINT)
    // },[])
    useEffect(()=>{
        console.log('hello');
        socket.on("send notification",(data)=>{
            console.log('socket work',data);
            setflag(!flag)
            toast.success('Successfully Add Post', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        
        }) 
    })


   const clearNotification=()=>{
    axios.post('http://localhost:5000/notification/clearnotification',{receiver:localStorage.getItem('id')})
    .then(()=>{setflag(!flag)})
    .catch((err)=>{console.log(err)})
   }
   //------------FOLLOW USER----------
    const followUser =(sender)=>{
        console.log('hufhguegwhhiukr');
        axios.post('http://localhost:5000/follow',{sender:sender,followuser:localStorage.getItem('id')},
        {headers:{
            "Authorization":  localStorage.getItem('token')
        }})
        .then((response)=>{
            setflag(!flag)
        })
        .catch((err)=>console.log('err',err))
        axios.post('http://localhost:5000/follow/addtorequest',{userId:sender,followuser:localStorage.getItem('id')},
            {headers:{
                "Authorization":  localStorage.getItem('token')
            }})
        .then((response)=>{setflag(!flag)})
        .catch((err)=>console.log('err',err))
    }
    //-----------------DELETE FOLLOWR REQUEST------------
    const onDeleteRequest =(id)=>{
        axios.post('http://localhost:5000/notification/deleterequest',{id:id})
        .then(()=>{setflag(!flag)})
        .catch((err)=>{console.log(err)})
    }

    useEffect(()=>{
        axios.post('http://localhost:5000/notification/fatchnotification',{userId:localStorage.getItem('id')},
        {headers:{
            "Authorization":  localStorage.getItem('token')
        }}).then((response)=>{
            
            setnotification(response.data)

            dispatch(getnotification({numberofnotification:response.data.length}))
        })
        .catch((err)=>{console.log(err);})
    },[flag])
    
  return (
    <div >
        <div style={{display:'flex',justifyContent:'space-between'}}>
            
        <h3>Notification</h3>
        {notification.length>0 && (<h6 onClick={clearNotification} style={{color:'#2e7d32'}}>Clear Notification</h6>)}
        
        </div>
        {
         notification.map((i,index)=>{
            return(
                <>
                {
                    i.followRequest 
                    ?(<>
                        <Box sx={{ borderBottom: 1, borderColor: '#cecece',display:'flex', margin:1,width:'70%'}} key={index}>
                        <div onClick={()=>{
                            localStorage.setItem('searchuser',i.sender._id)
                            navigate('/profile')
                            }} >
                            <Avatar src={`http://localhost:5000/static/${i.sender?.profileImage}`}  alt='profile' sx={{height:'60px',width:'60px',border : ' 2.5px solid #2E7D32',margin:'5px'}}></Avatar>
                        </div> 
                        <div
                        style={{textAlign:'left',width:'70%'}}    
                        >
                            <span style={{fontSize:'21px',fontWeight:500}}>{i.sender?.username}</span>
                            <span style={{fontSize:'17px',marginLeft:'20px',fontWeight:500,color:'#626362'}}>Follow Request Fro You</span>
                            <p style={{fontSize:'13px',margin:0}}>{i.sender.bio}</p>
                            {
                                i.sender.following?.includes(localStorage.getItem('id'))
                                ?(<><h6>You accepted foolow request</h6></>)
                                :(<>
                                    <Button variant="contained" color="success"sx={{margin:1.5,height:'30px',}} onClick={()=>{
                                        console.log('hii ishan');
                                        followUser(i.sender._id)}}>Accept </Button>
                                    <Button variant="contained" color="success"sx={{height:'30px'}} onClick={()=>onDeleteRequest(i._id)}>Delete </Button>
                                </>)
                            }
                            
                            
                               
                            
                        </div>
                        <div style={{marginLeft :'40px'}}>
                            <p style={{fontSize:'13px',fontWeight:600}}>{moment(i.createdAt).startOf('ss').fromNow()}</p>
                        </div>
                    
                    </Box>
                    </>)
                    :(<>
                        <Box sx={{ borderBottom: 1, borderColor: '#cecece',display:'flex', margin:1,width:'70%'}} key={index}>
                        <div onClick={()=>{
                            localStorage.setItem('searchuser',i.sender._id)
                            navigate('/profile')
                            }} >
                            <Avatar src={`http://localhost:5000/static/${i?.sender?.profileImage}`}  alt='profile' sx={{height:'60px',width:'60px',border : ' 2.5px solid #2E7D32',margin:'5px'}}></Avatar>
                        </div> 
                        <div onClick={()=>{
                            localStorage.setItem('searchuser',i.sender._id)
                            navigate('/profile')
                            }} 
                            style={{textAlign:'left',width:'70%'}}    
                            >
                            <span style={{fontSize:'21px',fontWeight:500}}>{i?.sender?.username}</span>
                            {
                                i.like && (<>
                                <span style={{fontSize:'17px',marginLeft:'20px',fontWeight:500,color:'#626362'}}>Like you post</span>
                                <p style={{fontSize:'13px',margin:0}}>{i.sender.bio}</p>
                                </>)
                            }
                            {
                                i.comment &&(<>
                                <span style={{fontSize:'17px',marginLeft:'20px',fontWeight:500,color:'#626362'}}>Comment you post</span>
                                <p style={{fontSize:'13px',margin:0}}>{i.commentText}</p>
                                </>)
                            }
                            
                            
                            <p style={{fontSize:'13px',fontWeight:600}}>{moment(i.createdAt).startOf('ss').fromNow()}</p>
                        </div>
                        <div>
                            <img src={`http://localhost:5000/static/${i.postid?.postimage}`} height='80px'width='80px'/>
                        </div> 
                    
                    </Box>
                    </>)
                }
                </>
                
            )
            
         })   
        }
        <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            />

    
            
            
    </div>
        
    )
}
