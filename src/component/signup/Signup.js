import React, { useEffect, useState } from 'react'
import './signup.css'
import {Button, Divider, InputAdornment, TextField, Typography} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


export default function Signup() {
  const navigate = useNavigate()
  const [username, setusername] = useState('')
  const [email, setemail] = useState('')
  const [phone, setphone] = useState('')
  const [password, setpassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [errpass, seterrpass] = useState(false)
  const [success, setsuccess] = useState('')
  
  useEffect(()=>{
    if(password!=confirmPassword){
      seterrpass(true)
    }
    else{
      seterrpass(false)
      setsuccess('success')
    }
  },[confirmPassword])
  
  const onGoogleLogin =(response)=>{
    console.log(response)
  }
  
  //--------------SIGNUP------------
  const onSignup=(e)=>{

    if(password==confirmPassword){

      axios.post('http://localhost:5000/auth/signin',
      {
        username:username,
        email:email,
        phone:phone,
        password:password,
      }
      )
      .then((response)=>{navigate('/login')})
      .catch((err)=>{
        console.log(err)
        alert('user name alredy exists')
      })
    }
    else{
      seterrpass(true)
    }
  }
 
  return (
    <div className='background'>
      <img src='images/Ellipse 68.png' alt='ellipse' className='ellipse3'/>
      <img src='images/Ellipse 68.png' alt='ellipse' className='ellipse4'/>
      <div className='signup-container'>

        <Typography  sx={{fontFamily:'Open Sans',fontSize:'35px',fontWeight:'600px',color:'#515151',marginTop:1}}>Sign Up</Typography><br/>
        <div className='input-feld'>
          <TextField  label='name' size='small' fullWidth margin="dense" 
          onChange={(e)=>setusername(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PersonIcon fontSize='medium'/>
              </InputAdornment>
            ),
            }}
          />
          <TextField  label='email' size='small' fullWidth margin="dense" onChange={(e)=>setemail(e.target.value)} 
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <EmailIcon fontSize='medium'/>
              </InputAdornment>
            ),
            }}
          />
          <TextField  label='Phone number' size='small' fullWidth margin="dense" onChange={(e)=>setphone(e.target.value)}
           InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PhoneIcon fontSize='medium'/>
              </InputAdornment>
            ),
            }}
          />
          <TextField  label='Password' size='small' fullWidth margin="dense" error={errpass} color={success} onChange={(e)=>setpassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <LockIcon fontSize='medium'/>
              </InputAdornment>
            ),
            }}
          />
          <TextField  label='Confirm Password' size='small' fullWidth margin="dense" error={errpass} color={success} onChange={(e)=>setconfirmPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <LockIcon fontSize='medium'/>
              </InputAdornment>
            ),
            }}
          />
          <br/>
          <div className='sign-btn'>
          <Button  sx={{color: 'white',fontSize: '18px'}}  fullWidth onClick={onSignup}>Sign Up</Button>
          </div>
          <Typography sx={{fontSize:'17px',color:'#7D7979'}}> Have already Account 
            <Link to='/login'underline="hover" style={{color:'#E67D53'}}>  Signin</Link> 
          </Typography>
          <Divider sx={{color:'#7D7979',fontSize:'18px',marginTop: '10px'}}>Or</Divider><br/>
      

          <div className='link-btn'>
            <div style={{background: '#243B68',width:'94px',borderRadius: '5px 0px 0px 5px',}} >
              <FacebookOutlinedIcon sx={{color:'white',fontSize:'30px',marginTop:1}}/>
            </div>
            <div style={{margin:'auto',fontSize:'18px', background : '#3A5998',height:'100%',width:'100%',borderRadius: '0px 5px 5px 0px'}}>
              <Typography sx={{marginTop:1.5,color:'white'}}>LOG IN WITH FACEBOOK</Typography>
            </div>  
          </div><br/>
            
          <GoogleLogin 
            clientId="618644845391-cami5t81cf7hma1mh31m1bvo7nqefiqj.apps.googleusercontent.com"
            buttonText={<Typography sx={{marginLeft : '70px'}}>LOG IN WITH GOOGLE</Typography>}
            render={ renderProps =>(  
              <Button onClick={renderProps.onClick} style={{width:'100%',padding:'0%'}} >           
                <div className='link-btn'>
                  <div style={{background: '#C52D23',width:'94px',borderRadius: '5px 0px 0px 5px',}} >
                    <GoogleIcon sx={{color:'white',fontSize:'30px',marginTop:1}}/>
                  </div>
                <div style={{margin:'auto',fontSize:'18px', background : '#F44235',height:'100%',width:'100%',borderRadius: '0px 5px 5px 0px'}}>
                  <Typography sx={{marginTop:1.5,color:'white'}}>LOG IN WITH GOOGLE</Typography>
                </div>  
                </div>
              </Button>
            )
            }
            onSuccess={onGoogleLogin}
            onFailure={onGoogleLogin}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      </div>
    </div>
  )
}
