import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Newest from './newest';
import AboutUs from '../aboutUs/AboutUs';
import Story from '../../../story/Story';
import Tranding from './tranding/Tranding'


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Post() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{display:'flex',justifyContent:'space-between'}}>
    <Box sx={{ width: '65%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider',width:'100%'  }}>
       
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{marginLeft:'28%'}} >
            <Tab style={{marginRight:'15px'}} label="Newest" {...a11yProps(0)} />
            <Tab style={{marginRight:'15px'}} label="tranding" {...a11yProps(1)} />
            <Tab label="discover" {...a11yProps(2)} />
          </Tabs>
        
      </Box>
      <TabPanel value={value} index={0}>
        <Story/>
        <Newest/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Tranding/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Newest/>
      </TabPanel>
    </Box>
      <Box sx={{ width: '27%' }}>
        <div ><AboutUs/></div>
      </Box>
    </div>

  );
}