import { Avatar, Badge, Dialog, DialogContent } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddStory from './userStory/AddStory'
import UserStory from './userStory/UserStory'
import './story.css'
import axios from 'axios'

function Story() {
    const [open, setopen] = useState(false)
    const [addpostFlag, setaddpostFlag] = useState(false)
    const [allStories, setallStories] = useState([])
    const [selectedUser, setselectedUser] = useState('')
    const [selectedUsername, setselectedUsername] = useState('')
    const [selectedUserImage, setselectedUserIamge] = useState('')
    const [userdata, setuserdata] = React.useState([])

    const stories = new Map()
   
    useEffect(()=>{

        axios.post('http://localhost:5000/getalluser/userprofile',{userId:localStorage.getItem('id')},{headers:{
            "Authorization":  localStorage.getItem('token')
        }})
        .then((response)=>{
        
            setuserdata(response.data.data[0])})
        .catch((err)=>{console.log('err for geting user data',err)})
        
        axios.get('http://localhost:5000/story/fatchallstory')
        .then((response)=>{
            
            response.data.map((item)=>{
                stories.set(item.userid._id,[item.userid.profileImage,item.userid.username])
            })
            var storyArr =[]
            stories.forEach(function(value, key) {
                var storyobj={}
                storyobj['userid']=key
                storyobj['profileImage']=value[0]
                storyobj['username']=value[1]

                storyArr.push(storyobj)
             })
             setallStories(storyArr)
        })
        .catch((err)=>console.log(err.message))
    },[])
    
    const handleAddstory=()=>{
        setaddpostFlag(true)
    }
    const seeStory=(id,username,image)=>{
        setselectedUserIamge(image)
        setselectedUsername(username)
        setselectedUser(id)
        setopen(true)
    }
    const handleClose=()=>{
        setaddpostFlag(false)
        setopen(false)
    }
  return (
    <div className='stroy-container'>
        <div>
            <Badge color="primary" overlap="circular" badgeContent="+" 
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}>
            <div onClick={handleAddstory}><Avatar src={`http://localhost:5000/static/${userdata.profileImage}`} sx={{height:'60px',width:'60px',border:'2.5px solid #2E7D32'}} /></div>
            </Badge>
        </div>
        <div className='story-scrollbar-container'>
        {
            allStories.map((item,index)=>{
                return(
                     <div key={index} className='story-scrollbar-box'
                      onClick={()=>seeStory(item.userid,item.username,item.profileImage)}
                      >
                        <Avatar src={`http://localhost:5000/static/${item.profileImage}`} className='story-thumbnail' sx={{height:'60px',width:'60px'}}/>
                    </div> 
                )
            })
        }
       </div>
        <Dialog open={addpostFlag} onClose={handleClose}>
            <DialogContent> 
                <AddStory/>
                
            </DialogContent>
        </Dialog>
        <Dialog open={open} onClose={handleClose}>
            <DialogContent> 
               
                <UserStory selectedUser={selectedUser} selectedUsername={selectedUsername} selectedUserImage={selectedUserImage}/>
            </DialogContent>
        </Dialog>
        
    </div>
  )
}

export default Story