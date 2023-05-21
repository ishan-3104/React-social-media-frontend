import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Avatar, Button, Grid, IconButton, speedDialActionClasses, TextareaAutosize, TextField, Typography } from '@mui/material'
import Navbar from '../navbar/Navbar'
import EditIcon from '@mui/icons-material/Edit';
import './profile.css'
import DisplayPost from './DisplayPost';
// import {useSelector} from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
    const userId = localStorage.getItem('searchuser')
    const [userData, setuserData] = useState([])
    // const [username, setusername] = useState('')
    const [email, setemail] = useState('')
    const [bio, setbio] = useState('')
    const [phone, setphone] = useState()
    const [profileImage, setprofileImage] = useState({})
    const [editFlag, seteditFlag] = useState(false)
    const [imageflag, setimageflag] = useState(false)

    useEffect(()=>{
        axios.post('https://socialmediabackend-v5o5.onrender.com/getalluser/userprofile',{userId:userId},{headers:{
            "Authorization":  localStorage.getItem('token')
        }})
        .then((response)=>{
            console.log(response);
            setuserData(response.data.data[0])
            // setusername(response.data.data[0].username)
            setemail(response.data.data[0].email)
            setbio(response.data.data[0].bio)
            setphone(response.data.data[0].phone)
        })

    },[])

    //------------update funcion-----------
    const onUpdate =(e)=>{
        e.preventDefault()
        var formdata = new FormData()
        formdata.append('id',localStorage.getItem('id'))
        formdata.append('username',localStorage.getItem('username'))
        formdata.append('phone',phone)
        formdata.append('email',email)
        formdata.append('bio',bio)
        formdata.append('profileImage',profileImage)

        
        axios.post('https://socialmediabackend-v5o5.onrender.com/updateprofile',formdata,{
            headers:{
                "Authorization":  localStorage.getItem('token')
        }})
        .then((response)=>{
            console.log(response)
            toast.success('Successfully Update Profile', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            seteditFlag(false)
        })
        .catch((err)=>console.log(err))
    }
  return (
    
    <div>
         <Navbar/>
        <div className='nuser-page'>
            <div className='user-profile-info'>
                    <div className='userProfileImage'>
                        {imageflag
                            ?(<Avatar  src={URL.createObjectURL(profileImage)} sx={{height:'100px',width:'100px',border : '3px solid black'}}></Avatar>)
                            :(<Avatar src={`https://socialmediabackend-v5o5.onrender.com/static/${userData?.profileImage}`} sx={{height:'100px',width:'100px',border : '3px solid black'}}></Avatar>)
                        }  
                    </div>
                    <div className='usename-bio'>
                        <span className='NuseName'>@{userData?.username}</span>
                        <span style={{fontSize: '22px',fontWeight: 600,color : '#8C8C8C'}}>Dark</span>
                        {localStorage.getItem('id')===localStorage.getItem('searchuser')
                        ?(<span ><IconButton style={{fontSize:'16px',marginLeft :'10px',marginTop:'-10px'}} onClick={()=>seteditFlag(true)}><EditIcon/>Edit profile</IconButton> </span>)
                        :null
                        }
                        <Typography>{userData?.bio}</Typography>
                        {editFlag && (
                            <form method='post' onSubmit={onUpdate}>
                                {/* <TextField label='username' size='small' value={username} sx={{width:'500px'}} margin="dense"
                                    onChange={(e)=>setusername(e.target.value)}
                                /><br/> */}
                                <TextareaAutosize 
                                    value={bio}
                                    label='bio'
                                    margin="dense"
                                    style={{ width: '500px',background:'transparent',borderRadius:'5px' }}
                                    onChange={(e)=>setbio(e.target.value)}
                                    />
                                <TextField label='phone'size='small' value={phone} sx={{width:'500px'}} margin="dense"
                                    onChange={(e)=>setphone(e.target.value)}
                                /><br/>
                                <TextField label='email' size='small' value={email} sx={{width:'500px'}} margin="dense"
                                     onChange={(e)=>setemail(e.target.value)}
                                /><br/>
                                <TextField  type='file' variant="standard" name="profileImage" 
                                onChange={(e)=>{
                                    setprofileImage(e.target.files[0])
                                    setimageflag(true)
                                }} /><br/>
                                <Button variant="contained" color="success" sx={{margin:1}} type='submit'>Update</Button>
                                <Button variant="contained" color="success" onClick={()=>seteditFlag(false)}>clacel</Button>
                            </form>
                        )}
                    </div>
            </div>
            <br/>
            <div className='user-profile-container'>
                <div style={{width : '50%',marginLeft:'5%',marginRight:'8%'}}>
                    <DisplayPost/>
                    
                </div>
                <div className='follower-box'>
                    <div className='follow-btn-container'>
                       
                        <div className="numberofFollowe">
                            <div><span style={{fontWeight:500,color:'white',fontSize:'20px'}}>{userData?.following?.length}</span><span style={{color:'white'}}> Follower</span></div>
                            <div><span style={{fontWeight:500,color:'white',fontSize:'20px'}}>100 </span><span style={{color:'white'}}> Point</span></div>
                        </div>
                    </div>
                    <br/><br/>
                    <div className='follower-container'>
                        <span style={{color:'#2E7D32',fontWeight:700,fontSize:'18px',marginRight:'10px'}}>Follower</span><span style={{fontWeight:500}}>{userData?.following?.length}</span>
                        <div style={{marginTop : '10px',display: 'flex',width:'95%',}}>
                            <Grid container spacing={1}>
                                {  
                                    userData?.following?.map((i,index)=>{
                                        return(
                                            <>
                                            { 
                                            index<7
                                            ? (
                                                <Grid item  md={3}>
                                                <Avatar src={`images/${i.profileImage}`} sx={{height:'50px',width:'50px',border : '2px solid #2E7D32'}}/>
                                                </Grid>
                                            )
                                            :(
                                                <Grid item  md={3}>
                                                <Avatar sx={{height:'50px',width:'50px',border : '2px solid #2E7D32',background:'white',color:'black'}}>+</Avatar>
                                                </Grid>
                                            )
                                        }
                                            </>
                                        )
                                    })
                                } 
                            </Grid>
                        </div><br/>
                        <h6 style={{fontSize:'18px'}}>Help.About. Investors. Privacy and Policy. Trems of Services. Status</h6>
                        <p style={{margin:'0px'}}>@2022GabAI, INC</p>
                        <p style={{margin:'0px'}}>Gabsocial is a open sourse software code.gab</p>
                    </div>
                </div>
            </div>
        </div>
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

export default Profile