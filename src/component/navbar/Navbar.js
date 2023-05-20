import { Avatar, Button, Divider, Typography } from '@mui/material'
import React from 'react'
import './navbar.css'
import { useNavigate } from "react-router-dom";
import AccountMenu from './AccountMenu';
// import { useDispatch } from 'react-redux';
// import { fatchUser } from '../../featurs/UserSlice';  

export default function Navbar() {
  // const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <div>
        {/* <div className='navbar-login-signup-btn'>
            <Button variant="contained" color="success" 
            sx={{marginRight:3,marginTop:1.5,height:'30px'}} 
            onClick={()=>{ 
              localStorage.clear()
              navigate('/login')
            }}
            >Log out</Button>
            <Button variant="contained" color="success"sx={{marginTop:1.5,height:'30px'}} onClick={()=> {
              localStorage.setItem('searchuser',localStorage.getItem('id'))
              navigate('/profile')
              }}>Profile </Button>
        </div>
        <Divider ></Divider><br/> */}
        <br/>
        <div className='home-navbar'>
            <div style={{display:'flex'}}>
              <Button onClick={()=>{
                localStorage.removeItem('searchuser')
                navigate('/')}
              }>
                <Avatar src='images/image 2.png' sx={{width:'70px',height:'70px',padding:1}}> </Avatar>
              </Button>
              <div className='heading'>
                  <Typography sx={{fontSize:'25px',justifyContent:'left'}}>Growth</Typography>
                  <Typography sx={{fontSize:'15px'}}>swip tips fro finding user and customer</Typography>
              </div>
            </div>
            <div>
              <AccountMenu/>
            </div>
        </div>
</div>
  )
}
