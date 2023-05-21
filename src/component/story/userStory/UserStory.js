import { Avatar } from '@mui/material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Carousel } from "react-bootstrap";
import moment from 'moment'

export default function UserStory({selectedUser,selectedUsername,selectedUserImage}) {
  const [allStory, setallStory] = useState([])
  const [index, setIndex] = useState(0);
  
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  useEffect(()=>{
    axios.post('https://socialmediabackend-v5o5.onrender.com/story/getstory',{id:selectedUser},{
      headers:{
          "Authorization":  localStorage.getItem('token')
      }
    }).then((response)=>{
      // console.log(response.data[0].story);
      setallStory(response.data[0].story)
    })
  },[])
  return (
    <div style={{height:'540px', width:'400px'}}>
      
      
      
        <Carousel  activeIndex={index}
            onSelect={handleSelect}  >
          {
            allStory.map((item,index)=>{
              return(
                <Carousel.Item key={index}>
                  {console.log(item)}
                  <div style={{display:'flex',margin:'10px 0px 0px 10px'}} >
                    <Avatar src={`https://socialmediabackend-v5o5.onrender.com/static/${selectedUserImage}`} sx={{height:'40px',width:'40px',border:'2px solid #2E7D32'}} />
                    
                      <h5 style={{margin:'5px 0px 0px 10px',zIndex:1,color:'#dcdcde'}}> {selectedUsername}</h5>
                      <p style={{margin:'5px 0px 0px 10px',zIndex:1,color:'#dcdcde'}}>{moment(item.createdAt).startOf('ss').fromNow()}</p>
                    
                  </div>
                  {item.storylist.includes('.mp4')
                    ?(<video height='500px' width='400px' controls autoPlay>
                          <source src={`https://socialmediabackend-v5o5.onrender.com/static/${item.storylist}`} type="video/mp4" height='500px' width='400px'/>
                      </video>)
                    :(<img src={`https://socialmediabackend-v5o5.onrender.com/static/${item.storylist}`} height='540px' width='400px' style={{marginTop:'-50px'}}/>)
                  }
                  
                </Carousel.Item>
              )
            })
          }
            
        </Carousel>
    </div>
  )
}
