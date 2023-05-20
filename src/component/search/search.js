import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './search.css'
import SearchPeople from './people/searchPeople';
import { TextField } from '@mui/material';

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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className='search-main-container'>
        <Box sx={{ width: '100%', textAlign: 'left',paddingRight:'20px' }}>
          
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="People" {...a11yProps(0)} />
              <Tab label="Groups" {...a11yProps(1)} />
              <Tab label="Marketplace" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <SearchPeople/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            Groups
          </TabPanel>
          <TabPanel value={value} index={2}>
            Marketplace
          </TabPanel>
        </Box>
        <Box style={{border:'1px solid #CBC9C9',background: 'rgba(255, 255, 255, 0.58)',borderRadius:'5px',height: '388px',width:'40%',textAlign:'left',padding:'20px'}}>
          <h4 style={{color:'#2E7D32'}}>Popular search</h4>
          <hr/>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
          <p>Lorem ipsum dolor sit amet, consecte adipiscing elit. </p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
          <p>Lorem ipsum dolor sit amet, consecte adipiscing elit. </p>
          <h5 style={{color:'#2E7D32'}}>more</h5>
        </Box>
      </div>
    </>
  );
}
