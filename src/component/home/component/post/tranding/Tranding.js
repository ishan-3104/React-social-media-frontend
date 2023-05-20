import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import axios from 'axios';
import { Dialog, DialogContent } from '@mui/material';
import {useState} from 'react'
import ViewOnePost from './ViewOnePost';

export default function MasonryImageList() {
  const [post, setpost] = React.useState([])
  const [open, setOpen] = useState(false)
  const [postId, setpostId] = useState('')

  
  React.useEffect(()=>{
    axios.get('http://localhost:5000/getalluser/post', {headers:{
        "Authorization":  localStorage.getItem('token')
    }})
    .then((response)=>{
        
        setpost(response.data.data)
    })
    .catch((err)=>{
        console.log(err);
    })
  },[])

  const handleClickOpen = (id) => {
    setOpen(true);
    setpostId(id)
  };

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
    <Box sx={{ width: 650}}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {post.map((item) => (
          <ImageListItem key={item.img} onClick={()=>handleClickOpen(item._id)}>
            {item.postimage.includes('.mp4')
              ?( <video 
              style={{maxHeight:'400px',maxWidth:'210px'}} 
              controls muted>
                      <source src={`http://localhost:5000/static/${item.postimage}`} type="video/mp4"/>
                  </video>)
              :( <img
                src={`http://localhost:5000/static/${item.postimage}`}
              //   srcSet={`${item.img}`}
                alt="post not available"
                loading="lazy"
              />)
              }
            
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
    <Dialog open={open} onClose={handleClose} >
      <DialogContent style={{padding:0,overflow:'hidden'}} >
              <ViewOnePost postId={postId}/>
      </DialogContent>
    </Dialog>
    </>
  );
}

