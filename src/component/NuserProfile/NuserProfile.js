import { Avatar, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { Card,} from 'react-bootstrap'
import Navbar from '../navbar/Navbar'
import './nuserProfile.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';


const data = [
    {
        date:'May 6 2021',
        like : 152,
        comment :50,
        title : 'How Facebook is Typing to Recover the Money It Lost During the Outage',
        description : 'Facebook lost approximately $60 million in revenue during the outage. Most of it was supposed to come from advertisers. While reading Facebook’s apology, I noti'
    },
    {
        date:'May 6 2021',
        like : 152,
        comment :50,
        title : 'How Facebook is Typing to Recover the Money It Lost During the Outage',
        description : 'Facebook lost approximately $60 million in revenue during the outage. Most of it was supposed to come from advertisers. While reading Facebook’s apology, I noti'
    },
    {
        date:'May 6 2021',
        like : 152,
        comment :50,
        title : 'How Facebook is Typing to Recover the Money It Lost During the Outage',
        description : 'Facebook lost approximately $60 million in revenue during the outage. Most of it was supposed to come from advertisers. While reading Facebook’s apology, I noti  '
    },
    {
        date:'May 6 2021',
        like : 152,
        comment :50,
        title : 'How Facebook is Typing to Recover the Money It Lost During the Outage',
        description : 'Facebook lost approximately $60 million in revenue during the outage. Most of it was supposed to come from advertisers. While reading Facebook’s apology, I noti  '
    },
    {
        date:'May 6 2021',
        like : 152,
        comment :50,
        title : 'How Facebook is Typing to Recover the Money It Lost During the Outage',
        description : 'Facebook lost approximately $60 million in revenue during the outage. Most of it was supposed to come from advertisers. While reading Facebook’s apology, I noti  '
    },
]
const followers= [
    {
        profileImage : 'profile1.png'
    },
    {
        profileImage : 'profileImage2.png'
    },
    {
        profileImage : 'profileImage3.png'
    },
    {
        profileImage : 'profileImage4.jpg'
    },
    {
        profileImage : 'profile1.png'
    },
    {
        profileImage : 'profileImage4.jpg'
    },
    {
        profileImage : 'profileImage3.png'
    },
    {
        profileImage : 'profile1.png'
    },
    {
        profileImage : 'profileImage2.png'
    },
    {
        profileImage : 'profile1.png'
    },
    {
        profileImage : 'profileImage4.jpg'
    },
    {
        profileImage : 'profileImage4.png'
    },
   
]

export default function NuserProfile() {
    const followerLst=  followers.slice(0,8)
    const remainingFoloower = followers.length-8 
  return (
    <>
        <Navbar/>
        <div className='nuser-page'>
            <div className='user-profile-info'>
                <div className='userProfileImage'>
                <Avatar src='images/profileImage4.jpg' sx={{height:'100px',width:'100px',border : '3px solid black'}}></Avatar>
                </div>
                <div className='usename-bio'>
                    <span className='NuseName'>@username</span>
                    <span style={{fontSize: '22px',fontWeight: 600,color : '#8C8C8C'}}>Dark</span>
                    <Typography>Los Angeles, Califirnia. joined 4 years ago. Finding insights on acquistion channels that ( consistently ) work for fonuders, Visit ZeroTousers.com for the preliminary findings.</Typography>
                </div>
            </div><br/>
            <div className='user-profile-container'>
                <div style={{width : '69%'}}>
                    {
                        data.map((i)=>{
                            return(
                                <>
                                <div className='comment-card'>
                                    <Avatar src='images/image 2.png' sx={{width:'40px',height:'40px',marginTop :5.5}}> </Avatar>
                                    <Card style={{paddingLeft:'35px'}}>
                                        
                                            <div className='comment-card-like'>
                                                <p>{i.date}</p>
                                                <p><FavoriteIcon sx={{fontSize:'18px',color: '#F05542'}} /> {i.like}</p>
                                                <p><ModeCommentIcon sx={{fontSize:'18px', color: '#5CF777'}}/> {i.comment}</p>
                                            </div>
                                            <h5>{i.title}</h5>
                                            <p>{ 
                                                    i.description.length > 200 
                                                    ? `${i.description.substring(0,200)}...`
                                                    :`${i.description}` 
                                            }</p>
                                    </Card>
                                </div><br/>
                                </>
                            )
                        })
                    }
                    
                </div>
                <div className='follower-box'>
                    <div className='follow-btn-container'>
                        <Button variant="contained" color="success"sx={{marginTop:2,height:'30px',width:'80%',}}>follow </Button>
                        <div className="numberofFollowe">
                            <div><span style={{fontWeight:500}}>341 </span><span style={{color:'#535252'}}> Follower</span></div>
                            <div><span style={{fontWeight:500}}>5.3k </span><span style={{color:'#535252'}}> Point</span></div>
                        </div>
                    </div>
                    <br/><br/>
                    <div className='follower-container'>
                        <span style={{color:'#2E7D32',fontWeight:700,fontSize:'18px',marginRight:'10px'}}>Follower</span><span style={{fontWeight:500}}>520</span>
                        <div style={{marginTop : '10px',display: 'flex',width:'95%',}}>
                            <Grid container spacing={1}>
                                {  
                                    followerLst.map((i,index)=>{
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
                                                <Avatar sx={{height:'50px',width:'50px',border : '2px solid #2E7D32',background:'white',color:'black'}}>+{remainingFoloower}</Avatar>
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
    </>
  )
}
