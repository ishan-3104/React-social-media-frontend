import React, { useState } from 'react'
import './forgotpassword.css'
import {Button, Divider, InputAdornment, TextField, Typography} from '@mui/material'
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function Forgotpassword() {
    const navigate = useNavigate()
    const [email, setemail] = useState('')
    const [verifyemail, setverifyemail] = useState(false)
    const [otp, setotp] = useState(0)
    const [otpVarify, setotpVarify] = useState(false)
    const [password, setpassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [errpass, seterrpass] = useState(false)

    const onSenotp =()=>{
        axios.post('https://socialmediabackend-v5o5.onrender.com/forgetpass',{email:email})
        .then((response)=>{
            console.log(response);
            setverifyemail(true)
        })
        .catch((err)=>alert('user not found'))
    }
    const onVerifyOTP = ()=>{
        axios.post('https://socialmediabackend-v5o5.onrender.com/forgetpass/verifyotp',{otp:otp})
        .then(()=>{
            setverifyemail(false)
            setotpVarify(true)
        })
        .catch((err)=> {
            console.log(err);
            alert('Enter velid OTP')
        })
        
    }
    const onResetpassword =()=>{
        if(password==confirmPassword){
            axios.post('https://socialmediabackend-v5o5.onrender.com/resetpass',{email:email,password:password})
            .then((response)=>{
                console.log('password updated',response)
                navigate('/login')
            })
            .catch((err)=>console.log(err))
            

        }
        else{
            seterrpass(true)
        }
    }
  return (
    <div className='forgotpass-background'>
        <img src='images/Ellipse 68.png' alt='ellipse' className='ellipse1'/>
        <img src='images/Ellipse 68.png' alt='ellipse' className='ellipse2'/>
        <div className='forgotpass-container'>
            <Typography  sx={{fontFamily:'Open Sans',fontSize:'35px',fontWeight:'600px',color:'#515151',marginTop:1}}>Reset Password</Typography><br/>
            <div className='forgotpass-input-feld'>
                
                <TextField  label='email' size='small' fullWidth margin="dense" onChange={(e)=>setemail(e.target.value)}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <EmailIcon fontSize='medium'/>
                    </InputAdornment>
                    ),
                    }}
                />
                <div className='forgotpass-btn'>
                <Button  sx={{color: 'white',fontSize: '18px'}}  fullWidth onClick={onSenotp}>Send OTP</Button>
                </div>
                
                {verifyemail && <>
                    <TextField  label='OTP' size='small' fullWidth margin="dense" onChange={(e)=>setotp(e.target.value)}/>
                    <div className='forgotpass-btn'>
                    <Button  sx={{color: 'white',fontSize: '18px'}}  fullWidth onClick={onVerifyOTP}>Verify OTP</Button>
                    </div>
                </>}
               
               {otpVarify && <><TextField  label='Password' size='small' fullWidth margin="dense" onChange={(e)=>setpassword(e.target.value)}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <LockIcon fontSize='medium'/>
                    </InputAdornment>
                    ),
                    }}
                />
                <TextField  label='Confirm Password' size='small' fullWidth margin="dense" error={errpass} onChange={(e)=>setconfirmPassword(e.target.value)}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <LockIcon fontSize='medium'/>
                    </InputAdornment>
                    ),
                    }}
                />
                <br/>
                <div className='forgotpass-btn'>
                <Button  sx={{color: 'white',fontSize: '18px'}}  fullWidth onClick={onResetpassword}>Reset Password</Button>
                </div></>}
              

            </div>
        </div>
    </div>
  )
}
