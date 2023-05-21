import { Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import moment from 'moment'

function AddStory() {
  const [storyimage, setstoryimage] = useState({})
  const [imageflag, setimageflag] = useState(false)

  const onAddstory=(e)=>{
    e.preventDefault()
    var formdata = new FormData()
    formdata.append('userid',localStorage.getItem('id'))
    formdata.append('storyimage',storyimage)

    axios.post('https://socialmediabackend-v5o5.onrender.com/story',formdata,{
      headers:{
          "Authorization":  localStorage.getItem('token')
      }
    }).then((response)=>{
      console.log(response);
    })
    .catch((err)=>{console.log(err,'err in add story');})
  }
  return (
    <div>
        <div className='image-container'>
          {imageflag 
          ? (<img className='upload-image' src={URL.createObjectURL(storyimage)} height='100%' width='100%'/>) 
          :(<div className='alt-image-container'></div>)}
          <form method='post' onSubmit={onAddstory}>
              <TextField  type='file' variant="standard" name="storyimage" 
                onChange={(e)=>{
                  setstoryimage(e.target.files[0])
                  setimageflag(true)
                }} />
              <Button type='submit'>Add story</Button>
          </form>
        </div>
    </div>
  )
}

export default AddStory