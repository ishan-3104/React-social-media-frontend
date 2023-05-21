import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import './newpost.css'
import axios from 'axios'
import {useDispatch} from 'react-redux';
import { changeflage } from '../../../../featurs/UserSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Newpost({handleClose}) {
  const dispatch= useDispatch()

  const [postimage, setpostimage] = useState({})
  const [imageflag, setimageflag] = useState(false)
  const [caption, setcaption] = useState('')

  //--------RELOAD PAGE----------------------------
  const refresh = () => {
    window.location.reload(false);
  };
  //----------UPLOAD POST--------------------------
  const onSubmitpost =(e)=>{
    e.preventDefault()
    var today  = new Date()
    var formdata = new FormData()
    formdata.append('userId',localStorage.getItem('id'))
    // formdata.append('profileImage',localStorage.getItem('profileImage'))
    formdata.append('postTime',today.getFullYear() + '-' + today.toLocaleString('en-us', { month: 'long' }) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes())
    formdata.append('caption',caption)
    formdata.append('postimage',postimage)

    axios.post('https://socialmediabackend-v5o5.onrender.com/addpost',formdata,{
      headers:{
          "Authorization":  localStorage.getItem('token')
      }
    })
    .then((response)=>{
      console.log('post uploaded',response);
      dispatch(changeflage())

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
    .catch((err)=>{
      console.log('err',err);
    })


    
  }
  
  return (
    <div className='add-post-box'> 
      <Typography variant='h4'>Add new post</Typography><br/>
      <form method='post' onSubmit={onSubmitpost}>
          <TextField label="caption" size='small'  margin="dense" sx={{width:'80%'}} onChange={(e)=>setcaption(e.target.value)}></TextField>
          <div className='image-container'>
            {imageflag 
            ? (<img className='upload-image' src={URL.createObjectURL(postimage)} height='100%' width='100%'/>) 
            :(<div className='alt-image-container'></div>)}
            <TextField  type='file' variant="standard" name="postimage" 
              onChange={(e)=>{
                setpostimage(e.target.files[0])
                setimageflag(true)
              }} />
            <br/>
          <Button variant='contained' sx={{width:'30%',marginRight:1}} type='submit'>Post</Button>
          <Button variant='contained' sx={{width:'30%',margin:1}} onClick={()=>handleClose()}>Cancel</Button>            
          </div>
      </form>

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
