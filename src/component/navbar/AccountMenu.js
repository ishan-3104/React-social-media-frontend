import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import Newpost from '../home/component/newPost/Newpost';
import { Badge, Dialog, DialogContent } from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import  axios  from 'axios';
//drawer imports 

import Drawer from "@mui/material/Drawer"; 
import List from "@mui/material/List"; 
import ListItem from "@mui/material/ListItem";
import Setting from '../setting/Setting';

export default function AccountMenu() {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [newpostopen, setnewpostOpen] = React.useState(false);
    const [userdata, setuserdata] = React.useState([])
    const open = Boolean(anchorEl);

    const [state, setState] = React.useState({ 
      right: false, 
      }); 
      
    const toggleDrawer = (anchor, open) => (event) => { 
    setState({ ...state, [anchor]: open }); 
    }; 
          
    const list = (anchor) => ( 
        <Box className='setting-container' role="presentation"> 
            <Setting/>
        </Box> 
        ); 
      

    React.useEffect(()=>{
      axios.post('https://socialmediabackend-v5o5.onrender.com/getalluser/userprofile',{userId:localStorage.getItem('id')},{headers:{
          "Authorization":  localStorage.getItem('token')
        }})
        .then((response)=>{
       
            setuserdata(response.data.data[0])})
        .catch((err)=>{console.log('err for geting user data',err)})
    },[])
    const handleClosenewPost = (value) => {
        setnewpostOpen(false);
    };
    const onAddnewPost =()=>{
        setnewpostOpen(true);
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
  return (
    <React.Fragment>
        <Dialog open={newpostopen} onClose={handleClosenewPost} >
            <DialogContent className='add-post-container'> 
                <Newpost handleClose={handleClosenewPost}/>
            </DialogContent>
        </Dialog>

      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 ,marginRight:5,marginTop:0.8}}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Badge color="success" badgeContent="" overlap="circular">
              <Avatar src={`https://socialmediabackend-v5o5.onrender.com/static/${userdata?.profileImage}`} sx={{ width: 65, height: 65 }}></Avatar>
              </Badge>
            </IconButton>
          </Tooltip>
       
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={()=> {
            localStorage.setItem('searchuser',localStorage.getItem('id'))
            navigate('/profile')
            }}
        >
          <Avatar /> Profile
        </MenuItem>
        {/* <MenuItem onClick={()=>{console.log('my Account');}}>
          <Avatar /> My account
        </MenuItem> */}
        <Divider />
        <MenuItem onClick={onAddnewPost}>
          <ListItemIcon>
            <AddCircleOutlineRoundedIcon fontSize="small" />
          </ListItemIcon>
          Add New Post
        </MenuItem>
        <MenuItem onClick={toggleDrawer("right", true)}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon >
          Settings
        </MenuItem>
        <MenuItem onClick={()=>{ 
            localStorage.clear()
            navigate('/login')
        }}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <div > 
          <React.Fragment key={"right"}> 
          <Drawer 
          anchor={"right"} 
          open={state["right"]} 
          onClose={toggleDrawer("right", false)} 
          
          > 
          {list("right")} 
          </Drawer> 
          </React.Fragment> 
      </div> 
    </React.Fragment>
  );
}
