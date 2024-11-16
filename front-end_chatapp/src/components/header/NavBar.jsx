/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// import HomeIcon from '@mui/icons-material/Home';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
// import downloadImage from '../LandingPage/e-commerce.png';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from "../authentication/api"
import { getAllCourses } from '../dashboard/api';
import { TextField } from '@mui/material';



const Navbar = () => {

  const navigate = useNavigate()

  const [truebs, setTruebs] = React.useState(false);
  const [state, setState] = React.useState({ left: false, });
  const [data, setdata] = useState()


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  const handlpages = (text) => {
    if (text == 'View Profile') {
      handleViewProfile()
    }
    if (text == "Setting") {
      console.log(1)
    }
    if (text == 'Help Centre') {
      console.log(1)
    }
    if (text == 'Logout') {
      handleLogout()
    }



  }


  const handleViewProfile = () => {
    setTruebs(false)
    navigate('/viewprofile')
  }


  const showAndHIdesidebar = () => {
    setTruebs(!truebs)
  }

  const Handlesigninpage = () => {
    return (
      <>
        <Box height="40vh" width="20vw" bgcolor={'#4287f5'} position="fixed" zIndex={1} top={70} right={10} borderRadius={3}>

          <List>
            {['View Profile', 'Setting', 'Help Centre', 'Logout',].map((text, index) => (
              <ListItem key={text} disablePadding onClick={() => handlpages(text)}>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                  {
                    index === 2 && <Divider />
                  }
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </>
    )
  }


  const handleLogout = async () => {
    try {

      const logOutuser = await logoutUser()
      console.log("logOutuser", logOutuser)
      // navigate('/')

    } catch (error) {
      console.log("errro in logout function", error)
    }
  }


  const getAllCoursesdata = async () => {
    let res = await getAllCourses()
    console.log(res?.data)
    setdata(res?.data[0]?.fileurl)
  }

  useEffect(() => {
    getAllCoursesdata()
  }, [])




  return (
    <AppBar position="static" >
      <Toolbar>
        <Box>
         {/* <TextField
          style={{backgroundColor:"white"}}
         /> */}
        </Box>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1, justifyContent: "center" }}>
          {/* <img src={downloadImage} alt="Logo" style={{ height: '50px', margin: '5px', width: "8%", borderTopLeftRadius: "10%", borderTopRightRadius: "10%" }} /> */}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>

          <IconButton
            onClick={showAndHIdesidebar}
            color="inherit"
          >
            {data ? <img src={data} height={40} width={40} style={{ borderRadius: "50%" }} /> : <AccountCircle sx={{ fontSize: 35 }} />}
          </IconButton>
          {
            truebs && <Handlesigninpage />
          }
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, justifyContent: "center", fontSize:"16px" }}>
            You
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar

