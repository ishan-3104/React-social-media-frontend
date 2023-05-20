import { IconButton, Typography } from '@mui/material'
import React from 'react'
import './aboutus.css'
import PublicIcon from '@mui/icons-material/Public';
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ForumIcon from '@mui/icons-material/Forum';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Resources from './Resources';

export default function AboutUs() {
  return (
      <>
    <div className='aboutus-container'>
        <h5>ABOUT US</h5>
        <Typography>Growing buisnesse is hard.This group is to help you along the journey.</Typography>
        {/* <hr/>
        <div style={{ display:'flex',justifyContent:'space-between'}}>
            <div ><PublicIcon sx={{fontSize:'18px',color:'#2E7D32'}}/><span> Public</span></div>
           <div > <IconButton sx={{padding:0}}><QuestionMarkRoundedIcon sx={{fontSize:'18px'}}  /></IconButton></div>
        </div>
        <hr/>
        <div style={{ display:'flex',justifyContent:'space-between'}}>
            <div ><VisibilityIcon sx={{fontSize:'18px',color:'#2E7D32'}}/><span> Visibal</span></div>
           <div > <IconButton sx={{padding:0}}><QuestionMarkRoundedIcon sx={{fontSize:'18px'}}  /></IconButton></div>
        </div> */}
        <hr/>
        <div style={{ display:'flex',justifyContent:'space-between'}}>
            <div ><ForumIcon sx={{fontSize:'18px',color:'#2E7D32'}}/><span> Member</span></div>
           <div > <p>25,515 Members</p></div>
        </div>
        <hr/>
        <div style={{ display:'flex',justifyContent:'space-between'}}>
            <div ><SubscriptionsIcon sx={{fontSize:'18px',color:'#2E7D32'}}/><span> Created</span></div>
           <div > <p>May 8 2018</p></div>
        </div>
        <hr/>
        <div style={{ display:'flex',justifyContent:'space-between'}}>
            <div ><LocalOfferIcon sx={{fontSize:'18px',color:'#2E7D32'}}/><span> Tag</span></div>
        </div>
        <hr/>
        <div style={{ display:'flex',width:'100%',wordBreak: 'break-word'}}>
            <h6>Modretedby </h6>
            <p> csllen,roisesherry,Channingallen</p>
        </div>
        <hr/>
    </div>
    <div className='resources'>
        <Resources/>
    </div>
    </>
  )
}
